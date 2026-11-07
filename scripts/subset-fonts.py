"""Subset the Arabic label font (Reem Kufi) to only the letters used on the site (a few KB instead of ~150 KB).
Run with `npm run fonts` after changing any Arabic text in src/data/site.ts."""
import re, pathlib, shutil
from fontTools import subset

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / 'src/data/site.ts').read_text(encoding='utf-8')
arabic = ''.join(sorted(set(''.join(re.findall(r'[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿ ]+', src)))))
out = root / 'src/assets/fonts'
out.mkdir(parents=True, exist_ok=True)
fs = root / 'node_modules/@fontsource'

def make(srcfile, dest):
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    font = subset.load_font(str(srcfile), opts)
    s = subset.Subsetter(opts)
    s.populate(text=arabic + 'ـ')
    s.subset(font)
    subset.save_font(font, str(out / dest), opts)
    print(dest, (out / dest).stat().st_size, 'bytes')

make(fs / 'reem-kufi/files/reem-kufi-arabic-500-normal.woff2', 'reem-kufi-500-sub.woff2')

for f, d in [
    ('cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2', 'cormorant-500.woff2'),
    ('cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2', 'cormorant-600.woff2'),
    ('cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2', 'cormorant-500-italic.woff2'),
]:
    shutil.copy(fs / f, out / d); print(d, (out / d).stat().st_size, 'bytes')
shutil.copy(root / 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', out / 'manrope-var.woff2')
print('manrope-var.woff2', (out / 'manrope-var.woff2').stat().st_size, 'bytes')
