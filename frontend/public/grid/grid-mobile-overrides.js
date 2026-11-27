/*
 * Mobile layout helper for the grid app. See grid-mobile-overrides.css.
 * The overlays are created by the main bundle after startup, so wait for them
 * and then MOVE (not clone) them into #map-top-stack so their listeners survive.
 * Port into power-grid-command-center on the next bundle sync.
 */
(function () {
  var IDS = ['location-search', 'fuel-filter-bar', 'site-assessment-toolbar'];

  function wrap() {
    var container = document.getElementById('cesium-container');
    if (!container || document.getElementById('map-top-stack')) return !!document.getElementById('map-top-stack');
    var nodes = IDS.map(function (id) { return document.getElementById(id); });
    if (nodes.some(function (n) { return !n; })) return false;
    var stack = document.createElement('div');
    stack.id = 'map-top-stack';
    container.appendChild(stack);
    nodes.forEach(function (n) { stack.appendChild(n); });
    return true;
  }

  if (wrap()) return;
  var observer = new MutationObserver(function () {
    if (wrap()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  // Safety net: stop observing after 60s.
  setTimeout(function () { observer.disconnect(); }, 60000);
})();
