"use client";

import React from 'react';
import { Link, Camera, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [4, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.3, 1]);

  return (
    <footer className={styles.footer} ref={containerRef}>
      <div className={styles.footerContainer}>
        {/* Left: Newsletter */}
        <div className={styles.newsletterSection}>
          <h3 className={styles.newsletterTitle}>Subscribe to the Infinitica Newsletter</h3>
          <div className={styles.formGrid}>
            <input suppressHydrationWarning type="text" placeholder="First name" className={styles.inputField} />
            <input suppressHydrationWarning type="email" placeholder="yourname@email.com" className={styles.inputField} />
          </div>
          <div className={styles.privacyArea}>
            <div className={styles.checkbox} />
            <span>I agree to the <a href="#" className="underline">Privacy Policy</a></span>
          </div>
          <button suppressHydrationWarning className={styles.getUpdatesBtn}>Get updates</button>
        </div>

        {/* Right: Links */}
        <div className={styles.linksGrid}>
          <div className={styles.linkColumn}>
            <span className={styles.columnTitle}>Ecosystem</span>
            <a href="#" className={styles.footerLink}>Hiresapien</a>
            <a href="#" className={styles.footerLink}>
              Neural Flow <span className={styles.badge}>New</span>
            </a>
            <a href="#" className={styles.footerLink}>
              Sentra <span className={`${styles.badge} ${styles.badgeWip}`}>WIP</span>
            </a>
            <a href="#" className={styles.footerLink}>Zippy Mind</a>
            <a href="#" className={styles.footerLink}>Genesis</a>
          </div>

          <div className={styles.linkColumn}>
            <span className={styles.columnTitle}>Company</span>
            <a href="#" className={styles.footerLink}>Our Story</a>
            <a href="#" className={styles.footerLink}>Insights</a>
            <a href="#" className={styles.footerLink}>News</a>
            <a href="#" className={styles.footerLink}>Careers</a>
          </div>

          <div className={styles.linkColumn}>
            <span className={styles.columnTitle}>Support</span>
            <a href="#" className={styles.footerLink}>Enterprise</a>
            <a href="#" className={styles.footerLink}>FAQs</a>
            <a href="#" className={styles.footerLink}>Security</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.actionBtns}>
          <button suppressHydrationWarning className={styles.loginBtn}>Login</button>
          <button suppressHydrationWarning className={styles.joinBtn}>Join Infinitica</button>
        </div>

        <div className={styles.socials}>
          <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
            <Link size={20} />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Instagram">
            <Camera size={20} />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="X">
            <X size={20} />
          </a>
        </div>
      </div>

      {/* Huge Brand Text with Zoom Action */}
      <div className="overflow-hidden py-10">
        <motion.div 
          style={{ scale, opacity }}
          className={styles.bigBrandText}
        >
          Infinitica
        </motion.div>
      </div>

      {/* Sub Footer Bar */}
      <div className={styles.subFooter}>
        <div className={styles.subLinks}>
          <span className={styles.subBadge}>Licensing</span>
          <span className={styles.subBadge}>T&Cs</span>
          <span className={styles.subBadge}>Privacy</span>
          <span className={styles.subBadge}>Cookies</span>
        </div>

        <div className={styles.copyright}>
          © 2026 INFINITICA SUPPLY B.V.
        </div>

        <div className={styles.creatorBadges}>
          <span>Created by</span>
          <span className={styles.nameBadge}>Thiganth</span>
        </div>
      </div>
    </footer>
  );
}
