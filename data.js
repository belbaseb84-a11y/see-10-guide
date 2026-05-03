/* ===================================================
   see2083 — Data Store
   All mediums, subjects, chapters, and sample content
   =================================================== */

const S2083 = {};

// ─── Mediums ─────────────────────────────────────────
S2083.mediums = [
  {
    id: "english",
    label: "English Medium",
    labelNp: "अंग्रेजी माध्यम",
    icon: "📘",
    desc: "Study all SEE subjects in English.",
    descNp: "अंग्रेजीमा सबै SEE विषयहरू पढ्नुहोस्।",
    tag: "English Medium"
  },
  {
    id: "nepali",
    label: "Nepali Medium",
    labelNp: "नेपाली माध्यम",
    icon: "📗",
    desc: "Study all SEE subjects in Nepali.",
    descNp: "नेपालीमा सबै SEE विषयहरू पढ्नुहोस्।",
    tag: "Nepali Medium"
  },
  {
    id: "electrical",
    label: "Electrical Engineering",
    labelNp: "इलेक्ट्रिकल इन्जिनियरिङ",
    icon: "⚡",
    desc: "Technical stream with specialized subjects.",
    descNp: "विशेष प्राविधिक विषयहरू सहित।",
    tag: "Technical Stream"
  }
];

// ─── Subjects ─────────────────────────────────────────
S2083.subjects = [
  {
    id: "english",
    name: "Compulsory English",
    nameNp: "अनिवार्य अंग्रेजी",
    icon: "📖",
    category: "compulsory",
    mediumGroup: "common",
    units: 18,
    description: "18 units of reading, writing, and grammar for SEE preparation.",
    descriptionNp: "SEE तयारीका लागि पठन, लेखन र व्याकरणका १८ एकाइ।"
  },
  {
    id: "nepali",
    name: "Compulsory Nepali",
    nameNp: "अनिवार्य नेपाली",
    icon: "✍️",
    category: "compulsory",
    mediumGroup: "common",
    units: 17,
    description: "17 units of prose, poetry, and grammar in Nepali.",
    descriptionNp: "नेपालीमा गद्य, पद्य र व्याकरणका १७ एकाइ।"
  },
  {
    id: "math",
    name: "Compulsory Mathematics",
    nameNp: "अनिवार्य गणित",
    icon: "📐",
    category: "compulsory",
    mediumGroup: "common",
    units: 18,
    description: "18 chapters covering arithmetic, algebra, geometry, and statistics.",
    descriptionNp: "अंकगणित, बीजगणित, ज्यामिति र तथ्याङ्कका १८ अध्यायहरू।"
  },
  {
    id: "science",
    name: "Science and Technology",
    nameNp: "विज्ञान तथा प्रविधि",
    icon: "🔬",
    category: "compulsory",
    mediumGroup: "common",
    units: 19,
    description: "19 units covering biology, physics, chemistry, and ICT.",
    descriptionNp: "जीवविज्ञान, भौतिकशास्त्र, रसायन र ICT का १९ एकाइ।"
  },
  {
    id: "social",
    name: "Social Studies and Life Skills Education",
    nameNp: "सामाजिक अध्ययन तथा जीवनोपयोगी शिक्षा",
    icon: "🌏",
    category: "compulsory",
    mediumGroup: "common",
    units: 10,
    description: "10 units covering society, history, geography, and civic education.",
    descriptionNp: "समाज, इतिहास, भूगोल र नागरिक शिक्षाका १० एकाइ।"
  },
  {
    id: "computer",
    name: "Computer Science",
    nameNp: "कम्प्युटर विज्ञान",
    icon: "💻",
    category: "optional",
    mediumGroup: "common",
    units: 10,
    description: "10 units from hardware basics to QBASIC programming.",
    descriptionNp: "हार्डवेयर आधारदेखि QBASIC प्रोग्रामिङसम्म १० एकाइ।"
  },
  {
    id: "account",
    name: "Account",
    nameNp: "लेखा",
    icon: "📊",
    category: "optional",
    mediumGroup: "common",
    units: 10,
    description: "10 chapters of fundamental accounting principles and practices.",
    descriptionNp: "लेखाका आधारभूत सिद्धान्त र अभ्यासका १० अध्याय।"
  },
  {
    id: "economics",
    name: "Economics",
    nameNp: "अर्थशास्त्र",
    icon: "📈",
    category: "optional",
    mediumGroup: "common",
    units: 8,
    description: "8 chapters covering demand, supply, markets, and Nepal's economy.",
    descriptionNp: "माग, आपूर्ति, बजार र नेपाली अर्थतन्त्रका ८ अध्याय।"
  },
  {
    id: "opt-math",
    name: "Optional Mathematics",
    nameNp: "ऐच्छिक गणित",
    icon: "🧮",
    category: "optional",
    mediumGroup: "common",
    units: 8,
    description: "8 advanced units covering algebra, calculus, coordinate geometry, and more.",
    descriptionNp: "बीजगणित, क्याल्कुलस, निर्देशांक ज्यामितिका ८ उन्नत एकाइ।"
  },
  {
    id: "env",
    name: "Environment, Population and Health",
    nameNp: "वातावरण, जनसंख्या तथा स्वास्थ्य",
    icon: "🌱",
    category: "optional",
    mediumGroup: "common",
    units: 10,
    description: "10 units on environment, population management, and health education.",
    descriptionNp: "वातावरण, जनसंख्या व्यवस्थापन र स्वास्थ्य शिक्षाका १० एकाइ।"
  },
  // Electrical Technical
  {
    id: "eng-drawing",
    name: "Engineering Drawing",
    nameNp: "इन्जिनियरिङ ड्रइङ",
    icon: "📏",
    category: "technical",
    mediumGroup: "electrical",
    units: 6,
    description: "Fundamentals of engineering drawing, projections, and technical illustrations.",
    descriptionNp: ""
  },
  {
    id: "elec-measure",
    name: "Electrical Measurements and Instruments",
    nameNp: "विद्युतीय मापन र उपकरण",
    icon: "🔌",
    category: "technical",
    mediumGroup: "electrical",
    units: 6,
    description: "Study of measuring instruments, AC/DC circuits, and electrical units.",
    descriptionNp: ""
  },
  {
    id: "elec-util",
    name: "Utilization of Electrical Energy",
    nameNp: "विद्युतीय ऊर्जाको उपयोग",
    icon: "💡",
    category: "technical",
    mediumGroup: "electrical",
    units: 5,
    description: "Lighting systems, heating, welding, and electric traction fundamentals.",
    descriptionNp: ""
  },
  {
    id: "electronics",
    name: "Electronic Devices and Circuits",
    nameNp: "इलेक्ट्रोनिक उपकरण र परिपथ",
    icon: "🔋",
    category: "technical",
    mediumGroup: "electrical",
    units: 6,
    description: "Semiconductor devices, diodes, transistors, and basic circuit analysis.",
    descriptionNp: ""
  },
  {
    id: "elec-machine",
    name: "Electrical Machine",
    nameNp: "विद्युतीय मेसिन",
    icon: "⚙️",
    category: "technical",
    mediumGroup: "electrical",
    units: 5,
    description: "DC motors, generators, transformers, and AC motors.",
    descriptionNp: ""
  },
  {
    id: "industrial",
    name: "Industrial Installation and Maintenance",
    nameNp: "औद्योगिक स्थापना र मर्मत",
    icon: "🏭",
    category: "technical",
    mediumGroup: "electrical",
    units: 5,
    description: "Wiring systems, industrial safety, and maintenance practices.",
    descriptionNp: ""
  }
];

// ─── Chapters ─────────────────────────────────────────
S2083.chapters = {
  science: [
    { id:"scientific-study", number:1, title:"Scientific Study", titleNp:"वैज्ञानिक अध्ययन", summary:"Learn the basics of scientific investigation and observation.", summaryNp:"वैज्ञानिक अध्ययन र अवलोकनका आधारभूत कुरा सिक्नुहोस्।" },
    { id:"classification-living", number:2, title:"Classification of Living Beings", titleNp:"सजीवहरूको वर्गीकरण", summary:"Explore how organisms are classified into kingdoms and groups.", summaryNp:"जीवहरूलाई किंगडम र समूहमा कसरी वर्गीकृत गरिन्छ अन्वेषण गर्नुहोस्।" },
    { id:"honey-bee", number:3, title:"Honey Bee", titleNp:"मौरी", summary:"Study the structure, behavior, and economic importance of honey bees.", summaryNp:"मौरीको संरचना, व्यवहार र आर्थिक महत्त्व अध्ययन गर्नुहोस्।" },
    { id:"heredity", number:4, title:"Heredity", titleNp:"वंशानुक्रम", summary:"Understand how traits are passed from parents to offspring.", summaryNp:"आनुवंशिक लक्षणहरू बाबुआमाबाट सन्तानमा कसरी जान्छन् बुझ्नुहोस्।" },
    { id:"life-process", number:5, title:"Physiological Structure and Life Process", titleNp:"जीवन प्रक्रिया", summary:"Study blood circulation, respiration, and physiological processes in the human body.", summaryNp:"मानव शरीरमा रक्त सञ्चार, श्वासप्रश्वास र शारीरिक प्रक्रियाहरू।" },
    { id:"nature-environment", number:6, title:"Nature and Environment", titleNp:"प्रकृति र वातावरण", summary:"Understand ecosystems, biodiversity, and environmental challenges.", summaryNp:"पारिस्थितिक तन्त्र, जैविक विविधता र वातावरणीय चुनौतीहरू।" },
    { id:"motion-force", number:7, title:"Motion and Force", titleNp:"बल र चाल", summary:"Explore Newton's laws, motion equations, and real-world applications.", summaryNp:"न्युटनका नियमहरू, गति समीकरण र वास्तविक अनुप्रयोगहरू।" },
    { id:"pressure", number:8, title:"Pressure", titleNp:"चाप", summary:"Study pressure in solids, liquids, and gases with practical examples.", summaryNp:"ठोस, तरल र ग्यासमा चापको अध्ययन।" },
    { id:"heat", number:9, title:"Heat", titleNp:"ताप शक्ति", summary:"Learn about temperature, heat transfer, and thermal expansion.", summaryNp:"तापक्रम, ताप स्थानान्तरण र तापीय विस्तारबारे सिक्नुहोस्।" },
    { id:"wave", number:10, title:"Wave", titleNp:"तरङ्ग", summary:"Understand wave properties, sound, and light with formulas.", summaryNp:"तरंग गुणहरू, ध्वनि र प्रकाशबारे सूत्रसहित बुझ्नुहोस्।" },
    { id:"electricity-magnetism", number:11, title:"Electricity and Magnetism", titleNp:"विद्युत् र चुम्बकत्व", summary:"Explore electric circuits, Ohm's law, magnetism, and electromagnetic induction.", summaryNp:"विद्युत् परिपथ, ओमको नियम, चुम्बकत्व र विद्युत् चुम्बकीय प्रेरण।" },
    { id:"universe", number:12, title:"Universe", titleNp:"ब्रह्माण्ड", summary:"Study the solar system, galaxies, stars, and space exploration.", summaryNp:"सौर्यमण्डल, आकाशगंगा, तारा र अन्तरिक्ष अन्वेषण।" },
    { id:"ict", number:13, title:"Information and Communication Technology", titleNp:"सूचना तथा सञ्चार प्रविधि", summary:"Overview of modern ICT, the internet, and digital communication.", summaryNp:"आधुनिक ICT, इन्टरनेट र डिजिटल सञ्चारको अवलोकन।" },
    { id:"element-classification", number:14, title:"Classification of Elements", titleNp:"तत्त्वहरूको वर्गीकरण", summary:"Learn the periodic table, element properties, and periodicity.", summaryNp:"आवधिक तालिका, तत्त्वहरूका गुण र आवधिकता।" },
    { id:"chemical-reaction", number:15, title:"Chemical Reaction", titleNp:"रासायनिक प्रतिक्रिया", summary:"Understand types of chemical reactions, balancing equations, and reaction rates.", summaryNp:"रासायनिक प्रतिक्रियाका प्रकार, समीकरण मिलाउन र दरहरू।" },
    { id:"gases", number:16, title:"Gases", titleNp:"ग्यासहरू", summary:"Study gas laws, properties, and preparation of common gases.", summaryNp:"ग्याससम्बन्धी नियम, गुण र सामान्य ग्यासहरूको तयारी।" },
    { id:"metals-nonmetals", number:17, title:"Metals and Non-metals", titleNp:"धातु र अधातु", summary:"Compare physical and chemical properties of metals and non-metals.", summaryNp:"धातु र अधातुका भौतिक र रासायनिक गुणहरूको तुलना।" },
    { id:"hydrocarbon", number:18, title:"Hydrocarbon and its Compounds", titleNp:"हाइड्रोकार्बन र यसका यौगिकहरू", summary:"Introduction to organic chemistry, hydrocarbons, and their uses.", summaryNp:"अर्गानिक रसायन, हाइड्रोकार्बन र तिनका उपयोगहरू।" },
    { id:"daily-chemicals", number:19, title:"Chemicals Used in Daily Life", titleNp:"दैनिक जीवनमा प्रयोग हुने रसायनहरू", summary:"Learn about soaps, detergents, medicines, and common household chemicals.", summaryNp:"साबुन, डिटर्जेन्ट, औषधि र घरायसी रसायनहरू।" }
  ],
  english: [
    { id:"current-affairs", number:1, title:"Current Affairs and Issues", titleNp:"", summary:"Reading and vocabulary on global current events and pressing issues.", summaryNp:"" },
    { id:"festivals", number:2, title:"Festivals and Celebrations", titleNp:"", summary:"Reading and cultural understanding of festivals around the world.", summaryNp:"" },
    { id:"health-wellness", number:3, title:"Health and Wellness", titleNp:"", summary:"Understanding health topics through reading and writing exercises.", summaryNp:"" },
    { id:"work-leisure", number:4, title:"Work and Leisure", titleNp:"", summary:"Vocabulary and reading passages on work life and free time.", summaryNp:"" },
    { id:"science-experiments", number:5, title:"Science and Experiments", titleNp:"", summary:"Reading scientific texts and writing about experimental processes.", summaryNp:"" },
    { id:"food-cuisine", number:6, title:"Food and Cuisine", titleNp:"", summary:"Descriptive and persuasive writing about food culture globally.", summaryNp:"" },
    { id:"cyber-security", number:7, title:"Cyber Security", titleNp:"", summary:"Reading and writing on digital safety and online security.", summaryNp:"" },
    { id:"hobbies", number:8, title:"Hobbies and Interests", titleNp:"", summary:"Vocabulary and communication skills around leisure activities.", summaryNp:"" },
    { id:"history-culture", number:9, title:"History and Culture", titleNp:"", summary:"Reading historical texts and cultural narratives.", summaryNp:"" },
    { id:"games-sports", number:10, title:"Games and Sports", titleNp:"", summary:"Language of sports and reading sports journalism.", summaryNp:"" },
    { id:"ethics", number:11, title:"Ethics and Morality", titleNp:"", summary:"Reading and writing on moral values and ethical dilemmas.", summaryNp:"" },
    { id:"nature-dev", number:12, title:"Nature and Development", titleNp:"", summary:"Environment and development themes in reading passages.", summaryNp:"" },
    { id:"population", number:13, title:"Population and Migration", titleNp:"", summary:"Understanding demographic texts and migration stories.", summaryNp:"" },
    { id:"travel", number:14, title:"Travel and Adventure", titleNp:"", summary:"Travel writing, narrative texts, and descriptive passages.", summaryNp:"" },
    { id:"people-places", number:15, title:"People and Places", titleNp:"", summary:"Descriptive writing and biographies of notable people.", summaryNp:"" },
    { id:"success", number:16, title:"Success and Celebration", titleNp:"", summary:"Reading about achievement and writing celebratory pieces.", summaryNp:"" },
    { id:"countries-towns", number:17, title:"Countries and Towns", titleNp:"", summary:"Comparative reading about different places and cultures.", summaryNp:"" },
    { id:"media-entertainment", number:18, title:"Media and Entertainment", titleNp:"", summary:"Reading media texts, film reviews, and social media stories.", summaryNp:"" }
  ],
  nepali: [
    { id:"ujyalo-yatra", number:1, title:"उज्यालो यात्रा", titleNp:"उज्यालो यात्रा", summary:"A narrative exploring the journey toward light and progress.", summaryNp:"प्रकाश र प्रगतितर्फको यात्रा सम्बन्धी कथन।" },
    { id:"ghar-jhagada", number:2, title:"घर झगडा", titleNp:"घर झगडा", summary:"A story depicting domestic conflict and resolution.", summaryNp:"घरायसी विवाद र समाधानको कथा।" },
    { id:"chikitsa-vigyan", number:3, title:"चिकित्सा विज्ञान र आयुर्वेद", titleNp:"चिकित्सा विज्ञान र आयुर्वेद चिकित्सा", summary:"Overview of medical science and traditional Ayurveda.", summaryNp:"चिकित्सा विज्ञान र पारम्परिक आयुर्वेदको अवलोकन।" },
    { id:"yasto-kahilyai", number:4, title:"यस्तो कहिल्यै नहोस्", titleNp:"यस्तो कहिल्यै नहोस्", summary:"A social message about preventing harm and promoting values.", summaryNp:"हानि रोक्न र मूल्यहरू प्रवर्द्धन गर्ने सामाजिक सन्देश।" },
    { id:"devkota", number:5, title:"लक्ष्मीप्रसाद देवकोटा", titleNp:"लक्ष्मीप्रसाद देवकोटा", summary:"Biography and literary contributions of Mahakavi Devkota.", summaryNp:"महाकवि देवकोटाको जीवनी र साहित्यिक योगदान।" },
    { id:"adhikar-kartavya", number:6, title:"अधिकार ठुलो कि कर्तव्य ठुलो", titleNp:"अधिकार ठुलो कि कर्तव्य ठुलो", summary:"An argument on rights versus duties in civic life.", summaryNp:"नागरिक जीवनमा अधिकार र कर्तव्यबारे बहस।" },
    { id:"shatru", number:7, title:"शत्रु", titleNp:"शत्रु", summary:"A story exploring themes of enmity, perspective, and reconciliation.", summaryNp:"शत्रुता, दृष्टिकोण र मेलमिलापका विषयहरूमा कथा।" },
    { id:"nepali-shram", number:8, title:"नेपाली हाम्रो श्रम र सिप", titleNp:"नेपाली हाम्रो श्रम र सिप", summary:"Celebrating Nepali craftsmanship, skills, and labor.", summaryNp:"नेपाली शिल्पकारिता, सीप र श्रमको उत्सव।" },
    { id:"mero-desh-shiksha", number:9, title:"मेरो देशको शिक्षा", titleNp:"मेरो देशको शिक्षा", summary:"Reflections on Nepal's education system and its challenges.", summaryNp:"नेपालको शिक्षा प्रणाली र यसका चुनौतीहरूमा विचार।" },
    { id:"vyavsayik-chithi", number:10, title:"व्यावसायिक चिठी", titleNp:"व्यावसायिक चिठी", summary:"Format and practice of writing formal business letters.", summaryNp:"औपचारिक व्यावसायिक पत्र लेख्ने ढाँचा र अभ्यास।" },
    { id:"kartavya", number:11, title:"कर्तव्य", titleNp:"कर्तव्य", summary:"A narrative on duty, responsibility, and moral obligation.", summaryNp:"कर्तव्य, जिम्मेवारी र नैतिक दायित्वमा कथन।" },
    { id:"picasso", number:12, title:"पाब्लो पिकासो", titleNp:"पाब्लो पिकासो", summary:"Biography of Pablo Picasso and his contributions to modern art.", summaryNp:"पाब्लो पिकासोको जीवनी र आधुनिक कलामा योगदान।" },
    { id:"parkhnos", number:13, title:"पर्खनोस्", titleNp:"पर्खनोस्", summary:"A drama or poem exploring patience and emotional depth.", summaryNp:"धैर्य र भावनात्मक गहिराइ अन्वेषण गर्ने नाटक वा कविता।" },
    { id:"ghar-maya", number:14, title:"घरको माया", titleNp:"घरको माया", summary:"A sentimental piece about love for home and homeland.", summaryNp:"घर र मातृभूमिप्रतिको प्रेमबारे भावनात्मक रचना।" },
    { id:"gaun-kavita", number:15, title:"गाउँमाथि एउटा कविता", titleNp:"गाउँमाथि एउटा कविता", summary:"Poetry celebrating rural Nepal and village life.", summaryNp:"ग्रामीण नेपाल र गाउँले जीवन मनाउने कविता।" },
    { id:"aayam", number:16, title:"आयाम", titleNp:"आयाम", summary:"A text exploring dimensions of experience and understanding.", summaryNp:"अनुभव र बोधका आयामहरू खोज्ने पाठ।" },
    { id:"sunai-path", number:17, title:"सुनाइ पाठ", titleNp:"सुनाइ पाठ", summary:"Listening comprehension practice to strengthen oral understanding.", summaryNp:"मौखिक बोध बलियो बनाउन सुनाइ बोध अभ्यास।" }
  ],
  math: [
    { id:"sets", number:1, title:"Sets", titleNp:"समुच्चय", summary:"Types of sets, Venn diagrams, and set operations.", summaryNp:"समुच्चयका प्रकार, भेन आरेख र समुच्चय सञ्चालन।" },
    { id:"tax-money", number:2, title:"Tax and Money Exchange", titleNp:"कर र मुद्रा विनिमय", summary:"Income tax, VAT, and currency exchange calculations.", summaryNp:"आयकर, भ्याट र मुद्रा विनिमय गणना।" },
    { id:"compound-interest", number:3, title:"Compound Interest", titleNp:"चक्रवृद्धि ब्याज", summary:"Formulas and problems on compound interest and growth.", summaryNp:"चक्रवृद्धि ब्याजका सूत्र र समस्याहरू।" },
    { id:"population-growth", number:4, title:"Population Growth and Depreciation", titleNp:"जनसंख्या वृद्धि र मूल्यह्रास", summary:"Application of exponential growth and depreciation formulas.", summaryNp:"घातीय वृद्धि र मूल्यह्रास सूत्रहरूको प्रयोग।" },
    { id:"plane-surfaces", number:5, title:"Plane Surfaces", titleNp:"समतल क्षेत्रफल", summary:"Area of triangles, quadrilaterals, and composite figures.", summaryNp:"त्रिभुज, चतुर्भुज र मिश्रित आकृतिहरूको क्षेत्रफल।" },
    { id:"cylinder-sphere", number:6, title:"Cylinder and Sphere", titleNp:"बेलना र गोला", summary:"Surface area and volume of cylinders and spheres.", summaryNp:"बेलना र गोलाको पृष्ठक्षेत्र र आयतन।" },
    { id:"prism-pyramid", number:7, title:"Prism and Pyramid", titleNp:"प्रिज्म र पिरामिड", summary:"Volume and surface area of prisms and pyramids.", summaryNp:"प्रिज्म र पिरामिडको आयतन र पृष्ठक्षेत्र।" },
    { id:"hcf-lcm", number:8, title:"Highest Common Factor and LCM", titleNp:"महत्तम समापवर्तक र लसअ", summary:"Methods to find HCF and LCM with real-life applications.", summaryNp:"HCF र LCM खोज्ने तरिका र वास्तविक जीवनमा प्रयोग।" },
    { id:"radical-surd", number:9, title:"Radical and Surd", titleNp:"करणी र असूर्द", summary:"Simplification and operations on surds and radicals.", summaryNp:"करणी र असूर्दको सरलीकरण र सञ्चालन।" },
    { id:"indices", number:10, title:"Indices", titleNp:"घातांक", summary:"Laws of indices and their applications in algebra.", summaryNp:"घातांकका नियमहरू र बीजगणितमा प्रयोग।" },
    { id:"algebraic-fraction", number:11, title:"Algebraic Fraction", titleNp:"बीजगणितीय भिन्न", summary:"Simplification and operations of algebraic fractions.", summaryNp:"बीजगणितीय भिन्नको सरलीकरण र सञ्चालन।" },
    { id:"equations", number:12, title:"Equations", titleNp:"समीकरण", summary:"Linear and quadratic equations with word problems.", summaryNp:"रैखिक र द्विघात समीकरण र शब्द समस्याहरू।" },
    { id:"area-triangles", number:13, title:"Area of Triangles and Quadrilaterals", titleNp:"त्रिभुज र चतुर्भुजको क्षेत्रफल", summary:"Heron's formula and area of various quadrilaterals.", summaryNp:"हेरोनको सूत्र र विभिन्न चतुर्भुजको क्षेत्रफल।" },
    { id:"construction", number:14, title:"Construction", titleNp:"रचना", summary:"Geometric constructions using compass and ruler.", summaryNp:"परकार र रूलर प्रयोग गरी ज्यामितीय रचना।" },
    { id:"circle", number:15, title:"Circle", titleNp:"वृत्त", summary:"Theorems and problems related to circles, chords, and tangents.", summaryNp:"वृत्त, जीवा र स्पर्शरेखासम्बन्धी प्रमेय र समस्याहरू।" },
    { id:"trigonometry", number:16, title:"Trigonometry", titleNp:"त्रिकोणमिति", summary:"Trigonometric ratios, identities, and their applications.", summaryNp:"त्रिकोणमितीय अनुपात, सर्वसमिका र प्रयोगहरू।" },
    { id:"statistics", number:17, title:"Statistics", titleNp:"तथ्याङ्क", summary:"Mean, median, mode, and standard deviation.", summaryNp:"माध्य, मध्यिका, बहुलक र मानक विचलन।" },
    { id:"probability", number:18, title:"Probability", titleNp:"सम्भाव्यता", summary:"Basic probability, events, and probability theorems.", summaryNp:"आधारभूत सम्भाव्यता, घटना र सम्भाव्यता प्रमेयहरू।" }
  ],
  social: [
    { id:"we-society", number:1, title:"We and Our Society", titleNp:"हामी र हाम्रो समाज", summary:"Understanding social structures, institutions, and community.", summaryNp:"सामाजिक संरचना, संस्थाहरू र समुदायको बुझाइ।" },
    { id:"development", number:2, title:"Development and Development Infrastructures", titleNp:"विकास र विकास पूर्वाधार", summary:"Development concepts, infrastructure, and Nepal's progress.", summaryNp:"विकासका अवधारणा, पूर्वाधार र नेपालको प्रगति।" },
    { id:"social-values", number:3, title:"Our Social Values and Norms", titleNp:"हाम्रा सामाजिक मूल्य र मान्यता", summary:"Cultural values, social norms, and their role in society.", summaryNp:"सांस्कृतिक मूल्यहरू, सामाजिक मानकहरू र समाजमा भूमिका।" },
    { id:"social-problems", number:4, title:"Social Problems and Solutions", titleNp:"सामाजिक समस्या र समाधान", summary:"Common social issues in Nepal and approaches to solving them.", summaryNp:"नेपालका सामान्य सामाजिक समस्याहरू र समाधानका उपायहरू।" },
    { id:"civic-awareness", number:5, title:"Civic Awareness", titleNp:"नागरिक चेतना", summary:"Rights, duties, and participation in democratic governance.", summaryNp:"अधिकार, कर्तव्य र लोकतान्त्रिक शासनमा सहभागिता।" },
    { id:"our-earth", number:6, title:"Our Earth", titleNp:"हाम्री पृथ्वी", summary:"Geography of the earth, landforms, and natural phenomena.", summaryNp:"पृथ्वीको भूगोल, भूस्वरूप र प्राकृतिक घटनाहरू।" },
    { id:"our-past", number:7, title:"Our Past", titleNp:"हाम्रो इतिहास", summary:"Nepal's historical events, dynasties, and cultural heritage.", summaryNp:"नेपालका ऐतिहासिक घटनाहरू, वंशहरू र सांस्कृतिक सम्पदा।" },
    { id:"economic-activities", number:8, title:"Economic Activities", titleNp:"आर्थिक गतिविधि", summary:"Types of economic activities and Nepal's economic sectors.", summaryNp:"आर्थिक गतिविधिका प्रकार र नेपालका आर्थिक क्षेत्रहरू।" },
    { id:"international-relations", number:9, title:"International Relations and Cooperation", titleNp:"अन्तर्राष्ट्रिय सम्बन्ध र सहयोग", summary:"Nepal's foreign policy, international organizations, and cooperation.", summaryNp:"नेपालको विदेश नीति, अन्तर्राष्ट्रिय संगठनहरू र सहयोग।" },
    { id:"population-mgmt", number:10, title:"Population and Its Management", titleNp:"जनसंख्या र व्यवस्थापन", summary:"Population growth, distribution, and management strategies.", summaryNp:"जनसंख्या वृद्धि, वितरण र व्यवस्थापन रणनीतिहरू।" }
  ],
  computer: [
    { id:"intro-computer", number:1, title:"Introduction to Computer System", titleNp:"कम्प्युटर प्रणालीको परिचय", summary:"Overview of computer systems, types, and generation.", summaryNp:"कम्प्युटर प्रणाली, प्रकार र पुस्ताको अवलोकन।" },
    { id:"architecture", number:2, title:"Computer Architecture", titleNp:"कम्प्युटर संरचना", summary:"CPU, memory, input/output, and motherboard components.", summaryNp:"CPU, मेमोरी, इनपुट/आउटपुट र मदरबोर्ड कम्पोनेन्टहरू।" },
    { id:"os", number:3, title:"Operating System", titleNp:"अपरेटिङ सिस्टम", summary:"Functions, types, and examples of operating systems.", summaryNp:"अपरेटिङ सिस्टमका कार्य, प्रकार र उदाहरणहरू।" },
    { id:"word-processing", number:4, title:"Word Processing", titleNp:"शब्द प्रशोधन", summary:"Using word processors for document creation and formatting.", summaryNp:"कागजात सिर्जना र ढाँचाका लागि वर्ड प्रोसेसर प्रयोग।" },
    { id:"spreadsheet", number:5, title:"Spreadsheet Application", titleNp:"स्प्रेडसिट अनुप्रयोग", summary:"Formulas, functions, and charts in spreadsheet applications.", summaryNp:"स्प्रेडसिट अनुप्रयोगमा सूत्र, फंक्शन र चार्टहरू।" },
    { id:"dbms", number:6, title:"Database Management System (DBMS)", titleNp:"डाटाबेस व्यवस्थापन प्रणाली", summary:"Concepts of databases, tables, queries, and data management.", summaryNp:"डाटाबेस, तालिका, क्वेरी र डेटा व्यवस्थापनका अवधारणाहरू।" },
    { id:"networking", number:7, title:"Networking and Internet", titleNp:"नेटवर्किङ र इन्टरनेट", summary:"Types of networks, protocols, and internet services.", summaryNp:"नेटवर्कका प्रकार, प्रोटोकल र इन्टरनेट सेवाहरू।" },
    { id:"qbasic", number:8, title:"Programming in QBASIC", titleNp:"QBASIC प्रोग्रामिङ", summary:"QBASIC syntax, control structures, and basic programs.", summaryNp:"QBASIC सिन्ट्याक्स, नियन्त्रण संरचना र आधारभूत कार्यक्रमहरू।" },
    { id:"cyber-ethics", number:9, title:"Cyber Ethics and Security", titleNp:"साइबर नैतिकता र सुरक्षा", summary:"Digital citizenship, ethical use, and cybersecurity basics.", summaryNp:"डिजिटल नागरिकता, नैतिक प्रयोग र साइबर सुरक्षाका आधारहरू।" },
    { id:"e-governance", number:10, title:"E-Governance in Nepal", titleNp:"नेपालमा ई-शासन", summary:"Digital governance initiatives and e-services in Nepal.", summaryNp:"नेपालमा डिजिटल शासन पहल र ई-सेवाहरू।" }
  ],
  account: [
    { id:"intro-accounting", number:1, title:"Introduction to Accounting", titleNp:"लेखाको परिचय", summary:"Meaning, importance, and scope of accounting in business.", summaryNp:"व्यापारमा लेखाको अर्थ, महत्त्व र दायरा।" },
    { id:"accounting-principles", number:2, title:"Accounting Principles", titleNp:"लेखाका सिद्धान्त", summary:"GAAP, accounting concepts, and conventions.", summaryNp:"GAAP, लेखाका अवधारणा र परम्पराहरू।" },
    { id:"journal", number:3, title:"Journal Entries", titleNp:"जर्नल प्रविष्टि", summary:"Recording transactions using double-entry journal system.", summaryNp:"दोहोरो प्रविष्टि जर्नल प्रणाली प्रयोग गरी कारोबार अभिलेख।" },
    { id:"ledger", number:4, title:"Ledger", titleNp:"खाता बही", summary:"Posting to ledger accounts and balancing.", summaryNp:"खाता बहीमा पोस्टिङ र मिलान।" },
    { id:"trial-balance", number:5, title:"Trial Balance", titleNp:"परीक्षण मिलान", summary:"Preparing trial balance and identifying errors.", summaryNp:"परीक्षण मिलान तयार गर्ने र गल्तीहरू पहिचान गर्ने।" },
    { id:"cash-book", number:6, title:"Cash Book", titleNp:"नगद बही", summary:"Recording cash receipts and payments in cash book formats.", summaryNp:"नगद बही ढाँचामा नगद प्राप्ति र भुक्तानी अभिलेख।" },
    { id:"final-accounts", number:7, title:"Final Accounts", titleNp:"अन्तिम खाता", summary:"Preparing trading and profit and loss accounts.", summaryNp:"व्यापार र नाफा-नोक्सान खाता तयार गर्ने।" },
    { id:"balance-sheet", number:8, title:"Balance Sheet", titleNp:"स्थिति विवरण", summary:"Structure and preparation of balance sheet.", summaryNp:"स्थिति विवरणको संरचना र तयारी।" },
    { id:"depreciation", number:9, title:"Depreciation", titleNp:"मूल्यह्रास", summary:"Methods of depreciation and their accounting treatment.", summaryNp:"मूल्यह्रासका विधिहरू र लेखांकन उपचार।" },
    { id:"errors-rectification", number:10, title:"Errors and Rectification", titleNp:"गल्ती र सुधार", summary:"Types of accounting errors and methods to rectify them.", summaryNp:"लेखा गल्तीका प्रकार र तिनलाई सुधार्ने विधिहरू।" }
  ],
  economics: [
    { id:"intro-economics", number:1, title:"Introduction to Economics", titleNp:"अर्थशास्त्रको परिचय", summary:"Meaning, scope, and fundamental concepts of economics.", summaryNp:"अर्थशास्त्रको अर्थ, दायरा र आधारभूत अवधारणाहरू।" },
    { id:"demand-supply", number:2, title:"Basic Elements of Demand and Supply", titleNp:"माग र आपूर्तिका आधारभूत तत्त्व", summary:"Law of demand and supply, elasticity, and market equilibrium.", summaryNp:"माग र आपूर्तिको नियम, लोच र बजार सन्तुलन।" },
    { id:"market-price", number:3, title:"Market and Price Determination", titleNp:"बजार र मूल्य निर्धारण", summary:"Types of markets and price determination mechanisms.", summaryNp:"बजारका प्रकार र मूल्य निर्धारण संयन्त्रहरू।" },
    { id:"production-cost", number:4, title:"Production and Cost", titleNp:"उत्पादन र लागत", summary:"Factors of production, cost curves, and production functions.", summaryNp:"उत्पादनका साधन, लागत वक्र र उत्पादन कार्यहरू।" },
    { id:"national-income", number:5, title:"National Income", titleNp:"राष्ट्रिय आय", summary:"GDP, GNP, NNP, and methods of measuring national income.", summaryNp:"GDP, GNP, NNP र राष्ट्रिय आय मापन विधिहरू।" },
    { id:"economic-development", number:6, title:"Economic Development", titleNp:"आर्थिक विकास", summary:"Indicators of development and factors affecting economic growth.", summaryNp:"विकासका सूचकाङ्क र आर्थिक वृद्धिलाई असर गर्ने कारकहरू।" },
    { id:"population-economic", number:7, title:"Population and Economic Growth", titleNp:"जनसंख्या र आर्थिक वृद्धि", summary:"Relationship between population dynamics and economic development.", summaryNp:"जनसंख्या गतिशीलता र आर्थिक विकासबीचको सम्बन्ध।" },
    { id:"contemporary-issues", number:8, title:"Contemporary Economic Issues in Nepal", titleNp:"नेपालका समसामयिक आर्थिक मुद्दाहरू", summary:"Current challenges and opportunities in Nepal's economy.", summaryNp:"नेपालको अर्थतन्त्रमा हालका चुनौती र अवसरहरू।" }
  ],
  "opt-math": [
    {
      id:"algebra", number:1, title:"Algebra", titleNp:"बीजगणित",
      summary:"Sets, progressions, quadratic equations, and binomial theorem.",
      summaryNp:"समुच्चय, श्रेणी, द्विघात समीकरण र द्विपद प्रमेय।",
      subtopics:["Set","Arithmetic, Geometric and Harmonic Progression","Quadratic Equations","Inequalities","Permutation and Combination","Binomial Theorem"]
    },
    {
      id:"limit-continuity", number:2, title:"Limit and Continuity", titleNp:"सीमा र निरन्तरता",
      summary:"Concepts of limits, continuity, and introduction to calculus.",
      summaryNp:"सीमा, निरन्तरता र क्याल्कुलसको परिचय।",
      subtopics:["Introduction to Calculus","Limits","Continuity","Differentiation Basics"]
    },
    {
      id:"matrix", number:3, title:"Matrix", titleNp:"म्याट्रिक्स",
      summary:"Matrix operations, determinants, and applications.",
      summaryNp:"म्याट्रिक्स सञ्चालन, निर्धारक र प्रयोगहरू।",
      subtopics:["Types of Matrices","Matrix Operations","Determinants","Inverse of a Matrix"]
    },
    {
      id:"coord-geometry", number:4, title:"Coordinate Geometry", titleNp:"निर्देशांक ज्यामिति",
      summary:"Straight lines, circles, and coordinate geometry theorems.",
      summaryNp:"सरल रेखा, वृत्त र निर्देशांक ज्यामिति प्रमेयहरू।",
      subtopics:["Straight Lines","Angle between Lines","Circle","Pair of Lines"]
    },
    {
      id:"trig-opt", number:5, title:"Trigonometry", titleNp:"त्रिकोणमिति",
      summary:"Advanced trigonometric identities, equations, and heights and distances.",
      summaryNp:"उन्नत त्रिकोणमितीय सर्वसमिका, समीकरण र उचाइ-दूरी।",
      subtopics:["Trigonometric Identities and Equations","Heights and Distances","Inverse Trigonometric Functions"]
    },
    {
      id:"vector", number:6, title:"Vector", titleNp:"सदिश",
      summary:"Vector algebra, dot and cross products, and geometric applications.",
      summaryNp:"सदिश बीजगणित, डट र क्रस गुणन र ज्यामितीय प्रयोगहरू।",
      subtopics:["Introduction to Vectors","Dot Product","Cross Product","Applications of Vectors"]
    },
    {
      id:"transformation", number:7, title:"Transformation", titleNp:"रूपान्तरण",
      summary:"Reflection, rotation, translation, and enlargement.",
      summaryNp:"प्रतिबिम्ब, घुमाउ, स्थानान्तरण र विस्तार।",
      subtopics:["Reflection","Rotation","Translation","Enlargement and Reduction"]
    },
    {
      id:"statistics-opt", number:8, title:"Statistics", titleNp:"तथ्याङ्क",
      summary:"Correlation, regression, and advanced statistical analysis.",
      summaryNp:"सहसम्बन्ध, प्रतिगमन र उन्नत सांख्यिकीय विश्लेषण।",
      subtopics:["Correlation","Regression","Standard Deviation","Probability (Advanced)"]
    }
  ],
  env: [
    { id:"health-pop-env", number:1, title:"Concept of Health, Population and Environment", titleNp:"स्वास्थ्य, जनसंख्या र वातावरणको अवधारणा", summary:"Interrelationship between health, population, and environment.", summaryNp:"स्वास्थ्य, जनसंख्या र वातावरणबीचको अन्तर्सम्बन्ध।" },
    { id:"demography", number:2, title:"Demography, Population Change and Management", titleNp:"जनसांख्यिकी, जनसंख्या परिवर्तन र व्यवस्थापन", summary:"Study of demographic processes and population management strategies.", summaryNp:"जनसांख्यिकीय प्रक्रिया र जनसंख्या व्यवस्थापन रणनीतिहरू।" },
    { id:"pop-env-dev", number:3, title:"Population, Environment and Development", titleNp:"जनसंख्या, वातावरण र विकास", summary:"Links between population growth, environmental impact, and sustainable development.", summaryNp:"जनसंख्या वृद्धि, वातावरणीय प्रभाव र दिगो विकासबीचको सम्बन्ध।" },
    { id:"nepal-pop-env", number:4, title:"Population and Environmental Status of Nepal", titleNp:"नेपालको जनसंख्या र वातावरणीय अवस्था", summary:"Current population trends and environmental challenges in Nepal.", summaryNp:"नेपालमा हालको जनसंख्या प्रवृत्ति र वातावरणीय चुनौतीहरू।" },
    { id:"family-life", number:5, title:"Family Life Education and Quality of Life", titleNp:"पारिवारिक जीवन शिक्षा र जीवनस्तर", summary:"Reproductive health, family planning, and quality of life.", summaryNp:"प्रजनन स्वास्थ्य, परिवार नियोजन र जीवनस्तर।" },
    { id:"natural-resources", number:6, title:"Natural Resources and Biodiversity", titleNp:"प्राकृतिक स्रोत र जैविक विविधता", summary:"Conservation of natural resources and biodiversity in Nepal.", summaryNp:"नेपालमा प्राकृतिक स्रोत र जैविक विविधताको संरक्षण।" },
    { id:"env-health", number:7, title:"Environmental Health and Diseases", titleNp:"वातावरणीय स्वास्थ्य र रोगहरू", summary:"Environmental factors that affect human health and disease.", summaryNp:"मानव स्वास्थ्य र रोगलाई असर गर्ने वातावरणीय कारकहरू।" },
    { id:"adolescence", number:8, title:"Adolescence, Sexual and Reproductive Health", titleNp:"किशोरावस्था, यौन र प्रजनन स्वास्थ्य", summary:"Understanding adolescent development and reproductive health.", summaryNp:"किशोर विकास र प्रजनन स्वास्थ्यको बुझाइ।" },
    { id:"consumer-health", number:9, title:"Consumer's Health and Community Health", titleNp:"उपभोक्ता स्वास्थ्य र सामुदायिक स्वास्थ्य", summary:"Consumer rights, food safety, and community health practices.", summaryNp:"उपभोक्ता अधिकार, खाद्य सुरक्षा र सामुदायिक स्वास्थ्य अभ्यासहरू।" },
    { id:"primary-health", number:10, title:"Primary Health Care, Precaution and Safety", titleNp:"प्राथमिक स्वास्थ्य सेवा, सावधानी र सुरक्षा", summary:"Primary health care, first aid, and safety precautions.", summaryNp:"प्राथमिक स्वास्थ्य सेवा, प्राथमिक उपचार र सुरक्षा सावधानीहरू।" }
  ]
};

// ─── Study Options ────────────────────────────────────
S2083.studyOptions = [
  { id:"handwritten-note", icon:"✏️", title:"Handwritten Note", titleNp:"हस्तलिखित नोट", desc:"Handwritten notes for visual learners.", descNp:"दृश्यात्मक सिक्नेहरूका लागि हस्तलिखित नोटहरू।" },
  { id:"easy-note", icon:"📝", title:"Easy Note", titleNp:"सजिलो नोट", desc:"Simplified summary notes for quick revision.", descNp:"द्रुत पुनरावलोकनका लागि सरलीकृत नोटहरू।" },
  { id:"infographic", icon:"🗺️", title:"Infographic", titleNp:"इन्फोग्राफिक", desc:"Visual charts and diagrams to understand key concepts.", descNp:"मुख्य अवधारणाहरू बुझ्न दृश्य चार्ट र आरेखहरू।" },
  { id:"slide", icon:"🖼️", title:"Slide", titleNp:"स्लाइड", desc:"Presentation slides covering the full chapter.", descNp:"पूरा अध्याय समेट्ने प्रस्तुति स्लाइडहरू।" },
  { id:"mcq-practice", icon:"✅", title:"MCQ Practice", titleNp:"MCQ अभ्यास", desc:"Practice multiple-choice questions with instant feedback.", descNp:"तत्काल प्रतिक्रियासहित बहुविकल्पीय प्रश्नहरू अभ्यास गर्नुहोस्।" },
  { id:"mock-test", icon:"🎯", title:"Chapter Mock Test", titleNp:"अध्याय मोक टेस्ट", desc:"Timed mock test to assess your chapter preparation.", descNp:"अध्याय तयारी मूल्याङ्कन गर्न समयबद्ध मोक टेस्ट।" },
  { id:"short-questions", icon:"💬", title:"Short Questions", titleNp:"छोटा प्रश्नहरू", desc:"Important short answer questions with model answers.", descNp:"आदर्श उत्तरसहित महत्त्वपूर्ण छोटा उत्तर प्रश्नहरू।" },
  { id:"important-questions", icon:"⭐", title:"Important Questions", titleNp:"महत्त्वपूर्ण प्रश्नहरू", desc:"High-priority questions likely to appear in exams.", descNp:"परीक्षामा आउन सक्ने उच्च प्राथमिकताका प्रश्नहरू।" },
  { id:"past-questions", icon:"📋", title:"Past Questions", titleNp:"पुराना प्रश्नहरू", desc:"Previous years' exam questions organized by topic.", descNp:"विषय अनुसार व्यवस्थित विगतका परीक्षा प्रश्नहरू।" }
];

// ─── Sample MCQ Questions ─────────────────────────────
S2083.sampleMCQs = [
  {
    id: "q1",
    subject: "science",
    chapter: "scientific-study",
    question: "Which of the following is the correct definition of a hypothesis?",
    options: [
      "A proven fact based on experiments",
      "A testable prediction that explains an observation",
      "A conclusion drawn after research is complete",
      "A method used to collect data"
    ],
    correct: 1,
    explanation: "A hypothesis is a testable prediction or educated guess made to explain an observation. It must be able to be tested through experiments."
  },
  {
    id: "q2",
    subject: "science",
    chapter: "electricity-magnetism",
    question: "According to Ohm's Law, if the resistance of a circuit doubles while voltage remains constant, the current will:",
    options: [
      "Double",
      "Remain the same",
      "Halve",
      "Become zero"
    ],
    correct: 2,
    explanation: "Ohm's Law states V = IR. If V is constant and R doubles, then I = V/R will become half. Current is inversely proportional to resistance."
  },
  {
    id: "q3",
    subject: "science",
    chapter: "classification-living",
    question: "Which kingdom does a mushroom belong to?",
    options: [
      "Plantae",
      "Animalia",
      "Monera",
      "Fungi"
    ],
    correct: 3,
    explanation: "Mushrooms belong to the kingdom Fungi. Unlike plants, fungi cannot photosynthesize and obtain nutrients by decomposing organic matter."
  },
  {
    id: "q4",
    subject: "science",
    chapter: "motion-force",
    question: "A car travels 120 km in 2 hours. What is its average speed?",
    options: [
      "30 km/h",
      "60 km/h",
      "240 km/h",
      "90 km/h"
    ],
    correct: 1,
    explanation: "Average speed = Total distance ÷ Total time = 120 km ÷ 2 h = 60 km/h."
  },
  {
    id: "q5",
    subject: "science",
    chapter: "chemical-reaction",
    question: "What type of reaction occurs when iron rusts?",
    options: [
      "Decomposition reaction",
      "Displacement reaction",
      "Oxidation reaction",
      "Neutralization reaction"
    ],
    correct: 2,
    explanation: "Rusting of iron is an oxidation reaction. Iron (Fe) reacts with oxygen (O₂) and water (H₂O) to form iron oxide (Fe₂O₃·xH₂O), which we call rust."
  },
  {
    id: "q6",
    subject: "math",
    chapter: "sets",
    question: "If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∩ B?",
    options: [
      "{1, 2, 3, 4, 5}",
      "{3}",
      "{1, 2}",
      "{4, 5}"
    ],
    correct: 1,
    explanation: "A ∩ B (intersection) contains elements that are in both A and B. Only 3 appears in both sets, so A ∩ B = {3}."
  },
  {
    id: "q7",
    subject: "math",
    chapter: "trigonometry",
    question: "What is the value of sin 30°?",
    options: [
      "1",
      "√3/2",
      "1/2",
      "1/√2"
    ],
    correct: 2,
    explanation: "sin 30° = 1/2. This is a standard trigonometric value. Remember: sin 0° = 0, sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1."
  },
  {
    id: "q8",
    subject: "science",
    chapter: "universe",
    question: "Which is the largest planet in our solar system?",
    options: [
      "Saturn",
      "Neptune",
      "Jupiter",
      "Uranus"
    ],
    correct: 2,
    explanation: "Jupiter is the largest planet in our solar system. It is so large that all the other planets could fit inside it."
  }
];

// ─── Mock Test Questions ──────────────────────────────
S2083.mockTestQuestions = [
  ...S2083.sampleMCQs,
  {
    id:"mq1",
    question: "What is the SI unit of electric current?",
    options: ["Volt","Ampere","Ohm","Watt"],
    correct: 1,
    explanation: "The SI unit of electric current is Ampere (A). Voltage is measured in Volts, resistance in Ohms, and power in Watts."
  },
  {
    id:"mq2",
    question: "Which gas is most abundant in the Earth's atmosphere?",
    options: ["Oxygen","Carbon dioxide","Nitrogen","Argon"],
    correct: 2,
    explanation: "Nitrogen (N₂) makes up about 78% of Earth's atmosphere, while oxygen makes up about 21%."
  }
];

// ─── Labels for language switch ─────────────────────
S2083.labels = {
  en: {
    home: "Home",
    subjects: "Subjects",
    search: "Search",
    bookmarks: "Bookmarks",
    about: "About",
    startLearning: "Start Learning",
    exploreSubjects: "Explore Subjects",
    viewChapters: "View Chapters",
    practice: "Practice MCQs",
    mockTest: "Mock Test",
    notes: "Notes",
    chooseYourMedium: "Choose Your Medium",
    medium: "Medium",
    allSubjects: "All Subjects",
    compulsory: "Compulsory",
    optional: "Optional",
    technical: "Technical",
    chapters: "Chapters",
    backToSubjects: "Back to Subjects",
    backToChapters: "Back to Chapters",
    studyMaterials: "Study Materials",
    startPractice: "Start Practice",
    openNotes: "Open Notes",
    openSlide: "Open Slides",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    nepali: "नेपाली",
    english: "English",
    units: "units",
    chapterOf: "Chapter of",
    submit: "Submit Test",
    next: "Next",
    previous: "Previous",
    finish: "Finish",
    tryAgain: "Try Again",
    reviewAnswers: "Review Answers",
    score: "Your Score",
    correct: "Correct",
    wrong: "Wrong",
    timeTaken: "Time Taken",
    question: "Question",
    of: "of",
    noBookmarks: "No saved items yet. Start learning and save chapters or questions for quick access.",
    removeBookmark: "Remove",
    noResults: "No results found. Try different keywords.",
    searchPlaceholder: "Search subjects, chapters...",
    commonSubjects: "Common Subjects",
    technicalSubjects: "Technical Subjects",
    openBtn: "Open",
    startBtn: "Start"
  },
  np: {
    home: "गृहपृष्ठ",
    subjects: "विषयहरू",
    search: "खोजी",
    bookmarks: "बुकमार्क",
    about: "बारेमा",
    startLearning: "पढ्न सुरु गर्नुहोस्",
    exploreSubjects: "विषयहरू हेर्नुहोस्",
    viewChapters: "अध्यायहरू हेर्नुहोस्",
    practice: "MCQ अभ्यास",
    mockTest: "मोक टेस्ट",
    notes: "नोट",
    chooseYourMedium: "आफ्नो माध्यम छान्नुहोस्",
    medium: "माध्यम",
    allSubjects: "सबै विषय",
    compulsory: "अनिवार्य",
    optional: "ऐच्छिक",
    technical: "प्राविधिक",
    chapters: "अध्यायहरू",
    backToSubjects: "विषयमा फर्कनुहोस्",
    backToChapters: "अध्यायमा फर्कनुहोस्",
    studyMaterials: "अध्ययन सामग्री",
    startPractice: "अभ्यास सुरु गर्नुहोस्",
    openNotes: "नोट खोल्नुहोस्",
    openSlide: "स्लाइड खोल्नुहोस्",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    nepali: "नेपाली",
    english: "English",
    units: "एकाइ",
    chapterOf: "को अध्याय",
    submit: "टेस्ट बुझाउनुहोस्",
    next: "अर्को",
    previous: "अघिल्लो",
    finish: "समाप्त",
    tryAgain: "फेरि प्रयास",
    reviewAnswers: "उत्तर समीक्षा",
    score: "तपाईंको अङ्क",
    correct: "सही",
    wrong: "गलत",
    timeTaken: "लिएको समय",
    question: "प्रश्न",
    of: "को",
    noBookmarks: "अहिलेसम्म कुनै सुरक्षित वस्तु छैन। पढ्न सुरु गर्नुहोस् र छिटो पहुँचका लागि अध्याय वा प्रश्नहरू सुरक्षित गर्नुहोस्।",
    removeBookmark: "हटाउनुहोस्",
    noResults: "कुनै नतिजा भेटिएन। अर्को किवर्ड प्रयास गर्नुहोस्।",
    searchPlaceholder: "विषय, अध्याय खोज्नुहोस्...",
    commonSubjects: "साझा विषयहरू",
    technicalSubjects: "प्राविधिक विषयहरू",
    openBtn: "खोल्नुहोस्",
    startBtn: "सुरु गर्नुहोस्"
  }
};

// Helper: get subject by id
S2083.getSubject = (id) => S2083.subjects.find(s => s.id === id);

// Helper: get chapters for a subject
S2083.getChapters = (subjectId) => S2083.chapters[subjectId] || [];

// Helper: get chapter by id
S2083.getChapter = (subjectId, chapterId) =>
  (S2083.chapters[subjectId] || []).find(c => c.id === chapterId);

// Helper: subjects for a medium
S2083.getSubjectsForMedium = (medium) => {
  if (medium === "electrical") {
    return S2083.subjects.filter(s => s.mediumGroup === "common" && ["english","nepali","math","science","social"].includes(s.id))
      .concat(S2083.subjects.filter(s => s.mediumGroup === "electrical"));
  }
  return S2083.subjects.filter(s => s.mediumGroup === "common");
};
/* ===================================================
   Grade 10 Electrical Engineering — Technical Subjects Only
   Source: CDC Electrical Engineering Curriculum Grade 9–12
   =================================================== */

(function () {
  if (typeof S2083 === "undefined") return;

  S2083.subjects = Array.isArray(S2083.subjects) ? S2083.subjects : [];
  S2083.chapters = S2083.chapters || {};

  // Remove old electrical technical subjects to avoid duplicates
  S2083.subjects = S2083.subjects.filter(function (subject) {
    return subject.mediumGroup !== "electrical";
  });

  // Add only the 4 Grade 10 Electrical Engineering technical subjects
  S2083.subjects.push(
    {
      id: "electrical-machine",
      name: "Electrical Machine",
      nameNp: "इलेक्ट्रिकल मेसिन",
      icon: "⚙️",
      category: "technical",
      mediumGroup: "electrical",
      units: 6,
      description: "Study transformers, DC machines, induction machines, synchronous machines, and single-phase motors.",
      descriptionNp: "ट्रान्सफर्मर, DC मेसिन, इन्डक्सन मेसिन, सिन्क्रोनस मेसिन र single-phase motors अध्ययन गर्नुहोस्।"
    },
    {
      id: "basic-electronics",
      name: "Basic Electronics",
      nameNp: "बेसिक इलेक्ट्रोनिक्स",
      icon: "🔌",
      category: "technical",
      mediumGroup: "electrical",
      units: 7,
      description: "Learn passive components, semiconductors, diodes, power supplies, transistors, FETs, and logic gates.",
      descriptionNp: "Passive components, semiconductor, diode, power supply, transistor, FET र logic gates अध्ययन गर्नुहोस्।"
    },
    {
      id: "industrial-installation-maintenance",
      name: "Industrial Installation and Maintenance",
      nameNp: "औद्योगिक जडान तथा मर्मत",
      icon: "🏭",
      category: "technical",
      mediumGroup: "electrical",
      units: 6,
      description: "Study industrial wiring, distribution systems, earthing, inspection, testing, maintenance, and motor control.",
      descriptionNp: "Industrial wiring, distribution system, earthing, inspection, testing, maintenance र motor control अध्ययन गर्नुहोस्।"
    },
    {
      id: "utilization-electrical-energy",
      name: "Utilization of Electrical Energy",
      nameNp: "विद्युत् ऊर्जाको उपयोग",
      icon: "💡",
      category: "technical",
      mediumGroup: "electrical",
      units: 6,
      description: "Study electrical energy use, illumination, industrial utilization, traction system, power factor, and tariff.",
      descriptionNp: "Electrical energy, illumination, industrial utilization, traction system, power factor र tariff अध्ययन गर्नुहोस्।"
    }
  );

  // Electrical Machine chapters/units
  S2083.chapters["electrical-machine"] = [
    {
      id: "electromagnetism",
      number: 1,
      title: "Electromagnetism",
      titleNp: "विद्युत् चुम्बकत्व",
      summary: "Introduction to electromagnetism and magnetic effects of electric current.",
      summaryNp: "विद्युत् चुम्बकत्व र विद्युत् धाराको चुम्बकीय प्रभावको परिचय।"
    },
    {
      id: "transformer",
      number: 2,
      title: "Transformer",
      titleNp: "ट्रान्सफर्मर",
      summary: "Construction, working principle, types, losses, efficiency, and applications of transformers.",
      summaryNp: "ट्रान्सफर्मरको बनावट, कार्य सिद्धान्त, प्रकार, loss, efficiency र प्रयोग।"
    },
    {
      id: "dc-machines",
      number: 3,
      title: "DC Machines",
      titleNp: "DC मेसिनहरू",
      summary: "DC generators, DC motors, starters, speed control, and applications.",
      summaryNp: "DC generator, DC motor, starter, speed control र प्रयोगहरू।"
    },
    {
      id: "three-phase-induction-machines",
      number: 4,
      title: "Three Phase Induction Machines",
      titleNp: "तीन-फेज इन्डक्सन मेसिन",
      summary: "Construction, working, starting, speed control, and applications of three phase induction motors.",
      summaryNp: "तीन-फेज इन्डक्सन मोटरको बनावट, कार्य, starting, speed control र प्रयोग।"
    },
    {
      id: "synchronous-machines",
      number: 5,
      title: "Synchronous Machines",
      titleNp: "सिन्क्रोनस मेसिनहरू",
      summary: "Synchronous generator, alternator, synchronization, synchronous motor, and applications.",
      summaryNp: "Synchronous generator, alternator, synchronization, synchronous motor र प्रयोगहरू।"
    },
    {
      id: "single-phase-fractional-horse-power-motors",
      number: 6,
      title: "Single Phase Fractional Horse Power Motors",
      titleNp: "सिंगल फेज फ्र्याक्सनल हर्स पावर मोटर",
      summary: "Single phase motor types, working principle, starting methods, and practical applications.",
      summaryNp: "Single phase motor का प्रकार, कार्य सिद्धान्त, starting methods र practical प्रयोगहरू।"
    }
  ];

  // Basic Electronics chapters/units
  S2083.chapters["basic-electronics"] = [
    {
      id: "passive-components",
      number: 1,
      title: "Passive Components",
      titleNp: "Passive Components",
      summary: "Resistors, capacitors, inductors, and their basic properties.",
      summaryNp: "Resistor, capacitor, inductor र तिनीहरूको आधारभूत गुणहरू।"
    },
    {
      id: "basics-of-semiconductor",
      number: 2,
      title: "Basics of Semiconductor",
      titleNp: "Semiconductor को आधार",
      summary: "Semiconductor materials, energy bands, holes, electrons, and types of semiconductors.",
      summaryNp: "Semiconductor material, energy band, hole, electron र semiconductor का प्रकार।"
    },
    {
      id: "semiconductor-diode",
      number: 3,
      title: "Semiconductor Diode",
      titleNp: "Semiconductor Diode",
      summary: "PN junction diode, biasing, diode characteristics, and applications.",
      summaryNp: "PN junction diode, biasing, diode characteristics र प्रयोगहरू।"
    },
    {
      id: "power-supplies",
      number: 4,
      title: "Power Supplies",
      titleNp: "Power Supplies",
      summary: "Rectifiers, filters, regulated power supply, and basic DC supply circuits.",
      summaryNp: "Rectifier, filter, regulated power supply र basic DC supply circuit।"
    },
    {
      id: "transistors",
      number: 5,
      title: "Transistors",
      titleNp: "Transistors",
      summary: "BJT transistor, working, configurations, and applications in circuits.",
      summaryNp: "BJT transistor, working, configuration र circuit मा प्रयोग।"
    },
    {
      id: "field-effect-transistors",
      number: 6,
      title: "Field Effect Transistors",
      titleNp: "Field Effect Transistors",
      summary: "FET basics, construction, working principle, and applications.",
      summaryNp: "FET को आधार, बनावट, कार्य सिद्धान्त र प्रयोगहरू।"
    },
    {
      id: "logic-gates",
      number: 7,
      title: "Logic Gates",
      titleNp: "Logic Gates",
      summary: "Basic logic gates, truth tables, and digital circuit fundamentals.",
      summaryNp: "Basic logic gates, truth table र digital circuit को आधार।"
    }
  ];

  // Industrial Installation and Maintenance chapters/units
  S2083.chapters["industrial-installation-maintenance"] = [
    {
      id: "fire-and-safety-standards",
      number: 1,
      title: "Fire and Safety Standards",
      titleNp: "आगो तथा सुरक्षा मापदण्ड",
      summary: "Electrical safety signs, PPE, wiring regulations, and fire safety equipment.",
      summaryNp: "Electrical safety signs, PPE, wiring regulations र fire safety equipment।"
    },
    {
      id: "distribution-system-industrial-installations",
      number: 2,
      title: "Distribution System in Industrial Installations",
      titleNp: "औद्योगिक जडानमा वितरण प्रणाली",
      summary: "Industrial distribution systems, single line diagrams, ACSR, ABC, switchgear, and substations.",
      summaryNp: "Industrial distribution system, single line diagram, ACSR, ABC, switchgear र substation।"
    },
    {
      id: "industrial-wiring",
      number: 3,
      title: "Industrial Wiring",
      titleNp: "Industrial Wiring",
      summary: "Industrial wiring, panel boards, distribution boards, cable management, motor installation, and power factor improvement.",
      summaryNp: "Industrial wiring, panel board, distribution board, cable management, motor installation र power factor improvement।"
    },
    {
      id: "earthing-arrangements-distribution-system",
      number: 4,
      title: "Earthing Arrangements of Distribution System",
      titleNp: "Distribution System को Earthing Arrangement",
      summary: "Equipment earthing, system earthing, and lightning protection system.",
      summaryNp: "Equipment earthing, system earthing र lightning protection system।"
    },
    {
      id: "inspection-testing-maintenance-industrial-installations",
      number: 5,
      title: "Inspection, Testing and Maintenance of Industrial Installations",
      titleNp: "औद्योगिक जडानको Inspection, Testing and Maintenance",
      summary: "Inspection, testing instruments, insulation test, continuity test, earth resistance test, and maintenance.",
      summaryNp: "Inspection, testing instruments, insulation test, continuity test, earth resistance test र maintenance।"
    },
    {
      id: "three-phase-induction-motor-controls",
      number: 6,
      title: "Three Phase Induction Motor Controls",
      titleNp: "Three Phase Induction Motor Controls",
      summary: "Control of three phase induction motors using switches and control circuits.",
      summaryNp: "Switches र control circuits प्रयोग गरी three phase induction motor control।"
    }
  ];

  // Utilization of Electrical Energy chapters/units
  S2083.chapters["utilization-electrical-energy"] = [
    {
      id: "introduction-to-electrical-energy",
      number: 1,
      title: "Introduction to Electrical Energy",
      titleNp: "विद्युत् ऊर्जाको परिचय",
      summary: "Use of electrical energy in domestic, commercial, industrial, agricultural, irrigation, and traction systems.",
      summaryNp: "Domestic, commercial, industrial, agricultural, irrigation र traction मा electrical energy को प्रयोग।"
    },
    {
      id: "illumination",
      number: 2,
      title: "Illumination",
      titleNp: "प्रकाश व्यवस्था",
      summary: "Electromagnetic waves, illumination terms, laws, lamps, glare, and lighting design.",
      summaryNp: "Electromagnetic waves, illumination terms, laws, lamps, glare र lighting design।"
    },
    {
      id: "industrial-utilization-electrical-energy",
      number: 3,
      title: "Industrial Utilization of Electrical Energy",
      titleNp: "औद्योगिक क्षेत्रमा विद्युत् ऊर्जाको उपयोग",
      summary: "Role of electrical energy in industry, electrical drives, types of drives, and motor selection.",
      summaryNp: "Industry मा electrical energy को role, electrical drives, drive types र motor selection।"
    },
    {
      id: "traction-system",
      number: 4,
      title: "Traction System",
      titleNp: "Traction System",
      summary: "Electric traction, traction systems, electric vehicles, AC and DC supply systems, and braking.",
      summaryNp: "Electric traction, traction systems, electric vehicles, AC/DC supply system र braking।"
    },
    {
      id: "power-factor",
      number: 5,
      title: "Power Factor",
      titleNp: "Power Factor",
      summary: "Power factor, causes and effects of low power factor, and methods of improvement.",
      summaryNp: "Power factor, low power factor का कारण/असर र सुधार गर्ने विधि।"
    },
    {
      id: "tariff",
      number: 6,
      title: "Tariff",
      titleNp: "Tariff",
      summary: "Tariff system, objectives, calculation methods, types, applications, and Nepal tariff system.",
      summaryNp: "Tariff system, objectives, calculation methods, types, applications र Nepal tariff system।"
    }
  ];
})();