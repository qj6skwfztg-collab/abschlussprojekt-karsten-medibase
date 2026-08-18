const medications = [
  {
    id: "paracetamol",
    name: "Paracetamol",
    category: "Schmerz- und Fiebermittel",
    description:
      "Paracetamol wird zur symptomatischen Behandlung leichter bis mäßig starker Schmerzen und von Fieber verwendet.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Zulassung/amInformationen/Mustertexte/palde_8000443_paracetamol_div_Stand_2025_01_25.pdf?__blob=publicationFile",
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    category: "Schmerz- und Fiebermittel",
    description:
      "Ibuprofen wird unter anderem bei leichten bis mäßig starken Schmerzen und Fieber verwendet.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Pharmakovigilanz/Gremien/Verschreibungspflicht/63Sitzung/anlage3.pdf?__blob=publicationFile",
  },
  {
    id: "cetirizin",
    name: "Cetirizin",
    category: "Allergiemittel",
    description:
      "Cetirizin ist ein Antihistaminikum und wird zur symptomatischen Behandlung allergischer Beschwerden eingesetzt.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Pharmakovigilanz/Gremien/Verschreibungspflicht/70Sitzung/anlage1.pdf?__blob=publicationFile",
  },
  {
    id: "loratadin",
    name: "Loratadin",
    category: "Allergiemittel",
    description:
      "Loratadin ist ein langwirkendes Antihistaminikum zur symptomatischen Behandlung von allergischem Schnupfen und chronischer Nesselsucht.",
    source: "BfArM",
    sourceUrl:
      "https://jahresbericht.bfarm.de/SiteGlobals/Forms/Suche/Expertensuche_Formular.html",
  },

    {
    id: "pantoprazol",
    name: "Pantoprazol",
    category: "Magenmittel",
    description:
      "Pantoprazol vermindert die Bildung von Magensäure und wird bei Erwachsenen unter anderem zur kurzzeitigen Behandlung von Refluxbeschwerden wie Sodbrennen eingesetzt.",
    source: "EMA",
    sourceUrl:
      "https://www.ema.europa.eu/en/medicines/human/EPAR/pantozol-control",
  },
  {
    id: "dimenhydrinat",
    name: "Dimenhydrinat",
    category: "Mittel gegen Übelkeit",
    description:
      "Dimenhydrinat wird zur Vorbeugung und Behandlung von Reisekrankheit, Übelkeit und Erbrechen eingesetzt.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Pharmakovigilanz/Gremien/Verschreibungspflicht/83Sitzung/anlage7.pdf?__blob=publicationFile",
  },
    {
    id: "loperamid",
    name: "Loperamid",
    category: "Mittel gegen Durchfall",
    description:
      "Loperamid beruhigt den Darm und kann bei akutem Durchfall die Zahl der Toilettengänge verringern.",
    source: "gesund.bund.de",
    sourceUrl: "https://gesund.bund.de/durchfall",
  },
  {
    id: "acetylcystein",
    name: "Acetylcystein",
    category: "Husten- und Erkältungsmittel",
    description:
      "Acetylcystein ist ein Schleimlöser. Es verflüssigt zähen Schleim, damit dieser leichter abgehustet werden kann.",
    source: "BfArM",
    sourceUrl:
      "https://www.bfarm.de/SharedDocs/Downloads/DE/Kodiersysteme/ATC/atc-ddd-amtlich-2021.pdf?__blob=publicationFile",
  },
];

export default medications;
