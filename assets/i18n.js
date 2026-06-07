// BIG4 — движок интернационализации (4 языка: ru/en/fr/ar + RTL).
// Использование: data-i18n="ключ" (текст), data-i18n-html="ключ" (innerHTML).
// Выбор страны (как в ecg-reader) задаёт язык и формат услуги (ru | intl).

(function () {
  var DICT = {
    ru: {
      nav_services: "Услуги", nav_how: "Описание", nav_standard: "Стандарт", nav_referral: "Партнёрам", nav_pricing: "Тарифы",
      cta_login: "Войти", cta_cabinet: "Личный кабинет",
      hero_kicker: "Международная платформа сводных отчётов",
      hero_h1a: "Независимый ", hero_h1em: "аудитор", hero_h1b: " уровня Большой Четвёрки",
      hero_lede: "Загрузите материалы — мы вернём честный сводный отчёт: аудит, оценка бизнеса и интеллектуальной собственности, финмодель, проверка документов, скан шпионских включений и дорожная карта исправлений. В Word, PDF и с публикацией на нашем домене.",
      hero_cta1: "Заказать сводный отчёт", hero_cta2: "Как это работает",
      metric_modules: "модулей отчёта", metric_experts: "экспертов в панели", metric_scale: "шкала вердикта", metric_formats: "форматы выдачи",
      jur_ru: "Для России: услуги оказывает ООО «Группа Компаний Центр» по праву Российской Федерации.",
      jur_intl: "Международный формат: единый честный стандарт экспертизы по применимому праву вашей юрисдикции через договорную структуру.",
      s1_title: "Сводный отчёт по любому проекту", s1_sub: "Один заказ — один или несколько модулей. Каждый отчёт проходит единый стандарт честности и завершается дорожной картой исправлений.",
      svc_expertise_t: "Полная честная экспертиза", svc_expertise_d: "Универсальный независимый аудит любого проекта с вердиктом и дорожной картой. Без комплиментов в ущерб правде.", svc_expertise_tag: "Любая отрасль",
      svc_valuation_t: "Оценка бизнеса и проекта", svc_valuation_d: "Стоимость, методы, диапазон и обоснование. Триангуляция подходов, защищаемая перед внешним аудитором.", svc_valuation_tag: "Оценка",
      svc_ip_t: "Оценка интеллектуальной собственности", svc_ip_d: "Стоимость и защищённость ИС, патентов и ноу-хау. Риски правовой охраны и капитализация нематериальных активов.", svc_ip_tag: "ИС",
      svc_finmodel_t: "Финмодель и бизнес-план", svc_finmodel_d: "Проверка и построение финансовой модели, юнит-экономики, сценариев. Поиск разрывов и нереалистичных допущений.", svc_finmodel_tag: "Финансы",
      svc_ma_t: "Инвест-сделка и M&A", svc_ma_d: "Due diligence под сделку, справедливая цена, структура риска для покупателя и продавца доли.", svc_ma_tag: "M&A",
      svc_legal_t: "Проверка юридических документов", svc_legal_d: "Договоры, NDA, SPA, SHA, корпоративные соглашения. Ошибки, риски, несоответствия и кабальные условия.", svc_legal_tag: "Право",
      svc_compliance_t: "Соответствие законодательству", svc_compliance_d: "Комплаенс и нормативная база отрасли и юрисдикции. Флаги нарушений и регуляторных рисков.", svc_compliance_tag: "Комплаенс",
      svc_spyware_t: "Скан шпионских включений", svc_spyware_d: "Трекеры, скрытые макросы, фишинг-ссылки, утечка метаданных, beacon-пиксели и вредоносные вложения в ваших файлах.", svc_spyware_tag: "Безопасность · уникально",
      svc_industry_t: "Отраслевой аудит", svc_industry_d: "Нефтегаз, IT/AI/SaaS, АПК, FMCG, промоборудование, недвижимость, медицина, R&D — профильная панель под отрасль.", svc_industry_tag: "8 отраслей",
      svc_roadmap_t: "Дорожная карта исправлений", svc_roadmap_d: "Что, как, кем, за сколько и когда устранить выявленное. Конкретные шаги, а не общие слова.", svc_roadmap_tag: "Встроено везде",
      s2_title: "Четыре шага до отчёта", s2_sub: "AI-агенты делают глубокую работу, эксперт ставит подпись. Человек в петле — выше доверие и юридический вес.",
      step1_t: "Загрузка", step1_d: "В личном кабинете загружаете материалы и выбираете модули отчёта. Шифрование, материалы не уходят в обучение публичных моделей.",
      step2_t: "AI-панель", step2_d: "Панель AI-экспертов проводит аудит по единому стандарту честности, прогоняет адвоката дьявола и кросс-верификацию.",
      step3_t: "Финализация", step3_d: "Эксперт BIG4 проверяет и заверяет отчёт. Каждый вывод трассируется к исходному документу.",
      step4_t: "Публикация", step4_d: "Получаете Word, PDF и HTML. По желанию публикуем на домене BIG4 — открыто или под паролем.",
      s3_title: "Честность как методология", s3_sub: "Каждый отчёт проходит один и тот же путь. Это и есть наш конкурентный ров — не маркетинг, а воспроизводимая процедура.",
      flow1: "Классификация: отрасль, стадия, бюджет, юрисдикция", flow2: "Панель экспертов 5–12 ролей под отрасль", flow3: "Железное правило честности — без комплиментов", flow4: "Адвокат дьявола: минимум 10 сценариев провала", flow5: "Кросс-верификация независимым аудитором", flow6: "Вердикт по строгой шкале", flow7: "Дорожная карта исправлений", flow8: "Защита экспертизы перед внешним аудитором",
      verdict_ex: "Отлично", verdict_gd: "Хорошо", verdict_bd: "Совсем плохо", verdict_ft: "Нельзя применить", verdict_scale: "Шкала вердикта",
      s4_title: "Ваш отчёт — на домене BIG4", s4_sub: "Готовый сводный отчёт публикуется как страница: открытая витрина проекта или приватный доступ под паролем. На условиях, которые выбираете вы.",
      pub_open_badge: "Открытая страница", pub_open_t: "Витрина проекта", pub_open_d: "Публичная HTML-страница отчёта — показать инвесторам, партнёрам, рынку. Доказательство, что проект прошёл независимый аудит BIG4.",
      pub_priv_badge: "Приватный доступ", pub_priv_t: "Запароленный отчёт", pub_priv_d: "Доступ только по PIN-коду или паролю, сессия с ограниченным сроком. Для конфиденциальных сделок и закрытого круга получателей.",
      s5_title: "Реферальная программа", s5_sub: "Приводите партнёров — получаете скидки и бонусы. Чем шире ваша сеть, тем выгоднее каждый следующий отчёт.",
      ref1_t: "Вам — за каждого", ref1_d: "Накопительная скидка и бонусные кредиты за каждого приведённого клиента. Растущий статус — растущая выгода.",
      ref2_t: "Партнёру — приветствие", ref2_d: "Приглашённый получает скидку на первый сводный отчёт. Обоюдная выгода с первого касания.",
      ref3_t: "B2B-программа", ref3_d: "Консультанты, юристы и брокеры приводят клиентов и получают процент или бонусные кредиты на отчёты.",
      s6_title: "Форматы сотрудничества", s6_sub: "Точные цены зависят от объёма материалов и набора модулей. Ниже — модель работы; финальную смету готовим под ваш запрос.",
      tier1_n: "Разовый отчёт", tier1_p: "По запросу", tier1_d: "Один проект, нужный набор модулей", tier1_f1: "Выбор модулей под задачу", tier1_f2: "Полный сводный отчёт с вердиктом", tier1_f3: "Word + PDF + HTML", tier1_f4: "Дорожная карта исправлений", tier1_btn: "Запросить смету",
      tier2_n: "Сделка / DD", tier2_p: "По запросу", tier2_d: "Полная проверка под сделку или раунд", tier2_f1: "Все модули аудита и оценки", tier2_f2: "Скан шпионских включений", tier2_f3: "Публикация: открыто или под паролем", tier2_f4: "Ускоренная финализация", tier2_f5: "Защита перед внешним аудитором", tier2_btn: "Обсудить сделку",
      tier3_n: "Подписка", tier3_p: "По запросу", tier3_d: "Для фондов, юрфирм и регулярных заказов", tier3_f1: "Пакет отчётов на период", tier3_f2: "Приоритетная очередь", tier3_f3: "Личный менеджер", tier3_f4: "Условия реферальной программы", tier3_btn: "Запросить условия",
      final_h: "Готовы к честному вердикту?", final_p: "Опишите задачу и приложите материалы — вернёмся со сметой и сроком. Конфиденциальность гарантирована.", final_btn: "Написать на e-mail",
      final_disc: "BIG4 — система независимой AI-ассистированной экспертизы. Сводный отчёт носит консультационный характер и заверяется экспертом; он не заменяет обязательный аудит, оценку или юридическое заключение, проводимые аттестованными специалистами в случаях, предусмотренных законодательством. Сайт не использует формы сбора персональных данных и трекеры; связь — по указанным контактам.",
      foot_tagline: "Международная платформа сводных отчётов", foot_op: "ООО «Группа Компаний Центр» · 2026",
      cta_catalog: "Каталог отчётов",
      modal_title: "Выберите вашу страну", modal_sub: "Сайт откроется на языке вашей страны. Формат услуги — российский для РФ, международный для остального мира.", modal_search: "Поиск страны…",
    },

    en: {
      nav_services: "Services", nav_how: "Description", nav_standard: "Standard", nav_referral: "Partners", nav_pricing: "Pricing",
      cta_login: "Sign in", cta_cabinet: "Client area",
      hero_kicker: "International platform for consolidated reports",
      hero_h1a: "An independent ", hero_h1em: "auditor", hero_h1b: " of Big Four calibre",
      hero_lede: "Upload your materials and receive an honest consolidated report: audit, business and IP valuation, financial model, document review, spyware-inclusion scan and a remediation roadmap. In Word, PDF and published on our domain.",
      hero_cta1: "Order a report", hero_cta2: "How it works",
      metric_modules: "report modules", metric_experts: "experts on the panel", metric_scale: "verdict scale", metric_formats: "output formats",
      jur_ru: "For Russia: services are provided by LLC “Center Group Company” under the law of the Russian Federation.",
      jur_intl: "International format: a single honest standard of expertise under the applicable law of your jurisdiction, via a contractual structure.",
      s1_title: "A consolidated report on any project", s1_sub: "One order — one or several modules. Every report follows a single honesty standard and ends with a remediation roadmap.",
      svc_expertise_t: "Full honest expertise", svc_expertise_d: "Universal independent audit of any project with a verdict and a roadmap. No compliments at the expense of the truth.", svc_expertise_tag: "Any industry",
      svc_valuation_t: "Business & project valuation", svc_valuation_d: "Value, methods, range and rationale. Triangulation of approaches, defensible before an external auditor.", svc_valuation_tag: "Valuation",
      svc_ip_t: "Intellectual property valuation", svc_ip_d: "Value and protection of IP, patents and know-how. Legal-protection risks and capitalisation of intangible assets.", svc_ip_tag: "IP",
      svc_finmodel_t: "Financial model & business plan", svc_finmodel_d: "Review and build of the financial model, unit economics, scenarios. Finding gaps and unrealistic assumptions.", svc_finmodel_tag: "Finance",
      svc_ma_t: "Investment deal & M&A", svc_ma_d: "Deal due diligence, fair price, risk structure for the buyer and seller of a stake.", svc_ma_tag: "M&A",
      svc_legal_t: "Legal document review", svc_legal_d: "Contracts, NDA, SPA, SHA, corporate agreements. Errors, risks, inconsistencies and onerous terms.", svc_legal_tag: "Legal",
      svc_compliance_t: "Regulatory compliance", svc_compliance_d: "Compliance and the regulatory base of the industry and jurisdiction. Flags of violations and regulatory risks.", svc_compliance_tag: "Compliance",
      svc_spyware_t: "Spyware-inclusion scan", svc_spyware_d: "Trackers, hidden macros, phishing links, metadata leakage, beacon pixels and malicious attachments in your files.", svc_spyware_tag: "Security · unique",
      svc_industry_t: "Industry audit", svc_industry_d: "Oil & gas, IT/AI/SaaS, agriculture, FMCG, industrial equipment, real estate, medicine, R&D — a panel tailored to the industry.", svc_industry_tag: "8 industries",
      svc_roadmap_t: "Remediation roadmap", svc_roadmap_d: "What, how, by whom, at what cost and when to fix what was found. Concrete steps, not vague words.", svc_roadmap_tag: "Built into every report",
      s2_title: "Four steps to a report", s2_sub: "AI agents do the deep work, an expert signs off. Human in the loop — higher trust and legal weight.",
      step1_t: "Upload", step1_d: "In the client area you upload materials and pick report modules. Encrypted; materials are not used to train public models.",
      step2_t: "AI panel", step2_d: "A panel of AI experts audits to a single honesty standard, runs a devil's advocate and cross-verification.",
      step3_t: "Finalisation", step3_d: "A BIG4 expert reviews and certifies the report. Every conclusion is traced to the source document.",
      step4_t: "Publication", step4_d: "You receive Word, PDF and HTML. Optionally we publish on the BIG4 domain — open or password-protected.",
      s3_title: "Honesty as a methodology", s3_sub: "Every report follows the same path. That is our moat — not marketing, but a reproducible procedure.",
      flow1: "Classification: industry, stage, budget, jurisdiction", flow2: "Expert panel of 5–12 roles for the industry", flow3: "Iron rule of honesty — no compliments", flow4: "Devil's advocate: at least 10 failure scenarios", flow5: "Cross-verification by an independent auditor", flow6: "Verdict on a strict scale", flow7: "Remediation roadmap", flow8: "Defending the expertise before an external auditor",
      verdict_ex: "Excellent", verdict_gd: "Good", verdict_bd: "Poor", verdict_ft: "Not applicable", verdict_scale: "Verdict scale",
      s4_title: "Your report — on the BIG4 domain", s4_sub: "The finished report is published as a page: an open project showcase or private password access. On the terms you choose.",
      pub_open_badge: "Open page", pub_open_t: "Project showcase", pub_open_d: "A public HTML report page — to show investors, partners, the market. Proof the project passed an independent BIG4 audit.",
      pub_priv_badge: "Private access", pub_priv_t: "Password-protected report", pub_priv_d: "Access by PIN or password only, time-limited session. For confidential deals and a closed circle of recipients.",
      s5_title: "Referral program", s5_sub: "Bring partners — get discounts and bonuses. The wider your network, the better each next report.",
      ref1_t: "For you — per referral", ref1_d: "Cumulative discount and bonus credits for every client you bring. Growing status — growing benefit.",
      ref2_t: "For the partner — a welcome", ref2_d: "The invited party gets a discount on the first report. Mutual benefit from the first touch.",
      ref3_t: "B2B program", ref3_d: "Consultants, lawyers and brokers bring clients and earn a percentage or bonus credits for reports.",
      s6_title: "Engagement formats", s6_sub: "Exact prices depend on the volume of materials and the set of modules. Below is the working model; the final quote is prepared for your request.",
      tier1_n: "Single report", tier1_p: "On request", tier1_d: "One project, the required set of modules", tier1_f1: "Module selection for the task", tier1_f2: "Full report with a verdict", tier1_f3: "Word + PDF + HTML", tier1_f4: "Remediation roadmap", tier1_btn: "Request a quote",
      tier2_n: "Deal / DD", tier2_p: "On request", tier2_d: "Full review for a deal or a round", tier2_f1: "All audit and valuation modules", tier2_f2: "Spyware-inclusion scan", tier2_f3: "Publication: open or password-protected", tier2_f4: "Expedited finalisation", tier2_f5: "Defence before an external auditor", tier2_btn: "Discuss the deal",
      tier3_n: "Subscription", tier3_p: "On request", tier3_d: "For funds, law firms and regular orders", tier3_f1: "A package of reports for a period", tier3_f2: "Priority queue", tier3_f3: "Personal manager", tier3_f4: "Referral program terms", tier3_btn: "Request terms",
      final_h: "Ready for an honest verdict?", final_p: "Describe the task and attach materials — we'll come back with a quote and a timeline. Confidentiality guaranteed.", final_btn: "Email us",
      final_disc: "BIG4 is a system of independent AI-assisted expertise. The consolidated report is advisory and is certified by an expert; it does not replace a mandatory audit, valuation or legal opinion performed by certified specialists where required by law. The site uses no personal-data forms or trackers; contact via the channels provided.",
      foot_tagline: "International platform for consolidated reports", foot_op: "LLC “Center Group Company” · 2026",
      cta_catalog: "Report catalogue",
      modal_title: "Choose your country", modal_sub: "The site will open in your country's language. Service format: Russian for the RF, international for the rest of the world.", modal_search: "Search country…",
    },

    fr: {
      nav_services: "Services", nav_how: "Description", nav_standard: "Standard", nav_referral: "Partenaires", nav_pricing: "Tarifs",
      cta_login: "Se connecter", cta_cabinet: "Espace client",
      hero_kicker: "Plateforme internationale de rapports consolidés",
      hero_h1a: "Un ", hero_h1em: "auditeur", hero_h1b: " indépendant de calibre Big Four",
      hero_lede: "Téléchargez vos documents et recevez un rapport consolidé honnête : audit, évaluation d'entreprise et de PI, modèle financier, examen de documents, scan d'inclusions espionnes et feuille de route de correction. En Word, PDF et publié sur notre domaine.",
      hero_cta1: "Commander un rapport", hero_cta2: "Comment ça marche",
      metric_modules: "modules de rapport", metric_experts: "experts du panel", metric_scale: "échelle de verdict", metric_formats: "formats de sortie",
      jur_ru: "Pour la Russie : services fournis par la SARL « Center Group Company » selon le droit de la Fédération de Russie.",
      jur_intl: "Format international : un standard d'expertise honnête et unique selon le droit applicable de votre juridiction, via une structure contractuelle.",
      s1_title: "Un rapport consolidé sur tout projet", s1_sub: "Une commande — un ou plusieurs modules. Chaque rapport suit un standard d'honnêteté unique et se termine par une feuille de route de correction.",
      svc_expertise_t: "Expertise honnête complète", svc_expertise_d: "Audit indépendant universel de tout projet avec verdict et feuille de route. Sans compliments au détriment de la vérité.", svc_expertise_tag: "Tout secteur",
      svc_valuation_t: "Évaluation d'entreprise et de projet", svc_valuation_d: "Valeur, méthodes, fourchette et justification. Triangulation des approches, défendable devant un auditeur externe.", svc_valuation_tag: "Évaluation",
      svc_ip_t: "Évaluation de la propriété intellectuelle", svc_ip_d: "Valeur et protection de la PI, des brevets et du savoir-faire. Risques de protection juridique et capitalisation des actifs incorporels.", svc_ip_tag: "PI",
      svc_finmodel_t: "Modèle financier et business plan", svc_finmodel_d: "Vérification et construction du modèle financier, de l'économie unitaire, des scénarios. Recherche d'écarts et d'hypothèses irréalistes.", svc_finmodel_tag: "Finance",
      svc_ma_t: "Opération d'investissement et M&A", svc_ma_d: "Due diligence d'opération, prix équitable, structure de risque pour l'acheteur et le vendeur d'une part.", svc_ma_tag: "M&A",
      svc_legal_t: "Examen des documents juridiques", svc_legal_d: "Contrats, NDA, SPA, SHA, accords d'entreprise. Erreurs, risques, incohérences et clauses abusives.", svc_legal_tag: "Juridique",
      svc_compliance_t: "Conformité légale", svc_compliance_d: "Conformité et base réglementaire du secteur et de la juridiction. Signaux de violations et risques réglementaires.", svc_compliance_tag: "Conformité",
      svc_spyware_t: "Scan d'inclusions espionnes", svc_spyware_d: "Traqueurs, macros cachées, liens d'hameçonnage, fuite de métadonnées, pixels espions et pièces jointes malveillantes dans vos fichiers.", svc_spyware_tag: "Sécurité · unique",
      svc_industry_t: "Audit sectoriel", svc_industry_d: "Pétrole et gaz, IT/IA/SaaS, agro, FMCG, équipement industriel, immobilier, médecine, R&D — un panel adapté au secteur.", svc_industry_tag: "8 secteurs",
      svc_roadmap_t: "Feuille de route de correction", svc_roadmap_d: "Quoi, comment, par qui, à quel coût et quand corriger. Des étapes concrètes, pas des mots vagues.", svc_roadmap_tag: "Inclus partout",
      s2_title: "Quatre étapes vers un rapport", s2_sub: "Les agents IA font le travail de fond, un expert signe. Humain dans la boucle — plus de confiance et de poids juridique.",
      step1_t: "Téléversement", step1_d: "Dans l'espace client, vous téléversez les documents et choisissez les modules. Chiffré ; les documents ne servent pas à entraîner des modèles publics.",
      step2_t: "Panel IA", step2_d: "Un panel d'experts IA audite selon un standard d'honnêteté unique, applique l'avocat du diable et la contre-vérification.",
      step3_t: "Finalisation", step3_d: "Un expert BIG4 vérifie et certifie le rapport. Chaque conclusion est tracée jusqu'au document source.",
      step4_t: "Publication", step4_d: "Vous recevez Word, PDF et HTML. En option, nous publions sur le domaine BIG4 — ouvert ou protégé par mot de passe.",
      s3_title: "L'honnêteté comme méthodologie", s3_sub: "Chaque rapport suit le même chemin. C'est notre fossé concurrentiel — pas du marketing, mais une procédure reproductible.",
      flow1: "Classification : secteur, stade, budget, juridiction", flow2: "Panel d'experts de 5 à 12 rôles selon le secteur", flow3: "Règle de fer de l'honnêteté — sans compliments", flow4: "Avocat du diable : au moins 10 scénarios d'échec", flow5: "Contre-vérification par un auditeur indépendant", flow6: "Verdict sur une échelle stricte", flow7: "Feuille de route de correction", flow8: "Défense de l'expertise devant un auditeur externe",
      verdict_ex: "Excellent", verdict_gd: "Bon", verdict_bd: "Très faible", verdict_ft: "Inapplicable", verdict_scale: "Échelle de verdict",
      s4_title: "Votre rapport — sur le domaine BIG4", s4_sub: "Le rapport fini est publié comme une page : vitrine ouverte du projet ou accès privé par mot de passe. Aux conditions que vous choisissez.",
      pub_open_badge: "Page ouverte", pub_open_t: "Vitrine du projet", pub_open_d: "Une page HTML publique du rapport — à montrer aux investisseurs, partenaires, au marché. Preuve d'un audit indépendant BIG4.",
      pub_priv_badge: "Accès privé", pub_priv_t: "Rapport protégé", pub_priv_d: "Accès par PIN ou mot de passe uniquement, session à durée limitée. Pour les opérations confidentielles et un cercle fermé.",
      s5_title: "Programme de parrainage", s5_sub: "Amenez des partenaires — obtenez remises et bonus. Plus votre réseau est large, plus chaque rapport suivant est avantageux.",
      ref1_t: "Pour vous — par filleul", ref1_d: "Remise cumulative et crédits bonus pour chaque client amené. Statut croissant — avantage croissant.",
      ref2_t: "Pour le partenaire — bienvenue", ref2_d: "L'invité reçoit une remise sur le premier rapport. Avantage mutuel dès le premier contact.",
      ref3_t: "Programme B2B", ref3_d: "Consultants, avocats et courtiers amènent des clients et reçoivent un pourcentage ou des crédits bonus.",
      s6_title: "Formats de collaboration", s6_sub: "Les prix exacts dépendent du volume des documents et de l'ensemble des modules. Voici le modèle ; le devis final est préparé selon votre demande.",
      tier1_n: "Rapport unique", tier1_p: "Sur demande", tier1_d: "Un projet, l'ensemble de modules requis", tier1_f1: "Choix des modules pour la tâche", tier1_f2: "Rapport complet avec verdict", tier1_f3: "Word + PDF + HTML", tier1_f4: "Feuille de route de correction", tier1_btn: "Demander un devis",
      tier2_n: "Opération / DD", tier2_p: "Sur demande", tier2_d: "Revue complète pour une opération ou un tour", tier2_f1: "Tous les modules d'audit et d'évaluation", tier2_f2: "Scan d'inclusions espionnes", tier2_f3: "Publication : ouverte ou protégée", tier2_f4: "Finalisation accélérée", tier2_f5: "Défense devant un auditeur externe", tier2_btn: "Discuter de l'opération",
      tier3_n: "Abonnement", tier3_p: "Sur demande", tier3_d: "Pour fonds, cabinets et commandes régulières", tier3_f1: "Un paquet de rapports par période", tier3_f2: "File prioritaire", tier3_f3: "Gestionnaire dédié", tier3_f4: "Conditions du programme de parrainage", tier3_btn: "Demander les conditions",
      final_h: "Prêt pour un verdict honnête ?", final_p: "Décrivez la tâche et joignez les documents — nous reviendrons avec un devis et un délai. Confidentialité garantie.", final_btn: "Nous écrire",
      final_disc: "BIG4 est un système d'expertise indépendante assistée par IA. Le rapport consolidé est consultatif et certifié par un expert ; il ne remplace pas un audit, une évaluation ou un avis juridique obligatoire réalisé par des spécialistes agréés lorsque la loi l'exige. Le site n'utilise ni formulaires de données personnelles ni traqueurs ; contact via les canaux indiqués.",
      foot_tagline: "Plateforme internationale de rapports consolidés", foot_op: "SARL « Center Group Company » · 2026",
      cta_catalog: "Catalogue des rapports",
      modal_title: "Choisissez votre pays", modal_sub: "Le site s'ouvrira dans la langue de votre pays. Format de service : russe pour la RF, international pour le reste du monde.", modal_search: "Rechercher un pays…",
    },

    ar: {
      nav_services: "الخدمات", nav_how: "الوصف", nav_standard: "المعيار", nav_referral: "للشركاء", nav_pricing: "الأسعار",
      cta_login: "تسجيل الدخول", cta_cabinet: "حساب العميل",
      hero_kicker: "منصة دولية للتقارير الموحَّدة",
      hero_h1a: "مدقّق ", hero_h1em: "مستقل", hero_h1b: " بمستوى الشركات الأربع الكبرى",
      hero_lede: "حمّل موادك واحصل على تقرير موحَّد صادق: تدقيق، تقييم الأعمال والملكية الفكرية، نموذج مالي، فحص المستندات، فحص الإدراجات التجسسية وخارطة طريق للتصحيح. بصيغة Word وPDF ومع النشر على نطاقنا.",
      hero_cta1: "اطلب تقريراً", hero_cta2: "كيف يعمل",
      metric_modules: "وحدات التقرير", metric_experts: "خبراء في اللجنة", metric_scale: "مقياس الحكم", metric_formats: "صيغ الإخراج",
      jur_ru: "لروسيا: تُقدَّم الخدمات بواسطة شركة «Center Group Company» وفق قانون الاتحاد الروسي.",
      jur_intl: "الصيغة الدولية: معيار خبرة صادق وموحَّد وفق القانون المعمول به في ولايتك القضائية، عبر هيكل تعاقدي.",
      s1_title: "تقرير موحَّد لأي مشروع", s1_sub: "طلب واحد — وحدة واحدة أو عدة وحدات. كل تقرير يمرّ بمعيار صدق موحَّد وينتهي بخارطة طريق للتصحيح.",
      svc_expertise_t: "خبرة صادقة شاملة", svc_expertise_d: "تدقيق مستقل شامل لأي مشروع مع حكم وخارطة طريق. دون مجاملات على حساب الحقيقة.", svc_expertise_tag: "أي قطاع",
      svc_valuation_t: "تقييم الأعمال والمشروع", svc_valuation_d: "القيمة والأساليب والنطاق والتبرير. تثليث المناهج، قابل للدفاع أمام مدقّق خارجي.", svc_valuation_tag: "التقييم",
      svc_ip_t: "تقييم الملكية الفكرية", svc_ip_d: "قيمة وحماية الملكية الفكرية وبراءات الاختراع والمعرفة الفنية. مخاطر الحماية القانونية ورسملة الأصول غير الملموسة.", svc_ip_tag: "الملكية الفكرية",
      svc_finmodel_t: "النموذج المالي وخطة العمل", svc_finmodel_d: "مراجعة وبناء النموذج المالي واقتصاديات الوحدة والسيناريوهات. كشف الفجوات والافتراضات غير الواقعية.", svc_finmodel_tag: "المالية",
      svc_ma_t: "صفقة استثمارية واندماج واستحواذ", svc_ma_d: "العناية الواجبة للصفقة، السعر العادل، هيكل المخاطر للمشتري والبائع.", svc_ma_tag: "M&A",
      svc_legal_t: "مراجعة المستندات القانونية", svc_legal_d: "العقود واتفاقيات السرية وSPA وSHA والاتفاقيات المؤسسية. أخطاء ومخاطر وتناقضات وشروط مجحفة.", svc_legal_tag: "قانوني",
      svc_compliance_t: "الامتثال للتشريعات", svc_compliance_d: "الامتثال والقاعدة التنظيمية للقطاع والولاية القضائية. إشارات المخالفات والمخاطر التنظيمية.", svc_compliance_tag: "الامتثال",
      svc_spyware_t: "فحص الإدراجات التجسسية", svc_spyware_d: "المتعقّبات والماكروهات المخفية وروابط التصيّد وتسريب البيانات الوصفية وبكسلات التتبع والمرفقات الخبيثة في ملفاتك.", svc_spyware_tag: "أمن · فريد",
      svc_industry_t: "تدقيق قطاعي", svc_industry_d: "النفط والغاز، تقنية/ذكاء اصطناعي/SaaS، الزراعة، السلع الاستهلاكية، المعدات الصناعية، العقارات، الطب، البحث والتطوير — لجنة مخصّصة للقطاع.", svc_industry_tag: "٨ قطاعات",
      svc_roadmap_t: "خارطة طريق للتصحيح", svc_roadmap_d: "ماذا وكيف ومن وبأي تكلفة ومتى يُصلَح ما اكتُشف. خطوات ملموسة لا كلمات عامة.", svc_roadmap_tag: "مدمجة في كل تقرير",
      s2_title: "أربع خطوات نحو التقرير", s2_sub: "وكلاء الذكاء الاصطناعي يقومون بالعمل العميق، والخبير يوقّع. إنسان ضمن الحلقة — ثقة أعلى ووزن قانوني.",
      step1_t: "الرفع", step1_d: "في حساب العميل ترفع المواد وتختار الوحدات. مشفّر؛ لا تُستخدم المواد لتدريب النماذج العامة.",
      step2_t: "لجنة الذكاء الاصطناعي", step2_d: "لجنة خبراء ذكاء اصطناعي تدقّق وفق معيار صدق موحَّد، وتطبّق محامي الشيطان والتحقق المتقاطع.",
      step3_t: "الإنهاء", step3_d: "يراجع خبير BIG4 التقرير ويعتمده. كل استنتاج يُتتبَّع إلى المستند المصدر.",
      step4_t: "النشر", step4_d: "تحصل على Word وPDF وHTML. اختيارياً ننشر على نطاق BIG4 — مفتوحاً أو محمياً بكلمة مرور.",
      s3_title: "الصدق كمنهجية", s3_sub: "كل تقرير يسلك المسار نفسه. هذا هو خندقنا التنافسي — ليس تسويقاً بل إجراء قابل للتكرار.",
      flow1: "التصنيف: القطاع، المرحلة، الميزانية، الولاية القضائية", flow2: "لجنة خبراء من ٥ إلى ١٢ دوراً للقطاع", flow3: "قاعدة الصدق الحديدية — دون مجاملات", flow4: "محامي الشيطان: ١٠ سيناريوهات فشل على الأقل", flow5: "تحقق متقاطع بواسطة مدقّق مستقل", flow6: "حكم على مقياس صارم", flow7: "خارطة طريق للتصحيح", flow8: "الدفاع عن الخبرة أمام مدقّق خارجي",
      verdict_ex: "ممتاز", verdict_gd: "جيد", verdict_bd: "ضعيف جداً", verdict_ft: "غير قابل للتطبيق", verdict_scale: "مقياس الحكم",
      s4_title: "تقريرك — على نطاق BIG4", s4_sub: "يُنشر التقرير الجاهز كصفحة: واجهة عرض مفتوحة للمشروع أو وصول خاص بكلمة مرور. وفق الشروط التي تختارها.",
      pub_open_badge: "صفحة مفتوحة", pub_open_t: "واجهة المشروع", pub_open_d: "صفحة HTML عامة للتقرير — لعرضها على المستثمرين والشركاء والسوق. إثبات اجتياز تدقيق BIG4 المستقل.",
      pub_priv_badge: "وصول خاص", pub_priv_t: "تقرير محمي بكلمة مرور", pub_priv_d: "وصول برمز PIN أو كلمة مرور فقط، جلسة محدودة المدة. للصفقات السرية ودائرة مغلقة من المستلمين.",
      s5_title: "برنامج الإحالة", s5_sub: "أحضر شركاء — احصل على خصومات ومكافآت. كلما اتسعت شبكتك، كان كل تقرير تالٍ أكثر فائدة.",
      ref1_t: "لك — عن كل إحالة", ref1_d: "خصم تراكمي ورصيد مكافآت عن كل عميل تُحضره. مكانة متنامية — فائدة متنامية.",
      ref2_t: "للشريك — ترحيب", ref2_d: "يحصل المدعو على خصم على أول تقرير. فائدة متبادلة من أول تواصل.",
      ref3_t: "برنامج B2B", ref3_d: "المستشارون والمحامون والوسطاء يُحضرون العملاء ويحصلون على نسبة أو رصيد مكافآت.",
      s6_title: "صيغ التعاون", s6_sub: "تعتمد الأسعار الدقيقة على حجم المواد ومجموعة الوحدات. أدناه نموذج العمل؛ يُعدّ العرض النهائي حسب طلبك.",
      tier1_n: "تقرير منفرد", tier1_p: "عند الطلب", tier1_d: "مشروع واحد، المجموعة المطلوبة من الوحدات", tier1_f1: "اختيار الوحدات للمهمة", tier1_f2: "تقرير كامل مع حكم", tier1_f3: "Word + PDF + HTML", tier1_f4: "خارطة طريق للتصحيح", tier1_btn: "اطلب عرض سعر",
      tier2_n: "صفقة / عناية واجبة", tier2_p: "عند الطلب", tier2_d: "مراجعة كاملة لصفقة أو جولة", tier2_f1: "كل وحدات التدقيق والتقييم", tier2_f2: "فحص الإدراجات التجسسية", tier2_f3: "النشر: مفتوح أو محمي", tier2_f4: "إنهاء معجَّل", tier2_f5: "دفاع أمام مدقّق خارجي", tier2_btn: "ناقش الصفقة",
      tier3_n: "اشتراك", tier3_p: "عند الطلب", tier3_d: "للصناديق ومكاتب المحاماة والطلبات المنتظمة", tier3_f1: "حزمة تقارير لفترة", tier3_f2: "طابور أولوية", tier3_f3: "مدير شخصي", tier3_f4: "شروط برنامج الإحالة", tier3_btn: "اطلب الشروط",
      final_h: "جاهز لحكم صادق؟", final_p: "صف المهمة وأرفق المواد — سنعود بعرض سعر ومدة. السرية مضمونة.", final_btn: "راسلنا",
      final_disc: "BIG4 نظام خبرة مستقلة بمساعدة الذكاء الاصطناعي. التقرير الموحَّد استشاري ويعتمده خبير؛ ولا يحل محل تدقيق أو تقييم أو رأي قانوني إلزامي يقوم به مختصون معتمدون حيثما يقتضي القانون. لا يستخدم الموقع نماذج بيانات شخصية ولا أدوات تتبّع؛ التواصل عبر القنوات المذكورة.",
      foot_tagline: "منصة دولية للتقارير الموحَّدة", foot_op: "شركة «Center Group Company» · 2026",
      cta_catalog: "دليل التقارير",
      modal_title: "اختر دولتك", modal_sub: "سيفتح الموقع بلغة دولتك. صيغة الخدمة: روسية لروسيا، ودولية لبقية العالم.", modal_search: "ابحث عن دولة…",
    },
  };

  var LANGS = ["ru", "en", "fr", "ar"];
  // Словарь расширяется отдельными файлами через window.BIG4_DICT_EXT (страницы, кабинет).
  function t(lang, key) {
    var ext = window.BIG4_DICT_EXT;
    if (ext && ext[lang] && ext[lang][key] != null) return ext[lang][key];
    if (DICT[lang] && DICT[lang][key] != null) return DICT[lang][key];
    if (ext && ext.en && ext.en[key] != null) return ext.en[key];
    return (DICT.en && DICT.en[key]) || "";
  }
  function getLang() { var l = localStorage.getItem("big4-lang"); return LANGS.indexOf(l) >= 0 ? l : null; }
  function getMode() { return localStorage.getItem("big4-mode") || "intl"; }

  function applyI18n(lang) {
    var root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(lang, el.getAttribute("data-i18n")); if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = t(lang, el.getAttribute("data-i18n-html")); if (v) el.innerHTML = v;
    });
    // примечание о юрисдикции
    var jn = document.getElementById("jur-note");
    if (jn) jn.textContent = t(lang, "jur_" + getMode());
    // активная кнопка языка
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lang") === lang); });
    localStorage.setItem("big4-lang", lang);
    // хук для страниц с динамической локализацией (кабинет)
    if (typeof window.BIG4_onApply === "function") { try { window.BIG4_onApply(lang); } catch (e) {} }
  }

  function setLang(lang) { if (LANGS.indexOf(lang) >= 0) applyI18n(lang); }

  function selectCountry(code) {
    var c = window.BIG4_resolveCountry(code);
    localStorage.setItem("big4-country", c.code);
    localStorage.setItem("big4-mode", c.mode);
    var chip = document.getElementById("country-chip");
    if (chip) chip.textContent = c.flag;
    applyI18n(c.lang);
    closeModal();
  }

  // ---- модал выбора страны ----
  function buildModal() {
    var lang = getLang() || "en";
    var ov = document.createElement("div"); ov.id = "country-modal";
    ov.innerHTML =
      '<div class="cm-card">' +
      '<div class="cm-h" data-i18n="modal_title">' + t(lang, "modal_title") + '</div>' +
      '<div class="cm-sub" data-i18n="modal_sub">' + t(lang, "modal_sub") + '</div>' +
      '<input class="cm-search" id="cm-search" placeholder="' + t(lang, "modal_search") + '">' +
      '<div class="cm-list" id="cm-list"></div></div>';
    document.body.appendChild(ov);
    var list = ov.querySelector("#cm-list");
    function render(filter) {
      var f = (filter || "").toLowerCase();
      list.innerHTML = "";
      window.BIG4_COUNTRIES.forEach(function (c) {
        if (f && c.name.toLowerCase().indexOf(f) < 0 && c.code.toLowerCase().indexOf(f) < 0) return;
        var b = document.createElement("button"); b.className = "cm-item";
        b.innerHTML = '<span class="cm-flag">' + c.flag + '</span><span>' + c.name + '</span>';
        b.onclick = function () { selectCountry(c.code); };
        list.appendChild(b);
      });
    }
    render("");
    ov.querySelector("#cm-search").addEventListener("input", function (e) { render(e.target.value); });
  }
  function closeModal() { var m = document.getElementById("country-modal"); if (m) m.remove(); }
  function openModal() { if (!document.getElementById("country-modal")) buildModal(); }

  // ---- init ----
  function init() {
    var lang = getLang();
    var country = localStorage.getItem("big4-country");
    if (!country) {
      // первый визит: применяем язык браузера как предварительный, показываем выбор страны
      var nav = (navigator.language || "en").slice(0, 2);
      applyI18n(LANGS.indexOf(nav) >= 0 ? nav : "en");
      openModal();
    } else {
      var c = window.BIG4_resolveCountry(country);
      var chip = document.getElementById("country-chip"); if (chip) chip.textContent = c.flag;
      applyI18n(lang || c.lang);
    }
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
    var chipBtn = document.getElementById("country-chip");
    if (chipBtn) chipBtn.addEventListener("click", openModal);
  }

  window.BIG4I18N = { setLang: setLang, openCountry: openModal, apply: applyI18n, t: function (key) { return t(getLang() || "en", key); }, lang: function () { return getLang() || "en"; } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
