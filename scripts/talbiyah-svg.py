"""Outline the Talbiyah in Amiri Bold as SVG paths (no font download needed in the browser).
Writes src/data/talbiyah.json with {viewBox, d}. Run: python3 scripts/talbiyah-svg.py"""
import json, pathlib, re
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

root = pathlib.Path(__file__).resolve().parent.parent
text = re.search(r"talbiyah: '([^']+)'", (root / 'src/data/site.ts').read_text(encoding='utf-8')).group(1)
fontfile = root / 'node_modules/@fontsource/amiri/files/amiri-arabic-700-normal.woff2'
tt = TTFont(str(fontfile))
tt.flavor = None
import io
buf = io.BytesIO(); tt.save(buf); data = buf.getvalue()
face = hb.Face(data); font = hb.Font(face)
upem = face.upem
b = hb.Buffer(); b.add_str(text); b.guess_segment_properties()
hb.shape(font, b, {})
gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
x = 0; parts = []; bounds = []
for info, pos in zip(b.glyph_infos, b.glyph_positions):
    name = order[info.codepoint]
    pen = SVGPathPen(gs)
    gx, gy = x + pos.x_offset, pos.y_offset
    gs[name].draw(TransformPen(pen, (1, 0, 0, -1, gx, -gy)))
    d = pen.getCommands()
    bp = BoundsPen(gs); gs[name].draw(TransformPen(bp, (1, 0, 0, -1, gx, -gy)))
    if bp.bounds: bounds.append(bp.bounds)
    if d: parts.append(d)
    x += pos.x_advance
minx=min(b[0] for b in bounds); miny=min(b[1] for b in bounds); maxx=max(b[2] for b in bounds); maxy=max(b[3] for b in bounds)
pad=40
vb = f"{minx-pad:.0f} {miny-pad:.0f} {maxx-minx+2*pad:.0f} {maxy-miny+2*pad:.0f}"
d = ' '.join(parts)
d = re.sub(r'(\d+\.\d)\d+', r'\1', d)
(root / 'src/data/talbiyah.json').write_text(json.dumps({'viewBox': vb, 'd': d, 'text': text}, ensure_ascii=False))
print('glyphs', len(b.glyph_infos), 'viewBox', vb, 'path bytes', len(d))
