"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import styles from "./CardNav.module.css";

export type CardNavItem = {
  label: string;
  links: { 
    label: string; 
    href: string; 
    badge?: string; 
    count?: number;
  }[];
  bottomLinks?: { 
    label: string; 
    href: string; 
    badge?: string; 
  }[];
  socials?: { 
    icon: string; 
    href: string; 
  }[];
  type?: "standard" | "featured";
  featuredData?: {
    badge: string;
    title: string;
    image: string;
    cta: string;
  };
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
}

export default function CardNav({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power4.out",
}: CardNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = useCallback(() => {
    if (window.innerWidth <= 768) {
      return 600; // Mobile height
    }
    return 540; // Desktop height
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Initial state
    gsap.set(navEl, { height: 64, width: "min(94vw, 900px)" });
    
    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      width: "min(94vw, 1300px)",
      duration: 0.6,
      ease,
    });

    tl.to(contentRef.current, {
      opacity: 1,
      duration: 0.3,
    }, "-=0.2");

    return tl;
  }, [calculateHeight, ease]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => tl?.kill();
  }, [createTimeline]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsExpanded(true);
      tl.play();
    } else {
      tl.reverse().eventCallback("onReverseComplete", () => setIsExpanded(false));
    }
  };

  return (
    <div className={`${styles.cardNavContainer} ${className}`}>
      <nav ref={navRef} className={`${styles.cardNav} ${isExpanded ? styles.open : ""}`}>
        <div className={styles.cardNavTop}>
          <button
            suppressHydrationWarning
            type="button"
            className={`${styles.hamburgerContainer} ${isExpanded ? styles.hamburgerOpen : ""}`}
            onClick={toggleMenu}
          >
            <div className={styles.hamburgerMenu}>
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </div>
            <span className={styles.menuText}>{isExpanded ? "Close" : "Menu"}</span>
          </button>

          <div className={styles.logoContainer}>
            <Image src={logo} alt={logoAlt} width={32} height={32} className={styles.logo} />
            <span className={styles.logoText}>{logoAlt}</span>
          </div>

          <div className={styles.topRightActions}>
            <button suppressHydrationWarning type="button" className={styles.loginBtn} onClick={toggleMenu}>Contact</button>
            <button suppressHydrationWarning type="button" className={styles.loginBtn}>Login</button>
            <button suppressHydrationWarning type="button" className={styles.joinBtn}>Join</button>
          </div>
        </div>

        <div ref={contentRef} className={styles.cardNavContent} aria-hidden={!isExpanded}>
          {/* Column 1: Products */}
          <div className={`${styles.navColumn} ${styles.colProducts}`}>
            <div className={styles.columnLabel}>Our Products</div>
            <div className={styles.linkList}>
              {items[0]?.links.map((link) => (
                <a key={link.label} href={link.href} className={styles.navLinkItem}>
                  {link.label}
                  {link.badge && <span className={`${styles.badge} ${link.badge === "WIP" ? styles.badgeWip : ""}`}>{link.badge}</span>}
                </a>
              ))}
            </div>
            <div className={styles.columnFooter}>
              {items[0]?.bottomLinks?.map((link) => (
                <a key={link.label} href={link.href} className={styles.footerLink}>
                  {link.label}
                  {link.badge && <span className={styles.badge}>{link.badge}</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className={`${styles.navColumn} ${styles.colExplore}`}>
            <div className={styles.columnLabel}>Explore</div>
            <div className={styles.linkList}>
              {items[1]?.links.map((link) => (
                <a key={link.label} href={link.href} className={styles.navLinkItem}>
                  {link.label}
                  {link.count && <span className={styles.count}>{link.count}</span>}
                </a>
              ))}
            </div>
            <div className={styles.columnFooter}>
              <div className={styles.socials}>
                 <a href="#" className={styles.socialIcon}>in</a>
                 <a href="#" className={styles.socialIcon}>ig</a>
                 <a href="#" className={styles.socialIcon}>x</a>
              </div>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className={`${styles.navColumn} ${styles.colContact}`}>
            <div className={styles.columnLabel}>Contact Us</div>
            <form className={styles.contactForm}>
              <input type="text" placeholder="Your email" className={styles.contactInput} />
              <textarea placeholder="Quick message" className={styles.contactInput} rows={3}></textarea>
              <button type="submit" className={styles.contactSubmit}>Send Message</button>
            </form>
            <div className={styles.contactInfo}>
              <a href="mailto:hello@infinitica.com" className={styles.contactEmail}>hello@infinitica.com</a>
              <span className={styles.contactAddress}>Silicon Valley, CA</span>
            </div>
          </div>


        </div>
      </nav>
    </div>
  );
}
