// BIG4 — локализация «хрома» кабинета (сайдбар, кнопки) без data-i18n на каждом пункте.
// Вызывается движком i18n после каждой смены языка (хук window.BIG4_onApply).
window.BIG4_onApply = function () {
  var L = window.BIG4I18N; if (!L) return;
  var T = L.t;
  // боковое меню — по href / onclick
  document.querySelectorAll(".side nav a").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var oc = a.getAttribute("onclick") || "";
    var key = null;
    if (oc.indexOf("logout") >= 0) key = "cab_logout";
    else if (href.indexOf("dashboard") >= 0) key = "cab_overview";
    else if (href.indexOf("admin.html") >= 0) key = "cab_admin";
    else if (href.indexOf("expert.html") >= 0) key = "cab_review";
    else if (href.indexOf("orders.html") >= 0) key = "cab_orders";
    else if (href.indexOf("new-order") >= 0) key = "cab_new";
    else if (href.indexOf("referral") >= 0) key = "cab_referral";
    else if (href.indexOf("index.html") >= 0) key = "cab_tosite";
    else if (href === "#") key = "cab_profile";
    if (key && a.lastChild && a.lastChild.nodeType === 3) {
      var v = T(key); if (v) a.lastChild.textContent = v;
    }
  });
  // кнопки «Новый отчёт» в шапке
  document.querySelectorAll("[data-cab-new]").forEach(function (b) {
    var v = T("cab_new_btn"); if (v) b.textContent = v;
  });
};
