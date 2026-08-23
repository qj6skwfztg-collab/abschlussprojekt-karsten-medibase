import { useEffect, useMemo, useState } from "react";
import LanguageContext from "./LanguageContext";

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() =>
    localStorage.getItem("medipervin-language") === "en" ? "en" : "de"
  );

  useEffect(() => {
    localStorage.setItem("medipervin-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      isEnglish: language === "en",
      toggleLanguage: () =>
        setLanguage((current) => (current === "de" ? "en" : "de")),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
