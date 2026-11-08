// ============================================================================
// 1. CONFIGURATION GOOGLE SHEETS (Colle ton lien Web App Google Script ici)
// ============================================================================
const GOOGLE_SHEET_WEBHOOK_URL = ''; // Exemple: 'https://script.google.com/macros/s/AKfycb.../exec'

// ============================================================================
// 2. LISTE DES 58 WILAYAS D'ALGÉRIE + TARIFS DE LIVRAISON (Domicile / Stop Desk)
// ============================================================================
const WILAYAS_DZ = [
  { code: '01', name: '01 - Adrar (أدرار)', home: 900, desk: 600 },
  { code: '02', name: '02 - Chlef (الشلف)', home: 600, desk: 400 },
  { code: '03', name: '03 - Laghouat (الأغواط)', home: 750, desk: 500 },
  { code: '04', name: '04 - Oum El Bouaghi (أم البواقي)', home: 650, desk: 450 },
  { code: '05', name: '05 - Batna (باتنة)', home: 650, desk: 450 },
  { code: '06', name: '06 - Béjaïa (بجاية)', home: 600, desk: 400 },
  { code: '07', name: '07 - Biskra (بسكرة)', home: 700, desk: 450 },
  { code: '08', name: '08 - Béchar (بشار)', home: 850, desk: 550 },
  { code: '09', name: '09 - Blida (البليدة)', home: 500, desk: 350 },
  { code: '10', name: '10 - Bouira (البويرة)', home: 600, desk: 400 },
  { code: '11', name: '11 - Tamanrasset (تمنراست)', home: 1100, desk: 800 },
  { code: '12', name: '12 - Tébessa (تبسة)', home: 700, desk: 450 },
  { code: '13', name: '13 - Tlemcen (تلمسان)', home: 650, desk: 450 },
  { code: '14', name: '14 - Tiaret (تيارت)', home: 650, desk: 450 },
  { code: '15', name: '15 - Tizi Ouzou (تيزي وزو)', home: 600, desk: 400 },
  { code: '16', name: '16 - Alger (الجزائر العاصمة)', home: 400, desk: 300 },
  { code: '17', name: '17 - Djelfa (الجلفة)', home: 700, desk: 450 },
  { code: '18', name: '18 - Jijel (جيجل)', home: 650, desk: 450 },
  { code: '19', name: '19 - Sétif (سطيف)', home: 600, desk: 400 },
  { code: '20', name: '20 - Saïda (سعيدة)', home: 650, desk: 450 },
  { code: '21', name: '21 - Skikda (سكيكدة)', home: 650, desk: 450 },
  { code: '22', name: '22 - Sidi Bel Abbès (سيدي بلعباس)', home: 650, desk: 450 },
  { code: '23', name: '23 - Annaba (عنابة)', home: 600, desk: 400 },
  { code: '24', name: '24 - Guelma (قالمة)', home: 650, desk: 450 },
  { code: '25', name: '25 - Constantine (قسنطينة)', home: 600, desk: 400 },
  { code: '26', name: '26 - Médéa (المدية)', home: 600, desk: 400 },
  { code: '27', name: '27 - Mostaganem (مستغانم)', home: 600, desk: 400 },
  { code: '28', name: "28 - M'Sila (المسيلة)", home: 650, desk: 450 },
  { code: '29', name: '29 - Mascara (معسكر)', home: 650, desk: 450 },
  { code: '30', name: '30 - Ouargla (ورقلة)', home: 800, desk: 550 },
  { code: '31', name: '31 - Oran (وهران)', home: 550, desk: 350 },
  { code: '32', name: '32 - El Bayadh (البيض)', home: 800, desk: 550 },
  { code: '33', name: '33 - Illizi (إليزي)', home: 1100, desk: 800 },
  { code: '34', name: '34 - Bordj Bou Arréridj (برج بوعريريج)', home: 600, desk: 400 },
  { code: '35', name: '35 - Boumerdès (بومرداس)', home: 500, desk: 350 },
  { code: '36', name: '36 - El Tarf (الطارف)', home: 650, desk: 450 },
  { code: '37', name: '37 - Tindouf (تندوف)', home: 1100, desk: 800 },
  { code: '38', name: '38 - Tissemsilt (تيسمسيلت)', home: 650, desk: 450 },
  { code: '39', name: '39 - El Oued (الوادي)', home: 750, desk: 500 },
  { code: '40', name: '40 - Khenchela (خنشلة)', home: 650, desk: 450 },
  { code: '41', name: '41 - Souk Ahras (سوق أهراس)', home: 650, desk: 450 },
  { code: '42', name: '42 - Tipaza (تيبازة)', home: 500, desk: 350 },
  { code: '43', name: '43 - Mila (ميلة)', home: 650, desk: 450 },
  { code: '44', name: '44 - Aïn Defla (عين الدفلى)', home: 600, desk: 400 },
  { code: '45', name: '45 - Naâma (النعامة)', home: 800, desk: 550 },
  { code: '46', name: '46 - Aïn Témouchent (عين تموشنت)', home: 650, desk: 450 },
  { code: '47', name: '47 - Ghardaïa (غرداية)', home: 750, desk: 500 },
  { code: '48', name: '48 - Relizane (غليزان)', home: 600, desk: 400 },
  { code: '49', name: '49 - Timimoun (تيميمون)', home: 950, desk: 650 },
  { code: '50', name: '50 - Bordj Badji Mokhtar (برج باجي مختار)', home: 1100, desk: 800 },
  { code: '51', name: '51 - Ouled Djellal (أولاد جلال)', home: 750, desk: 500 },
  { code: '52', name: '52 - Béni Abbès (بني عباس)', home: 900, desk: 600 },
  { code: '53', name: '53 - In Salah (عين صالح)', home: 1000, desk: 700 },
  { code: '54', name: '54 - In Guezzam (عين قزام)', home: 1100, desk: 800 },
  { code: '55', name: '55 - Touggourt (تقرت)', home: 750, desk: 500 },
  { code: '56', name: '56 - Djanet (جانت)', home: 1100, desk: 800 },
  { code: '57', name: "57 - El M'Ghair (المغير)", home: 750, desk: 500 },
  { code: '58', name: '58 - El Meniaa (المنيعة)', home: 850, desk: 550 }
];

// ============================================================================
// 3. CATALOGUE PRODUITS (Bilingue Arabe/Darja Algérienne & Français + Prix en DA)
// ============================================================================
const CATEGORIES = [
  { id: 'Tout', fr: 'Tout', ar: 'الكل' },
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
    darjaHook: '🔥 يطوى كيما تحب! علق تليفونك في شاشة الـ PC ولا حطو فوق البيرو بلا ما يطيح',
    category: 'Tech & Accessoires',
    categoryAr: 'إكسسوارات و تقنية',
    badge: 'الأكثر طلباً 🔥',
    rating: '4.9/5',
    reviewsCount: 142,
    price: 1900,
    comparePrice: 2900,
    description: "Support de téléphone en silicone flexible et modulable à 360°. S'accroche sur l'écran d'un PC portable, se plie en support de bureau ou partout à la maison.",
    descriptionAr: 'حامل هاتف ذكي من السيليكون المتين، يتطوى 360 درجة باش تستعملو في شاشة الميكرو (PC)، فوق المكتب، في الكوزينة ولا حتى في الطوموبيل.',
    features: [
      'Modulable 360° — يطوى و يتشكل كيما تحب (PC، مكتب، كوزينة)',
      'Silicone antidérapant & lavable — سيليكون ما يزلقش و يتغسل بالماء',
      'Ultra-fin & solide — خفيف و يدخل في الجيب ولا الساك'
    ],
    images: [
      './produits/support-telephone-flexible-fr.jpg',
      './produits/support-telephone-flexible-2.jpg',
      './produits/support-telephone-flexible-3.jpg',
      './produits/support-telephone-flexible-4.jpg',
      './produits/support-telephone-flexible-1.jpg'
    ],
    reviews: [
      { author: 'Amine (Alger 16)', text: 'سلعة ما شاء الله، علقتو في البيسي تاعي نخدم بيه زوج شاشات، ما يتحركش كامل!' },
      { author: 'Yasmine (Oran 31)', text: 'Très pratique au bureau et dans la cuisine, livraison rapide en 24h.' }
    ],
    faqs: [
      { q: 'واش يركب على كامل التليفونات؟ (Compatible tous téléphones ?)', a: 'نعم! يركب على كامل الهواتف (iPhone, Samsung, Redmi, Realme...) حتى بالبوشات.' },
      { q: 'كيفاش نخلص؟ (Comment payer ?)', a: 'الدفع عند الاستلام (تخلص كي توصلك السلعة لباب الدار أو مكتب التوصيل).' }
    ]
  },
  {
    id: 'filtre-evier-pliable',
    slug: 'filtre-evier.html',
    name: "Filtre d'Évier Pliable à Ventouse",
    nameAr: 'مصفاة حوض المطبخ القابلة للطي بالشفط (وداعاً لانسداد لافابو)',
    darjaHook: '✨ هني روحك من لافابو لي يتبوشا! يلصق في 5 ثواني بلا ثقيب و يرفد حتى السربيتة',
    category: 'Cuisine & Maison',
    categoryAr: 'مطبخ و منزل',
    badge: 'Best-Seller ⭐',
    rating: '4.9/5',
    reviewsCount: 218,
    price: 2400,
    comparePrice: 3500,
    description: "Support filtre d'évier pliable avec fixation ventouse sans perçage. Retient tous les restes alimentaires, permet d'égoutter fruits et légumes et sert de porte-torchon.",
    descriptionAr: 'حامل مصفاة ذكي لحوض المطبخ يلصق بالفونتوز القوية بلا ثقيب. يصفي كامل بقايا الماكلة، تغسلي فيه الخضرة و الفاكهة، و كي تطويه يولي حامل للسربيتة.',
    features: [
      'Zéro évier bouché — يصفي بقايا الأكل، القهوة و الشاي باش ما يتبوشاش لافابو',
      'Pliable à 90° + Porte-torchon — يطوى الفوق باش ما يديش بلاصة و تنشري فيه السربيتة',
      'Ventouse ultra-forte en 5s — يلصق في 5 ثواني بلا فيس و لا ثقيب'
    ],
    images: [
      './produits/filtre-evier-1.jpg',
      './produits/filtre-evier-4-usages-fr.jpg',
      './produits/filtre-evier-5-installation-fr.jpg',
      './produits/filtre-evier-2.jpg',
      './produits/filtre-evier-3.jpg'
    ],
    reviews: [
      { author: 'Meryem (Constantine 25)', text: 'والله غير رحمة في الكوزينة! يلصق مليح و ما يطيحش كامل، ربي يبارك.' },
      { author: 'Karima (Blida 09)', text: 'Exactement comme sur les photos, fini la galère de l’évier bouché.' }
    ],
    faqs: [
      { q: 'الفونتوز تشد مليح مع الثقل؟ (La ventouse tient bien ?)', a: 'نعم، فيها قفل ضغط هوائي يشد حتى 3 كيلو بدون ما يتحرك.' },
      { q: 'كيفاش يتم التوصيل؟ (Livraison ?)', a: 'التوصيل متوفر لـ 58 ولاية لباب الدار أو للمكتب، و تخلص كي تستلم.' }
    ]
  },
  {
    id: 'sac-magnetique-sport',
    slug: 'sac-magnetique.html',
    name: 'Sac Magnétique Porte-Gourde',
    nameAr: 'حقيبة الرياضة المغناطيسية حاملة القارورة و الهاتف',
    darjaHook: '💪 تلصق بالمغناطيس في لي ماشين تاع لاصال! تليفونك و قرعتك ديما نقية و قدامك',
    category: 'Sport & Quotidien',
    categoryAr: 'رياضة و يوميات',
    badge: 'جديد 🔥',
    rating: '4.9/5',
    reviewsCount: 189,
    price: 3900,
    comparePrice: 5500,
    description: 'Le sac de sport aimanté qui se fixe sur toutes les surfaces métalliques pour garder ta gourde, ton téléphone et tes clés hors du sol à la salle.',
    descriptionAr: 'حقيبة رياضية بمغناطيس خارق تلصق في كامل آلات الرياضة والحديد، ترفد القرعة تاع الماء، التليفون و المفاتح بعيد على الأرض.',
    features: [
      'Aimant ultra-puissant — مغناطيس قوي بزاف يشد حتى و القرعة معمرة',
      'Porte-gourde ajustable — بلاصة خاصة للقرعة أو الشيكر مع خيط تضييق',
      'Poche zippée + Porte-clés — جيب بالسلسلة للتليفون و علاق للمفاتح'
    ],
    images: [
      './produits/sac-magnetique-2-fr.jpg',
      './produits/sac-magnetique-1.webp',
      './produits/sac-magnetique-3.webp',
      './produits/sac-magnetique-4.webp'
    ],
    reviews: [
      { author: 'Walid (Sétif 19)', text: 'خاوتي المغناطيس تاعو قوووة! نحط فيه قرعة تاع لتر و التليفون و يلصق في الماشينة ما يتحركش.' },
      { author: 'Sofiane (Alger 16)', text: 'Qualité top, enfin je ne pose plus mes affaires par terre à la salle.' }
    ],
    faqs: [
      { q: 'شحال ترفد من لتر؟ (Taille de gourde ?)', a: 'ترفد القرع و الشيكر حتى 1.2 لتر بكل سهولة.' },
      { q: 'المغناطيس ما يضرش التليفون؟', a: 'أبداً، المغناطيس معزول في الظهر و آمن 100% على جميع الهواتف.' }
    ]
  }
];

// ============================================================================
// 4. ÉTAT & LANGUE (AR / FR)
// ============================================================================
let currentLang = localStorage.getItem('elwesmou_lang') || 'ar'; // Par défaut Arabe/Darja + FR pour l'Algérie
let activeCategory = 'Tout';
let selectedImages = {};
let selectedBundleQty = 1;
let selectedWilayaCode = '16';
let selectedDeliveryType = 'home'; // 'home' (لباب الدار) ou 'desk' (Stop Desk)

function formatDA(num) {
  return num.toLocaleString('fr-DZ') + ' د.ج (DA)';
}

function applyLangDirection() {
  document.body.classList.toggle('rtl', currentLang === 'ar');
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.innerHTML = currentLang === 'ar' ? '🇫🇷 Français' : '🇩🇿 العربية / الدارجة';
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'fr' : 'ar';
  localStorage.setItem('elwesmou_lang', currentLang);
  applyLangDirection();
  renderCategories();
  renderProducts();
  renderLandingPage();
}

// ============================================================================
// 5. RENDU CATALOGUE ACCUEIL
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
  const filtered = PRODUCTS.filter(item => activeCategory === 'Tout' || item.category === activeCategory);

  productGrid.innerHTML = filtered.map(product => {
    const currentImgIndex = selectedImages[product.id] || 0;
    const currentImg = product.images[currentImgIndex];
    const title = currentLang === 'ar' ? product.nameAr : product.name;
    const desc = currentLang === 'ar' ? product.descriptionAr : product.description;
    const catName = currentLang === 'ar' ? product.categoryAr : product.category;

    return `
      <article class="product-card">
        <a href="./${product.slug}" class="product-img-wrap">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
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
            ${product.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <div class="product-bottom">
            <div class="price-block">
              <span class="price-old">${formatDA(product.comparePrice)}</span>
              <span class="product-price">${formatDA(product.price)}</span>
            </div>
            <a href="./${product.slug}" class="btn-primary">
              ${currentLang === 'ar' ? 'أطلب الآن 🛒' : 'Commander 🛒'}
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ============================================================================
// 6. RENDU LANDING PAGE PRODUIT (SPÉCIAL PUB ALGÉRIE COD + GOOGLE SHEETS)
// ============================================================================
function getDeliveryCost() {
  const w = WILAYAS_DZ.find(x => x.code === selectedWilayaCode) || WILAYAS_DZ[15];
  return selectedDeliveryType === 'home' ? w.home : w.desk;
}

function getBundleProductTotal(product) {
  if (selectedBundleQty === 1) return product.price;
  if (selectedBundleQty === 2) return Math.round((product.price * 2 * 0.85) / 50) * 50; // -15%
  return Math.round((product.price * 3 * 0.75) / 50) * 50; // -25%
}

function renderLandingPage() {
  if (!landingRoot) return;
  const productId = landingRoot.dataset.productId;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const activeImgIndex = selectedImages[product.id] || 0;
  const activeImg = product.images[activeImgIndex];

  const p1 = product.price;
  const p2 = Math.round((product.price * 2 * 0.85) / 50) * 50;
  const p3 = Math.round((product.price * 3 * 0.75) / 50) * 50;

  const subTotal = getBundleProductTotal(product);
  const deliveryCost = getDeliveryCost();
  const grandTotal = subTotal + deliveryCost;

  landingRoot.innerHTML = `
    <div class="breadcrumb">
      <a href="./index.html">${currentLang === 'ar' ? 'الرئيسية (Accueil)' : 'Accueil'}</a> &rsaquo;
      <span>${currentLang === 'ar' ? product.categoryAr : product.category}</span> &rsaquo;
      <strong>${currentLang === 'ar' ? product.nameAr : product.name}</strong>
    </div>

    <div class="landing-hero">
      <!-- Colonne Galerie Photo -->
      <div>
        <div class="landing-gallery-main">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          <img src="${activeImg}" alt="${product.name}" />
        </div>
        <div class="landing-thumbs">
          ${product.images.map((img, i) => `
            <button class="${i === activeImgIndex ? 'active' : ''}" onclick="switchLandingImage('${product.id}', ${i})">
              <img src="${img}" alt="Photo ${i + 1}" />
            </button>
          `).join('')}
        </div>

        <ul class="product-features" style="margin-top:20px;gap:8px;">
          ${product.features.map(f => `<li style="font-size:0.92rem;">${f}</li>`).join('')}
        </ul>
      </div>

      <!-- Colonne Formulaire COD Direct (Algérie 58 Wilayas) -->
      <div class="landing-details">
        <div class="rating-row">
          <span class="stars">★★★★★</span>
          <span>${product.rating} (${product.reviewsCount} تقييم زبائننا في الجزائر)</span>
        </div>

        <h1 class="landing-title">${currentLang === 'ar' ? product.nameAr : product.name}</h1>

        <div class="darja-subtitle">${product.darjaHook}</div>

        <div class="landing-price-row">
          <span class="landing-price-current">${formatDA(product.price)}</span>
          <span class="landing-price-compare">${formatDA(product.comparePrice)}</span>
          <span class="promo-pill">تخفيض خاص اليوم 🔥</span>
        </div>

        <!-- BOÎTE DE COMMANDE DIRECTE COD -->
        <div class="cod-direct-box" id="codOrderBox">
          <div class="cod-box-header">
            <h3>📋 إستمارة الطلب المباشر (Commander en 1 clic)</h3>
            <p>عمر المعلومات تاعك هنا و نعيطولك في التليفون نأكدوا الطلبية — الدفع كي توصلك السلعة!</p>
          </div>

          <form id="directCodForm" onsubmit="submitCodOrder(event, '${product.id}')">
            <!-- Choix de l'offre / Quantité -->
            <div class="bundle-selector">
              <div class="bundle-option ${selectedBundleQty === 1 ? 'active' : ''}" onclick="selectBundle(1)">
                <div class="bundle-left">
                  <div class="bundle-radio"></div>
                  <div>
                    <div class="bundle-name">قطعة واحدة (1x Unité)</div>
                    <div class="bundle-sub">العرض العادي</div>
                  </div>
                </div>
                <div class="bundle-price">${formatDA(p1)}</div>
              </div>

              <div class="bundle-option ${selectedBundleQty === 2 ? 'active' : ''}" onclick="selectBundle(2)">
                <div class="bundle-left">
                  <div class="bundle-radio"></div>
                  <div>
                    <div class="bundle-name">قطعتين (Pack 2x) <span class="bundle-tag">تخفيض -15% 🔥</span></div>
                    <div class="bundle-sub">رابح أكثر في السومة و التوصيل</div>
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
                    <div class="bundle-name">3 قطع (Pack 3x) <span class="bundle-tag">أحسن عرض -25% ⭐</span></div>
                    <div class="bundle-sub">أكبر اقتصاد + أولوية في التوصيل</div>
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
                <label>👤 الإسم و اللقب (Nom & Prénom) *</label>
                <input type="text" id="codName" required placeholder="مثال: محمد بن علي" />
              </div>
              <div class="form-group">
                <label>📞 رقم الهاتف (Numéro Téléphone) *</label>
                <input type="tel" id="codPhone" required pattern="[0-9+ ]{9,14}" placeholder="05 / 06 / 07 XX XX XX XX" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>📍 الولاية (Wilaya 1 - 58) *</label>
                <select id="codWilaya" onchange="changeWilaya(this.value)" required>
                  ${WILAYAS_DZ.map(w => `
                    <option value="${w.code}" ${w.code === selectedWilayaCode ? 'selected' : ''}>${w.name}</option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>🏘️ البلدية / العنوان (Commune) *</label>
                <input type="text" id="codCommune" required placeholder="أكتب اسم البلدية تاعك" />
              </div>
            </div>

            <div class="form-group">
              <label>🚚 نوع التوصيل (Mode de livraison) *</label>
              <select id="codDeliveryType" onchange="changeDeliveryType(this.value)">
                <option value="home" ${selectedDeliveryType === 'home' ? 'selected' : ''}>🏠 التوصيل لباب الدار (À domicile)</option>
                <option value="desk" ${selectedDeliveryType === 'desk' ? 'selected' : ''}>🏢 التوصيل للمكتب (Stop Desk — أرخص)</option>
              </select>
            </div>

            <!-- Récapitulatif en DA -->
            <div class="cod-summary-box">
              <div class="cod-summary-line">
                <span>ثمن السلعة (${selectedBundleQty}x) :</span>
                <strong>${formatDA(subTotal)}</strong>
              </div>
              <div class="cod-summary-line">
                <span>سعر التوصيل (${selectedDeliveryType === 'home' ? 'لباب الدار' : 'للمكتب Stop Desk'}) :</span>
                <strong>${formatDA(deliveryCost)}</strong>
              </div>
              <div class="cod-summary-total">
                <span>المجموع الكلي (Total à payer à la livraison) :</span>
                <span>${formatDA(grandTotal)}</span>
              </div>
            </div>

            <button type="submit" class="btn-buy-now" id="codSubmitBtn">
              🔥 أطلب الآن — الدفع عند الاستلام (${formatDA(grandTotal)})
            </button>
          </form>
        </div>

        <!-- Badges de Réassurance Algérie -->
        <div class="trust-badges">
          <div class="trust-item">
            <span>🇩🇿</span>
            <strong>توصيل 58 ولاية</strong>
            <span>لباب الدار أو المكتب</span>
          </div>
          <div class="trust-item">
            <span>🤝</span>
            <strong>الدفع عند الاستلام</strong>
            <span>تخلص كي تشوف سلعتك</span>
          </div>
          <div class="trust-item">
            <span>🔄</span>
            <strong>ضمان الإستبدال</strong>
            <span>خدمة زبائن 7/7</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Avis Clients & FAQ -->
    <div class="landing-sections">
      <div class="info-card">
        <h3>⭐ آراء الزبائن (Avis Clients Vérifiés)</h3>
        ${product.reviews.map(r => `
          <div class="review-item">
            <div class="review-header">
              <span>${r.author} <span class="stars">★★★★★</span></span>
              <span class="verified-badge">✓ زبون مؤكد</span>
            </div>
            <p style="font-size:0.9rem;color:var(--text-secondary);">${r.text}</p>
          </div>
        `).join('')}
      </div>

      <div class="info-card">
        <h3>❓ أسئلة شائعة (Questions Fréquentes)</h3>
        ${product.faqs.map(f => `
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
// 7. ENVOI DE LA COMMANDE VERS GOOGLE SHEETS + SAUVEGARDE LOCALE
// ============================================================================
async function submitCodOrder(e, productId) {
  e.preventDefault();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const btn = document.getElementById('codSubmitBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ جاري تسجيل الطلبية... (Envoi en cours...)';
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
    wilaya: wilayaObj.name,
    commune: document.getElementById('codCommune').value.trim(),
    deliveryType: selectedDeliveryType === 'home' ? 'À domicile (لباب الدار)' : 'Stop Desk (للمكتب)',
    deliveryCost: deliveryCost + ' DA',
    totalDA: grandTotal + ' DA',
    status: 'En attente de confirmation (في انتظار التأكيد)'
  };

  // 1. Sauvegarde locale (pour le suivi de commande et historique)
  const existingOrders = JSON.parse(localStorage.getItem('elwesmou_orders') || '[]');
  existingOrders.unshift(orderData);
  localStorage.setItem('elwesmou_orders', JSON.stringify(existingOrders));

  // 2. Envoi vers Google Sheets si l'URL Webhook est configurée
  if (GOOGLE_SHEET_WEBHOOK_URL) {
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch (err) {
      console.error('Erreur Google Sheet:', err);
    }
  }

  // 3. Message de confirmation en Arabe/Darja & Français
  const box = document.getElementById('codOrderBox');
  box.innerHTML = `
    <div style="text-align:center;padding:24px 12px;">
      <div style="width:64px;height:64px;border-radius:50%;background:#DCFCE7;color:#15803D;display:inline-flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:14px;">✓</div>
      <h3 style="font-size:1.4rem;font-weight:900;margin-bottom:8px;">🎉 بصحتك! تم تسجيل طلبيتك بنجاح</h3>
      <p style="font-size:0.98rem;font-weight:700;color:var(--brand-orange);margin-bottom:10px;">
        رقم الطلبية : ${orderData.orderId}
      </p>
      <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:18px;">
        شكراً لك <strong>${orderData.customerName}</strong>! راح نعيطولك قريباً على الرقم <strong>${orderData.phone}</strong> باش نأكدوا الطلبية و نبعثوهالك لـ <strong>${orderData.wilaya}</strong>. خبي التليفون تاعك شاعل 📞
      </p>
      <a href="./suivi-commande.html?phone=${encodeURIComponent(orderData.phone)}" class="btn-primary">
        📦 تتبع طلبيتي (Suivre ma commande)
      </a>
    </div>
  `;
}

// Initialisation
applyLangDirection();
renderCategories();
renderProducts();
renderLandingPage();
