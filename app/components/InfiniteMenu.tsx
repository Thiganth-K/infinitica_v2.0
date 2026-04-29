"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./InfiniteMenu.module.css";

export type InfiniteMenuItem = {
  image: string;
  link: string;
  title: string;
  description: string;
};

export interface InfiniteMenuProps {
  items?: InfiniteMenuItem[];
  scale?: number;
}

export default function InfiniteMenu({ items = [], scale = 1 }: InfiniteMenuProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const loopedItems = useMemo(() => [...items, ...items, ...items], [items]);
  const displayItems = items.length ? items : [{ image: "/infinitica.png", link: "#products", title: "Infinitica", description: "A modern company experience." }];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !displayItems.length) return;

    scroller.scrollLeft = scroller.scrollWidth / 3;
  }, [displayItems.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !displayItems.length) return;

    let frame = 0;

    const updateActiveIndex = () => {
      const firstCard = scroller.querySelector("[data-menu-card]") as HTMLElement | null;
      if (!firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width + 16;
      const centerPoint = scroller.scrollLeft + scroller.clientWidth / 2;
      const rawIndex = Math.round(centerPoint / cardWidth);
      const normalizedIndex = ((rawIndex % displayItems.length) + displayItems.length) % displayItems.length;

      setActiveIndex(normalizedIndex);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const segmentWidth = scroller.scrollWidth / 3;
        const threshold = segmentWidth * 0.2;

        if (scroller.scrollLeft < threshold) {
          scroller.scrollLeft += segmentWidth;
        } else if (scroller.scrollLeft > segmentWidth * 1.8) {
          scroller.scrollLeft -= segmentWidth;
        }

        updateActiveIndex();
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    updateActiveIndex();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [displayItems.length]);

  const activeItem = displayItems[activeIndex] ?? displayItems[0];

  return (
    <div className={styles.menuShell} style={{ ["--menu-scale" as string]: String(scale) }}>
      <div className={styles.stage}>
        <div className={styles.summary}>
          <p className={styles.kicker}>Infinite Menu</p>
          <h3 className={styles.title}>A React Bits style product explorer with continuous motion.</h3>
          <p className={styles.copy}>
            Scroll horizontally to cycle through the lineup. The menu stays infinite by looping the cards three times and recenters as you move.
          </p>

          <div className={styles.activePanel}>
            <p className={styles.activeLabel}>Active Item</p>
            <h4 className={styles.activeTitle}>{activeItem.title}</h4>
            <p className={styles.activeCopy}>{activeItem.description}</p>
            <a href={activeItem.link} className={styles.cta} target={activeItem.link.startsWith("http") ? "_blank" : undefined} rel={activeItem.link.startsWith("http") ? "noreferrer" : undefined}>
              Explore Now
            </a>
          </div>
        </div>

        <div className={styles.carouselWrap}>
          <div ref={scrollerRef} className={styles.scroller}>
            {loopedItems.map((item, index) => {
              const isActive = displayItems.length > 0 && index % displayItems.length === activeIndex;

              return (
                <a
                  key={`${item.title}-${index}`}
                  href={item.link}
                  data-menu-card
                  className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                  style={{ transform: `scale(${isActive ? 1.05 : 1 * scale})` }}
                >
                  <div className={styles.cardImageWrap}>
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 80vw, 360px" className={styles.cardImage} />
                  </div>
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardText}>
                    <p className={styles.cardLabel}>#{String((index % displayItems.length) + 1).padStart(2, "0")}</p>
                    <h4 className={styles.cardTitle}>{item.title}</h4>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
