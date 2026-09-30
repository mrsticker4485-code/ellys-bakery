/* Elly's Bakery — offline support + "Install our app" button (Android prompt, iPhone instructions). */
(function () {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("/sw.js").catch(function () {}); });
  }
  var standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone;
  if (standalone) return;
  function ready(fn) { document.readyState !== "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    var btn = document.getElementById("installApp"), hint = document.getElementById("iosHint");
    if (!btn) return;
    var deferred = null;
    window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; btn.hidden = false; });
    window.addEventListener("appinstalled", function () { btn.hidden = true; if (hint) hint.hidden = true; });
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (ios) btn.hidden = false;
    btn.addEventListener("click", function () {
      if (deferred) { deferred.prompt(); deferred.userChoice.finally(function () { deferred = null; btn.hidden = true; }); return; }
      if (hint) hint.hidden = !hint.hidden;
    });
  });
})();
