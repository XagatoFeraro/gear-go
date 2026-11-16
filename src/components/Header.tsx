"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import {
  business,
  getPhoneHref,
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
  const toggleMenu = () => setOpenFor((current) => (current === pathname ? null : pathname));
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const whatsapp = getWhatsAppHref("Hi Gear Go Automobiles, I need help with my car.");

  const path =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;

  useEffect(() => {
    const onScroll = () => {
      const hasHero = Boolean(document.querySelector("main .hero, main .page-hero"));
      setScrolled(window.scrollY > 24 || !hasHero);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    href === "/" ? path === "/" : path === href || path.startsWith(`${href}`);

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
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label={`${business.name} home`}>
          <span className="brand-mark">
            <Icon name="car" />
          </span>
          <span className="brand-name">
            Gear Go<small>Automobiles</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
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

        <div className="header-actions">
          <a className="btn btn-outline btn-sm header-call" href={getPhoneHref()}>
            <Icon name="phone" size="sm" />
            {isPlaceholder(business.phone.display) ? "Contact" : "Call"}
          </a>
          <a
            className="btn btn-lime btn-sm"
            href={whatsapp}
            target={isExternalUrl(whatsapp) ? "_blank" : undefined}
            rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
          >
            WhatsApp
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="mobile-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => toggleMenu()}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        onKeyDown={trapFocus}
      >
        <div className="mobile-menu-head">
          <Link href="/" className="brand" onClick={() => closeMenu()} aria-label={`${business.name} home`}>
            <span className="brand-mark">
              <Icon name="car" />
            </span>
            <span className="brand-name">
              Gear Go<small>Automobiles</small>
            </span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="mobile-close"
            aria-label="Close menu"
            onClick={() => closeMenu()}
          >
            <Icon name="close" />
          </button>
        </div>

        <nav className="mobile-menu-nav" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => closeMenu()}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/faq/" onClick={() => closeMenu()}>
            FAQ
          </Link>
        </nav>

        <div className="mobile-menu-actions">
          <a
            className="btn btn-lime btn-block"
            href={whatsapp}
            target={isExternalUrl(whatsapp) ? "_blank" : undefined}
            rel={isExternalUrl(whatsapp) ? "noopener noreferrer" : undefined}
            onClick={() => closeMenu()}
          >
            <Icon name="whatsapp" size="sm" /> WhatsApp us
          </a>
          <a className="btn btn-outline-light btn-block" href={getPhoneHref()} onClick={() => closeMenu()}>
            <Icon name="phone" size="sm" />
            {isPlaceholder(business.phone.display) ? "Contact us" : `Call ${business.phone.display}`}
          </a>
          <Link className="btn btn-outline-light btn-block" href="/book/" onClick={() => closeMenu()}>
            Request a service
          </Link>
        </div>

        <p className="mobile-menu-note">
          {business.address.full}
          <br />
          {business.hours.display.join(" · ")}
        </p>
      </div>
    </header>
  );
}
