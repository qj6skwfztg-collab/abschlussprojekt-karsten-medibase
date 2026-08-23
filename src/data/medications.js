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
    source: "BfArM",
    sourceUrl:
      "https://jahresbericht.bfarm.de/SiteGlobals/Forms/Suche/Expertensuche_Formular.html",
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
    source: "EMA",
    sourceUrl:
      "https://www.ema.europa.eu/en/medicines/human/EPAR/pantozol-control",
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
];

export default medications;
