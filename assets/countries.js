// BIG4 — реестр стран и юрисдикций.
// mode: 'ru' = российский формат (только РФ) | 'intl' = международный формат (весь остальной мир).
// lang: язык интерфейса по умолчанию для страны (из 4: ru/en/fr/ar). Пользователь может сменить вручную.
// status: 'open' = доступно | 'blocked' = недоступно (санкции/ограничения).

window.BIG4_COUNTRIES = [
  { code: "RU", flag: "🇷🇺", name: "Россия", lang: "ru", mode: "ru" },
  { code: "BY", flag: "🇧🇾", name: "Беларусь", lang: "ru", mode: "intl" },
  { code: "KZ", flag: "🇰🇿", name: "Казахстан", lang: "ru", mode: "intl" },
  { code: "KG", flag: "🇰🇬", name: "Кыргызстан", lang: "ru", mode: "intl" },
  { code: "AM", flag: "🇦🇲", name: "Армения", lang: "ru", mode: "intl" },
  { code: "AE", flag: "🇦🇪", name: "United Arab Emirates", lang: "ar", mode: "intl" },
  { code: "SA", flag: "🇸🇦", name: "Saudi Arabia", lang: "ar", mode: "intl" },
  { code: "QA", flag: "🇶🇦", name: "Qatar", lang: "ar", mode: "intl" },
  { code: "KW", flag: "🇰🇼", name: "Kuwait", lang: "ar", mode: "intl" },
  { code: "BH", flag: "🇧🇭", name: "Bahrain", lang: "ar", mode: "intl" },
  { code: "OM", flag: "🇴🇲", name: "Oman", lang: "ar", mode: "intl" },
  { code: "EG", flag: "🇪🇬", name: "Egypt", lang: "ar", mode: "intl" },
  { code: "MA", flag: "🇲🇦", name: "Maroc", lang: "ar", mode: "intl" },
  { code: "DZ", flag: "🇩🇿", name: "Algérie", lang: "ar", mode: "intl" },
  { code: "FR", flag: "🇫🇷", name: "France", lang: "fr", mode: "intl" },
  { code: "BE", flag: "🇧🇪", name: "Belgique", lang: "fr", mode: "intl" },
  { code: "CH", flag: "🇨🇭", name: "Suisse", lang: "fr", mode: "intl" },
  { code: "LU", flag: "🇱🇺", name: "Luxembourg", lang: "fr", mode: "intl" },
  { code: "SN", flag: "🇸🇳", name: "Sénégal", lang: "fr", mode: "intl" },
  { code: "CI", flag: "🇨🇮", name: "Côte d'Ivoire", lang: "fr", mode: "intl" },
  { code: "US", flag: "🇺🇸", name: "United States", lang: "en", mode: "intl" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom", lang: "en", mode: "intl" },
  { code: "CA", flag: "🇨🇦", name: "Canada", lang: "en", mode: "intl" },
  { code: "DE", flag: "🇩🇪", name: "Germany", lang: "en", mode: "intl" },
  { code: "ES", flag: "🇪🇸", name: "España", lang: "en", mode: "intl" },
  { code: "IT", flag: "🇮🇹", name: "Italia", lang: "en", mode: "intl" },
  { code: "NL", flag: "🇳🇱", name: "Netherlands", lang: "en", mode: "intl" },
  { code: "TR", flag: "🇹🇷", name: "Türkiye", lang: "en", mode: "intl" },
  { code: "CN", flag: "🇨🇳", name: "China", lang: "en", mode: "intl" },
  { code: "IN", flag: "🇮🇳", name: "India", lang: "en", mode: "intl" },
  { code: "SG", flag: "🇸🇬", name: "Singapore", lang: "en", mode: "intl" },
  { code: "BR", flag: "🇧🇷", name: "Brasil", lang: "en", mode: "intl" },
  { code: "ZA", flag: "🇿🇦", name: "South Africa", lang: "en", mode: "intl" },
  { code: "OTHER", flag: "🌍", name: "Другая страна / Other country", lang: "en", mode: "intl" },
];

// Найти страну по коду; вернуть запись или fallback (международный режим, EN).
window.BIG4_resolveCountry = function (code) {
  var list = window.BIG4_COUNTRIES;
  for (var i = 0; i < list.length; i++) if (list[i].code === code) return list[i];
  return { code: "OTHER", flag: "🌍", name: "Other", lang: "en", mode: "intl" };
};
