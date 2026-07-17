"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const SHOP_URL = "https://shop.tiktok.com/us/pdp/1732474986384560309";

const colors = [
  { name: "Soft Blush", hex: "#d6b6b4", cap: "#e3c8c5", ink: "#706666" },
  { name: "Obsidian", hex: "#202321", cap: "#171918", ink: "#a8aaa7" },
  { name: "Porcelain", hex: "#e7e6df", cap: "#f1f0e9", ink: "#77786f" },
] as const;

const gallery = [
  {
    name: "Soft Blush",
    detail: "Warm, quiet, unmistakably SANNI.",
    image: "/images/sanni-blush-still.png",
    className: "gallery-card gallery-card--tall",
  },
  {
    name: "Obsidian",
    detail: "Minimal by design. Bold by nature.",
    image: "/images/sanni-obsidian-phone.png",
    className: "gallery-card gallery-card--wide",
  },
  {
    name: "Porcelain",
    detail: "A clean canvas for every day.",
    image: "/images/sanni-porcelain-phone.png",
    className: "gallery-card gallery-card--wide",
  },
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className={diagonal ? "arrow arrow--diagonal" : "arrow"}>
      →
    </span>
  );
}

function ShopLink({ light = false, label = "Shop the bottle" }: { light?: boolean; label?: string }) {
  return (
    <a
      className={`shop-link${light ? " shop-link--light" : ""}`}
      href={SHOP_URL}
      target="_blank"
      rel="noreferrer"
    >
      <span>{label}</span>
      <Arrow diagonal />
    </a>
  );
}

export default function Home() {
  const [activeColor, setActiveColor] = useState(0);
  const [phoneDocked, setPhoneDocked] = useState(false);
  const current = colors[activeColor];

  const bottleStyle = useMemo(
    () =>
      ({
        "--bottle": current.hex,
        "--cap": current.cap,
        "--bottle-ink": current.ink,
      }) as React.CSSProperties,
    [current],
  );

  useEffect(() => {
    const dockTimer = window.setTimeout(() => setPhoneDocked(true), 900);
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    elements.forEach((element) => observer.observe(element));

    return () => {
      window.clearTimeout(dockTimer);
      observer.disconnect();
    };
  }, []);

  const cycleColor = () => setActiveColor((index) => (index + 1) % colors.length);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="SANNI home">
          SANNI
        </a>
        <a className="profile-mark" href="#top" aria-label="SANNI home">
          <Image src="/images/sanni-logo.png" alt="SANNI" width={52} height={52} priority />
        </a>
        <nav aria-label="Main navigation">
          <a href="#design">Design</a>
          <a href="#colors">Colors</a>
          <a href={SHOP_URL} target="_blank" rel="noreferrer">
            Shop <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Hydrate. Create. Repeat.</p>
          <h1>
            Your bottle.
            <br />
            <em>Your angle.</em>
          </h1>
          <p className="hero-intro">
            The SANNI magnetic bottle keeps water close and your phone perfectly in frame—wherever the
            moment takes you.
          </p>
          <ShopLink />
        </div>

        <div className="product-stage" style={bottleStyle}>
          <div className="stage-label stage-label--top">
            <span>01</span>
            Magnetic hold
          </div>
          <div className="stage-label stage-label--bottom">
            <span>02</span>
            Insulated body
          </div>

          <button
            className={`phone-demo${phoneDocked ? " is-docked" : ""}`}
            type="button"
            onClick={() => setPhoneDocked((value) => !value)}
            aria-label={phoneDocked ? "Release phone from bottle" : "Attach phone to bottle"}
            aria-pressed={phoneDocked}
          >
            <span className="phone-camera">
              <i />
              <i />
            </span>
            <span className="phone-screen">
              <small>SANNI</small>
              <strong>made for<br />every moment.</strong>
            </span>
          </button>

          <button
            className="hero-bottle"
            type="button"
            onClick={cycleColor}
            aria-label={`Change bottle color. Current color: ${current.name}`}
          >
            <span className="bottle-ring" aria-hidden="true" />
            <span className="bottle-cap" aria-hidden="true">
              <i />
            </span>
            <span className="bottle-body" aria-hidden="true">
              <span className="bottle-shine" />
              <span className="bottle-logo">SANNI</span>
              <span className="bottle-tagline">MADE FOR<br />EVERY MOMENT.</span>
            </span>
          </button>

          <div className="stage-controls" aria-label="Bottle colors">
            <span className="stage-instruction">Tap bottle to change color</span>
            <div className="swatches">
              {colors.map((color, index) => (
                <button
                  key={color.name}
                  className={index === activeColor ? "is-active" : ""}
                  style={{ "--swatch": color.hex } as React.CSSProperties}
                  type="button"
                  onClick={() => setActiveColor(index)}
                  aria-label={`Show ${color.name} bottle`}
                  aria-pressed={index === activeColor}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hero-footnote">
          <span>Designed for the everyday</span>
          <span>Scroll to discover</span>
        </div>
      </section>

      <section className="manifesto" id="design">
        <p className="eyebrow reveal">The everyday, reimagined</p>
        <h2 className="reveal">
          One bottle.<br />
          <em>More possibilities.</em>
        </h2>
        <p className="manifesto-copy reveal">
          SANNI brings hydration and hands-free viewing into one beautifully considered object. Film a
          workout. Follow a recipe. Take a call. Keep moving.
        </p>
      </section>

      <section className="feature-story">
        <div className="feature-photo reveal">
          <Image
            src="/images/sanni-magnetic-blush.png"
            alt="Soft blush SANNI bottle magnetically holding a phone"
            fill
            sizes="(max-width: 820px) 100vw, 54vw"
          />
          <span className="photo-note">A magnetic moment</span>
        </div>
        <div className="feature-copy reveal">
          <p className="eyebrow">Snap. Set. Create.</p>
          <h2>Bring your own point of view.</h2>
          <p>
            The rotating magnetic ring transforms your bottle into a steady phone stand. Landscape or
            portrait, your best angle is always within reach.
          </p>
          <ul>
            <li><span>01</span> Secure magnetic connection</li>
            <li><span>02</span> Flexible hands-free viewing</li>
            <li><span>03</span> Comfortable carry ring</li>
          </ul>
          <ShopLink label="See it on TikTok Shop" />
        </div>
      </section>

      <section className="feature-rail" aria-label="Product highlights">
        <article className="reveal">
          <span>01</span>
          <h3>Hydration</h3>
          <p>A considered insulated form, made to move through your day.</p>
        </article>
        <article className="reveal">
          <span>02</span>
          <h3>Connection</h3>
          <p>Keep your phone close for calls, content, classes, and more.</p>
        </article>
        <article className="reveal">
          <span>03</span>
          <h3>Freedom</h3>
          <p>Set your screen, free your hands, and stay in your flow.</p>
        </article>
      </section>

      <section className="color-section" id="colors">
        <div className="color-heading reveal">
          <p className="eyebrow">Find your finish</p>
          <h2>Quiet colors.<br /><em>Strong presence.</em></h2>
        </div>
        <div className="gallery-grid">
          {gallery.map((item) => (
            <article className={`${item.className} reveal`} key={item.name}>
              <Image src={item.image} alt={`SANNI bottle in ${item.name}`} fill sizes="(max-width: 820px) 100vw, 50vw" />
              <div className="gallery-overlay">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <div className="closing-image reveal">
          <Image
            src="/images/sanni-obsidian-still.png"
            alt="Obsidian SANNI bottle beside a window"
            fill
            sizes="(max-width: 820px) 100vw, 45vw"
          />
        </div>
        <div className="closing-copy reveal">
          <Image src="/images/sanni-logo.png" alt="" width={62} height={62} />
          <p className="eyebrow">Made for every moment.</p>
          <h2>Ready when<br /><em>you are.</em></h2>
          <p>Meet the bottle designed for the way you move, watch, work, and create.</p>
          <ShopLink light label="Shop SANNI" />
        </div>
      </section>

      <footer>
        <a className="footer-mark" href="#top">SANNI</a>
        <div>
          <span>Made for every moment.</span>
          <a href={SHOP_URL} target="_blank" rel="noreferrer">TikTok Shop ↗</a>
        </div>
        <small>© {new Date().getFullYear()} SANNI</small>
      </footer>
    </main>
  );
}
