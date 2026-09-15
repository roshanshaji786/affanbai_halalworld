import Link from "next/link";
import { Star8 } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="bg-starlattice flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Star8 className="text-gold h-10 w-10" />
      <h1 className="font-display text-cocoa-deep mt-6 text-6xl">404</h1>
      <p className="text-ink/70 mt-3 max-w-md text-sm">
        This path doesn't lead anywhere — but every journey can return home.
      </p>
      <Link href="/" className="bg-cocoa text-ivory hover:bg-cocoa-deep mt-8 rounded-full px-7 py-3 text-sm font-bold transition-colors">
        Back to Home
      </Link>
    </section>
  );
}
