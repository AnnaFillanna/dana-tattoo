import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export const Header = () => {
  const currentPath = useLocation().pathname.replace(/\/+$/, "") || "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className={styles.header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setMenuOpen(false);
      }}
    >
      <a className={styles.logo} href="/" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="Dana Tattoo Studio — Home" />
      </a>

      <button
        ref={menuButton}
        type="button"
        className={styles.menuToggle}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span>{menuOpen ? "Schließen" : "Menü"}</span>
        <span className={styles.menuIcon} aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <nav
        id="main-navigation"
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        aria-label="Hauptnavigation"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            aria-current={currentPath === item.href ? "page" : undefined}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>


    </header>
  );
};
