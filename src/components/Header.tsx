"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import {
  business,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
  isExternalUrl,
  isPlaceholder,
} from "@/data/business";

const nav = [
  { href: "/services/", label: "Services" },
  { href: "/service-areas/", label: "Service areas" },
  { href: "/why-gear-go/", label: "Why Gear Go" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Header() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const closeMenu = () => setOpenFor(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const [solid, setSolid] = useState(false);
  const whatsapp = getWhatsAppHref("Hi Gear Go Automobiles, I need help with my car.");

  const path =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;

  useEffect(() => {
    const update = () => {
      const hasDarkHero = Boolean(
        document.querySelector("main .hero, main .page-head, main .notfound"),
      );
      setSolid(window.scrollY > 24 || !hasDarkHero);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href);

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusables = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header className={`site-header${solid ? " site-header--solid" : ""}`}>
      <div className="wrap site-header__inner">
        <Link href="/" className="brand" aria-label={`${business.name} home`}>
          <span className="brand__name">Gear Go</span>
          <span className="brand__sub">Automobiles · Aya Nagar</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={getPhoneHref()}>
            <Icon name="phone" size="sm" />
            <span>{isPlaceholder(business.phone.display) ? "Contact" : getPhoneLabel()}</span>
          </a>
          <a
            className="btn btn--primary btn--sm"
            href={whatsapp}
            target={isExternalUrl(whatsapp) ? "_blank" : undefined}
            rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
          >
            <Icon name="whatsapp" size="sm" />
            <span className="header__wa-text">WhatsApp</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenFor((current) => (current === pathname ? null : pathname))}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        onKeyDown={trapFocus}
      >
        <div className="mobile-menu__head">
          <Link href="/" className="brand" onClick={closeMenu} aria-label={`${business.name} home`}>
            <span className="brand__name">Gear Go</span>
            <span className="brand__sub">Automobiles · Aya Nagar</span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="mobile-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <Icon name="close" />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/faq/" onClick={closeMenu}>
            FAQ
          </Link>
          <Link href="/book/" onClick={closeMenu}>
            Request a service
          </Link>
        </nav>

        <div className="mobile-menu__actions">
          <a
            className="btn btn--primary btn--block"
            href={whatsapp}
            target={isExternalUrl(whatsapp) ? "_blank" : undefined}
            rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            onClick={closeMenu}
          >
            <Icon name="whatsapp" size="sm" /> WhatsApp us
          </a>
          <a className="btn btn--outline btn--block" href={getPhoneHref()} onClick={closeMenu}>
            <Icon name="phone" size="sm" />
            {isPlaceholder(business.phone.display) ? "Contact us" : `Call ${getPhoneLabel()}`}
          </a>
          <Link className="btn btn--outline btn--block" href="/contact/" onClick={closeMenu}>
            Address &amp; directions
          </Link>
        </div>

        <p className="mobile-menu__note">
          {business.address.full}
          <br />
          {business.hours.display.join(" · ")}
        </p>
      </div>
    </header>
  );
}
