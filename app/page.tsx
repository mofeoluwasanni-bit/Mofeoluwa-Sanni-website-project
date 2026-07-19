"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Droplets,
  Leaf,
  Magnet as MagnetIcon,
  ShieldCheck,
  Snowflake,
} from "lucide-react";
import { ReactNode, useRef, useState } from "react";

const SHOP_URL = "https://shop.tiktok.com/us/pdp/1732474986384560309";
const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@sanni.co2";

const heroCampaigns = [
  { name: "Soft Blush", src: "/images/sanni-campaign-blush-way-v2.png", swatch: "#d8b5b0" },
  { name: "Obsidian", src: "/images/sanni-campaign-obsidian-way-v2.png", swatch: "#222321" },
  { name: "Porcelain", src: "/images/sanni-campaign-porcelain-way-v2.png", swatch: "#eee9dc" },
] as const;

const colorways = [
  {
    name: "Cream White",
    shortName: "Cream",
    src: "/images/sanni-product-porcelain.png",
    swatch: "#eee9dc",
    section: "#f2efe6",
    panel: "#e9e4d9",
    soft: "#f7f4ec",
    accent: "#427792",
    comingSoon: false,
    description: "A warm cream finish with a clean, soft presence that belongs everywhere.",
  },
  {
    name: "Black",
    shortName: "Black",
    src: "/images/sanni-colorway-black.png",
    swatch: "#20211f",
    section: "#f2efe6",
    panel: "#e9e4d9",
    soft: "#f7f4ec",
    accent: "#427792",
    comingSoon: false,
    description: "Deep matte black with a durable coating designed to shrug off fingerprints.",
  },
  {
    name: "Pink",
    shortName: "Pink",
    src: "/images/sanni-colorway-pink.png",
    swatch: "#e8c0b8",
    section: "#f2efe6",
    panel: "#e9e4d9",
    soft: "#f7f4ec",
    accent: "#427792",
    comingSoon: false,
    description: "A calm blush-pink finish that feels warm, modern, and unmistakably SANNI.",
  },
  {
    name: "Mint Blue",
    shortName: "Mint",
    src: "/images/sanni-colorway-mint-v2.jpg",
    swatch: "#bddfd9",
    section: "#e3f1ee",
    panel: "#cee7e2",
    soft: "#eaf6f3",
    accent: "#5f978f",
    comingSoon: true,
    description: "A fresh mint-blue finish designed to bring a cool, calming energy to every moment. Coming soon.",
  },
] as const;

const marqueeRowOne = [
  { src: "/images/sanni-magnetic-blush.png", alt: "SANNI blush bottle held beside a window", shape: "portrait" },
  { src: "/images/sanni-obsidian-phone.png", alt: "SANNI obsidian bottle used as a phone stand", shape: "portrait" },
  { src: "/images/sanni-product-porcelain.png", alt: "Porcelain SANNI bottle", shape: "square" },
  { src: "/images/sanni-blush-still.png", alt: "Soft blush SANNI bottle", shape: "portrait" },
  { src: "/images/sanni-blush-open-lifestyle.png", alt: "Soft blush SANNI bottle with its lid open beside a window", shape: "portrait" },
  { src: "/images/sanni-feature-overview.png", alt: "SANNI magnetic bottle feature overview", shape: "square" },
];

const marqueeRowTwo = [
  { src: "/images/sanni-product-blush.png", alt: "Soft blush SANNI product view", shape: "square" },
  { src: "/images/sanni-porcelain-phone.png", alt: "Porcelain SANNI bottle holding a phone", shape: "portrait" },
  { src: "/images/sanni-porcelain-magnetic-lifestyle.png", alt: "Porcelain SANNI bottle magnetically holding a phone beside white flowers", shape: "portrait" },
  { src: "/images/sanni-obsidian-still.png", alt: "Obsidian SANNI bottle holding a phone beside a window", shape: "portrait" },
  { src: "/images/sanni-product-obsidian.png", alt: "Obsidian SANNI product view", shape: "square" },
];

const features = [
  {
    number: "01",
    name: "N52 Magnetic Ring",
    description: "A powerful magnetic connection for secure hands-free viewing, filming, calls, and more.",
    icon: MagnetIcon,
  },
  {
    number: "02",
    name: "24-Hour Temperature",
    description: "Vacuum-sealed double-wall insulation helps keep every sip at the temperature you want.",
    icon: Snowflake,
  },
  {
    number: "03",
    name: "100% Leakproof",
    description: "A dependable straw lid and anti-sweat exterior designed for bags, desks, and daily movement.",
    icon: Droplets,
  },
  {
    number: "04",
    name: "18/8 Stainless Steel",
    description: "Food-grade construction with a hard matte powder coating for a refined, durable finish.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    name: "BPA-Free Design",
    description: "Thoughtful materials and a comfortable carry ring, made to become part of your everyday rhythm.",
    icon: Leaf,
  },
] as const;

const collection = [
  {
    number: "01",
    category: "Warm / Quiet",
    name: "Soft Blush",
    tone: "#d4b2b0",
    images: [
      "/images/sanni-product-blush.png",
      "/images/sanni-blush-still.png",
      "/images/sanni-magnetic-blush.png",
    ],
  },
  {
    number: "02",
    category: "Bold / Minimal",
    name: "Obsidian",
    tone: "#252725",
    images: [
      "/images/sanni-product-obsidian.png",
      "/images/sanni-obsidian-still.png",
      "/images/sanni-obsidian-phone.png",
    ],
  },
  {
    number: "03",
    category: "Clean / Timeless",
    name: "Porcelain",
    tone: "#e8e6de",
    images: [
      "/images/sanni-product-porcelain.png",
      "/images/sanni-porcelain-phone.png",
      "/images/sanni-material-specs.png",
    ],
  },
] as const;

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ShopButton({ label = "Shop SANNI", outline = false }: { label?: string; outline?: boolean }) {
  return (
    <a className={outline ? "shop-button shop-button--outline" : "shop-button"} href={SHOP_URL} target="_blank" rel="noreferrer">
      <span>{label}</span>
      <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

function Character({ progress, index, total, character }: { progress: MotionValue<number>; index: number; total: number; character: string }) {
  const start = (index / total) * 0.48;
  const end = Math.min(0.6, start + 0.1);
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return <motion.span style={{ opacity }}>{character === " " ? "\u00A0" : character}</motion.span>;
}

function AnimatedText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "end 0.35"] });
  const characters = children.split("");

  return (
    <p ref={ref} className="animated-text">
      {characters.map((character, index) => (
        <Character key={`${character}-${index}`} progress={scrollYProgress} index={index} total={characters.length} character={character} />
      ))}
    </p>
  );
}

/* Previous generated hero removed from the rendered experience.
function HeroBottle({ activeColor, setActiveColor }: { activeColor: number; setActiveColor: (value: number) => void }) {
  const [phoneDocked, setPhoneDocked] = useState(false);
  const current = colors[activeColor];

  useEffect(() => {
    const timer = window.setTimeout(() => setPhoneDocked(true), 950);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="hero-product"
      style={{ "--bottle": current.body, "--cap": current.cap, "--bottle-ink": current.ink } as React.CSSProperties}
    >
      <button
        className={`hero-phone${phoneDocked ? " is-docked" : ""}`}
        type="button"
        aria-label={phoneDocked ? "Release phone from bottle" : "Attach phone to bottle"}
        aria-pressed={phoneDocked}
        onClick={() => setPhoneDocked((value) => !value)}
      >
        <span className="hero-phone-cameras"><i /><i /></span>
        <span className="hero-phone-screen"><small>SANNI</small><strong>made for<br />every moment.</strong></span>
      </button>

      <button
        className="bottle-model"
        type="button"
        aria-label={`Change bottle color. Current color: ${current.name}`}
        onClick={() => setActiveColor((activeColor + 1) % colors.length)}
      >
        <span className="model-ring" />
        <span className="model-cap"><i /></span>
        <span className="model-body">
          <span className="model-shine" />
          <span className="model-logo">SANNI</span>
          <span className="model-tagline">MADE FOR<br />EVERY MOMENT.</span>
        </span>
      </button>

      <div className="hero-color-controls" aria-label="Bottle colors">
        {colors.map((color, index) => (
          <button
            key={color.name}
            className={index === activeColor ? "is-active" : ""}
            style={{ "--swatch": color.body } as React.CSSProperties}
            type="button"
            aria-label={`Show ${color.name}`}
            aria-pressed={index === activeColor}
            onClick={() => setActiveColor(index)}
          />
        ))}
        <span>{current.name}</span>
      </div>
      <p className="hero-product-hint">Tap bottle to change color · Tap phone to release</p>
    </div>
  );
}

function HeroSection({ activeColor, setActiveColor }: { activeColor: number; setActiveColor: (value: number) => void }) {
  return (
    <section className="hero-section min-h-screen" id="top">
      <FadeIn y={-20} className="hero-nav-wrap">
        <nav className="hero-nav" aria-label="Main navigation">
          <a href="#about">Story</a>
          <a href="#features">Details</a>
          <a href="#collection">Colors</a>
          <a href={SHOP_URL} target="_blank" rel="noreferrer">Shop</a>
        </nav>
        <a className="hero-logo" href="#top" aria-label="SANNI home">
          <Image src="/images/sanni-logo.png" alt="SANNI" width={56} height={56} priority />
        </a>
      </FadeIn>

      <div className="hero-heading-clip">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading whitespace-nowrap">MEET SANNI</h1>
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="hero-product-wrap">
        <Magnet padding={150} strength={3}>
          <HeroBottle activeColor={activeColor} setActiveColor={setActiveColor} />
        </Magnet>
      </FadeIn>

      <div className="hero-bottom">
        <FadeIn delay={0.35} y={20}>
          <p className="hero-description">hydration and hands-free freedom, crafted into one unforgettable bottle</p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ShopButton />
        </FadeIn>
      </div>
    </section>
  );
}

*/

function HeroSection() {
  const [activeColor, setActiveColor] = useState(0);
  const current = heroCampaigns[activeColor];
  const nextColor = () => setActiveColor((activeColor + 1) % heroCampaigns.length);

  return (
    <section className="hero-section min-h-screen" id="top">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          className="hero-campaign-frame"
          key={current.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            className="hero-campaign-image"
            src={current.src}
            alt={`${current.name} SANNI magnetic bottle campaign`}
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <FadeIn y={-20} className="hero-nav-wrap">
        <div className="hero-nav-cluster">
          <a className="hero-logo" href="#top" aria-label="SANNI home">
            <Image src="/images/sanni-logo.png" alt="SANNI" width={52} height={52} priority />
          </a>
          <nav className="hero-nav" aria-label="Main navigation">
            <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noreferrer">Story</a>
            <a href="#colors">Colors</a>
            <a href="#features">Features</a>
            <a href={SHOP_URL} target="_blank" rel="noreferrer">Buy now</a>
          </nav>
        </div>
      </FadeIn>

      <div className="hero-mobile-copy">
        <span>SANNI</span>
        <h1>Your bottle.<br />Your <em>way.</em></h1>
        <p>Made for every moment.</p>
      </div>

      <button className="hero-bottle-hotspot" type="button" onClick={nextColor} aria-label={`Change bottle color. Current color: ${current.name}`}>
        <span>Click bottle to change color</span>
      </button>

      <div className="hero-color-switcher" aria-label="Choose bottle color">
        {heroCampaigns.map((campaign, index) => (
          <button
            key={campaign.name}
            className={index === activeColor ? "is-active" : ""}
            style={{ "--swatch": campaign.swatch } as React.CSSProperties}
            type="button"
            aria-label={`Show ${campaign.name}`}
            aria-pressed={index === activeColor}
            onClick={() => setActiveColor(index)}
          />
        ))}
        <span>{current.name}</span>
      </div>

      <FadeIn delay={0.45} y={20} className="hero-primary-action"><ShopButton label="Shop SANNI" /></FadeIn>
      <a className="hero-scroll-cue" href="#gallery" aria-label="Scroll to discover SANNI"><span>Scroll</span><i /></a>
    </section>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rowOneX = useTransform(scrollYProgress, [0, 1], [-280, 160]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], [160, -300]);
  const first = [...marqueeRowOne, ...marqueeRowOne, ...marqueeRowOne];
  const second = [...marqueeRowTwo, ...marqueeRowTwo, ...marqueeRowTwo];

  return (
    <section className="marquee-section" id="gallery" ref={ref} aria-label="SANNI in every moment">
      <motion.div className="marquee-row" style={{ x: rowOneX, willChange: "transform" }}>
        {first.map((image, index) => (
          <div className={`marquee-tile marquee-tile--${image.shape}`} key={`one-${index}`}>
            <Image src={image.src} alt={image.alt} fill sizes="420px" loading="lazy" />
          </div>
        ))}
      </motion.div>
      <motion.div className="marquee-row" style={{ x: rowTwoX, willChange: "transform" }}>
        {second.map((image, index) => (
          <div className={`marquee-tile marquee-tile--${image.shape}`} key={`two-${index}`}>
            <Image src={image.src} alt={image.alt} fill sizes="420px" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function MagSafeGuideSection() {
  return (
    <section className="magsafe-guide-section" aria-labelledby="magsafe-guide-title">
      <div className="magsafe-guide-shell">
        <FadeIn y={28} className="magsafe-guide-copy">
          <span className="magsafe-guide-eyebrow">Included with every bottle</span>
          <h2 id="magsafe-guide-title">One bottle.<br /><em>Every phone.</em></h2>
          <p>
            Your SANNI arrives with a black MagSafe adapter ring already resting on the lid magnet, so magnetic and non-magnetic phones can both connect.
          </p>
          <div className="magsafe-direct-note">
            <span className="magsafe-direct-icon" aria-hidden="true"><i /></span>
            <div>
              <strong>Already MagSafe?</strong>
              <p>If your phone has built-in magnets (iPhone 12 or newer, Google Pixel 10, or HMD Skyline), you don&apos;t need to follow the ring instructions — just make sure your case is MagSafe or Qi2 compatible, then snap your phone straight onto the bottle.</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.04} y={18} className="magsafe-guide-instruction-title">
          <h3>For Androids, older phones, and cases without built-in magnetic attachment.</h3>
        </FadeIn>

        <div className="magsafe-guide-steps" aria-label="How to use the included adapter ring with a non-magnetic phone">
          <FadeIn delay={0.08} y={24} className="magsafe-step">
            <div className="magsafe-step-head"><span>01</span><small>Included</small></div>
            <div className="magsafe-step-photo">
              <Image
                src="/images/magsafe-guide-01-attached.jpg"
                alt="Black MagSafe adapter ring resting on the pink SANNI bottle lid"
                fill
                unoptimized
                style={{ objectFit: "contain" }}
                sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <h3>Find the included ring</h3>
            <p>The black adapter ring arrives attached to the bottle&apos;s magnetic lid.</p>
          </FadeIn>

          <FadeIn delay={0.16} y={24} className="magsafe-step">
            <div className="magsafe-step-head"><span>02</span><small>Slide off</small></div>
            <div className="magsafe-step-photo">
              <Image
                src="/images/magsafe-guide-02-removed.jpg"
                alt="Black MagSafe adapter ring removed from the pink SANNI bottle lid"
                fill
                unoptimized
                style={{ objectFit: "contain" }}
                sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <h3>Remove the ring</h3>
            <p>Slide the adapter ring away from the lid. If your phone or case already supports MagSafe, set it aside and connect directly.</p>
          </FadeIn>

          <FadeIn delay={0.24} y={24} className="magsafe-step">
            <div className="magsafe-step-head"><span>03</span><small>Peel</small></div>
            <div className="magsafe-step-photo">
              <Image
                src="/images/magsafe-guide-03-peel.jpg"
                alt="White protective backing being peeled from the black MagSafe adapter ring"
                fill
                unoptimized
                style={{ objectFit: "contain" }}
                sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <h3>Peel the white backing</h3>
            <p>For a non-magnetic phone or case, remove the white protective layer to expose the adhesive.</p>
          </FadeIn>

          <FadeIn delay={0.32} y={24} className="magsafe-step">
            <div className="magsafe-step-head"><span>04</span><small>Press &amp; snap</small></div>
            <div className="magsafe-step-photo">
              <Image
                src="/images/magsafe-guide-04-phone.jpg"
                alt="Black MagSafe adapter ring attached to the back of an older iPhone"
                fill
                unoptimized
                style={{ objectFit: "contain" }}
                sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <h3>Attach it to your phone</h3>
            <p>Center and press it firmly onto a clean, dry phone or case. Then snap it onto the SANNI lid.</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ColorwaySection() {
  const [activeColorway, setActiveColorway] = useState(1);
  const current = colorways[activeColorway];

  return (
    <section
      className="colorway-section"
      id="colors"
      style={{
        "--colorway-section": current.section,
        "--colorway-panel": current.panel,
        "--colorway-soft": current.soft,
        "--colorway-accent": current.accent,
      } as React.CSSProperties}
    >
      <div className="colorway-shell">
        <FadeIn y={30} className="colorway-visual">
          <button
            className="colorway-image-button"
            type="button"
            aria-label={`Show next SANNI finish. Current finish: ${current.name}`}
            onClick={() => setActiveColorway((activeColorway + 1) % colorways.length)}
          >
            {colorways.map((colorway, index) => {
              const isActive = index === activeColorway;

              return (
                <motion.span
                  className={`colorway-image${isActive ? " is-active" : ""}`}
                  key={colorway.src}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundImage: `url("${colorway.src}")` }}
                  aria-hidden={!isActive}
                />
              );
            })}
            <span className="colorway-tap-label">Tap image for the next finish</span>
          </button>
        </FadeIn>

        <FadeIn delay={0.12} y={30} className="colorway-details">
          <p className="colorway-intro">Every colorway shares the same vacuum-sealed core and MagSafe ring — only the finish changes. Tap a ring to preview it.</p>
          <div className="colorway-options" aria-label="Choose a SANNI finish">
            {colorways.map((colorway, index) => (
              <button
                className={index === activeColorway ? "is-active" : ""}
                key={colorway.name}
                type="button"
                aria-label={`Preview ${colorway.name}`}
                aria-pressed={index === activeColorway}
                onClick={() => setActiveColorway(index)}
              >
                <span className="colorway-ring"><i style={{ "--swatch": colorway.swatch } as React.CSSProperties} /></span>
                <span>{colorway.name}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              className="colorway-description"
              key={current.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
            >
              {current.description}
            </motion.p>
          </AnimatePresence>
          {current.comingSoon ? (
            <span className="coming-soon-button" role="status">Mint Blue &mdash; Coming Soon</span>
          ) : (
            <ShopButton label={`Shop ${current.shortName}`} />
          )}
        </FadeIn>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section min-h-screen" id="about">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="about-object about-object--one">
        <Image src="/images/about-porcelain-phone.png" alt="Porcelain SANNI bottle supporting a phone beside white flowers" fill sizes="240px" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="about-object about-object--two">
        <Image src="/images/about-obsidian-phone.png" alt="Obsidian SANNI bottle supporting a phone beside white flowers" fill sizes="220px" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="about-object about-object--three">
        <Image src="/images/about-blush-handheld.png" alt="Blush SANNI bottle held beside a window with a phone attached" fill sizes="240px" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="about-object about-object--four">
        <Image src="/images/sanni-product-porcelain.png" alt="Porcelain SANNI bottle product view" fill sizes="220px" />
      </FadeIn>

      <div className="about-content">
        <FadeIn y={40}><h2 className="section-display hero-heading">ABOUT IT</h2></FadeIn>
        <AnimatedText>
          This bottle does it all. Comfortable to hold, built to last, and keeps your drink cold or hot for hours. No leaks, no spills — and the magnetic lid means your phone snaps right on top. Simple, reliable, and made to fit your everyday.
        </AnimatedText>
        <FadeIn delay={0.25} y={20}><ShopButton /></FadeIn>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <FadeIn y={40}><h2 className="section-display">BUILT IN</h2></FadeIn>
      <div className="feature-list">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <FadeIn key={feature.number} delay={index * 0.1} y={30}>
              <article className="feature-item">
                <span className="feature-number">{feature.number}</span>
                <div className="feature-detail">
                  <div className="feature-title-row"><h3>{feature.name}</h3><Icon aria-hidden="true" /></div>
                  <p>{feature.description}</p>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function CollectionCard({ item, index, total }: { item: (typeof collection)[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div className="collection-card-space" ref={ref}>
      <motion.article className="collection-card" style={{ scale, top: `calc(6rem + ${index * 28}px)`, "--tone": item.tone } as React.CSSProperties}>
        <div className="collection-card-head">
          <span className="collection-number">{item.number}</span>
          <span className="collection-category">{item.category}</span>
          <h3>{item.name}</h3>
          <ShopButton label="Shop this color" outline />
        </div>
        <div className="collection-images-grid">
          <div className="collection-small-images">
            <div><Image src={item.images[0]} alt={`${item.name} SANNI bottle product view`} fill sizes="40vw" /></div>
            <div><Image src={item.images[1]} alt={`${item.name} SANNI bottle lifestyle view`} fill sizes="40vw" /></div>
          </div>
          <div className="collection-large-image"><Image src={item.images[2]} alt={`${item.name} SANNI bottle detail`} fill sizes="60vw" /></div>
        </div>
      </motion.article>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Image src="/images/sanni-logo.png" alt="SANNI" width={68} height={68} />
      <p>Made for every moment.</p>
      <a href={SHOP_URL} target="_blank" rel="noreferrer">TikTok Shop <ArrowUpRight size={16} /></a>
    </footer>
  );
}

function TikTokCallout() {
  return (
    <section className="tiktok-callout" aria-labelledby="tiktok-callout-title">
      <FadeIn y={30} className="tiktok-callout-card">
        <span className="tiktok-callout-eyebrow">SANNI on TikTok</span>
        <h2 id="tiktok-callout-title">Wanna see the bottles in action?</h2>
        <a href={TIKTOK_PROFILE_URL} target="_blank" rel="noreferrer">
          Watch on TikTok <ArrowUpRight size={19} />
        </a>
      </FadeIn>
    </section>
  );
}

export default function Home() {
  return (
    <main className="sanni-site overflow-x-clip">
      <HeroSection />
      <MagSafeGuideSection />
      <MarqueeSection />
      <ColorwaySection />
      <AboutSection />
      <FeaturesSection />
      <TikTokCallout />
      <SiteFooter />
    </main>
  );
}
