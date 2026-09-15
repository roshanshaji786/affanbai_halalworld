#!/usr/bin/env bash
# Halal World — one-command, zero-prompt production deploy.
#   git clone https://github.com/roshanshaji786/affanbai_halalworld.git
#   cd affanbai_halalworld && ./deploy.sh
# Optional: PORT=8080 ./deploy.sh | ./deploy.sh stop
set -euo pipefail
cd "$(dirname "$0")"

PORT="${PORT:-3000}"
PIDFILE=".server.pid"
LOG="deploy.log"

# Kill whatever is LISTENing on $1 by resolving the socket inode via /proc
# (npx/node spawn children whose cmdline lacks the port, so pkill can't see them)
kill_port() {
  node -e '
  const fs = require("fs");
  const hex = (+process.argv[1]).toString(16).toUpperCase().padStart(4, "0");
  const inodes = new Set();
  for (const f of ["/proc/net/tcp", "/proc/net/tcp6"]) {
    try {
      for (const line of fs.readFileSync(f, "utf8").split("\n").slice(1)) {
        const p = line.trim().split(/\s+/);
        if (p[1] && p[1].endsWith(":" + hex) && p[3] === "0A") inodes.add(p[9]);
      }
    } catch (e) {}
  }
  if (!inodes.size) process.exit(0);
  for (const d of fs.readdirSync("/proc")) {
    if (!/^\d+$/.test(d)) continue;
    try {
      for (const fd of fs.readdirSync("/proc/" + d + "/fd")) {
        const m = fs.readlinkSync("/proc/" + d + "/fd/" + fd).match(/^socket:\[(\d+)\]$/);
        if (m && inodes.has(m[1])) process.kill(+d, "SIGTERM");
      }
    } catch (e) {}
  }
  ' "$1" 2>/dev/null || true
}

stop_server() {
  if [ -f "$PIDFILE" ]; then
    kill "$(cat "$PIDFILE")" 2>/dev/null || true
  fi
  kill_port "$PORT"
  sleep 1
  rm -f "$PIDFILE"
}

if [ "${1:-}" = "stop" ]; then
  stop_server
  echo "Stopped."
  exit 0
fi

echo "==> Halal World deploy (port $PORT)"

# 1) Node >= 18 required
command -v node >/dev/null 2>&1 || { echo "ERROR: Node.js not found. Install Node 18+ first."; exit 1; }
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[ "$NODE_MAJOR" -ge 18 ] || { echo "ERROR: Node 18+ required (found $(node -v))."; exit 1; }

# 2) Dependencies (reproducible if lockfile present)
echo "==> Installing dependencies"
npm ci --no-audit --no-fund 2>/dev/null || npm install --no-audit --no-fund

# 3) Environment — generate admin credentials once, never prompt
if [ ! -f .env ]; then
  PW="$(node -p "require('crypto').randomBytes(12).toString('hex')")"
  printf 'ADMIN_USER=admin\nADMIN_PASSWORD=%s\n' "$PW" > .env
  echo "==> Generated .env — admin user: admin / password: $PW"
else
  echo "==> Using existing .env"
fi

# 4) Production build (includes typecheck)
echo "==> Building"
npm run build

# 5) Restart server
stop_server
echo "==> Starting production server on 0.0.0.0:$PORT"
nohup npx next start -H 0.0.0.0 -p "$PORT" > "$LOG" 2>&1 &
echo $! > "$PIDFILE"

# 6) Health check (max 30s)
for i in $(seq 1 30); do
  if curl -sf "http://localhost:$PORT/" >/dev/null 2>&1; then
    echo ""
    echo "✔ Deployed. Site:  http://localhost:$PORT   (Malayalam: /ml)"
    echo "✔ Admin: /admin with the credentials printed above (also in .env)"
    echo "✔ Logs:  $LOG   |   Stop: ./deploy.sh stop"
    exit 0
  fi
  sleep 1
done

echo "ERROR: server did not become healthy in 30s — see $LOG"
exit 1
