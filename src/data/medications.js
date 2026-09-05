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
  {
    id: "acetylsalicylsaeure",
    name: "Acetylsalicylsäure (ASS)",
    category: "Schmerz- und Fiebermittel",
    categoryEn: "Pain and fever relief",
    description:
      "Acetylsalicylsäure kann je nach Präparat und ärztlicher Empfehlung bei Schmerzen, Fieber oder bestimmten Herz-Kreislauf-Erkrankungen eingesetzt werden.",
    descriptionEn:
      "Depending on the product and medical advice, acetylsalicylic acid may be used for pain, fever or certain cardiovascular conditions.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "naproxen",
    name: "Naproxen",
    category: "Schmerz- und Fiebermittel",
    categoryEn: "Pain and fever relief",
    description:
      "Naproxen gehört zu den entzündungshemmenden Schmerzmitteln. Die passende Anwendung hängt von der persönlichen Situation und dem Präparat ab.",
    descriptionEn:
      "Naproxen is an anti-inflammatory pain reliever. Appropriate use depends on the individual situation and the product.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "diclofenac",
    name: "Diclofenac",
    category: "Schmerz- und Entzündungsmittel",
    categoryEn: "Pain and inflammation relief",
    description:
      "Diclofenac wird zur Behandlung von Schmerzen und Entzündungen eingesetzt. Es gibt verschiedene Darreichungsformen und wichtige Gegenanzeigen.",
    descriptionEn:
      "Diclofenac is used to treat pain and inflammation. It is available in different forms and has important contraindications.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "omeprazol",
    name: "Omeprazol",
    category: "Magenmittel",
    categoryEn: "Stomach medication",
    description:
      "Omeprazol vermindert die Bildung von Magensäure und wird unter anderem bei säurebedingten Magen- und Speiseröhrenbeschwerden eingesetzt.",
    descriptionEn:
      "Omeprazole reduces stomach acid production and is used, among other things, for acid-related stomach and oesophageal symptoms.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "macrogol",
    name: "Macrogol",
    category: "Mittel gegen Verstopfung",
    categoryEn: "Constipation relief",
    description:
      "Macrogol bindet Wasser im Darm und wird zur Behandlung von Verstopfung eingesetzt. Die Anwendung richtet sich nach dem jeweiligen Präparat.",
    descriptionEn:
      "Macrogol retains water in the bowel and is used to treat constipation. Use depends on the particular product.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "bisacodyl",
    name: "Bisacodyl",
    category: "Mittel gegen Verstopfung",
    categoryEn: "Constipation relief",
    description:
      "Bisacodyl regt die Darmtätigkeit an und wird kurzfristig bei Verstopfung eingesetzt. Eine länger dauernde Anwendung sollte medizinisch geklärt werden.",
    descriptionEn:
      "Bisacodyl stimulates bowel movement and is used short-term for constipation. Longer use should be discussed with a healthcare professional.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "salbutamol",
    name: "Salbutamol",
    category: "Asthma- und Atemwegsmittel",
    categoryEn: "Asthma and respiratory medication",
    description:
      "Salbutamol erweitert die Atemwege und wird häufig als Bedarfsmedikament bei bestimmten Atemwegserkrankungen eingesetzt.",
    descriptionEn:
      "Salbutamol widens the airways and is often used as a reliever medication for certain respiratory conditions.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "beclometason",
    name: "Beclometason",
    category: "Asthma- und Atemwegsmittel",
    categoryEn: "Asthma and respiratory medication",
    description:
      "Beclometason ist ein entzündungshemmender Wirkstoff, der unter anderem in Inhalationspräparaten gegen bestimmte Atemwegsbeschwerden vorkommt.",
    descriptionEn:
      "Beclometasone is an anti-inflammatory active ingredient found, among other things, in inhaled medicines for certain respiratory conditions.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "xylometazolin",
    name: "Xylometazolin",
    category: "Erkältungs- und Nasenmittel",
    categoryEn: "Cold and nasal medication",
    description:
      "Xylometazolin lässt die Schleimhaut der Nase vorübergehend abschwellen. Abschwellende Nasenmittel sind nur für eine begrenzte Dauer vorgesehen.",
    descriptionEn:
      "Xylometazoline temporarily reduces swelling of the nasal lining. Decongestant nasal medicines are intended for limited use only.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "levothyroxin",
    name: "Levothyroxin",
    category: "Schilddrüsenmittel",
    categoryEn: "Thyroid medication",
    description:
      "Levothyroxin ersetzt ein Schilddrüsenhormon und wird zur Behandlung einer Schilddrüsenunterfunktion eingesetzt.",
    descriptionEn:
      "Levothyroxine replaces a thyroid hormone and is used to treat an underactive thyroid.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "bisoprolol",
    name: "Bisoprolol",
    category: "Herz- und Blutdruckmittel",
    categoryEn: "Heart and blood pressure medication",
    description:
      "Bisoprolol gehört zu den Betablockern und wird unter anderem bei Bluthochdruck und bestimmten Herzerkrankungen eingesetzt.",
    descriptionEn:
      "Bisoprolol is a beta blocker used, among other things, for high blood pressure and certain heart conditions.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "losartan",
    name: "Losartan",
    category: "Herz- und Blutdruckmittel",
    categoryEn: "Heart and blood pressure medication",
    description:
      "Losartan gehört zu den Angiotensin-Rezeptorblockern und wird unter anderem zur Behandlung von Bluthochdruck eingesetzt.",
    descriptionEn:
      "Losartan is an angiotensin receptor blocker used, among other things, to treat high blood pressure.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    category: "Cholesterinsenker",
    categoryEn: "Cholesterol-lowering medication",
    description:
      "Atorvastatin gehört zu den Statinen und senkt bestimmte Blutfettwerte. Die Behandlung erfolgt nach ärztlicher Verordnung und Kontrolle.",
    descriptionEn:
      "Atorvastatin is a statin that lowers certain blood lipid levels. Treatment is prescribed and monitored by a doctor.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "apixaban",
    name: "Apixaban",
    category: "Blutgerinnungshemmer",
    categoryEn: "Anticoagulant",
    description:
      "Apixaban hemmt die Blutgerinnung und wird unter anderem zur Vorbeugung von Blutgerinnseln eingesetzt. Änderungen dürfen nur ärztlich begleitet erfolgen.",
    descriptionEn:
      "Apixaban reduces blood clotting and is used, among other things, to prevent blood clots. Changes must be medically supervised.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "rivaroxaban",
    name: "Rivaroxaban",
    category: "Blutgerinnungshemmer",
    categoryEn: "Anticoagulant",
    description:
      "Rivaroxaban hemmt die Blutgerinnung und wird bei bestimmten Risiken für Blutgerinnsel eingesetzt. Die Einnahme muss ärztlich festgelegt werden.",
    descriptionEn:
      "Rivaroxaban reduces blood clotting and is used for certain risks of blood clots. Its use must be determined by a doctor.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "insulin-glargin",
    name: "Insulin glargin",
    category: "Diabetesmittel",
    categoryEn: "Diabetes medication",
    description:
      "Insulin glargin ist ein lang wirkendes Insulin zur Behandlung von Diabetes. Die passende Anwendung und Dosis werden individuell festgelegt.",
    descriptionEn:
      "Insulin glargine is a long-acting insulin used to treat diabetes. The appropriate use and dose are determined individually.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "empagliflozin",
    name: "Empagliflozin",
    category: "Diabetesmittel",
    categoryEn: "Diabetes medication",
    description:
      "Empagliflozin wird unter anderem zur Behandlung von Typ-2-Diabetes und bestimmten Herz- oder Nierenerkrankungen eingesetzt.",
    descriptionEn:
      "Empagliflozin is used, among other things, to treat type 2 diabetes and certain heart or kidney conditions.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "prednisolon",
    name: "Prednisolon",
    category: "Entzündungshemmende Mittel",
    categoryEn: "Anti-inflammatory medication",
    description:
      "Prednisolon gehört zu den Kortison-Wirkstoffen und wird bei verschiedenen entzündlichen oder immunologischen Erkrankungen eingesetzt.",
    descriptionEn:
      "Prednisolone is a corticosteroid used for various inflammatory or immune-related conditions.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "doxycyclin",
    name: "Doxycyclin",
    category: "Antibiotika",
    categoryEn: "Antibiotics",
    description:
      "Doxycyclin ist ein verschreibungspflichtiges Antibiotikum gegen bestimmte bakterielle Infektionen. Es darf nur nach ärztlicher Verordnung eingenommen werden.",
    descriptionEn:
      "Doxycycline is a prescription antibiotic for certain bacterial infections. It must only be taken as prescribed by a doctor.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    category: "Antibiotika",
    categoryEn: "Antibiotics",
    description:
      "Azithromycin ist ein Antibiotikum zur Behandlung bestimmter bakterieller Infektionen. Antibiotika wirken nicht gegen Virusinfektionen.",
    descriptionEn:
      "Azithromycin is an antibiotic used for certain bacterial infections. Antibiotics do not work against viral infections.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
  {
    id: "sertralin",
    name: "Sertralin",
    category: "Psychiatrische Medikamente",
    categoryEn: "Mental health medication",
    description:
      "Sertralin gehört zu den SSRI und wird bei bestimmten psychischen Erkrankungen eingesetzt. Die Behandlung muss ärztlich begleitet werden.",
    descriptionEn:
      "Sertraline is an SSRI used for certain mental health conditions. Treatment must be medically supervised.",
    source: "BfArM AMIce",
    sourceUrl:
      "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html",
  },
];

const categoryDetails = {
  "Schmerz- und Fiebermittel": {
    sideEffects: "Mögliche Nebenwirkungen können Magen-Darm-Beschwerden, Übelkeit oder Hautreaktionen sein.",
    warnings: "Nicht mehrere Schmerzmittel kombinieren, ohne vorher Arzt oder Apotheke zu fragen. Die aktuelle Packungsbeilage beachten.",
  },
  "Schmerz- und Entzündungsmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Magenbeschwerden, Übelkeit, Kopfschmerzen, Schwindel oder Hautreaktionen sein.",
    warnings: "Diese Wirkstoffgruppe kann unter anderem Magen, Nieren und Herz-Kreislauf-System belasten.",
  },
  "Starke Schmerzmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Müdigkeit, Schwindel, Übelkeit, Verstopfung und verlangsamte Reaktionen sein.",
    warnings: "Nur nach ärztlicher Verordnung anwenden und nicht mit Alkohol kombinieren.",
  },
  "Nervenschmerz- und Epilepsiemittel": {
    sideEffects: "Mögliche Nebenwirkungen können Müdigkeit, Schwindel, Benommenheit oder Konzentrationsprobleme sein.",
    warnings: "Die Reaktionsfähigkeit kann eingeschränkt sein. Nicht eigenständig absetzen.",
  },
  "Krampflösende Mittel": {
    sideEffects: "Mögliche Nebenwirkungen können Mundtrockenheit, Sehstörungen, Verstopfung oder Herzklopfen sein.",
    warnings: "Bei Augen-, Herz- oder Prostataerkrankungen vorher ärztlich oder in der Apotheke fragen.",
  },
  "Mittel gegen Übelkeit": {
    sideEffects: "Mögliche Nebenwirkungen können Müdigkeit, Benommenheit, Mundtrockenheit oder Sehstörungen sein.",
    warnings: "Die Reaktionsfähigkeit kann beeinträchtigt sein. Bei anhaltendem Erbrechen medizinische Hilfe suchen.",
  },
  "Mittel für die Verdauung": {
    sideEffects: "Mögliche Nebenwirkungen können Bauchschmerzen, Blähungen, Durchfall oder Übelkeit sein.",
    warnings: "Bei starken oder länger anhaltenden Beschwerden ärztlich abklären lassen.",
  },
  "Mittel gegen Verstopfung": {
    sideEffects: "Mögliche Nebenwirkungen können Bauchschmerzen, Blähungen, Durchfall oder Übelkeit sein.",
    warnings: "Nicht dauerhaft ohne medizinische Rücksprache anwenden.",
  },
  "Herz- und Blutdruckmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Schwindel, Müdigkeit, Kopfschmerzen, niedriger Blutdruck oder langsamer Puls sein.",
    warnings: "Nicht eigenständig absetzen. Blutdruck- und Herzmedikamente können sich gegenseitig beeinflussen.",
  },
  "Entwässernde Mittel": {
    sideEffects: "Mögliche Nebenwirkungen können häufiges Wasserlassen, Schwindel, niedriger Blutdruck oder Veränderungen der Mineralstoffwerte sein.",
    warnings: "Kontrollen von Blutdruck, Nierenfunktion und Blutwerten können erforderlich sein.",
  },
  "Cholesterinsenker": {
    sideEffects: "Mögliche Nebenwirkungen können Muskelbeschwerden, Kopfschmerzen, Übelkeit oder Verdauungsbeschwerden sein.",
    warnings: "Ungewöhnliche oder starke Muskelschmerzen sofort ärztlich abklären lassen.",
  },
  "Blutgerinnungshemmer": {
    sideEffects: "Mögliche Nebenwirkungen können blaue Flecken, Nasenbluten, Zahnfleischbluten oder andere Blutungen sein.",
    warnings: "Starke oder ungewöhnliche Blutungen müssen sofort medizinisch abgeklärt werden. Nicht eigenständig absetzen.",
  },
  "Diabetesmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Unterzuckerung, Übelkeit, Bauchbeschwerden, Hautreaktionen oder Gewichtsveränderungen sein.",
    warnings: "Die Risiken unterscheiden sich je nach Wirkstoff. Die ärztlich vereinbarte Anwendung beachten.",
  },
  "Asthma- und Atemwegsmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Zittern, Herzklopfen, Kopfschmerzen, Heiserkeit oder Reizungen im Mund sein.",
    warnings: "Bei plötzlich zunehmender Atemnot sofort medizinische Hilfe holen.",
  },
  "Allergiemittel": {
    sideEffects: "Mögliche Nebenwirkungen können Müdigkeit, Kopfschmerzen, Mundtrockenheit oder Magen-Darm-Beschwerden sein.",
    warnings: "Auch moderne Allergiemittel können müde machen. Die Packungsbeilage beachten.",
  },
  "Erkältungs- und Nasenmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Reizungen, trockene Schleimhäute, Herzklopfen oder Kopfschmerzen sein.",
    warnings: "Abschwellende Nasenmittel nur kurzzeitig anwenden. Bei Bluthochdruck vorher nachfragen.",
  },
  "Schilddrüsenmittel": {
    sideEffects: "Bei zu hoher persönlicher Dosis können Herzklopfen, Unruhe, Schwitzen oder Schlafprobleme auftreten.",
    warnings: "Die Dosis wird individuell eingestellt. Nicht eigenständig ändern.",
  },
  "Entzündungshemmende Mittel": {
    sideEffects: "Mögliche Nebenwirkungen können Magenbeschwerden, Schlafprobleme, Stimmungsschwankungen oder Hautreaktionen sein.",
    warnings: "Kortisonpräparate nicht eigenständig abrupt absetzen.",
  },
  "Antibiotika": {
    sideEffects: "Mögliche Nebenwirkungen können Durchfall, Übelkeit, Bauchschmerzen, Hautausschlag oder allergische Reaktionen sein.",
    warnings: "Antibiotika wirken nicht gegen Viren und dürfen nur nach ärztlicher Verordnung eingenommen werden.",
  },
  "Antivirale Mittel": {
    sideEffects: "Mögliche Nebenwirkungen können Übelkeit, Kopfschmerzen, Bauchbeschwerden oder Hautreaktionen sein.",
    warnings: "Anwendung und Dauer hängen stark von der Infektion und dem Präparat ab.",
  },
  "Pilzmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Hautreizungen, Brennen, Übelkeit oder Kopfschmerzen sein.",
    warnings: "Bei innerlicher Anwendung sind Wechselwirkungen möglich. Die Packungsbeilage beachten.",
  },
  "Psychiatrische Medikamente": {
    sideEffects: "Mögliche Nebenwirkungen können Übelkeit, Schlafveränderungen, Müdigkeit, Unruhe oder Schwindel sein.",
    warnings: "Nicht eigenständig absetzen. Bei starken Stimmungsschwankungen sofort ärztliche Hilfe suchen.",
  },
  "Schlafmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Müdigkeit am nächsten Tag, Schwindel, Konzentrations- oder Gedächtnisprobleme sein.",
    warnings: "Nicht mit Alkohol oder anderen beruhigenden Mitteln kombinieren.",
  },
  "Vitamine und Mineralstoffe": {
    sideEffects: "Bei zu hoher Einnahme können Übelkeit, Bauchbeschwerden oder Veränderungen von Blutwerten auftreten.",
    warnings: "Auch Nahrungsergänzung kann Nebenwirkungen haben. Bei Vorerkrankungen vorher nachfragen.",
  },
  "Haut- und Pilzmittel": {
    sideEffects: "Mögliche Nebenwirkungen können Rötung, Brennen, Juckreiz, trockene Haut oder allergische Reaktionen sein.",
    warnings: "Bei starker Verschlechterung oder ausgedehntem Ausschlag medizinischen Rat einholen.",
  },
};

const additionalMedicationDefinitions = [
  ["metamizol", "Metamizol", ["Novalgin"], "Metamizol", "Schmerz- und Fiebermittel", "Pain and fever relief", "Metamizol ist ein stark wirksames Schmerz- und Fiebermittel für bestimmte Situationen."],
  ["tramadol", "Tramadol", ["Tramal"], "Tramadol", "Starke Schmerzmittel", "Strong pain medication", "Tramadol ist ein verschreibungspflichtiges Schmerzmittel aus der Gruppe der Opioide."],
  ["morphin", "Morphin", ["Morphium"], "Morphin", "Starke Schmerzmittel", "Strong pain medication", "Morphin wird bei starken Schmerzen unter ärztlicher Kontrolle eingesetzt."],
  ["pregabalin", "Pregabalin", ["Lyrica"], "Pregabalin", "Nervenschmerz- und Epilepsiemittel", "Nerve pain and epilepsy medication", "Pregabalin wird unter anderem bei bestimmten Nervenschmerzen eingesetzt."],
  ["gabapentin", "Gabapentin", ["Neurontin"], "Gabapentin", "Nervenschmerz- und Epilepsiemittel", "Nerve pain and epilepsy medication", "Gabapentin wird unter anderem bei bestimmten Nervenschmerzen eingesetzt."],
  ["celecoxib", "Celecoxib", ["Celebrex"], "Celecoxib", "Schmerz- und Entzündungsmittel", "Pain and inflammation relief", "Celecoxib gehört zu den entzündungshemmenden Schmerzmitteln."],
  ["etoricoxib", "Etoricoxib", ["Arcoxia"], "Etoricoxib", "Schmerz- und Entzündungsmittel", "Pain and inflammation relief", "Etoricoxib gehört zu den entzündungshemmenden Schmerzmitteln."],
  ["meloxicam", "Meloxicam", ["Mobic"], "Meloxicam", "Schmerz- und Entzündungsmittel", "Pain and inflammation relief", "Meloxicam wird bei bestimmten entzündlichen Erkrankungen eingesetzt."],
  ["ketoprofen", "Ketoprofen", [], "Ketoprofen", "Schmerz- und Entzündungsmittel", "Pain and inflammation relief", "Ketoprofen gehört zu den entzündungshemmenden Schmerzmitteln."],
  ["fentanyl", "Fentanyl", ["Durogesic"], "Fentanyl", "Starke Schmerzmittel", "Strong pain medication", "Fentanyl ist ein sehr starkes Opioid unter ärztlicher Kontrolle."],
  ["butylscopolamin", "Butylscopolamin", ["Buscopan"], "Butylscopolamin", "Krampflösende Mittel", "Antispasmodics", "Butylscopolamin kann krampfartige Magen-Darm-Beschwerden lindern."],
  ["ondansetron", "Ondansetron", ["Zofran"], "Ondansetron", "Mittel gegen Übelkeit", "Nausea medication", "Ondansetron wird bei bestimmten Formen von Übelkeit eingesetzt."],
  ["domperidon", "Domperidon", ["Motilium"], "Domperidon", "Mittel gegen Übelkeit", "Nausea medication", "Domperidon kann bei bestimmten Übelkeitsbeschwerden eingesetzt werden."],
  ["lactulose", "Lactulose", ["Bifiteral"], "Lactulose", "Mittel gegen Verstopfung", "Constipation relief", "Lactulose bindet Wasser im Darm und kann bei Verstopfung eingesetzt werden."],
  ["natriumpicosulfat", "Natriumpicosulfat", ["Laxoberal"], "Natriumpicosulfat", "Mittel gegen Verstopfung", "Constipation relief", "Natriumpicosulfat regt die Darmbewegung an."],
  ["simeticon", "Simeticon", ["Lefax"], "Simeticon", "Mittel für die Verdauung", "Digestive medication", "Simeticon kann Beschwerden durch Blähungen lindern."],
  ["calcium", "Calcium", ["Calcium-Sandoz"], "Calcium", "Vitamine und Mineralstoffe", "Vitamins and minerals", "Calciumpräparate können bei einem festgestellten Bedarf eingesetzt werden."],
  ["eisen", "Eisen", ["Ferro Sanol"], "Eisen", "Vitamine und Mineralstoffe", "Vitamins and minerals", "Eisenpräparate werden bei einem festgestellten Eisenmangel eingesetzt."],
  ["folsaeure", "Folsäure", [], "Folsäure", "Vitamine und Mineralstoffe", "Vitamins and minerals", "Folsäurepräparate können bei einem festgestellten Bedarf eingesetzt werden."],
  ["cyanocobalamin", "Vitamin B12", ["Cyanocobalamin"], "Cyanocobalamin", "Vitamine und Mineralstoffe", "Vitamins and minerals", "Vitamin B12 wird bei einem festgestellten Mangel eingesetzt."],
  ["kalium", "Kalium", [], "Kalium", "Vitamine und Mineralstoffe", "Vitamins and minerals", "Kaliumpräparate werden nur bei festgestelltem Bedarf eingesetzt."],
  ["hydrochlorothiazid", "Hydrochlorothiazid", ["HCT"], "Hydrochlorothiazid", "Entwässernde Mittel", "Diuretics", "Hydrochlorothiazid ist ein entwässernder Wirkstoff."],
  ["furosemid", "Furosemid", ["Lasix"], "Furosemid", "Entwässernde Mittel", "Diuretics", "Furosemid ist ein stark entwässernder Wirkstoff."],
  ["torasemid", "Torasemid", ["Torem"], "Torasemid", "Entwässernde Mittel", "Diuretics", "Torasemid wird unter anderem bei Wassereinlagerungen eingesetzt."],
  ["valsartan", "Valsartan", ["Diovan"], "Valsartan", "Herz- und Blutdruckmittel", "Heart and blood pressure medication", "Valsartan gehört zu den Blutdruckmitteln."],
  ["candesartan", "Candesartan", ["Atacand"], "Candesartan", "Herz- und Blutdruckmittel", "Heart and blood pressure medication", "Candesartan wird unter anderem bei Bluthochdruck eingesetzt."],
  ["enalapril", "Enalapril", ["Enahexal"], "Enalapril", "Herz- und Blutdruckmittel", "Heart and blood pressure medication", "Enalapril gehört zu den ACE-Hemmern."],
  ["nebivolol", "Nebivolol", ["Nebilet"], "Nebivolol", "Herz- und Blutdruckmittel", "Heart and blood pressure medication", "Nebivolol gehört zu den Betablockern."],
  ["diltiazem", "Diltiazem", ["Dilzem"], "Diltiazem", "Herz- und Blutdruckmittel", "Heart and blood pressure medication", "Diltiazem wird bei bestimmten Herz-Kreislauf-Erkrankungen eingesetzt."],
  ["verapamil", "Verapamil", ["Isoptin"], "Verapamil", "Herz- und Blutdruckmittel", "Heart and blood pressure medication", "Verapamil wird bei bestimmten Herzrhythmusstörungen eingesetzt."],
  ["spironolacton", "Spironolacton", ["Aldactone"], "Spironolacton", "Entwässernde Mittel", "Diuretics", "Spironolacton ist ein kaliumsparendes Entwässerungsmittel."],
  ["clopidogrel", "Clopidogrel", ["Plavix"], "Clopidogrel", "Blutgerinnungshemmer", "Anticoagulant", "Clopidogrel hemmt das Zusammenlagern von Blutplättchen."],
  ["phenprocoumon", "Phenprocoumon", ["Marcumar"], "Phenprocoumon", "Blutgerinnungshemmer", "Anticoagulant", "Phenprocoumon hemmt die Blutgerinnung und erfordert Kontrollen."],
  ["dabigatran", "Dabigatran", ["Pradaxa"], "Dabigatran", "Blutgerinnungshemmer", "Anticoagulant", "Dabigatran hemmt die Blutgerinnung."],
  ["ezetimib", "Ezetimib", ["Ezetrol"], "Ezetimib", "Cholesterinsenker", "Cholesterol-lowering medication", "Ezetimib vermindert die Aufnahme von Cholesterin aus dem Darm."],
  ["simvastatin", "Simvastatin", ["Zocor"], "Simvastatin", "Cholesterinsenker", "Cholesterol-lowering medication", "Simvastatin gehört zu den Statinen."],
  ["insulin-aspart", "Insulin aspart", ["NovoRapid"], "Insulin aspart", "Diabetesmittel", "Diabetes medication", "Insulin aspart ist ein schnell wirkendes Insulin."],
  ["glimepirid", "Glimepirid", ["Amaryl"], "Glimepirid", "Diabetesmittel", "Diabetes medication", "Glimepirid wird bei bestimmten Formen von Typ-2-Diabetes eingesetzt."],
  ["sitagliptin", "Sitagliptin", ["Januvia"], "Sitagliptin", "Diabetesmittel", "Diabetes medication", "Sitagliptin wird bei Typ-2-Diabetes eingesetzt."],
  ["liraglutid", "Liraglutid", ["Victoza"], "Liraglutid", "Diabetesmittel", "Diabetes medication", "Liraglutid wird unter anderem bei Typ-2-Diabetes eingesetzt."],
  ["semaglutid", "Semaglutid", ["Ozempic"], "Semaglutid", "Diabetesmittel", "Diabetes medication", "Semaglutid wird unter anderem bei Typ-2-Diabetes eingesetzt."],
  ["budesonid", "Budesonid", ["Pulmicort"], "Budesonid", "Asthma- und Atemwegsmittel", "Asthma and respiratory medication", "Budesonid ist ein entzündungshemmender Atemwegswirkstoff."],
  ["formoterol", "Formoterol", ["Oxis"], "Formoterol", "Asthma- und Atemwegsmittel", "Asthma and respiratory medication", "Formoterol erweitert die Atemwege."],
  ["tiotropium", "Tiotropium", ["Spiriva"], "Tiotropium", "Asthma- und Atemwegsmittel", "Asthma and respiratory medication", "Tiotropium erweitert die Atemwege."],
  ["montelukast", "Montelukast", ["Singulair"], "Montelukast", "Asthma- und Atemwegsmittel", "Asthma and respiratory medication", "Montelukast wird bei bestimmten Formen von Asthma eingesetzt."],
  ["mometason", "Mometason", ["Nasonex"], "Mometason", "Allergiemittel", "Allergy medication", "Mometason wird unter anderem bei allergischen Beschwerden eingesetzt."],
  ["fluticason", "Fluticason", ["Flixonase"], "Fluticason", "Allergiemittel", "Allergy medication", "Fluticason wird unter anderem bei allergischen Beschwerden eingesetzt."],
  ["desloratadin", "Desloratadin", ["Aerius"], "Desloratadin", "Allergiemittel", "Allergy medication", "Desloratadin ist ein Antihistaminikum."],
  ["fexofenadin", "Fexofenadin", ["Allegra"], "Fexofenadin", "Allergiemittel", "Allergy medication", "Fexofenadin ist ein Antihistaminikum."],
  ["hydrocortison", "Hydrocortison", [], "Hydrocortison", "Haut- und Pilzmittel", "Skin and antifungal medication", "Hydrocortison wird äußerlich bei bestimmten Hautbeschwerden eingesetzt."],
  ["betamethason", "Betamethason", [], "Betamethason", "Haut- und Pilzmittel", "Skin and antifungal medication", "Betamethason ist ein entzündungshemmender Kortison-Wirkstoff."],
  ["clotrimazol", "Clotrimazol", ["Canesten"], "Clotrimazol", "Haut- und Pilzmittel", "Skin and antifungal medication", "Clotrimazol wird gegen bestimmte Pilzinfektionen eingesetzt."],
  ["aciclovir", "Aciclovir", ["Zovirax"], "Aciclovir", "Antivirale Mittel", "Antiviral medication", "Aciclovir wird gegen bestimmte Virusinfektionen eingesetzt."],
  ["nitrofurantoin", "Nitrofurantoin", ["Furadantin"], "Nitrofurantoin", "Antibiotika", "Antibiotics", "Nitrofurantoin wird unter anderem bei bestimmten Harnwegsinfektionen eingesetzt."],
  ["cefuroxim", "Cefuroxim", ["Zinnat"], "Cefuroxim", "Antibiotika", "Antibiotics", "Cefuroxim ist ein Antibiotikum gegen bestimmte bakterielle Infektionen."],
  ["levofloxacin", "Levofloxacin", ["Tavanic"], "Levofloxacin", "Antibiotika", "Antibiotics", "Levofloxacin ist ein Antibiotikum gegen bestimmte bakterielle Infektionen."],
  ["fluconazol", "Fluconazol", ["Diflucan"], "Fluconazol", "Pilzmittel", "Antifungal medication", "Fluconazol wird gegen bestimmte Pilzinfektionen eingesetzt."],
  ["valaciclovir", "Valaciclovir", ["Valtrex"], "Valaciclovir", "Antivirale Mittel", "Antiviral medication", "Valaciclovir wird gegen bestimmte Virusinfektionen eingesetzt."],
  ["escitalopram", "Escitalopram", ["Cipralex"], "Escitalopram", "Psychiatrische Medikamente", "Mental health medication", "Escitalopram gehört zu den SSRI."],
  ["citalopram", "Citalopram", ["Cipramil"], "Citalopram", "Psychiatrische Medikamente", "Mental health medication", "Citalopram gehört zu den SSRI."],
  ["mirtazapin", "Mirtazapin", ["Remeron"], "Mirtazapin", "Psychiatrische Medikamente", "Mental health medication", "Mirtazapin wird bei bestimmten psychischen Erkrankungen eingesetzt."],
  ["quetiapin", "Quetiapin", ["Seroquel"], "Quetiapin", "Psychiatrische Medikamente", "Mental health medication", "Quetiapin wird bei bestimmten psychischen Erkrankungen eingesetzt."],
  ["amitriptylin", "Amitriptylin", ["Saroten"], "Amitriptylin", "Psychiatrische Medikamente", "Mental health medication", "Amitriptylin wird unter anderem bei bestimmten Depressionen und Nervenschmerzen eingesetzt."],
  ["zolpidem", "Zolpidem", ["Stilnox"], "Zolpidem", "Schlafmittel", "Sleep medication", "Zolpidem ist ein verschreibungspflichtiges Schlafmittel."],
  ["duloxetin", "Duloxetin", ["Cymbalta"], "Duloxetin", "Psychiatrische Medikamente", "Mental health medication", "Duloxetin wird bei bestimmten psychischen Erkrankungen und Nervenschmerzen eingesetzt."],
];

const officialMedicationSource =
  "https://www.bfarm.de/DE/Arzneimittel/Arzneimittel-recherchieren/AMIce/_node.html";

const normalizedMedications = medications.map((medication) => {
  const details = categoryDetails[medication.category] ?? {
    sideEffects:
      "Mögliche Nebenwirkungen hängen vom konkreten Präparat und der persönlichen Situation ab.",
    warnings:
      "Bitte die aktuelle Packungsbeilage beachten und bei Fragen Arzt oder Apotheke fragen.",
  };

  return {
    ...medication,
    activeIngredient: medication.activeIngredient ?? medication.name,
    aliases: medication.aliases ?? [],
    sideEffects: medication.sideEffects ?? details.sideEffects,
    warnings: medication.warnings ?? details.warnings,
  };
});

const additionalMedications = additionalMedicationDefinitions.map(
  ([id, name, aliases, activeIngredient, category, categoryEn, description]) => ({
    id,
    name,
    aliases,
    activeIngredient,
    category,
    categoryEn,
    description,
    descriptionEn: description,
    sideEffects: categoryDetails[category]?.sideEffects ?? "Bitte die aktuelle Packungsbeilage beachten.",
    warnings: categoryDetails[category]?.warnings ?? "Bei Fragen Arzt oder Apotheke fragen.",
    source: "BfArM AMIce",
    sourceUrl: officialMedicationSource,
  })
);

export default [...normalizedMedications, ...additionalMedications];
