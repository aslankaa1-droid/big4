// BIG4 — клиент REST API кабинета (КД-03).
// Базовый URL настраивается: localStorage 'big4-api' или дефолт (wrangler dev).
const API_BASE = (localStorage.getItem("big4-api") || "http://localhost:8787/api/v1").replace(/\/$/, "");
const API_ORIGIN = API_BASE.replace(/\/api\/v1$/, "");
function tt(k, d) { return (window.BIG4I18N && window.BIG4I18N.t(k)) || d; }

const Tok = {
  get access() { return localStorage.getItem("big4-access"); },
  get refresh() { return localStorage.getItem("big4-refresh"); },
  set({ access, refresh }) {
    if (access) localStorage.setItem("big4-access", access);
    if (refresh) localStorage.setItem("big4-refresh", refresh);
  },
  clear() { localStorage.removeItem("big4-access"); localStorage.removeItem("big4-refresh"); },
};

class ApiError extends Error {
  constructor(code, message, status) { super(message || code); this.code = code; this.status = status; }
}

async function request(path, { method = "GET", body, auth = true, _retried = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth && Tok.access) headers["Authorization"] = "Bearer " + Tok.access;

  let res;
  try {
    res = await fetch(API_BASE + path, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch (e) {
    throw new ApiError("network", tt("err_network", "Бэкенд недоступен. Проверьте, что сервер запущен (см. backend/README.md)."), 0);
  }

  if (res.status === 401 && auth && !_retried && Tok.refresh) {
    // попытка обновить токен один раз
    try {
      const r = await fetch(API_BASE + "/auth/refresh", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: Tok.refresh }),
      });
      if (r.ok) { const data = await r.json(); Tok.set(data.tokens); return request(path, { method, body, auth, _retried: true }); }
    } catch (_) { /* fallthrough */ }
    Tok.clear();
    throw new ApiError("unauthorized", tt("err_session", "Сессия истекла, войдите снова"), 401);
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new ApiError(data.error?.code || "error", data.error?.message || "Ошибка запроса", res.status);
  return data;
}

const api = {
  // auth
  async register(p) { const d = await request("/auth/register", { method: "POST", body: p, auth: false }); Tok.set(d.tokens); return d; },
  async login(p) { const d = await request("/auth/login", { method: "POST", body: p, auth: false }); Tok.set(d.tokens); return d; },
  logout() { Tok.clear(); localStorage.removeItem("big4-demo"); },
  isAuthed() { return !!Tok.access || localStorage.getItem("big4-demo") === "1"; },
  me() { return request("/me"); },
  // orders
  listOrders() { return request("/orders"); },
  createOrder(p) { return request("/orders", { method: "POST", body: p }); },
  getOrder(id) { return request("/orders/" + id); },
  setModules(id, modules) { return request(`/orders/${id}/modules`, { method: "POST", body: { modules } }); },
  quote(id) { return request(`/orders/${id}/quote`); },
  submit(id) { return request(`/orders/${id}/submit`, { method: "POST" }); },
  pay(id) { return request(`/orders/${id}/pay`, { method: "POST" }); },
  // files
  async createFile(id, meta) { return request(`/orders/${id}/files`, { method: "POST", body: meta }); },
  async uploadFile(orderId, file) {
    const meta = await api.createFile(orderId, { filename: file.name, mime: file.type || "application/octet-stream", size: file.size });
    const res = await fetch(API_ORIGIN + meta.upload_path, {
      method: "PUT", headers: { "Authorization": "Bearer " + Tok.access, "Content-Type": file.type || "application/octet-stream" }, body: file,
    });
    if (!res.ok) throw new ApiError("upload_failed", tt("err_upload", "Не удалось загрузить файл"), res.status);
    return meta;
  },
  // reports & publication
  getReport(id) { return request(`/orders/${id}/report`); },
  publish(id, p) { return request(`/orders/${id}/publish`, { method: "POST", body: p }); },
  // referral & tariffs
  referral() { return request("/referral"); },
  tariffs() { return request("/tariffs", { auth: false }); },
  // expert workspace
  expertQueue() { return request("/expert/queue"); },
  expertOrder(id) { return request("/expert/orders/" + id); },
  expertPatch(reportId, body) { return request("/expert/reports/" + reportId, { method: "PATCH", body }); },
  expertApprove(reportId) { return request("/expert/reports/" + reportId + "/approve", { method: "POST" }); },
  // admin (роль admin) — КД-03 §9
  adminStats() { return request("/admin/stats"); },
  adminUsers(q) { return request("/admin/users" + (q ? "?q=" + encodeURIComponent(q) : "")); },
  adminPatchUser(id, body) { return request("/admin/users/" + id, { method: "PATCH", body }); },
  adminOrders(status) { return request("/admin/orders" + (status ? "?status=" + encodeURIComponent(status) : "")); },
  adminTariffs() { return request("/admin/tariffs"); },
  adminCreateTariff(body) { return request("/admin/tariffs", { method: "POST", body }); },
  adminUpdateTariff(id, body) { return request("/admin/tariffs/" + id, { method: "PATCH", body }); },
  adminDeleteTariff(id) { return request("/admin/tariffs/" + id, { method: "DELETE" }); },
  adminAudit() { return request("/admin/audit"); },
};

// --- ДЕМО-РЕЖИМ (предпросмотр кабинета без бэкенда) ---
// Жёстко отключён на боевом домене big4.info: даже при выставленном флаге демо там не активируется.
// Для локального предпросмотра: localStorage.setItem('big4-demo','1') на localhost.
var BIG4_DEMO_OFF = /(^|\.)big4\.info$/i.test(location.hostname);
if (localStorage.getItem("big4-demo") === "1" && !BIG4_DEMO_OFF) {
  const R = (d) => Promise.resolve(d);
  const ORDERS = [
    { id: "ord_d1", title: "Оценка доли в проекте X", status: "in_review", price: 80, currency: "у.е.", urgency: "standard", created_at: "2026-06-06T10:00:00Z", updated_at: "2026-06-06T12:00:00Z" },
    { id: "ord_d2", title: "DD актива в Оренбурге", status: "processing", price: 120, currency: "у.е.", urgency: "express", created_at: "2026-06-05T09:00:00Z", updated_at: "2026-06-06T08:00:00Z" },
    { id: "ord_d3", title: "Экспертиза финмодели SaaS", status: "ready", price: 30, currency: "у.е.", urgency: "standard", created_at: "2026-06-03T09:00:00Z", updated_at: "2026-06-04T15:00:00Z" },
    { id: "ord_d4", title: "Проверка пакета договоров", status: "published", price: 25, currency: "у.е.", urgency: "standard", created_at: "2026-06-01T09:00:00Z", updated_at: "2026-06-02T10:00:00Z" },
    { id: "ord_d5", title: "Черновик нового заказа", status: "draft", price: 0, currency: "у.е.", urgency: "standard", created_at: "2026-06-06T13:00:00Z", updated_at: "2026-06-06T13:00:00Z" },
  ];
  const STRUCT = JSON.stringify({ modules: [
    { code: "valuation", title: "Оценка бизнеса и проекта", verdict: "good", summary: "Стоимость в диапазоне, допущения реалистичны." },
    { code: "legal", title: "Проверка юридических документов", verdict: "bad", summary: "Найдены асимметричные условия в SPA." },
    { code: "spyware", title: "Скан шпионских включений", verdict: "excellent", summary: "Подозрительных включений не обнаружено." },
  ] });
  const FINDINGS = [
    { module_code: "legal", severity: "high", title: "Асимметричный пункт о расторжении", evidence: "SPA, п. 9.3 — право на расторжение только у покупателя", recommendation: "Сделать условие взаимным; согласовать с продавцом" },
    { module_code: "valuation", severity: "medium", title: "Завышен темп роста выручки", evidence: "Финмодель: рост 80% год к году 3 года подряд", recommendation: "Снизить до 35–40% по отраслевым бенчмаркам" },
  ];
  const REPORT = { id: "rep_d", order_id: "ord_d1", overall_verdict: "good", structure: STRUCT, approved_at: "2026-06-06T12:30:00Z", html_key: "demo", docx_key: "demo", pdf_key: null };
  const MODS = [
    { id: "om1", module_code: "valuation", params: null, status: "done" },
    { id: "om2", module_code: "legal", params: null, status: "done" },
    { id: "om3", module_code: "spyware", params: null, status: "done" },
    { id: "om4", module_code: "roadmap", params: null, status: "processing" },
  ];
  const FILES = [
    { id: "f1", filename: "Финмодель_проект_X.xlsx", mime: "x", size: 348160, kind: "input", scan_status: "clean" },
    { id: "f2", filename: "SPA_проект_X.docx", mime: "x", size: 90112, kind: "input", scan_status: "clean" },
  ];
  Object.assign(api, {
    me() { return R({ user: { id: "usr_demo", role: "admin", email: "demo@big4.example", name: "ООО «Ромашка» (демо)", referral_code: "BIG4-DEMO" } }); },
    listOrders() { return R({ items: ORDERS, total: ORDERS.length }); },
    createOrder() { return R({ id: "ord_new", status: "draft" }); },
    getOrder() { return R({ order: ORDERS[0], modules: MODS, files: FILES, report: { id: REPORT.id, overall_verdict: REPORT.overall_verdict, approved_at: REPORT.approved_at, docx_key: REPORT.docx_key, pdf_key: null, html_key: REPORT.html_key } }); },
    setModules() { return R({ ok: true, count: 3 }); },
    quote() { return R({ currency: "у.е.", items: [], subtotal: 80, urgency_surcharge: 0, referral_discount: 0, total: 80 }); },
    submit() { return R({ status: "awaiting_payment", total: 80 }); },
    pay() { return R({ status: "queued" }); },
    createFile() { return R({ fileId: "f_demo", upload_path: "#" }); },
    uploadFile() { return R({ fileId: "f_demo" }); },
    getReport() { return R({ report: REPORT, findings: FINDINGS }); },
    publish(id, p) { return R({ slug: "demo-otchet", url: "https://big4.example/public/demo-otchet", mode: (p && p.mode) || "private" }); },
    referral() { return R({ code: "BIG4-DEMO", link: "https://big4.example/r/BIG4-DEMO", bonus_balance: 12400, events: [
      { event: "first_paid_order", referred_user_id: "u1", reward: 8000, created_at: "2026-06-04T10:00:00Z" },
      { event: "first_paid_order", referred_user_id: "u2", reward: 4400, created_at: "2026-05-30T10:00:00Z" },
      { event: "signup", referred_user_id: "u3", reward: 0, created_at: "2026-05-27T10:00:00Z" },
    ] }); },
    expertQueue() { return R({ items: ORDERS.filter((o) => o.status === "in_review" || o.status === "processing"), total: 2 }); },
    expertOrder() { return R({ order: ORDERS[0], report: REPORT, findings: FINDINGS, moduleResults: [
      { module_code: "valuation", verdict: "good", summary: "Стоимость в диапазоне, допущения реалистичны.", scenario_ref: "valuation@v1" },
      { module_code: "legal", verdict: "bad", summary: "Найдены асимметричные условия в SPA.", scenario_ref: "legal@v1" },
      { module_code: "spyware", verdict: "excellent", summary: "Чисто.", scenario_ref: "spyware@static-v1" },
    ], files: FILES }); },
    expertPatch() { return R({ ok: true }); },
    expertApprove() { return R({ ok: true, status: "ready" }); },
  });

  // --- демо-данные админки ---
  const USERS = [
    { id: "usr_demo", role: "admin", email: "demo@big4.example", name: "ООО «Ромашка» (демо)", status: "active", referral_code: "BIG4-DEMO", created_at: "2026-05-20T10:00:00Z" },
    { id: "usr_e1", role: "expert", email: "expert@big4.example", name: "Эксперт BIG4", status: "active", referral_code: "BIG4-EXP1", created_at: "2026-05-22T10:00:00Z" },
    { id: "usr_c1", role: "client", email: "ivan@example.com", name: "Иван Петров", status: "active", referral_code: "BIG4-7F3A", created_at: "2026-06-01T10:00:00Z" },
    { id: "usr_c2", role: "client", email: "fund@example.com", name: "Фонд «Капитал»", status: "active", referral_code: "BIG4-K2M9", created_at: "2026-06-03T10:00:00Z" },
    { id: "usr_c3", role: "partner", email: "broker@example.com", name: "Брокер-консалтинг", status: "active", referral_code: "BIG4-BRK1", created_at: "2026-06-04T10:00:00Z" },
    { id: "usr_c4", role: "client", email: "spam@example.com", name: "Заблокированный", status: "blocked", referral_code: "BIG4-BAD0", created_at: "2026-06-05T10:00:00Z" },
  ];
  const TARIFFS = [
    { id: "tar_single", code: "single", title: "Разовый отчёт", pricing_rule: '{"base":0,"per_module":true,"express_surcharge":0.4}', active: 1 },
    { id: "tar_deal", code: "deal_dd", title: "Сделка / Due Diligence", pricing_rule: '{"base":0,"per_module":true,"express_surcharge":0.3,"includes":["spyware"]}', active: 1 },
    { id: "tar_sub", code: "subscription", title: "Подписка", pricing_rule: '{"period":"month","priority":true}', active: 1 },
  ];
  const AUDIT = [
    { id: "aud1", actor_id: "usr_c1", actor_email: "ivan@example.com", action: "publish", entity: "report", entity_id: "rep_d", meta: '{"mode":"private"}', created_at: "2026-06-06T12:40:00Z" },
    { id: "aud2", actor_id: "usr_e1", actor_email: "expert@big4.example", action: "approve_report", entity: "report", entity_id: "rep_d", meta: '{"order_id":"ord_d1"}', created_at: "2026-06-06T12:30:00Z" },
    { id: "aud3", actor_id: "usr_c1", actor_email: "ivan@example.com", action: "pay_order", entity: "order", entity_id: "ord_d1", meta: '{"amount":80}', created_at: "2026-06-06T10:05:00Z" },
    { id: "aud4", actor_id: "usr_c1", actor_email: "ivan@example.com", action: "create_order", entity: "order", entity_id: "ord_d1", meta: "{}", created_at: "2026-06-06T10:00:00Z" },
  ];
  Object.assign(api, {
    adminStats() { return R({ users: USERS.length, orders: ORDERS.length, orders_by_status: [{ status: "draft", c: 1 }, { status: "processing", c: 1 }, { status: "in_review", c: 1 }, { status: "ready", c: 1 }, { status: "published", c: 1 }], revenue: 255, in_review: 1, experts: 2 }); },
    adminUsers(q) { var list = USERS; if (q) { var s = String(q).toLowerCase(); list = USERS.filter(function (u) { return (u.email + " " + (u.name || "")).toLowerCase().indexOf(s) >= 0; }); } return R({ items: list, total: list.length }); },
    adminPatchUser() { return R({ ok: true }); },
    adminOrders(status) { var list = ORDERS.map(function (o) { return Object.assign({ client_email: "ivan@example.com" }, o); }); if (status) list = list.filter(function (o) { return o.status === status; }); return R({ items: list, total: list.length }); },
    adminTariffs() { return R({ items: TARIFFS }); },
    adminCreateTariff() { return R({ id: "tar_new" }); },
    adminUpdateTariff() { return R({ ok: true }); },
    adminDeleteTariff() { return R({ ok: true }); },
    adminAudit() { return R({ items: AUDIT, total: AUDIT.length }); },
  });
}

// --- общие UI-хелперы кабинета ---
function requireAuth() {
  if (!api.isAuthed()) { location.href = "login.html"; return false; }
  return true;
}
function toast(msg, kind = "info") {
  let t = document.getElementById("big4-toast");
  if (!t) {
    t = document.createElement("div"); t.id = "big4-toast";
    t.style.cssText = "position:fixed;right:24px;bottom:24px;z-index:9999;max-width:360px;padding:14px 18px;border-radius:12px;" +
      "font-family:var(--sans),sans-serif;font-size:.9rem;box-shadow:0 20px 50px -20px rgba(0,0,0,.5);transition:opacity .3s";
    document.body.appendChild(t);
  }
  t.style.background = kind === "error" ? "#D45B53" : "var(--surface,#19211F)";
  t.style.color = kind === "error" ? "#fff" : "var(--ink,#ECECE4)";
  t.style.border = "1px solid var(--line,rgba(201,168,106,.2))";
  t.textContent = msg; t.style.opacity = "1";
  clearTimeout(t._h); t._h = setTimeout(() => { t.style.opacity = "0"; }, 4000);
}
function logout() { api.logout(); location.href = "login.html"; }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

// статус заказа → бейдж
const STATUS = {
  draft: ["s-draft", "Черновик"], awaiting_payment: ["s-wait", "Ожидает оплаты"],
  queued: ["s-proc", "В очереди"], processing: ["s-proc", "В работе"],
  in_review: ["s-review", "На проверке"], ready: ["s-ready", "Готов"],
  published: ["s-pub", "Опубликован"], cancelled: ["s-draft", "Отменён"], failed: ["s-wait", "Сбой"],
};
function statusBadge(st) {
  const c = (STATUS[st] || ["s-draft"])[0];
  const fb = (STATUS[st] || ["s-draft", st])[1];
  const L = window.BIG4I18N;
  const lbl = (L && L.t("status_" + st)) || fb;
  return `<span class="badge ${c}"><span class="d"></span>${esc(lbl)}</span>`;
}
