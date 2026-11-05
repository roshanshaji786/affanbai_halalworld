// Small, dependency-free UI behaviour shared by every page.
const header = document.querySelector<HTMLElement>('[data-header]');
const bar = document.querySelector<HTMLElement>('[data-action-bar]');
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');

const mobile = matchMedia('(max-width: 959px)');
let ticking = false;
function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('is-solid', y > 40);
  bar?.classList.toggle('is-on', y > (mobile.matches ? 80 : window.innerHeight * 0.55));
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

menuBtn?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('[data-menu] a').forEach((a) => a.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  document.body.style.overflow = '';
}));

// Reveal on scroll
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io!.unobserve(e.target); }
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));

// Enquiry form: builds a WhatsApp message, no server needed.
document.querySelectorAll<HTMLFormElement>('form[data-enquiry]').forEach((form) => {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const f = new FormData(form);
    const v = (k: string) => String(f.get(k) ?? '').trim();
    const lines = [
      'Assalamu alaikum, I would like an Umrah quote.',
      v('name') && `Name: ${v('name')}`,
      v('package') && `Package: ${v('package')}`,
      v('month') && `Travel month: ${v('month')}`,
      `Travellers: ${v('adults') || 1} adult(s)${Number(v('children')) ? `, ${v('children')} child(ren)` : ''}${Number(v('elders')) ? `, ${v('elders')} elder(s) needing help` : ''}`,
      v('from') && `Flying from: ${v('from')}`,
      v('note') && `Note: ${v('note')}`,
    ].filter(Boolean);
    const url = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  });
});

// Keep the travel-month list current even if the site has not been rebuilt for a while.
document.querySelectorAll<HTMLSelectElement>('select[data-months]').forEach((sel) => {
  const opts: string[] = [];
  const d = new Date(); d.setDate(1);
  for (let i = 0; i < 12; i++) { opts.push(d.toLocaleString('en-IN', { month: 'long', year: 'numeric' })); d.setMonth(d.getMonth() + 1); }
  sel.replaceChildren(...[...opts, 'Flexible'].map((t) => new Option(t, t)));
});
