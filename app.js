// ============================================================================
// 1. CONFIGURATION GOOGLE SHEETS (Colle ton lien Web App Google Script ici)
// ============================================================================
const GOOGLE_SHEET_WEBHOOK_URL = ''; // Exemple: 'https://script.google.com/macros/s/AKfycb.../exec'

// ============================================================================
// 2. LISTE DES 58 WILAYAS D'ALGÉRIE + TARIFS DE LIVRAISON (Domicile / Stop Desk)
// ============================================================================
const WILAYAS_DZ = [
  { code: '01', fr: '01 - Adrar', ar: '01 - أدرار (Adrar)', home: 900, desk: 600 },
  { code: '02', fr: '02 - Chlef', ar: '02 - الشلف (Chlef)', home: 600, desk: 400 },
  { code: '03', fr: '03 - Laghouat', ar: '03 - الأغواط (Laghouat)', home: 750, desk: 500 },
  { code: '04', fr: '04 - Oum El Bouaghi', ar: '04 - أم البواقي (Oum El Bouaghi)', home: 650, desk: 450 },
  { code: '05', fr: '05 - Batna', ar: '05 - باتنة (Batna)', home: 650, desk: 450 },
  { code: '06', fr: '06 - Béjaïa', ar: '06 - بجاية (Béjaïa)', home: 600, desk: 400 },
  { code: '07', fr: '07 - Biskra', ar: '07 - بسكرة (Biskra)', home: 700, desk: 450 },
  { code: '08', fr: '08 - Béchar', ar: '08 - بشار (Béchar)', home: 850, desk: 550 },
  { code: '09', fr: '09 - Blida', ar: '09 - البليدة (Blida)', home: 500, desk: 350 },
  { code: '10', fr: '10 - Bouira', ar: '10 - البويرة (Bouira)', home: 600, desk: 400 },
  { code: '11', fr: '11 - Tamanrasset', ar: '11 - تمنراست (Tamanrasset)', home: 1100, desk: 800 },
  { code: '12', fr: '12 - Tébessa', ar: '12 - تبسة (Tébessa)', home: 700, desk: 450 },
  { code: '13', fr: '13 - Tlemcen', ar: '13 - تلمسان (Tlemcen)', home: 650, desk: 450 },
  { code: '14', fr: '14 - Tiaret', ar: '14 - تيارت (Tiaret)', home: 650, desk: 450 },
  { code: '15', fr: '15 - Tizi Ouzou', ar: '15 - تيزي وزو (Tizi Ouzou)', home: 600, desk: 400 },
  { code: '16', fr: '16 - Alger', ar: '16 - الجزائر العاصمة (Alger)', home: 400, desk: 300 },
  { code: '17', fr: '17 - Djelfa', ar: '17 - الجلفة (Djelfa)', home: 700, desk: 450 },
  { code: '18', fr: '18 - Jijel', ar: '18 - جيجل (Jijel)', home: 650, desk: 450 },
  { code: '19', fr: '19 - Sétif', ar: '19 - سطيف (Sétif)', home: 600, desk: 400 },
  { code: '20', fr: '20 - Saïda', ar: '20 - سعيدة (Saïda)', home: 650, desk: 450 },
  { code: '21', fr: '21 - Skikda', ar: '21 - سكيكدة (Skikda)', home: 650, desk: 450 },
  { code: '22', fr: '22 - Sidi Bel Abbès', ar: '22 - سيدي بلعباس (Sidi Bel Abbès)', home: 650, desk: 450 },
  { code: '23', fr: '23 - Annaba', ar: '23 - عنابة (Annaba)', home: 600, desk: 400 },
  { code: '24', fr: '24 - Guelma', ar: '24 - قالمة (Guelma)', home: 650, desk: 450 },
  { code: '25', fr: '25 - Constantine', ar: '25 - قسنطينة (Constantine)', home: 600, desk: 400 },
  { code: '26', fr: '26 - Médéa', ar: '26 - المدية (Médéa)', home: 600, desk: 400 },
  { code: '27', fr: '27 - Mostaganem', ar: '27 - مستغانم (Mostaganem)', home: 600, desk: 400 },
  { code: '28', fr: "28 - M'Sila", ar: "28 - المسيلة (M'Sila)", home: 650, desk: 450 },
  { code: '29', fr: '29 - Mascara', ar: '29 - معسكر (Mascara)', home: 650, desk: 450 },
  { code: '30', fr: '30 - Ouargla', ar: '30 - ورقلة (Ouargla)', home: 800, desk: 550 },
  { code: '31', fr: '31 - Oran', ar: '31 - وهران (Oran)', home: 550, desk: 350 },
  { code: '32', fr: '32 - El Bayadh', ar: '32 - البيض (El Bayadh)', home: 800, desk: 550 },
  { code: '33', fr: '33 - Illizi', ar: '33 - إليزي (Illizi)', home: 1100, desk: 800 },
  { code: '34', fr: '34 - Bordj Bou Arréridj', ar: '34 - برج بوعريريج (BBA)', home: 600, desk: 400 },
  { code: '35', fr: '35 - Boumerdès', ar: '35 - بومرداس (Boumerdès)', home: 500, desk: 350 },
  { code: '36', fr: '36 - El Tarf', ar: '36 - الطارف (El Tarf)', home: 650, desk: 450 },
  { code: '37', fr: '37 - Tindouf', ar: '37 - تندوف (Tindouf)', home: 1100, desk: 800 },
  { code: '38', fr: '38 - Tissemsilt', ar: '38 - تيسمسيلت (Tissemsilt)', home: 650, desk: 450 },
  { code: '39', fr: '39 - El Oued', ar: '39 - الوادي (El Oued)', home: 750, desk: 500 },
  { code: '40', fr: '40 - Khenchela', ar: '40 - خنشلة (Khenchela)', home: 650, desk: 450 },
  { code: '41', fr: '41 - Souk Ahras', ar: '41 - سوق أهراس (Souk Ahras)', home: 650, desk: 450 },
  { code: '42', fr: '42 - Tipaza', ar: '42 - تيبازة (Tipaza)', home: 500, desk: 350 },
  { code: '43', fr: '43 - Mila', ar: '43 - ميلة (Mila)', home: 650, desk: 450 },
  { code: '44', fr: '44 - Aïn Defla', ar: '44 - عين الدفلى (Aïn Defla)', home: 600, desk: 400 },
  { code: '45', fr: '45 - Naâma', ar: '45 - النعامة (Naâma)', home: 800, desk: 550 },
  { code: '46', fr: '46 - Aïn Témouchent', ar: '46 - عين تموشنت (Aïn Témouchent)', home: 650, desk: 450 },
  { code: '47', fr: '47 - Ghardaïa', ar: '47 - غرداية (Ghardaïa)', home: 750, desk: 500 },
  { code: '48', fr: '48 - Relizane', ar: '48 - غليزان (Relizane)', home: 600, desk: 400 },
  { code: '49', fr: '49 - Timimoun', ar: '49 - تيميمون (Timimoun)', home: 950, desk: 650 },
  { code: '50', fr: '50 - Bordj Badji Mokhtar', ar: '50 - برج باجي مختار', home: 1100, desk: 800 },
  { code: '51', fr: '51 - Ouled Djellal', ar: '51 - أولاد جلال (Ouled Djellal)', home: 750, desk: 500 },
  { code: '52', fr: '52 - Béni Abbès', ar: '52 - بني عباس (Béni Abbès)', home: 900, desk: 600 },
  { code: '53', fr: '53 - In Salah', ar: '53 - عين صالح (In Salah)', home: 1000, desk: 700 },
  { code: '54', fr: '54 - In Guezzam', ar: '54 - عين قزام (In Guezzam)', home: 1100, desk: 800 },
  { code: '55', fr: '55 - Touggourt', ar: '55 - تقرت (Touggourt)', home: 750, desk: 500 },
  { code: '56', fr: '56 - Djanet', ar: '56 - جانت (Djanet)', home: 1100, desk: 800 },
  { code: '57', fr: "57 - El M'Ghair", ar: "57 - المغير (El M'Ghair)", home: 750, desk: 500 },
  { code: '58', fr: '58 - El Meniaa', ar: '58 - المنيعة (El Meniaa)', home: 850, desk: 550 }
];

// ============================================================================
// 3. CATALOGUE PRODUITS (100% Bilingue Français & Arabe/Darja + Prix en DA)
// ============================================================================
const CATEGORIES = [
  { id: 'Tout', fr: 'Tout voir', ar: 'الكل' },
  { id: 'Tech & Accessoires', fr: 'Tech & Accessoires', ar: 'إكسسوارات و تقنية' },
  { id: 'Cuisine & Maison', fr: 'Cuisine & Maison', ar: 'مطبخ و منزل' },
  { id: 'Sport & Quotidien', fr: 'Sport & Quotidien', ar: 'رياضة و يوميات' }
];

const PRODUCTS = [
  {
    id: 'support-telephone-flexible',
    slug: 'support-telephone.html',
    name: 'Support Téléphone Flexible 360°',
    nameAr: 'حامل الهاتف المرن 360° (يلصق في البيسي، المكتب و الدار)',
    hookFr: "🔥 Modulable à 360° ! Accroche ton téléphone sur l'écran de ton PC ou pose-le sur ton bureau en 2 secondes.",
    hookAr: '🔥 يطوى كيما تحب! علق تليفونك في شاشة الـ PC ولا حطو فوق البيرو بلا ما يطيح',
    category: 'Tech & Accessoires',
    categoryAr: 'إكسسوارات و تقنية',
    badgeFr: 'Tendance 🔥',
    badgeAr: 'الأكثر طلباً 🔥',
    rating: '4.9/5',
    reviewsCount: 142,
    price: 1900,
    comparePrice: 2900,
    descriptionFr: "Support de téléphone en silicone flexible et modulable à 360°. S'accroche sur l'écran d'un PC portable, se plie en support de bureau ou partout à la maison.",
    descriptionAr: 'حامل هاتف ذكي من السيليكون المتين، يتطوى 360 درجة باش تستعملو في شاشة الميكرو (PC)، فوق المكتب، في الكوزينة ولا حتى في الطوموبيل.',
    featuresFr: [
      'Modulable et pliable à 360° (écran PC, bureau, cuisine)',
      'Silicone antidérapant et 100 % lavable à l’eau',
      'Format ultra-fin et léger qui se glisse dans la poche'
    ],
    featuresAr: [
      'يطوى و يتشكل 360° كيما تحب (شاشة الـ PC، مكتب، كوزينة)',
      'سيليكون متين ما يزلقش و يتغسل بالماء بسهولة',
      'خفيف بزاف و يدخل في الجيب ولا الساك'
    ],
    images: [
      './produits/support-telephone-flexible-fr.jpg',
      './produits/support-telephone-flexible-2.jpg',
      './produits/support-telephone-flexible-3.jpg',
      './produits/support-telephone-flexible-4.jpg',
      './produits/support-telephone-flexible-1.jpg'
    ],
    reviewsFr: [
      { author: 'Amine (Alger 16)', text: 'Super pratique sur l’écran de mon PC portable pour travailler avec deux écrans, il ne bouge pas du tout !' },
      { author: 'Yasmine (Oran 31)', text: 'Très pratique au bureau et dans la cuisine, livraison rapide en 24h.' }
    ],
    reviewsAr: [
      { author: 'أمين (الجزائر 16)', text: 'سلعة ما شاء الله، علقتو في البيسي تاعي نخدم بيه زوج شاشات، ما يتحركش كامل!' },
      { author: 'ياسمين (وهران 31)', text: 'عملي بزاف في المكتب وفي الكوزينة، والتوصيل كان سريع في 24 ساعة.' }
    ],
    faqsFr: [
      { q: 'Est-il compatible avec tous les téléphones ?', a: 'Oui, il supporte tous les smartphones (iPhone, Samsung, Redmi, Realme…) même avec une coque.' },
      { q: 'Comment se passe le paiement ?', a: 'Paiement à la livraison (COD) : vous payez uniquement lorsque vous recevez votre colis à domicile ou au bureau Stop Desk.' }
    ],
    faqsAr: [
      { q: 'واش يركب على كامل التليفونات؟', a: 'نعم! يركب على كامل الهواتف (iPhone, Samsung, Redmi, Realme...) حتى بالبوشات.' },
      { q: 'كيفاش نخلص؟', a: 'الدفع عند الاستلام (تخلص كي توصلك السلعة لباب الدار أو مكتب التوصيل).' }
    ]
  },
  {
    id: 'filtre-evier-pliable',
    slug: 'filtre-evier.html',
    name: "Filtre d'Évier Pliable à Ventouse",
    nameAr: 'مصفاة حوض المطبخ القابلة للطي بالشفط (وداعاً لانسداد لافابو)',
    hookFr: "✨ Fini l'évier bouché ! S'installe en 5 secondes par ventouse sans perçage et sert aussi de porte-torchon.",
    hookAr: '✨ هني روحك من لافابو لي يتبوشا! يلصق في 5 ثواني بلا ثقيب و يرفد حتى السربيتة',
    category: 'Cuisine & Maison',
    categoryAr: 'مطبخ و منزل',
    badgeFr: 'Best-Seller ⭐',
    badgeAr: 'الأكثر مبيعاً ⭐',
    rating: '4.9/5',
    reviewsCount: 218,
    price: 2400,
    comparePrice: 3500,
    descriptionFr: "Support filtre d'évier pliable avec fixation ventouse sans perçage. Retient tous les restes alimentaires, permet d'égoutter fruits et légumes et sert de porte-torchon une fois replié.",
    descriptionAr: 'حامل مصفاة ذكي لحوض المطبخ يلصق بالفونتوز القوية بلا ثقيب. يصفي كامل بقايا الماكلة، تغسلي فيه الخضرة و الفاكهة، و كي تطويه يولي حامل للسربيتة.',
    featuresFr: [
      'Zéro évier bouché : filtre restes alimentaires, thé & épluchures',
      'Pliable à 90° avec porte-torchon intégré pour gagner de la place',
      'Fixation ventouse ultra-stable en 5 secondes sans outil'
    ],
    featuresAr: [
      'يصفي بقايا الأكل، القهوة و الشاي باش ما يتبوشاش لافابو',
      'يطوى 90° الفوق باش ما يديش بلاصة و تنشري فيه السربيتة',
      'يلصق بالفونتوز في 5 ثواني بلا فيس و لا ثقيب'
    ],
    images: [
      './produits/filtre-evier-1.jpg',
      './produits/filtre-evier-4-usages-fr.jpg',
      './produits/filtre-evier-5-installation-fr.jpg',
      './produits/filtre-evier-2.jpg',
      './produits/filtre-evier-3.jpg'
    ],
    reviewsFr: [
      { author: 'Meryem (Constantine 25)', text: 'Franchement indispensable dans la cuisine ! La ventouse tient super bien et ne bouge pas.' },
      { author: 'Karima (Blida 09)', text: 'Exactement comme sur les photos, fini la galère de l’évier bouché.' }
    ],
    reviewsAr: [
      { author: 'مريم (قسنطينة 25)', text: 'والله غير رحمة في الكوزينة! يلصق مليح و ما يطيحش كامل، ربي يبارك.' },
      { author: 'كريمة (البليدة 09)', text: 'كيما في التصاور بالضبط، تهنيت من مشكل لافابو لي يتبوشا.' }
    ],
    faqsFr: [
      { q: 'La ventouse tient-elle bien avec le poids ?', a: 'Oui, son verrouillage sous vide supporte jusqu’à 3 kg sans bouger.' },
      { q: 'Livrez-vous dans toutes les wilayas ?', a: 'Oui, livraison disponible dans les 58 wilayas à domicile ou en bureau Stop Desk avec paiement à la livraison.' }
    ],
    faqsAr: [
      { q: 'الفونتوز تشد مليح مع الثقل؟', a: 'نعم، فيها قفل ضغط هوائي يشد حتى 3 كيلو بدون ما يتحرك.' },
      { q: 'كيفاش يتم التوصيل؟', a: 'التوصيل متوفر لـ 58 ولاية لباب الدار أو للمكتب، و تخلص كي تستلم.' }
    ]
  },
  {
    id: 'sac-magnetique-sport',
    slug: 'sac-magnetique.html',
    name: 'Sac Magnétique Porte-Gourde',
    nameAr: 'حقيبة الرياضة المغناطيسية حاملة القارورة و الهاتف',
    hookFr: "💪 S'aimante directement sur les machines de sport ! Garde ta gourde, ton téléphone et tes clés propres et à portée de main.",
    hookAr: '💪 تلصق بالمغناطيس في لي ماشين تاع لاصال! تليفونك و قرعتك ديما نقية و قدامك',
    category: 'Sport & Quotidien',
    categoryAr: 'رياضة و يوميات',
    badgeFr: 'Nouveauté 🔥',
    badgeAr: 'جديد 🔥',
    rating: '4.9/5',
    reviewsCount: 189,
    price: 3900,
    comparePrice: 5500,
    descriptionFr: 'Le sac de sport aimanté qui se fixe sur toutes les surfaces métalliques pour garder ta gourde, ton téléphone et tes clés hors du sol à la salle.',
    descriptionAr: 'حقيبة رياضية بمغناطيس خارق تلصق في كامل آلات الرياضة والحديد، ترفد القرعة تاع الماء، التليفون و المفاتح بعيد على الأرض.',
    featuresFr: [
      'Fixation magnétique puissante (maintien extrême sur les machines)',
      'Porte-gourde intégré avec cordon de serrage ajustable',
      'Poche zippée sécurisée + mousqueton porte-clés intérieur'
    ],
    featuresAr: [
      'مغناطيس قوي بزاف يشد حتى و القرعة معمرة بالماء',
      'بلاصة خاصة للقرعة أو الشيكر مع خيط تضييق',
      'جيب بالسلسلة للتليفون و علاق للمفاتح لداخل'
    ],
    images: [
      './produits/sac-magnetique-2-fr.jpg',
      './produits/sac-magnetique-1.webp',
      './produits/sac-magnetique-3.webp',
      './produits/sac-magnetique-4.webp'
    ],
    reviewsFr: [
      { author: 'Walid (Sétif 19)', text: 'Les aimants sont ultra puissants ! Je mets ma gourde de 1L + mon téléphone et ça ne bouge pas sur les machines.' },
      { author: 'Sofiane (Alger 16)', text: 'Qualité top, enfin je ne pose plus mes affaires par terre à la salle.' }
    ],
    reviewsAr: [
      { author: 'وليد (سطيف 19)', text: 'خاوتي المغناطيس تاعو قوووة! نحط فيه قرعة تاع لتر و التليفون و يلصق في الماشينة ما يتحركش.' },
      { author: 'سفيان (الجزائر 16)', text: 'كاليتي ما شاء الله، تهنيت من حطان التليفون والقرعة في الأرض في لاصال.' }
    ],
    faqsFr: [
      { q: 'Quelle taille de gourde rentre dedans ?', a: 'Le compartiment extensible accepte les gourdes et shakers jusqu’à 1,2 L.' },
      { q: 'Les aimants sont-ils sans danger pour le téléphone ?', a: 'Oui, les aimants sont isolés au dos et 100 % sûrs pour tous les smartphones.' }
    ],
    faqsAr: [
      { q: 'شحال ترفد من لتر؟', a: 'ترفد القرع و الشيكر حتى 1.2 لتر بكل سهولة.' },
      { q: 'المغناطيس ما يضرش التليفون؟', a: 'أبداً، المغناطيس معزول في الظهر و آمن 100% على جميع الهواتف.' }
    ]
  }
];

// ============================================================================
// 4. DICTIONNAIRE DE TRADUCTION COMPLET (FR / AR-DZ)
// ============================================================================
const UI_TEXT = {
  fr: {
    announcement: '🚚 Livraison disponible vers les <span>58 Wilayas</span> — Paiement à la livraison (Tu paies à la réception !) 🇩🇿',
    navHome: 'Boutique',
    navPhone: 'Support Téléphone 360°',
    navSink: "Filtre d'Évier",
    navBag: 'Sac Magnétique',
    navTrack: '📦 Suivre ma commande',
    heroBadge: 'ELWESMOU DZ 🇩🇿 • Boutique Officielle',
    heroTitle: 'Les meilleurs accessoires malins pour la maison, la cuisine et le sport',
    heroSubtitle: 'Qualité garantie • Livraison rapide 58 Wilayas à domicile ou Stop Desk • Paiement à la réception du colis !',
    heroBtn: 'Découvrir les produits disponibles 👇',
    catalogueTitle: 'Nos Produits Disponibles',
    orderCardBtn: 'Commander 🛒',
    breadcrumbHome: 'Accueil',
    reviewsCountLabel: 'avis clients vérifiés en Algérie',
    promoPill: 'Offre Spéciale Aujourd’hui 🔥',
    codBoxTitle: '📋 Formulaire de Commande Directe',
    codBoxSubtitle: 'Remplis tes informations ci-dessous, on t’appelle pour confirmer et tu paies à la livraison !',
    bundle1Title: '1x Unité',
    bundle1Sub: 'Offre découverte standard',
    bundle2Title: 'Pack Duo (2x Unités)',
    bundle2Tag: 'PROMO -15% 🔥',
    bundle2Sub: 'Économise sur le prix et la livraison',
    bundle3Title: 'Pack Trio (3x Unités)',
    bundle3Tag: 'MEILLEURE OFFRE -25% ⭐',
    bundle3Sub: 'Économie maximale + Livraison prioritaire',
    labelName: '👤 Nom & Prénom *',
    placeholderName: 'Ex : Mohamed Benali',
    labelPhone: '📞 Numéro de Téléphone *',
    placeholderPhone: '05 / 06 / 07 XX XX XX XX',
    labelWilaya: '📍 Wilaya (1 - 58) *',
    labelCommune: '🏘️ Commune / Adresse *',
    placeholderCommune: 'Écris le nom de ta commune',
    labelDeliveryType: '🚚 Mode de livraison *',
    deliveryHomeOption: '🏠 Livraison à domicile (Devant chez toi)',
    deliveryDeskOption: '🏢 Livraison au bureau (Stop Desk — Moins cher)',
    summaryProduct: 'Prix du produit',
    summaryDeliveryHome: 'Frais de livraison (À domicile)',
    summaryDeliveryDesk: 'Frais de livraison (Stop Desk)',
    summaryTotal: 'Total à payer à la livraison :',
    submitOrderBtn: '🔥 COMMANDER MAINTENANT — Paiement à la livraison',
    sendingOrder: '⏳ Enregistrement de votre commande...',
    trust1Title: 'Livraison 58 Wilayas',
    trust1Sub: 'À domicile ou Stop Desk',
    trust2Title: 'Paiement à la livraison',
    trust2Sub: 'Tu paies à la réception',
    trust3Title: 'Garantie Échange',
    trust3Sub: 'Service client 7j/7',
    reviewsSectionTitle: '⭐ Avis Clients Vérifiés',
    verifiedBuyer: '✓ Achat vérifié',
    faqSectionTitle: '❓ Questions Fréquentes',
    footerHome: 'Accueil',
    footerTrack: 'Suivi de commande',
    footerLegal: "Politique d'échange & Mentions légales",
    footerCopy: '© 2026 ELWESMOU Algeria 🇩🇿 — Tous droits réservés',
    footerCod: 'Livraison 58 Wilayas • Paiement à la livraison (COD)',
    orderSuccessTitle: '🎉 Félicitations ! Votre commande est enregistrée',
    orderNumberLabel: 'Numéro de commande :',
    orderSuccessMsg: (name, phone, wilaya) =>
      `Merci <strong>${name}</strong> ! Notre équipe va vous appeler très vite sur le <strong>${phone}</strong> pour confirmer votre commande et l'expédier vers <strong>${wilaya}</strong>. Gardez votre téléphone allumé 📞`,
    orderTrackBtn: '📦 Suivre ma commande'
  },
  ar: {
    announcement: '🚚 التوصيل متوفر لـ <span>58 ولاية</span> — الدفع عند الاستلام (تخلص كي توصلك السلعة لباب الدار) 🇩🇿',
    navHome: 'الرئيسية',
    navPhone: 'حامل الهاتف 360°',
    navSink: 'مصفاة المطبخ',
    navBag: 'حقيبة الرياضة المغناطيسية',
    navTrack: '📦 تتبع طلبيتك',
    heroBadge: 'ELWESMOU DZ 🇩🇿 • متجر الوسمو',
    heroTitle: 'أحسن المنتجات الذكية للدار، الكوزينة و الرياضة',
    heroSubtitle: 'جودة عالية مضمونة • توصيل سريع لـ 58 ولاية لباب الدار أو المكتب • تخلص كي تستلم سلعتك!',
    heroBtn: 'اكتشف المنتجات المتوفرة 👇',
    catalogueTitle: 'منتجاتنا المتوفرة',
    orderCardBtn: 'أطلب الآن 🛒',
    breadcrumbHome: 'الرئيسية',
    reviewsCountLabel: 'تقييم زبائننا في الجزائر',
    promoPill: 'تخفيض خاص اليوم 🔥',
    codBoxTitle: '📋 إستمارة الطلب المباشر',
    codBoxSubtitle: 'عمر المعلومات تاعك هنا و نعيطولك في التليفون نأكدوا الطلبية — الدفع كي توصلك السلعة!',
    bundle1Title: 'قطعة واحدة (1x)',
    bundle1Sub: 'العرض العادي',
    bundle2Title: 'قطعتين (Pack 2x)',
    bundle2Tag: 'تخفيض -15% 🔥',
    bundle2Sub: 'رابح أكثر في السومة و التوصيل',
    bundle3Title: '3 قطع (Pack 3x)',
    bundle3Tag: 'أحسن عرض -25% ⭐',
    bundle3Sub: 'أكبر اقتصاد + أولوية في التوصيل',
    labelName: '👤 الإسم و اللقب *',
    placeholderName: 'مثال: محمد بن علي',
    labelPhone: '📞 رقم الهاتف *',
    placeholderPhone: '05 / 06 / 07 XX XX XX XX',
    labelWilaya: '📍 الولاية (1 - 58) *',
    labelCommune: '🏘️ البلدية / العنوان *',
    placeholderCommune: 'أكتب اسم البلدية تاعك',
    labelDeliveryType: '🚚 نوع التوصيل *',
    deliveryHomeOption: '🏠 التوصيل لباب الدار (À domicile)',
    deliveryDeskOption: '🏢 التوصيل للمكتب (Stop Desk — أرخص)',
    summaryProduct: 'ثمن السلعة',
    summaryDeliveryHome: 'سعر التوصيل (لباب الدار)',
    summaryDeliveryDesk: 'سعر التوصيل (للمكتب Stop Desk)',
    summaryTotal: 'المجموع الكلي (تخلص كي تستلم) :',
    submitOrderBtn: '🔥 أطلب الآن — الدفع عند الاستلام',
    sendingOrder: '⏳ جاري تسجيل الطلبية...',
    trust1Title: 'توصيل 58 ولاية',
    trust1Sub: 'لباب الدار أو المكتب',
    trust2Title: 'الدفع عند الاستلام',
    trust2Sub: 'تخلص كي تشوف سلعتك',
    trust3Title: 'ضمان الإستبدال',
    trust3Sub: 'خدمة زبائن 7/7',
    reviewsSectionTitle: '⭐ آراء الزبائن',
    verifiedBuyer: '✓ زبون مؤكد',
    faqSectionTitle: '❓ أسئلة شائعة',
    footerHome: 'الرئيسية',
    footerTrack: 'تتبع الطلبية',
    footerLegal: 'سياسة الاستبدال والشروط القانونية',
    footerCopy: '© 2026 ELWESMOU Algeria 🇩🇿 — جميع الحقوق محفوظة',
    footerCod: 'التوصيل 58 ولاية • الدفع عند الاستلام (COD)',
    orderSuccessTitle: '🎉 بصحتك! تم تسجيل طلبيتك بنجاح',
    orderNumberLabel: 'رقم الطلبية :',
    orderSuccessMsg: (name, phone, wilaya) =>
      `شكراً لك <strong>${name}</strong>! راح نعيطولك قريباً على الرقم <strong>${phone}</strong> باش نأكدوا الطلبية و نبعثوهالك لـ <strong>${wilaya}</strong>. خبي التليفون تاعك شاعل 📞`,
    orderTrackBtn: '📦 تتبع طلبيتي'
  }
};

// ============================================================================
// 5. ÉTAT & BASCULEMENT DE LANGUE (FR <-> AR)
// ============================================================================
let currentLang = localStorage.getItem('elwesmou_lang') || 'fr';
let activeCategory = 'Tout';
let selectedImages = {};
let selectedBundleQty = 1;
let selectedWilayaCode = '16';
let selectedDeliveryType = 'home';

function formatDA(num) {
  return currentLang === 'ar'
    ? num.toLocaleString('fr-DZ') + ' د.ج'
    : num.toLocaleString('fr-DZ') + ' DA';
}

function updateStaticChrome() {
  const t = UI_TEXT[currentLang];
  const isAr = currentLang === 'ar';

  // Direction HTML + Body
  document.documentElement.lang = isAr ? 'ar' : 'fr';
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isAr);

  // Bouton de langue
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.innerHTML = isAr ? '🇫🇷 Français' : '🇩🇿 العربية / الدارجة';
  }

  // Bandeau d'annonce
  const ann = document.querySelector('.announcement-bar');
  if (ann) ann.innerHTML = t.announcement;

  // Navigation Header
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.includes('index.html')) a.textContent = t.navHome;
    else if (href.includes('support-telephone')) a.textContent = t.navPhone;
    else if (href.includes('filtre-evier')) a.textContent = t.navSink;
    else if (href.includes('sac-magnetique')) a.textContent = t.navBag;
    else if (href.includes('suivi-commande')) a.textContent = t.navTrack;
  });

  // Bouton Suivi Header
  const headerTrackBtn = document.querySelector('.header-actions .cart-btn span');
  if (headerTrackBtn) headerTrackBtn.textContent = t.navTrack;

  // Hero Accueil
  const heroBadge = document.querySelector('.hero-badge');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroBtn = document.querySelector('.hero-section .btn-primary');
  if (heroBadge) heroBadge.textContent = t.heroBadge;
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
  if (heroBtn) heroBtn.textContent = t.heroBtn;

  // Titre Catalogue Accueil
  const catHeading = document.querySelector('.shop-toolbar h2');
  if (catHeading) catHeading.textContent = t.catalogueTitle;

  // Footer
  const footerLinks = document.querySelectorAll('.footer-links a');
  footerLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.includes('index.html')) a.textContent = t.footerHome;
    else if (href.includes('suivi-commande')) a.textContent = t.footerTrack;
    else if (href.includes('mentions-legales')) a.textContent = t.footerLegal;
  });

  const footerBottomSpans = document.querySelectorAll('.footer-bottom span');
  if (footerBottomSpans.length >= 2) {
    footerBottomSpans[0].textContent = t.footerCopy;
    footerBottomSpans[1].textContent = t.footerCod;
  }

  // Si on est sur la page Suivi ou Mentions légales, met à jour leur contenu aussi
  if (typeof window.renderPageSpecificLang === 'function') {
    window.renderPageSpecificLang(currentLang);
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'fr' : 'ar';
  localStorage.setItem('elwesmou_lang', currentLang);
  updateStaticChrome();
  renderCategories();
  renderProducts();
  renderLandingPage();
}

// ============================================================================
// 6. RENDU CATALOGUE ACCUEIL
// ============================================================================
const productGrid = document.getElementById('productGrid');
const categoryTabs = document.getElementById('categoryTabs');
const landingRoot = document.getElementById('landingProductRoot');

function renderCategories() {
  if (!categoryTabs) return;
  categoryTabs.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-tab ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
      ${currentLang === 'ar' ? cat.ar : cat.fr}
    </button>
  `).join('');

  categoryTabs.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      renderCategories();
      renderProducts();
    });
  });
}

function selectCardImage(productId, imgIndex) {
  selectedImages[productId] = imgIndex;
  renderProducts();
}

function renderProducts() {
  if (!productGrid) return;
  const isAr = currentLang === 'ar';
  const t = UI_TEXT[currentLang];
  const filtered = PRODUCTS.filter(item => activeCategory === 'Tout' || item.category === activeCategory);

  productGrid.innerHTML = filtered.map(product => {
    const currentImgIndex = selectedImages[product.id] || 0;
    const currentImg = product.images[currentImgIndex];
    const title = isAr ? product.nameAr : product.name;
    const desc = isAr ? product.descriptionAr : product.descriptionFr;
    const catName = isAr ? product.categoryAr : product.category;
    const badge = isAr ? product.badgeAr : product.badgeFr;
    const features = isAr ? product.featuresAr : product.featuresFr;

    return `
      <article class="product-card">
        <a href="./${product.slug}" class="product-img-wrap">
          <span class="product-badge">${badge}</span>
          <img src="${currentImg}" alt="${title}" />
        </a>

        <div class="product-thumbs">
          ${product.images.map((img, idx) => `
            <button class="thumb-btn ${idx === currentImgIndex ? 'active' : ''}" onclick="selectCardImage('${product.id}', ${idx})">
              <img src="${img}" alt="Photo ${idx + 1}" />
            </button>
          `).join('')}
        </div>

        <div class="product-info">
          <span class="product-cat">${catName}</span>
          <a href="./${product.slug}" class="product-title">${title}</a>
          <p class="product-desc">${desc}</p>
          <ul class="product-features">
            ${features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <div class="product-bottom">
            <div class="price-block">
              <span class="price-old">${formatDA(product.comparePrice)}</span>
              <span class="product-price">${formatDA(product.price)}</span>
            </div>
            <a href="./${product.slug}" class="btn-primary">
              ${t.orderCardBtn}
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ============================================================================
// 7. RENDU LANDING PAGE PRODUIT (100% BILINGUE FR / AR-DZ)
// ============================================================================
function getDeliveryCost() {
  const w = WILAYAS_DZ.find(x => x.code === selectedWilayaCode) || WILAYAS_DZ[15];
  return selectedDeliveryType === 'home' ? w.home : w.desk;
}

function getBundleProductTotal(product) {
  if (selectedBundleQty === 1) return product.price;
  if (selectedBundleQty === 2) return Math.round((product.price * 2 * 0.85) / 50) * 50;
  return Math.round((product.price * 3 * 0.75) / 50) * 50;
}

function renderLandingPage() {
  if (!landingRoot) return;
  const productId = landingRoot.dataset.productId;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const isAr = currentLang === 'ar';
  const t = UI_TEXT[currentLang];

  // Sauvegarde des valeurs saisies dans le formulaire avant re-rendu
  const prevName = document.getElementById('codName')?.value || '';
  const prevPhone = document.getElementById('codPhone')?.value || '';
  const prevCommune = document.getElementById('codCommune')?.value || '';

  const activeImgIndex = selectedImages[product.id] || 0;
  const activeImg = product.images[activeImgIndex];

  const p1 = product.price;
  const p2 = Math.round((product.price * 2 * 0.85) / 50) * 50;
  const p3 = Math.round((product.price * 3 * 0.75) / 50) * 50;

  const subTotal = getBundleProductTotal(product);
  const deliveryCost = getDeliveryCost();
  const grandTotal = subTotal + deliveryCost;

  const title = isAr ? product.nameAr : product.name;
  const catName = isAr ? product.categoryAr : product.category;
  const badge = isAr ? product.badgeAr : product.badgeFr;
  const hook = isAr ? product.hookAr : product.hookFr;
  const features = isAr ? product.featuresAr : product.featuresFr;
  const reviews = isAr ? product.reviewsAr : product.reviewsFr;
  const faqs = isAr ? product.faqsAr : product.faqsFr;

  landingRoot.innerHTML = `
    <div class="breadcrumb">
      <a href="./index.html">${t.breadcrumbHome}</a> &rsaquo;
      <span>${catName}</span> &rsaquo;
      <strong>${title}</strong>
    </div>

    <div class="landing-hero">
      <!-- Colonne Galerie Photo -->
      <div>
        <div class="landing-gallery-main">
          <span class="product-badge">${badge}</span>
          <img src="${activeImg}" alt="${title}" />
        </div>
        <div class="landing-thumbs">
          ${product.images.map((img, i) => `
            <button class="${i === activeImgIndex ? 'active' : ''}" onclick="switchLandingImage('${product.id}', ${i})">
              <img src="${img}" alt="Photo ${i + 1}" />
            </button>
          `).join('')}
        </div>

        <ul class="product-features" style="margin-top:20px;gap:8px;">
          ${features.map(f => `<li style="font-size:0.92rem;">${f}</li>`).join('')}
        </ul>
      </div>

      <!-- Colonne Formulaire COD Direct (Algérie 58 Wilayas) -->
      <div class="landing-details">
        <div class="rating-row">
          <span class="stars">★★★★★</span>
          <span>${product.rating} (${product.reviewsCount} ${t.reviewsCountLabel})</span>
        </div>

        <h1 class="landing-title">${title}</h1>

        <div class="darja-subtitle">${hook}</div>

        <div class="landing-price-row">
          <span class="landing-price-current">${formatDA(product.price)}</span>
          <span class="landing-price-compare">${formatDA(product.comparePrice)}</span>
          <span class="promo-pill">${t.promoPill}</span>
        </div>

        <!-- BOÎTE DE COMMANDE DIRECTE COD -->
        <div class="cod-direct-box" id="codOrderBox">
          <div class="cod-box-header">
            <h3>${t.codBoxTitle}</h3>
            <p>${t.codBoxSubtitle}</p>
          </div>

          <form id="directCodForm" onsubmit="submitCodOrder(event, '${product.id}')">
            <!-- Choix de l'offre / Quantité -->
            <div class="bundle-selector">
              <div class="bundle-option ${selectedBundleQty === 1 ? 'active' : ''}" onclick="selectBundle(1)">
                <div class="bundle-left">
                  <div class="bundle-radio"></div>
                  <div>
                    <div class="bundle-name">${t.bundle1Title}</div>
                    <div class="bundle-sub">${t.bundle1Sub}</div>
                  </div>
                </div>
                <div class="bundle-price">${formatDA(p1)}</div>
              </div>

              <div class="bundle-option ${selectedBundleQty === 2 ? 'active' : ''}" onclick="selectBundle(2)">
                <div class="bundle-left">
                  <div class="bundle-radio"></div>
                  <div>
                    <div class="bundle-name">${t.bundle2Title} <span class="bundle-tag">${t.bundle2Tag}</span></div>
                    <div class="bundle-sub">${t.bundle2Sub}</div>
                  </div>
                </div>
                <div>
                  <div class="bundle-price">${formatDA(p2)}</div>
                  <div class="price-old">${formatDA(p1 * 2)}</div>
                </div>
              </div>

              <div class="bundle-option ${selectedBundleQty === 3 ? 'active' : ''}" onclick="selectBundle(3)">
                <div class="bundle-left">
                  <div class="bundle-radio"></div>
                  <div>
                    <div class="bundle-name">${t.bundle3Title} <span class="bundle-tag">${t.bundle3Tag}</span></div>
                    <div class="bundle-sub">${t.bundle3Sub}</div>
                  </div>
                </div>
                <div>
                  <div class="bundle-price">${formatDA(p3)}</div>
                  <div class="price-old">${formatDA(p1 * 3)}</div>
                </div>
              </div>
            </div>

            <!-- Champs Client Algérie -->
            <div class="form-row">
              <div class="form-group">
                <label>${t.labelName}</label>
                <input type="text" id="codName" required placeholder="${t.placeholderName}" value="${prevName}" />
              </div>
              <div class="form-group">
                <label>${t.labelPhone}</label>
                <input type="tel" id="codPhone" required pattern="[0-9+ ]{9,14}" placeholder="${t.placeholderPhone}" value="${prevPhone}" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t.labelWilaya}</label>
                <select id="codWilaya" onchange="changeWilaya(this.value)" required>
                  ${WILAYAS_DZ.map(w => `
                    <option value="${w.code}" ${w.code === selectedWilayaCode ? 'selected' : ''}>${isAr ? w.ar : w.fr}</option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>${t.labelCommune}</label>
                <input type="text" id="codCommune" required placeholder="${t.placeholderCommune}" value="${prevCommune}" />
              </div>
            </div>

            <div class="form-group">
              <label>${t.labelDeliveryType}</label>
              <select id="codDeliveryType" onchange="changeDeliveryType(this.value)">
                <option value="home" ${selectedDeliveryType === 'home' ? 'selected' : ''}>${t.deliveryHomeOption}</option>
                <option value="desk" ${selectedDeliveryType === 'desk' ? 'selected' : ''}>${t.deliveryDeskOption}</option>
              </select>
            </div>

            <!-- Récapitulatif en DA -->
            <div class="cod-summary-box">
              <div class="cod-summary-line">
                <span>${t.summaryProduct} (${selectedBundleQty}x) :</span>
                <strong>${formatDA(subTotal)}</strong>
              </div>
              <div class="cod-summary-line">
                <span>${selectedDeliveryType === 'home' ? t.summaryDeliveryHome : t.summaryDeliveryDesk} :</span>
                <strong>${formatDA(deliveryCost)}</strong>
              </div>
              <div class="cod-summary-total">
                <span>${t.summaryTotal}</span>
                <span>${formatDA(grandTotal)}</span>
              </div>
            </div>

            <button type="submit" class="btn-buy-now" id="codSubmitBtn">
              ${t.submitOrderBtn} (${formatDA(grandTotal)})
            </button>
          </form>
        </div>

        <!-- Badges de Réassurance Algérie -->
        <div class="trust-badges">
          <div class="trust-item">
            <span>🇩🇿</span>
            <strong>${t.trust1Title}</strong>
            <span>${t.trust1Sub}</span>
          </div>
          <div class="trust-item">
            <span>🤝</span>
            <strong>${t.trust2Title}</strong>
            <span>${t.trust2Sub}</span>
          </div>
          <div class="trust-item">
            <span>🔄</span>
            <strong>${t.trust3Title}</strong>
            <span>${t.trust3Sub}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Avis Clients & FAQ -->
    <div class="landing-sections">
      <div class="info-card">
        <h3>${t.reviewsSectionTitle}</h3>
        ${reviews.map(r => `
          <div class="review-item">
            <div class="review-header">
              <span>${r.author} <span class="stars">★★★★★</span></span>
              <span class="verified-badge">${t.verifiedBuyer}</span>
            </div>
            <p style="font-size:0.9rem;color:var(--text-secondary);">${r.text}</p>
          </div>
        `).join('')}
      </div>

      <div class="info-card">
        <h3>${t.faqSectionTitle}</h3>
        ${faqs.map(f => `
          <details class="faq-item" open>
            <summary>${f.q}</summary>
            <p>${f.a}</p>
          </details>
        `).join('')}
      </div>
    </div>
  `;
}

function switchLandingImage(productId, idx) {
  selectedImages[productId] = idx;
  renderLandingPage();
}

function selectBundle(qty) {
  selectedBundleQty = qty;
  renderLandingPage();
}

function changeWilaya(code) {
  selectedWilayaCode = code;
  renderLandingPage();
}

function changeDeliveryType(type) {
  selectedDeliveryType = type;
  renderLandingPage();
}

// ============================================================================
// 8. ENVOI DE LA COMMANDE VERS GOOGLE SHEETS + SAUVEGARDE LOCALE
// ============================================================================
async function submitCodOrder(e, productId) {
  e.preventDefault();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const t = UI_TEXT[currentLang];
  const btn = document.getElementById('codSubmitBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = t.sendingOrder;
  }

  const wilayaObj = WILAYAS_DZ.find(w => w.code === selectedWilayaCode) || WILAYAS_DZ[15];
  const subTotal = getBundleProductTotal(product);
  const deliveryCost = getDeliveryCost();
  const grandTotal = subTotal + deliveryCost;

  const orderData = {
    orderId: 'ELW-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleString('fr-DZ'),
    productName: product.name,
    quantity: selectedBundleQty,
    customerName: document.getElementById('codName').value.trim(),
    phone: document.getElementById('codPhone').value.trim(),
    wilaya: wilayaObj.fr,
    commune: document.getElementById('codCommune').value.trim(),
    deliveryType: selectedDeliveryType === 'home' ? 'À domicile (لباب الدار)' : 'Stop Desk (للمكتب)',
    deliveryCost: deliveryCost + ' DA',
    totalDA: grandTotal + ' DA',
    status: '⏳ قيد التأكيد (En attente de confirmation)'
  };

  // 1. Sauvegarde locale
  const existingOrders = JSON.parse(localStorage.getItem('elwesmou_orders') || '[]');
  existingOrders.unshift(orderData);
  localStorage.setItem('elwesmou_orders', JSON.stringify(existingOrders));

  // 2. Envoi vers Google Sheets (via constante ou URL enregistrée dans admin.html)
  const webhookUrl = GOOGLE_SHEET_WEBHOOK_URL || localStorage.getItem('elwesmou_sheet_url') || '';
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch (err) {
      console.error('Erreur Google Sheet:', err);
    }
  }

  // 3. Message de confirmation dans la langue active
  const box = document.getElementById('codOrderBox');
  box.innerHTML = `
    <div style="text-align:center;padding:24px 12px;">
      <div style="width:64px;height:64px;border-radius:50%;background:#DCFCE7;color:#15803D;display:inline-flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:14px;">✓</div>
      <h3 style="font-size:1.4rem;font-weight:900;margin-bottom:8px;">${t.orderSuccessTitle}</h3>
      <p style="font-size:0.98rem;font-weight:700;color:var(--brand-orange);margin-bottom:10px;">
        ${t.orderNumberLabel} ${orderData.orderId}
      </p>
      <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:18px;">
        ${t.orderSuccessMsg(orderData.customerName, orderData.phone, currentLang === 'ar' ? wilayaObj.ar : wilayaObj.fr)}
      </p>
      <a href="./suivi-commande.html?phone=${encodeURIComponent(orderData.phone)}" class="btn-primary">
        ${t.orderTrackBtn}
      </a>
    </div>
  `;
}

// Initialisation
updateStaticChrome();
renderCategories();
renderProducts();
renderLandingPage();
