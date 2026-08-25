const medications = [
  {
    id: "paracetamol",
    name: "Paracetamol",
    category: "Schmerz- und Fiebermittel",
    categoryEn: "Pain and fever relief",
    description:
      "Paracetamol wird zur symptomatischen Behandlung leichter bis mäßig starker Schmerzen und von Fieber verwendet.",
    descriptionEn:
      "Paracetamol is used for the symptomatic treatment of mild to moderate pain and fever.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Zulassung/amInformationen/Mustertexte/palde_8000443_paracetamol_div_Stand_2025_01_25.pdf?__blob=publicationFile",
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    category: "Schmerz- und Fiebermittel",
    categoryEn: "Pain and fever relief",
    description:
      "Ibuprofen wird unter anderem bei leichten bis mäßig starken Schmerzen und Fieber verwendet.",
    descriptionEn:
      "Ibuprofen is used, among other things, for mild to moderate pain and fever.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Pharmakovigilanz/Gremien/Verschreibungspflicht/63Sitzung/anlage3.pdf?__blob=publicationFile",
  },
  {
    id: "cetirizin",
    name: "Cetirizin",
    category: "Allergiemittel",
    categoryEn: "Allergy medication",
    description:
      "Cetirizin ist ein Antihistaminikum und wird zur symptomatischen Behandlung allergischer Beschwerden eingesetzt.",
    descriptionEn:
      "Cetirizine is an antihistamine used for the symptomatic treatment of allergic conditions.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Pharmakovigilanz/Gremien/Verschreibungspflicht/70Sitzung/anlage1.pdf?__blob=publicationFile",
  },
  {
    id: "loratadin",
    name: "Loratadin",
    category: "Allergiemittel",
    categoryEn: "Allergy medication",
    description:
      "Loratadin ist ein langwirkendes Antihistaminikum zur symptomatischen Behandlung von allergischem Schnupfen und chronischer Nesselsucht.",
    descriptionEn:
      "Loratadine is a long-acting antihistamine used for the symptomatic treatment of allergic rhinitis and chronic hives.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/heuschnupfen",
  },

    {
    id: "pantoprazol",
    name: "Pantoprazol",
    category: "Magenmittel",
    categoryEn: "Stomach medication",
    description:
      "Pantoprazol vermindert die Bildung von Magensäure und wird bei Erwachsenen unter anderem zur kurzzeitigen Behandlung von Refluxbeschwerden wie Sodbrennen eingesetzt.",
    descriptionEn:
      "Pantoprazole reduces stomach acid production and is used in adults for the short-term treatment of reflux symptoms such as heartburn.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/glossar/pantoprazol",
  },
  {
    id: "dimenhydrinat",
    name: "Dimenhydrinat",
    category: "Mittel gegen Übelkeit",
    categoryEn: "Nausea relief",
    description:
      "Dimenhydrinat wird zur Vorbeugung und Behandlung von Reisekrankheit, Übelkeit und Erbrechen eingesetzt.",
    descriptionEn:
      "Dimenhydrinate is used to prevent and treat motion sickness, nausea and vomiting.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Pharmakovigilanz/Gremien/Verschreibungspflicht/83Sitzung/anlage7.pdf?__blob=publicationFile",
  },
    {
    id: "loperamid",
    name: "Loperamid",
    category: "Mittel gegen Durchfall",
    categoryEn: "Diarrhoea relief",
    description:
      "Loperamid beruhigt den Darm und kann bei akutem Durchfall die Zahl der Toilettengänge verringern.",
    descriptionEn:
      "Loperamide slows bowel movement and may reduce the number of bowel movements in acute diarrhoea.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/durchfall",
  },
  {
    id: "acetylcystein",
    name: "Acetylcystein",
    category: "Husten- und Erkältungsmittel",
    categoryEn: "Cough and cold medication",
    description:
      "Acetylcystein ist ein Schleimlöser. Es verflüssigt zähen Schleim, damit dieser leichter abgehustet werden kann.",
    descriptionEn:
      "Acetylcysteine is a mucolytic. It thins thick mucus so that it can be coughed up more easily.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Kodiersysteme/ATC/atc-ddd-amtlich-2021.pdf?__blob=publicationFile",
  },
  {
    id: "ramipril",
    name: "Ramipril",
    category: "Blutdruckmittel",
    categoryEn: "Blood pressure medication",
    description:
      "Ramipril gehört zu den ACE-Hemmern und wird unter anderem zur Behandlung von Bluthochdruck und bestimmten Herz-Kreislauf-Erkrankungen eingesetzt.",
    descriptionEn:
      "Ramipril belongs to the ACE inhibitor group and is used, among other things, to treat high blood pressure and certain cardiovascular conditions.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/bluthochdruck",
  },
  {
    id: "amlodipin",
    name: "Amlodipin",
    category: "Blutdruckmittel",
    categoryEn: "Blood pressure medication",
    description:
      "Amlodipin ist ein blutdrucksenkendes Arzneimittel. Ob es geeignet ist, hängt unter anderem von der individuellen Erkrankung und anderen Medikamenten ab.",
    descriptionEn:
      "Amlodipine is a blood pressure-lowering medicine. Whether it is suitable depends, among other things, on the individual condition and other medicines.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/bluthochdruck",
  },
  {
    id: "metformin",
    name: "Metformin",
    category: "Diabetesmittel",
    categoryEn: "Diabetes medication",
    description:
      "Metformin gehört zu den häufig verwendeten Medikamenten zur Behandlung von Typ-2-Diabetes. Die passende Behandlung hängt von mehreren persönlichen Faktoren ab.",
    descriptionEn:
      "Metformin is one of the medicines commonly used to treat type 2 diabetes. The appropriate treatment depends on several personal factors.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/diabetes-typ-2",
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    category: "Antibiotika",
    categoryEn: "Antibiotics",
    description:
      "Amoxicillin ist ein Antibiotikum zur Behandlung bestimmter bakterieller Infektionen. Antibiotika sollten nur nach ärztlicher Verordnung und nicht gegen Virusinfektionen eingesetzt werden.",
    descriptionEn:
      "Amoxicillin is an antibiotic used to treat certain bacterial infections. Antibiotics should only be used as prescribed and do not work against viral infections.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/streptokokken-pharyngitis",
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    category: "Vitamine und Mineralstoffe",
    categoryEn: "Vitamins and minerals",
    description:
      "Vitamin-D3-Präparate können bei einem nachgewiesenen Vitamin-D-Mangel eingesetzt werden. Ob eine Einnahme sinnvoll ist, sollte ärztlich oder in der Apotheke geklärt werden.",
    descriptionEn:
      "Vitamin D3 preparations may be used for a confirmed vitamin D deficiency. Whether supplementation is appropriate should be discussed with a doctor or pharmacist.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/vitamin-d-mangel",
  },
  {
    id: "magnesium",
    name: "Magnesium",
    category: "Vitamine und Mineralstoffe",
    categoryEn: "Vitamins and minerals",
    description:
      "Magnesiumpräparate können zur Behandlung eines festgestellten Magnesiummangels eingesetzt werden. Bei Nierenerkrankungen oder Unsicherheit sollte vorher ärztlicher Rat eingeholt werden.",
    descriptionEn:
      "Magnesium preparations may be used to treat a confirmed magnesium deficiency. People with kidney disease or uncertainty should seek medical advice first.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/magnesiummangel",
  },
];

export default medications;
