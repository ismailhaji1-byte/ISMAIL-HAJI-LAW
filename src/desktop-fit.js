// Native phones use the 1280px viewport. Also fit narrow desktop preview windows.
(() => {
  const fit = () => {
    const width = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--desktop-scale', String(Math.min(1, width / 1280)));
  };
  fit();
  window.addEventListener('resize', fit);
})();
