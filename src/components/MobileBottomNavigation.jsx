import { Link, useLocation } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

const navigationItems = [
  { path: "/", icon: "⌂", labelDe: "Start", labelEn: "Home" },
  {
    path: "/medikamente",
    icon: "⌕",
    labelDe: "Medikamente",
    labelEn: "Medications",
  },
  {
    path: "/meine-medikamente",
    icon: "💊",
    labelDe: "Meine Medikamente",
    labelEn: "My medications",
  },
  {
    path: "/notfall",
    icon: "⚠",
    labelDe: "Notfallhilfe",
    labelEn: "Emergency",
  },
];

function MobileBottomNavigation({ onNavigate }) {
  const { isEnglish } = useLanguage();
  const location = useLocation();

  function isItemActive(path) {
    if (path === "/medikamente") {
      return location.pathname.startsWith("/medikamente");
    }

    return location.pathname === path;
  }

  return (
    <nav
      className="mobile-bottom-navigation"
      aria-label={isEnglish ? "Quick navigation" : "Schnellnavigation"}
    >
      {navigationItems.map((item) => {
        const isActive = isItemActive(item.path);
        const label = isEnglish ? item.labelEn : item.labelDe;

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={isActive ? "mobile-bottom-link is-active" : "mobile-bottom-link"}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="mobile-bottom-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileBottomNavigation;
