/**
 * Lightweight hash-based SPA router for Boumiza Square
 */

const routes = {};
let currentRoute = null;

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

export function navigateTo(path) {
  window.location.hash = path;
}

export function initRouter(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  function handleRoute() {
    const fullHash = window.location.hash.slice(1) || '/';
    const hash = fullHash.split('?')[0]; // Ignore query params for now
    
    let renderFn = routes[hash];
    let params = {};

    // Check for dynamic routes if no direct match
    if (!renderFn) {
      for (const path in routes) {
        if (path.includes(':')) {
          const pathParts = path.split('/');
          const hashParts = hash.split('/');
          
          if (pathParts.length === hashParts.length) {
            let match = true;
            let tempParams = {};
            
            for (let i = 0; i < pathParts.length; i++) {
              if (pathParts[i].startsWith(':')) {
                const paramName = pathParts[i].slice(1);
                tempParams[paramName] = hashParts[i];
              } else if (pathParts[i] !== hashParts[i]) {
                match = false;
                break;
              }
            }
            
            if (match) {
              renderFn = routes[path];
              params = tempParams;
              break;
            }
          }
        }
      }
    }

    // Default to home if still no match
    if (!renderFn) {
      renderFn = routes['/'];
    }

    if (currentRoute === fullHash) return;
    currentRoute = fullHash;

    // Fade out
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
      container.innerHTML = '';
      if (renderFn) renderFn(container, params);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Fade in
      requestAnimationFrame(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      });

      // Re-trigger scroll reveals
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        el.classList.remove('visible');
      });
      setTimeout(() => {
        document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            el.classList.add('visible');
          }
        });
      }, 100);

      // Dispatch custom event for page-specific init
      window.dispatchEvent(new CustomEvent('routechange', { detail: { route: hash } }));
    }, 250);
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
