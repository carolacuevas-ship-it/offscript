import { FormEvent, useEffect, useState } from "react";

const A = "/assets/";

type Route =
  | "/"
  | "/work"
  | "/services"
  | "/studio"
  | "/contact"
  | "/project/slow-club"
  | "/project/jewelry-shape"
  | "/project/crumb";

function currentRoute(): Route {
  const path = window.location.hash.replace(/^#/, "") || "/";
  return path as Route;
}

function Link({
  to,
  children,
  className = "",
  onClick,
}: {
  to: Route;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      className={className}
      href={`#${to}`}
      onClick={() => {
        onClick?.();
        if (currentRoute() === to) window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <Link to="/" className="logo-link" onClick={close}>
        <img src={`${A}183c7.svg`} alt="OFF/SCRIPT" />
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav className={open ? "nav open" : "nav"} aria-label="Primary navigation">
        <Link to="/" onClick={close}>
          HOME
        </Link>
        <Link to="/work" onClick={close}>
          WORK
        </Link>
        <Link to="/services" onClick={close}>
          SERVICES
        </Link>
        <Link to="/studio" onClick={close}>
          STUDIO
        </Link>
        <Link to="/contact" onClick={close}>
          CONTACT
        </Link>
        <Link to="/contact" className="nav-cta" onClick={close}>
          GET IN TOUCH
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={`${A}183c7.svg`} alt="OFF/SCRIPT" />
        <small>Work Copyright: © 2026 OFF/SCRIPT Creative Studio</small>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <Link to="/">Home</Link>
        <i />
        <Link to="/work">Work</Link>
        <i />
        <Link to="/services">Services</Link>
        <i />
        <Link to="/studio">Studio</Link>
        <i />
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="socials">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://behance.net" target="_blank" rel="noreferrer">
          Behance
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

function ContactBand() {
  return (
    <section className="contact-band wrap">
      <h2>
        LET’S CREATE
        <br />
        TOGETHER.
      </h2>
      <div>
        <p>
          Have a project in mind? We’d love to hear from you. Let’s create something unique
          together.
        </p>
        <Link to="/contact" className="pill">
          GET IN TOUCH →
        </Link>
      </div>
    </section>
  );
}

const projects = [
  {
    id: "slow",
    title: "Project 01 — Slow Club",
    type: "Coffee Shop Branding & Web Design",
    category: "branding",
    image: "e8e84.png",
    route: "/project/slow-club" as Route,
  },
  {
    id: "jewelry",
    title: "Project 02 — Jewelry Shape",
    type: "Jewelry Branding & Web Design",
    category: "editorial",
    image: "b8801.png",
    route: "/project/jewelry-shape" as Route,
  },
  {
    id: "crumb",
    title: "Project 03 — Crumb",
    type: "Cookie Brand Identity & Web Design",
    category: "digital",
    image: "3d6a4.png",
    route: "/project/crumb" as Route,
  },
];

function openProjectRoute(value: string) {
  if (value === "all") {
    window.location.hash = "/work";
    return;
  }

  const project = projects.find((item) => item.category === value);
  if (project) window.location.hash = project.route;
}

function ProjectCard({
  project,
  compact = false,
}: {
  project: (typeof projects)[number];
  compact?: boolean;
}) {
  return (
    <article className={compact ? "project-card compact" : "project-card"}>
      <Link to={project.route} className="project-image">
        <img src={`${A}${project.image}`} alt={`${project.title} project preview`} />
      </Link>
      <h3>
        <Link to={project.route}>{project.title}</Link>
      </h3>
      <p>{project.type}</p>
      {!compact && (
        <Link to={project.route} className="text-link">
          View Project →
        </Link>
      )}
    </article>
  );
}

function Filters({
  active,
  onChange,
  projectNames = false,
}: {
  active: string;
  onChange: (value: string) => void;
  projectNames?: boolean;
}) {
  const options = projectNames
    ? [
        ["all", "ALL PROJECTS"],
        ["branding", "SLOW CLUB"],
        ["editorial", "SHAPE JEWELRY"],
        ["digital", "CRUMB"],
      ]
    : [
        ["all", "ALL PROJECTS"],
        ["branding", "BRANDING"],
        ["editorial", "EDITORIAL"],
        ["digital", "DIGITAL"],
      ];

  return (
    <div className="filters" aria-label="Filter projects">
      {options.map(([value, label]) => (
        <button
          key={value}
          className={active === value ? "active" : ""}
          onClick={() => onChange(value)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <section className="home-hero wrap">
          <div className="hero-copy">
            <h1>
              CREATIVE
              <br />
              SOLUTIONS
              <br />
              OFF SCRIPT.
            </h1>
            <p>
              We are an independent creative studio specializing in visual identity, branding, and
              digital design. We combine strategy and creativity to build unique visual experiences
              that connect brands with people.
            </p>
            <a className="pill hero-button" href="#selected-work">
              EXPLORE OUR WORK →
            </a>
          </div>
          <img src={`${A}f9f39.png`} alt="OFF/SCRIPT brand stationery in sunlight" />
        </section>
        <section className="services-strip">
          {[
            [
              "01 — Strategy",
              "We turn ideas into clear, meaningful concepts that help brands stand out.",
            ],
            [
              "02 — Design",
              "We create unique visual identities that communicate personality and purpose.",
            ],
            [
              "03 — Digital",
              "We bring brands to life through creative and engaging digital experiences.",
            ],
          ].map(([title, copy]) => (
            <div key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          ))}
          <img className="service-divider first" src={`${A}805e1.svg`} alt="" />
          <img className="service-divider second" src={`${A}805e1.svg`} alt="" />
        </section>
        <section className="selected wrap" id="selected-work">
          <div className="section-heading">
            <h2>SELECTED WORK</h2>
            <p>A selection of projects where creativity meets strategy</p>
          </div>
          <div className="project-grid three">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
          <Link to="/work" className="text-link centered">
            View All Projects →
          </Link>
        </section>
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}

function Work() {
  const [filter, setFilter] = useState("all");
  const selectProject = (value: string) => {
    if (value === "all") {
      setFilter("all");
      return;
    }

    const project = projects.find((item) => item.category === value);
    if (project) window.location.hash = project.route;
  };
  const shown = projects.filter((project) => filter === "all" || project.category === filter);
  return (
    <>
      <main>
        <section className="page-intro wrap">
          <h1>SELECTED WORK.</h1>
          <p>A collection of projects where creativity meets strategy.</p>
          <Filters active={filter} onChange={selectProject} projectNames />
        </section>
        <section className="work-grid wrap" aria-live="polite">
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}

const projectDetails = {
  "/project/slow-club": {
    title: "SLOW CLUB",
    subtitle: "Coffee shop branding and web design.",
    description:
      "Brand identity and art direction for Slow Club, a warm coffee concept created to make everyday pauses feel more intentional.",
    statement:
      "A joyful identity that turns an everyday coffee break into a bright, memorable ritual.",
    images: ["e8e84.png", "60ab5.png", "e8e84.png"],
  },
  "/project/jewelry-shape": {
    title: "SHAPE JEWELRY",
    subtitle: "Branding art direction.",
    description:
      "Brand identity and art direction for a jewelry studio centered on timeless forms, considered details and personal expression.",
    statement:
      "This brand creates new experiences for its unique collection and limited items, made with precision and detail.",
    images: ["7c79e.png", "b5e36.png", "4896c.png"],
  },
  "/project/crumb": {
    title: "CRUMB",
    subtitle: "Cookie brand identity and web design.",
    description:
      "A warm, expressive identity and digital home for a bakery making comforting cookies with a modern point of view.",
    statement:
      "A playful brand system built to make every batch feel handcrafted, generous and impossible to resist.",
    images: ["3d6a4.png", "3d6a4.png", "3d6a4.png"],
  },
} as const;

function ProjectPage({ route }: { route: keyof typeof projectDetails }) {
  const project = projectDetails[route];
  const activeProject =
    route === "/project/jewelry-shape"
      ? "editorial"
      : route === "/project/crumb"
        ? "digital"
        : "branding";
  return (
    <>
      <main>
        <section className="page-intro project-intro wrap">
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
          <Filters active={activeProject} onChange={openProjectRoute} projectNames />
        </section>
        <section className="project-story wrap">
          <div className="story-heading">
            <h2>THE PROJECT.</h2>
            <p>{project.description}</p>
          </div>
          <div className="detail-grid">
            <img src={`${A}${project.images[0]}`} alt={`${project.title} brand application`} />
            <img src={`${A}${project.images[1]}`} alt={`${project.title} visual identity detail`} />
            <img src={`${A}${project.images[2]}`} alt={`${project.title} design system`} />
          </div>
          <h2 className="project-statement">{project.statement}</h2>
        </section>
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}

function SlowClubPage() {
  const colors = [
    ["Butter Yellow", "#F5E6A8"],
    ["Powder Blue", "#B8D4E3"],
    ["Espresso Brown", "#49362F"],
    ["Warm Cream", "#FAF6ED"],
    ["Sage Olive", "#A8AD89"],
  ];

  return (
    <>
      <main className="slow-case">
        <section className="slow-intro wrap reveal">
          <p className="slow-kicker">Brand Identity &amp; Web Design</p>
          <h1>SLOW CLUB</h1>
          <p className="slow-tagline">Specialty coffee · Slow mornings</p>
          <Filters active="branding" onChange={openProjectRoute} projectNames />
        </section>

        <section className="slow-hero wrap reveal">
          <img
            src={`${A}slow-club/hero-cafe.png`}
            alt="Slow Club specialty coffee shop filled with warm morning light"
          />
          <span>Slow mornings, thoughtfully made.</span>
        </section>

        <section className="slow-overview slow-section wrap reveal">
          <p className="slow-eyebrow">01 / PROJECT INTRODUCTION</p>
          <div className="slow-copy-grid">
            <h2>
              COFFEE, AT A<br />
              SLOWER PACE.
            </h2>
            <div>
              <p>
                Slow Club is a specialty coffee shop concept built around the idea of slowing down
                and enjoying the little moments in life. The brand celebrates intentional living,
                meaningful connections, and the simple pleasure of a good cup of coffee.
              </p>
              <p>
                Through a warm color palette, expressive typography, and a minimal yet welcoming
                visual identity, Slow Club transforms an everyday coffee experience into a moment of
                comfort and relaxation.
              </p>
            </div>
          </div>
        </section>

        <section className="slow-section slow-concept wrap reveal">
          <p className="slow-eyebrow">02 / THE CONCEPT</p>
          <div className="slow-copy-grid">
            <h2>
              The Art of
              <br />
              <em>Slowing Down</em>
            </h2>
            <div>
              <p>
                Slow Club was created to challenge the fast-paced nature of everyday life. Instead
                of treating coffee as a quick routine, the brand encourages people to pause,
                connect, and appreciate the present moment.
              </p>
              <p>
                The visual identity combines simplicity, warmth, and a playful editorial approach to
                create a contemporary coffee brand that feels approachable, authentic, and
                memorable.
              </p>
            </div>
          </div>
          <div className="slow-photo-grid">
            <img
              className="portrait"
              src={`${A}slow-club/coffee-prep.png`}
              alt="Barista preparing a pour-over coffee in natural light"
            />
            <img
              src={`${A}slow-club/coffee-table.png`}
              alt="Coffee and pastry arranged on a sunlit table"
            />
            <img
              src={`${A}slow-club/final-atmosphere.png`}
              alt="A relaxed guest enjoying a quiet morning at the coffee shop"
            />
          </div>
        </section>

        <section className="slow-identity slow-section reveal">
          <div className="wrap">
            <p className="slow-eyebrow">03 / VISUAL IDENTITY</p>
            <div className="slow-copy-grid">
              <h2>
                A Warm &amp;
                <br />
                Thoughtful Identity
              </h2>
              <p>
                The Slow Club identity balances contemporary minimalism with nostalgic warmth. Soft
                colors, refined typography, and thoughtful compositions create a welcoming
                personality that reflects the brand&apos;s relaxed philosophy.
              </p>
            </div>
            <div className="slow-wordmark">
              <span>SLOW CLUB.</span>
              <small>Your daily dose of slow.</small>
            </div>
            <div className="identity-images">
              <img src={`${A}60ab5.png`} alt="Slow Club wordmark and branded coffee cup system" />
              <img
                src={`${A}slow-club/brand-applications.png`}
                alt="Slow Club packaging, menu, stationery and coffee applications"
              />
            </div>
          </div>
        </section>

        <section className="slow-section slow-palette wrap reveal">
          <p className="slow-eyebrow">04 / COLOR PALETTE</p>
          <div className="slow-section-title">
            <h2>
              Colors Made for
              <br />
              Slow Mornings
            </h2>
            <p>
              A soft, grounded palette inspired by warm light, ceramic cups and freshly brewed
              espresso.
            </p>
          </div>
          <div className="swatches">
            {colors.map(([name, hex]) => (
              <div className="swatch" key={hex} style={{ backgroundColor: hex }}>
                <strong>{name}</strong>
                <span>{hex}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="slow-type slow-section reveal">
          <div className="wrap">
            <p className="slow-eyebrow">05 / TYPOGRAPHY</p>
            <h2>Typography</h2>
            <div className="type-specimens">
              <article className="serif-specimen">
                <span>Instrument Serif</span>
                <strong>
                  Good coffee.
                  <br />
                  <em>No rush.</em>
                </strong>
                <p>Expressive editorial headlines</p>
              </article>
              <article className="sans-specimen">
                <span>Instrument Sans</span>
                <strong>
                  Slow mornings,
                  <br />
                  thoughtfully made.
                </strong>
                <p>Clean, contemporary supporting typography</p>
              </article>
              <article className="inter-specimen">
                <span>Inter</span>
                <strong>
                  Aa Bb Cc
                  <br />
                  012345
                </strong>
                <p>Functional text and interface details</p>
              </article>
            </div>
          </div>
        </section>

        <section className="slow-section slow-applications wrap reveal">
          <p className="slow-eyebrow">06 / BRAND APPLICATIONS</p>
          <div className="slow-section-title">
            <h2>
              The Brand in
              <br />
              Everyday Moments
            </h2>
            <p>
              From the cup in your hand to the menu on the counter, every detail makes room for a
              slower rhythm.
            </p>
          </div>
          <div className="application-gallery">
            <img src={`${A}e8e84.png`} alt="Slow Club branded takeaway coffee cups" />
            <img
              src={`${A}slow-club/brand-applications.png`}
              alt="Slow Club coffee packaging, menus and printed stationery"
            />
            <img
              src={`${A}slow-club/coffee-table.png`}
              alt="Slow Club coffee and pastry lifestyle moment"
            />
          </div>
        </section>

        <section className="slow-web slow-section reveal">
          <div className="wrap">
            <p className="slow-eyebrow">07 / WEBSITE DESIGN</p>
            <div className="slow-copy-grid">
              <h2>
                A Digital Coffee
                <br />
                Experience
              </h2>
              <p>
                The Slow Club website translates the brand&apos;s calm and welcoming personality
                into a digital experience. Through expressive typography, thoughtful layouts, warm
                colors, and intuitive navigation, the website creates a seamless connection between
                the physical and digital brand.
              </p>
            </div>
            <div className="web-showcase">
              <div className="desktop-mockup">
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <img src={`${A}60ab5.png`} alt="Slow Club desktop website home design" />
              </div>
              <div className="mobile-mockup">
                <img src={`${A}e8e84.png`} alt="Slow Club website adapted for mobile" />
              </div>
            </div>
            <div className="web-pages">
              <div>
                <b>01</b>
                <strong>HOME</strong>
                <span>Specialty coffee · Slow mornings</span>
              </div>
              <div>
                <b>02</b>
                <strong>MENU</strong>
                <span>Specialty coffee and beverages</span>
              </div>
              <div>
                <b>03</b>
                <strong>CONTACT</strong>
                <span>A simple way to find your slow</span>
              </div>
            </div>
          </div>
        </section>

        <section className="slow-final slow-section wrap reveal">
          <p className="slow-eyebrow">08 / THE EXPERIENCE</p>
          <div className="slow-copy-grid">
            <h2>
              More Than
              <br />
              <em>Coffee</em>
            </h2>
            <p>
              Slow Club is more than a coffee shop. It is an invitation to slow down, embrace
              simplicity, and find beauty in everyday rituals. Every element of the identity, from
              its colors and typography to its digital experience, reflects a commitment to creating
              meaningful moments.
            </p>
          </div>
          <img
            src={`${A}slow-club/final-atmosphere.png`}
            alt="The relaxed, sunlit atmosphere of Slow Club"
          />
        </section>

        <nav className="project-pagination wrap" aria-label="Project navigation">
          <Link to="/work">← Back to All Projects</Link>
          <Link to="/project/jewelry-shape">Next Project: Shape Jewelry →</Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}

function ShapeJewelryPage() {
  const colors = [
    ["Warm Off-White", "#F7F5F0"],
    ["Warm Beige", "#EBE6DF"],
    ["Near Black", "#111111"],
    ["Taupe Gray", "#8A8170"],
    ["Charcoal", "#141414"],
    ["Black", "#000000"],
  ];

  return (
    <>
      <main className="shape-case">
        <section className="shape-intro wrap reveal">
          <p className="shape-kicker">Brand Identity &amp; Web Design</p>
          <h1>SHAPE JEWELRY</h1>
          <p className="shape-tagline">Jewelry that tells your story.</p>
          <Filters active="editorial" onChange={openProjectRoute} projectNames />
        </section>

        <section className="shape-hero wrap reveal">
          <img
            src={`${A}shape-jewelry/hero-necklaces.png`}
            alt="Model wearing delicate SHAPE Jewelry gold necklaces in warm natural light"
          />
          <div>
            <span>SHAPE</span>
            <small>JEWELRY</small>
          </div>
          <p>
            Less noise. <em>More meaning.</em>
          </p>
        </section>

        <section className="shape-section shape-overview wrap reveal">
          <p className="shape-eyebrow">01 / PROJECT INTRODUCTION</p>
          <div className="shape-copy-grid">
            <h2>
              Jewelry that tells
              <br />
              <em>your story.</em>
            </h2>
            <div>
              <p>
                SHAPE Jewelry is a Mexican jewelry brand built around the belief that every piece of
                jewelry carries a personal story. Designed in Mexico, the brand creates timeless,
                meaningful pieces intended to accompany people through every stage of life.
              </p>
              <p>
                With a focus on simplicity, elegance, and intentional design, SHAPE celebrates
                individuality through small-batch collections crafted from carefully selected,
                durable materials.
              </p>
            </div>
          </div>
        </section>

        <section className="shape-section shape-concept reveal">
          <div className="wrap">
            <p className="shape-eyebrow">02 / THE BRAND CONCEPT</p>
            <div className="shape-copy-grid">
              <h2>
                Less Noise.
                <br />
                <em>More Meaning.</em>
              </h2>
              <div>
                <p>
                  SHAPE Jewelry embraces the beauty of simplicity. Rather than following temporary
                  trends, the brand focuses on creating timeless pieces that hold personal
                  significance.
                </p>
                <p>
                  Each collection is designed to become part of someone&apos;s everyday story,
                  celebrating meaningful connections, individual expression, and lasting elegance.
                </p>
              </div>
            </div>
            <div className="shape-editorial-grid">
              <img
                src={`${A}shape-jewelry/rings-stone.png`}
                alt="Minimal gold rings on natural stone"
              />
              <img
                className="shape-tall"
                src={`${A}shape-jewelry/earrings-portrait.png`}
                alt="Close portrait with sculptural gold earrings"
              />
              <img src={`${A}b5e36.png`} alt="Layered SHAPE Jewelry necklaces worn naturally" />
            </div>
          </div>
        </section>

        <section className="shape-section shape-identity wrap reveal">
          <p className="shape-eyebrow">03 / VISUAL IDENTITY</p>
          <div className="shape-copy-grid">
            <h2>
              Timeless
              <br />
              <em>by Design</em>
            </h2>
            <p>
              The visual identity of SHAPE Jewelry reflects a balance between classic sophistication
              and contemporary minimalism. Refined typography, neutral colors, and generous negative
              space create a visual language that feels timeless, intimate, and intentional.
            </p>
          </div>
          <div className="shape-logo-board">
            <div>
              <strong>SHAPE</strong>
              <span>JEWELRY</span>
            </div>
            <p>LESS NOISE. MORE MEANING.</p>
          </div>
          <div className="shape-original-identity">
            <img src={`${A}b8801.png`} alt="Original SHAPE Jewelry homepage and logo design" />
            <img
              src={`${A}7c79e.png`}
              alt="Original SHAPE Jewelry editorial category composition"
            />
          </div>
        </section>

        <section className="shape-section shape-palette reveal">
          <div className="wrap">
            <p className="shape-eyebrow">04 / COLOR PALETTE</p>
            <div className="shape-section-title">
              <h2>
                A Quiet,
                <br />
                <em>Lasting Palette</em>
              </h2>
              <p>Neutral tones create room for form, material and warm gold to speak naturally.</p>
            </div>
            <div className="shape-swatches">
              {colors.map(([name, hex]) => (
                <div className="shape-swatch" key={hex} style={{ backgroundColor: hex }}>
                  <strong>{name}</strong>
                  <span>{hex}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shape-section shape-type wrap reveal">
          <p className="shape-eyebrow">05 / TYPOGRAPHY</p>
          <div className="shape-section-title">
            <h2>
              Elegant
              <br />
              <em>Simplicity</em>
            </h2>
            <p>
              A high-contrast serif brings intimacy and emotion, balanced by a precise sans-serif
              system.
            </p>
          </div>
          <div className="shape-type-specimen">
            <article>
              <span>Display / Cormorant Garamond</span>
              <strong>
                Jewelry that tells
                <br />
                <em>your story.</em>
              </strong>
            </article>
            <article>
              <span>Display / Italic</span>
              <strong>
                Less noise.
                <br />
                <em>More meaning.</em>
              </strong>
            </article>
            <article>
              <span>Interface / Inter</span>
              <strong>DESIGNED TO LAST.</strong>
              <p>
                JEWELRY&nbsp;&nbsp;&nbsp; ABOUT US&nbsp;&nbsp;&nbsp; BEST SELLERS&nbsp;&nbsp;&nbsp;
                CONTACT
              </p>
            </article>
          </div>
        </section>

        <section className="shape-section shape-applications reveal">
          <div className="wrap">
            <p className="shape-eyebrow">06 / BRAND APPLICATIONS</p>
            <div className="shape-copy-grid">
              <h2>
                Designed with
                <br />
                <em>Intention</em>
              </h2>
              <p>
                Every touchpoint is restrained and tactile—from jewelry boxes and pouches to care
                cards, tissue paper and product tags—creating an experience that feels personal and
                considered.
              </p>
            </div>
            <img
              className="shape-packaging"
              src={`${A}shape-jewelry/packaging.png`}
              alt="SHAPE Jewelry boxes, pouches, shopping bag, cards and product tags"
            />
            <div className="shape-application-details">
              <div>
                <span>01</span>
                <strong>PACKAGING</strong>
                <p>Warm cream boxes and soft taupe materials.</p>
              </div>
              <div>
                <span>02</span>
                <strong>PRINT</strong>
                <p>Care cards, notes and restrained typography.</p>
              </div>
              <div>
                <span>03</span>
                <strong>DETAILS</strong>
                <p>Minimal marks that let each piece remain central.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="shape-section shape-products wrap reveal">
          <p className="shape-eyebrow">07 / PRODUCT PHOTOGRAPHY</p>
          <div className="shape-section-title">
            <h2>
              Pieces That
              <br />
              <em>Tell a Story</em>
            </h2>
            <p>
              Natural skin, textured stone and warm light place every piece inside a lived, personal
              moment.
            </p>
          </div>
          <div className="shape-product-gallery">
            <figure>
              <img src={`${A}shape-jewelry/rings-stone.png`} alt="Delicate minimalist gold rings" />
              <figcaption>RINGS</figcaption>
            </figure>
            <figure>
              <img
                src={`${A}shape-jewelry/earrings-portrait.png`}
                alt="Gold earrings in a close-up portrait"
              />
              <figcaption>EARRINGS</figcaption>
            </figure>
            <figure className="shape-wide">
              <img
                src={`${A}7c79e.png`}
                alt="SHAPE Jewelry rings, earrings, bracelets and necklaces collection"
              />
              <figcaption>BRACELETS · NECKLACES</figcaption>
            </figure>
            <figure className="shape-wide">
              <img src={`${A}b5e36.png`} alt="Fine gold necklaces styled in warm light" />
              <figcaption>NECKLACES</figcaption>
            </figure>
          </div>
        </section>

        <section className="shape-section shape-web reveal">
          <div className="wrap">
            <p className="shape-eyebrow">08 / WEBSITE DESIGN</p>
            <div className="shape-copy-grid">
              <h2>
                A Digital Expression
                <br />
                <em>of Elegance</em>
              </h2>
              <p>
                The SHAPE Jewelry website translates the brand&apos;s philosophy into a refined
                digital shopping experience. Minimal layouts, elegant typography, intentional
                photography, and intuitive navigation create a seamless connection between
                storytelling and e-commerce.
              </p>
            </div>
            <div className="shape-browser">
              <div className="shape-browser-bar">
                <i />
                <i />
                <i />
                <span>SHAPE JEWELRY — HOME</span>
              </div>
              <img src={`${A}b8801.png`} alt="Original SHAPE Jewelry website homepage" />
            </div>
            <div className="shape-site-panels">
              <article>
                <span>SHOP BY CATEGORY</span>
                <img src={`${A}7c79e.png`} alt="Original four-column SHAPE Jewelry category grid" />
              </article>
              <article>
                <span>BEST SELLERS</span>
                <img src={`${A}4896c.png`} alt="Original SHAPE Jewelry best sellers product grid" />
              </article>
              <article>
                <span>ABOUT THE BRAND</span>
                <img src={`${A}b5e36.png`} alt="Original SHAPE Jewelry brand philosophy page" />
              </article>
            </div>
            <div className="shape-product-notes">
              <div>
                <span>BEST SELLER</span>
                <strong>LUMA Necklace</strong>
                <small>$1,890 MXN</small>
              </div>
              <div>
                <span>BEST SELLER</span>
                <strong>AURA Earrings</strong>
                <small>$1,290 MXN</small>
              </div>
              <div>
                <span>DESIGNED IN MEXICO</span>
                <strong>Small-batch collections</strong>
                <small>Carefully selected, durable materials</small>
              </div>
            </div>
            <div className="shape-site-footer">
              <strong>SHAPE</strong>
              <div>
                <span>NEWSLETTER SIGNUP</span>
                <span>INSTAGRAM</span>
              </div>
              <div>
                <span>PRIVACY POLICY</span>
                <span>TERMS</span>
                <span>CONTACT</span>
              </div>
            </div>
          </div>
        </section>

        <section className="shape-section shape-experience wrap reveal">
          <p className="shape-eyebrow">09 / BRAND EXPERIENCE</p>
          <div className="shape-copy-grid">
            <h2>
              Jewelry That Becomes
              <br />
              <em>Part of You</em>
            </h2>
            <p>
              SHAPE Jewelry is designed to accompany life&apos;s meaningful moments. Every piece is
              an expression of individuality, created to be worn, remembered, and treasured.
              <br />
              <br />
              Through thoughtful design and understated elegance, the brand transforms jewelry into
              something deeply personal.
            </p>
          </div>
          <img
            src={`${A}shape-jewelry/final-lifestyle.png`}
            alt="Model naturally wearing delicate gold SHAPE Jewelry in warm light"
          />
        </section>

        <section className="shape-final reveal">
          <div className="wrap">
            <p className="shape-eyebrow">10 / FINAL PROJECT</p>
            <h2>
              Less Noise.
              <br />
              <em>More Meaning.</em>
            </h2>
            <p>
              SHAPE Jewelry brings together timeless design, meaningful storytelling, and a refined
              digital experience. From its minimalist visual identity to its thoughtfully designed
              website, every detail reflects the belief that the most meaningful things are often
              the simplest.
            </p>
            <img
              src={`${A}shape-jewelry/rings-stone.png`}
              alt="Minimal SHAPE Jewelry gold rings arranged on warm natural stone"
            />
          </div>
        </section>

        <nav className="shape-pagination wrap" aria-label="Project navigation">
          <Link to="/work">← Back to All Projects</Link>
          <Link to="/project/slow-club">Previous Project: Slow Club</Link>
          <Link to="/project/crumb">Next Project: Crumb →</Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}

function CrumbPage() {
  const colors = [
    ["Cream", "#F8F3E9"],
    ["Butter", "#E7CBA5"],
    ["Cocoa", "#6B3F2A"],
    ["Espresso", "#2C211B"],
    ["Terracotta", "#D9764F"],
  ];

  return (
    <>
      <main className="crumb-case">
        <section className="crumb-intro wrap reveal">
          <p className="crumb-kicker">Brand Identity &amp; Web Design</p>
          <h1>CRUMB.</h1>
          <p className="crumb-tagline">
            A modern cookie brand combining warmth, simplicity, and contemporary design.
          </p>
          <Filters active="digital" onChange={openProjectRoute} projectNames />
        </section>

        <section className="crumb-hero wrap reveal">
          <img
            src={`${A}crumb/hero-cookies.png`}
            alt="Freshly baked chocolate chip cookies in warm natural light"
          />
          <div>
            <span>CRUMB.</span>
            <p>Freshly baked moments.</p>
          </div>
        </section>

        <section className="crumb-section crumb-overview wrap reveal">
          <p className="crumb-eyebrow">01 / PROJECT INTRODUCTION</p>
          <div className="crumb-copy-grid">
            <h2>
              Cookies made to
              <br />
              <em>make your day.</em>
            </h2>
            <div>
              <p>
                CRUMB. is a modern cookie brand inspired by the warmth and comfort of freshly baked
                treats. Its identity combines a playful yet sophisticated personality with a
                minimalist and editorial design approach.
              </p>
              <p>
                The brand transforms a simple everyday treat into a memorable experience through
                thoughtful details, inviting visuals, and a strong sense of personality.
              </p>
            </div>
          </div>
        </section>

        <section className="crumb-section crumb-concept reveal">
          <div className="wrap">
            <p className="crumb-eyebrow">02 / THE BRAND CONCEPT</p>
            <div className="crumb-copy-grid">
              <h2>
                The Comfort of
                <br />
                <em>Something Simple</em>
              </h2>
              <div>
                <p>
                  CRUMB. celebrates the simple pleasure of freshly baked cookies. Inspired by
                  familiar flavors, comforting moments, and the joy of sharing, the brand creates an
                  experience that feels both nostalgic and contemporary.
                </p>
                <p>
                  Its visual identity balances playful personality with refined simplicity, turning
                  an everyday treat into something distinctive and memorable.
                </p>
              </div>
            </div>
            <div className="crumb-concept-gallery">
              <img
                src={`${A}crumb/broken-cookie.png`}
                alt="Cookie broken open to reveal melted chocolate"
              />
              <img
                src={`${A}crumb/baking-tray.png`}
                alt="Fresh cookies on baking paper and a baking tray"
              />
              <img
                src={`${A}crumb/hero-cookies.png`}
                alt="A natural stack of chocolate chip cookies"
              />
            </div>
          </div>
        </section>

        <section className="crumb-section crumb-identity wrap reveal">
          <p className="crumb-eyebrow">03 / VISUAL IDENTITY</p>
          <div className="crumb-copy-grid">
            <h2>
              Warmth Meets
              <br />
              <em>Modern Design</em>
            </h2>
            <p>
              The visual identity of CRUMB. combines warmth, creativity, and contemporary
              minimalism. Inspired by the natural colors and textures of freshly baked ingredients,
              the brand uses an earthy color palette, expressive typography, and clean editorial
              compositions.
              <br />
              <br />
              Every detail is designed to communicate comfort, quality, and personality while
              maintaining a modern and cohesive aesthetic.
            </p>
          </div>
          <div className="crumb-logo-board">
            <strong>CRUMB.</strong>
            <div>
              <span>PRIMARY WORDMARK</span>
              <span>FRESHLY BAKED · EVERY DAY</span>
            </div>
          </div>
          <div className="crumb-identity-grid">
            <img src={`${A}3d6a4.png`} alt="Original CRUMB. logo and website visual identity" />
            <img src={`${A}crumb/packaging.png`} alt="CRUMB. packaging and brand applications" />
          </div>
        </section>

        <section className="crumb-section crumb-palette reveal">
          <div className="wrap">
            <p className="crumb-eyebrow">04 / COLOR PALETTE</p>
            <div className="crumb-section-title">
              <h2>
                Inspired by
                <br />
                <em>the Ingredients</em>
              </h2>
              <p>
                Five exact brand colors echo cookie dough, melted chocolate, warm paper and freshly
                baked edges.
              </p>
            </div>
            <div className="crumb-swatches">
              {colors.map(([name, hex]) => (
                <div className="crumb-swatch" key={name} style={{ backgroundColor: hex }}>
                  <strong>{name}</strong>
                  <span>{hex}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="crumb-section crumb-type reveal">
          <div className="wrap">
            <p className="crumb-eyebrow">05 / TYPOGRAPHY</p>
            <div className="crumb-section-title">
              <h2>
                Playful
                <br />
                <em>Elegance</em>
              </h2>
              <p>Expressive editorial headlines meet a friendly, precise interface system.</p>
            </div>
            <div className="crumb-type-specimen">
              <article>
                <span>DM Serif Display / Headlines</span>
                <strong>
                  Freshly baked
                  <br />
                  <em>moments.</em>
                </strong>
              </article>
              <article>
                <span>DM Serif Display / Editorial</span>
                <strong>
                  Simple
                  <br />
                  <em>pleasures.</em>
                </strong>
              </article>
              <article>
                <span>DM Sans / Interface &amp; Body</span>
                <strong>MADE FOR THE LITTLE MOMENTS.</strong>
                <p>
                  HOME&nbsp;&nbsp;&nbsp; SHOP&nbsp;&nbsp;&nbsp; DETAIL&nbsp;&nbsp;&nbsp; CONTACT
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="crumb-section crumb-applications reveal">
          <div className="wrap">
            <p className="crumb-eyebrow">06 / BRAND APPLICATIONS</p>
            <div className="crumb-copy-grid">
              <h2>
                A Little Joy in
                <br />
                <em>Every Detail</em>
              </h2>
              <p>
                Boxes, bags, wrapping paper, stickers and cards use simple materials and warm color
                blocking to make opening a box of CRUMB. feel as memorable as the first bite.
              </p>
            </div>
            <img
              className="crumb-packaging"
              src={`${A}crumb/packaging.png`}
              alt="CRUMB. boxes, bags, wrapping paper, stickers, cards and cookies"
            />
            <div className="crumb-application-list">
              <div>
                <span>01</span>
                <strong>COOKIE BOXES</strong>
                <p>Simple, sturdy and made to share.</p>
              </div>
              <div>
                <span>02</span>
                <strong>WRAPS &amp; BAGS</strong>
                <p>Warm papers with a tactile finish.</p>
              </div>
              <div>
                <span>03</span>
                <strong>SMALL DETAILS</strong>
                <p>Stickers, cards, labels and napkins.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="crumb-section crumb-products wrap reveal">
          <p className="crumb-eyebrow">07 / PRODUCT PHOTOGRAPHY</p>
          <div className="crumb-section-title">
            <h2>
              Freshly Baked,
              <br />
              <em>Thoughtfully Presented</em>
            </h2>
            <p>
              Soft centers, melted chocolate and natural textures become the heart of the visual
              story.
            </p>
          </div>
          <div className="crumb-product-gallery">
            <figure>
              <img
                src={`${A}crumb/broken-cookie.png`}
                alt="Chocolate chip cookie with a soft center"
              />
              <figcaption>SOFT CENTERS</figcaption>
            </figure>
            <figure>
              <img src={`${A}crumb/baking-tray.png`} alt="Cookies freshly baked on parchment" />
              <figcaption>FRESH FROM THE OVEN</figcaption>
            </figure>
            <figure className="crumb-wide">
              <img
                src={`${A}crumb/hero-cookies.png`}
                alt="Stacked cookies on a neutral ceramic plate"
              />
              <figcaption>SIMPLE, NATURAL COMPOSITIONS</figcaption>
            </figure>
            <figure className="crumb-wide">
              <img src={`${A}crumb/lifestyle.png`} alt="Cookies and coffee in warm morning light" />
              <figcaption>COOKIES &amp; COFFEE</figcaption>
            </figure>
          </div>
        </section>

        <section className="crumb-section crumb-web reveal">
          <div className="wrap">
            <p className="crumb-eyebrow">08 / WEBSITE DESIGN</p>
            <div className="crumb-copy-grid">
              <h2>
                A Digital Taste
                <br />
                <em>of CRUMB.</em>
              </h2>
              <div>
                <p>
                  The CRUMB. website translates the brand&apos;s warm and playful personality into a
                  contemporary digital experience.
                </p>
                <p>
                  Through spacious layouts, inviting product photography, expressive typography, and
                  intuitive navigation, the website creates a seamless connection between the brand
                  and its customers.
                </p>
                <p>
                  Every visual element is designed to highlight the cookies while maintaining a
                  consistent and recognizable brand identity.
                </p>
              </div>
            </div>
            <div className="crumb-web-showcase">
              <div className="crumb-desktop">
                <div>
                  <i />
                  <i />
                  <i />
                  <span>CRUMB. — HOME</span>
                </div>
                <img src={`${A}3d6a4.png`} alt="Original CRUMB. desktop website design" />
              </div>
              <div className="crumb-mobile">
                <img src={`${A}3d6a4.png`} alt="Original CRUMB. website adapted to mobile" />
              </div>
            </div>
            <div className="crumb-ui-grid">
              <div>
                <span>01</span>
                <strong>HOMEPAGE</strong>
                <p>Editorial photography, expressive headlines and clear navigation.</p>
              </div>
              <div>
                <span>02</span>
                <strong>PRODUCT PRESENTATION</strong>
                <p>Spacious layouts keep the cookies at the center.</p>
              </div>
              <div>
                <span>03</span>
                <strong>BRAND STORY</strong>
                <p>Warmth, comfort and contemporary design in balance.</p>
              </div>
              <div>
                <span>04</span>
                <strong>RESPONSIVE DESIGN</strong>
                <p>A consistent experience across desktop and mobile.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="crumb-section crumb-experience wrap reveal">
          <p className="crumb-eyebrow">09 / BRAND EXPERIENCE</p>
          <div className="crumb-copy-grid">
            <h2>
              More Than
              <br />
              <em>Just Cookies</em>
            </h2>
            <p>
              CRUMB. is more than a cookie brand. It is an experience built around comfort,
              creativity, and the joy of everyday moments.
              <br />
              <br />
              By combining thoughtful branding, inviting photography, and a contemporary digital
              identity, CRUMB. transforms a familiar treat into a memorable visual and emotional
              experience.
            </p>
          </div>
          <img
            src={`${A}crumb/lifestyle.png`}
            alt="CRUMB. cookies, packaging and coffee in warm natural light"
          />
        </section>

        <section className="crumb-final reveal">
          <div className="wrap">
            <p className="crumb-eyebrow">10 / FINAL PROJECT</p>
            <h2>
              Made for
              <br />
              <em>Everyday Moments</em>
            </h2>
            <p>
              CRUMB. brings together warmth, simplicity, and creative expression through a cohesive
              visual identity and digital experience.
              <br />
              <br />
              From its earthy color palette and expressive typography to its inviting photography
              and thoughtful website design, every element reflects a balance between familiarity
              and contemporary creativity.
            </p>
            <img
              src={`${A}crumb/hero-cookies.png`}
              alt="A final editorial composition of freshly baked cookies"
            />
          </div>
        </section>

        <nav className="crumb-pagination wrap" aria-label="Project navigation">
          <Link to="/work">← Back to All Projects</Link>
          <Link to="/project/jewelry-shape">Previous Project: Shape Jewelry</Link>
          <Link to="/project/slow-club">Next Project: Slow Club →</Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}

function Services() {
  const [filter, setFilter] = useState("all");
  const selectProject = (value: string) => {
    if (value === "all") {
      setFilter("all");
      return;
    }

    const project = projects.find((item) => item.category === value);
    if (project) window.location.hash = project.route;
  };
  const shown = projects
    .filter((project) => filter === "all" || project.category === filter)
    .map((project) => (project.id === "jewelry" ? { ...project, image: "f67ec.png" } : project));
  return (
    <>
      <main>
        <section className="page-intro services-intro wrap">
          <h1>SERVICES</h1>
          <p>Creative solutions built to bring brands and ideas to life.</p>
          <Filters active={filter} onChange={selectProject} projectNames />
        </section>
        <section className="service-list">
          {[
            [
              "01 — STRATEGY",
              "Brand strategy and positioning to build meaningful connections with audiences.",
              "332e6.svg",
            ],
            [
              "02 — DESIGN",
              "Visual identity and art direction that translate ideas into distinctive visual systems.",
              "ed87b.svg",
            ],
            [
              "03 — DIGITAL",
              "Digital experiences and content that connect brands with their audiences.",
              "bdb90.svg",
            ],
          ].map(([title, copy, image]) => (
            <article className="service-row wrap" key={title}>
              <div>
                <h2>{title}</h2>
                <p>{copy}</p>
              </div>
              <img src={`${A}${image}`} alt="" />
            </article>
          ))}
        </section>
        <section className="project-grid three wrap service-projects">
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}

function Studio() {
  const steps = [
    ["01 DISCOVER", "We research, listen and understand the brand."],
    ["02 EXPLORE", "We develop concepts and experiment with possibilities."],
    ["03 CREATE", "We transform ideas into distinctive visual systems."],
    ["04 DELIVER", "We refine every detail and bring the final experience to life."],
  ];
  return (
    <>
      <main className="studio">
        <section className="studio-hero wrap">
          <span>INDEPENDENT CREATIVE STUDIO / EST. 2026</span>
          <h1>
            WE DON’T FOLLOW
            <br />
            THE SCRIPT.
          </h1>
          <p>We create identities, ideas and experiences that challenge the ordinary.</p>
          <img src={`${A}5ae2c.svg`} alt="" />
        </section>
        <section className="studio-copy wrap">
          <span>01 / WHO WE ARE</span>
          <h2>INDEPENDENT BY NATURE. CREATIVE BY DESIGN.</h2>
          <p>
            OFF/SCRIPT is an independent creative studio focused on visual identity, branding and
            digital design. We work with brands that want to stand out, communicate with intention
            and connect with people through original visual experiences.
          </p>
          <div className="philosophy">
            <img src={`${A}ef2f8.svg`} alt="" />
            <div>
              <span>02 / OUR PHILOSOPHY</span>
              <h2>
                GOOD DESIGN STARTS
                <br />
                WITH A GOOD IDEA.
              </h2>
              <p>
                We believe design should do more than look good. Every project is an opportunity to
                explore, experiment and create something meaningful.
              </p>
            </div>
          </div>
          <span>03 / HOW WE WORK</span>
          <h2>FROM IDEAS TO IMPACT.</h2>
          <p>
            Our creative process combines research, strategy and experimentation to transform ideas
            into visual solutions.
          </p>
        </section>
        <section className="steps">
          {steps.map(([title, copy]) => (
            <div className="wrap" key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          ))}
        </section>
        <section className="drives wrap">
          <span>04 / WHAT DRIVES US</span>
          <h2>CREATIVE. INNOVATIVE. MODERN.</h2>
          <p>Three words that define how we think, collaborate and create.</p>
        </section>
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}

function Contact() {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmissionStatus("submitting");

    const encodedData = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      encodedData.append(key, String(value));
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData.toString(),
      });

      if (!response.ok) throw new Error("Netlify form submission failed");

      form.reset();
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    }
  }
  return (
    <>
      <main className="contact-page wrap">
        <section className="contact-copy">
          <h1>
            GET IN
            <br />
            TOUCH.
          </h1>
          <p>
            Have a project in mind? We’d love to hear from you. Tell us a bit about your idea and
            let’s create something off script together.
          </p>
          <div className="contact-details">
            <div>
              <img src={`${A}33cc7.png`} alt="" />
              <p>
                <strong>Email</strong>
                <a href="mailto:hello@offscript.studio">hello@offscript.studio</a>
              </p>
            </div>
            <div>
              <img src={`${A}49391.png`} alt="" />
              <strong>Monterrey, NL, Mexico</strong>
            </div>
            <div>
              <img src={`${A}22968.png`} alt="" />
              <strong>Social Media</strong>
            </div>
          </div>
        </section>
        <form
          className="contact-form"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          aria-busy={submissionStatus === "submitting"}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
          <div className="form-row">
            <input name="name" placeholder="Name" aria-label="Name" required />
            <input type="email" name="email" placeholder="Email" aria-label="Email" required />
          </div>
          <input name="project" placeholder="Project type" aria-label="Project type" required />
          <textarea name="message" placeholder="Message" aria-label="Message" required />
          <button type="submit" disabled={submissionStatus === "submitting"}>
            SEND A MESSAGE
          </button>
          <div className="form-feedback" aria-live="polite">
            {submissionStatus === "success" && (
              <p className="form-status success" role="status">
                Message sent successfully! Thank you for reaching out. We&apos;ll get back to you
                soon.
              </p>
            )}
            {submissionStatus === "error" && (
              <p className="form-status error" role="alert">
                We couldn&apos;t send your message. Please try again or email hello@offscript.studio
                directly.
              </p>
            )}
          </div>
        </form>
        <section className="collaborate">
          <h2>
            LET’S
            <br />
            COLLABORATE.
          </h2>
          <p>
            We work with brands and people who value creativity, strategy and design. If that sounds
            like you, let’s talk.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(currentRoute());
  useEffect(() => {
    const navigate = () => {
      setRoute(currentRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);

  let page: React.ReactNode;
  if (route === "/work") page = <Work />;
  else if (route === "/services") page = <Services />;
  else if (route === "/studio") page = <Studio />;
  else if (route === "/contact") page = <Contact />;
  else if (route === "/project/slow-club") page = <SlowClubPage />;
  else if (route === "/project/jewelry-shape") page = <ShapeJewelryPage />;
  else if (route === "/project/crumb") page = <CrumbPage />;
  else if (route in projectDetails)
    page = <ProjectPage route={route as keyof typeof projectDetails} />;
  else page = <Home />;

  return (
    <div className="app">
      <Header />
      {page}
    </div>
  );
}
