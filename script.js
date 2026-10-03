const routes = Array.from(document.querySelectorAll('[data-route]'));
const navLinks = Array.from(document.querySelectorAll('[data-route-link]'));

function routeFromHash() {
  const value = window.location.hash.replace('#', '').trim();
  return routes.some((section) => section.dataset.route === value) ? value : 'welcome';
}

function showRoute(routeName, shouldScroll = true) {
  routes.forEach((section) => {
    section.classList.toggle('is-active', section.dataset.route === routeName);
  });

  navLinks.forEach((link) => {
    const isActive = link.dataset.routeLink === routeName;
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  document.body.dataset.route = routeName;

  if (shouldScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const routeName = link.dataset.routeLink;
    if (!routeName) return;
    event.preventDefault();
    if (window.location.hash !== `#${routeName}`) {
      window.location.hash = routeName;
    } else {
      showRoute(routeName);
    }
  });
});

window.addEventListener('hashchange', () => showRoute(routeFromHash()));

document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panel = trigger.nextElementSibling;
    const isOpen = trigger.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
    if (panel) panel.classList.toggle('is-open', isOpen);
  });
  trigger.setAttribute('aria-expanded', 'false');
});

showRoute(routeFromHash(), false);
