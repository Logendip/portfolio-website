"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";

const skillGroups = [
  {
    title: "Backend",
    description: "Application development and server-side programming.",
    skills: ["C#", ".NET", "ASP.NET Core", "REST APIs"],
  },
  {
    title: "Databases",
    description: "Working with relational databases and data.",
    skills: ["SQL", "MySQL", "SQL Server", "Database Design"],
  },
  {
    title: "Desktop",
    description: "Building graphical desktop applications.",
    skills: ["WPF", "Windows Forms", "XAML"],
  },
  {
    title: "Programming",
    description: "Programming languages used in projects and university.",
    skills: ["C#", "C++", "Python", "Java"],
  },
  {
    title: "Web",
    description: "Modern web development technologies.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Tools",
    description: "Development tools and technologies.",
    skills: ["Git", "GitHub", "Visual Studio", "VS Code", "CMake"],
  },
];

const languages = [
  {
    language: "Ukrainian",
    level: "Native",
    code: "UA",
  },
  {
    language: "Russian",
    level: "Native",
    code: "RU",
  },
  {
    language: "Polish",
    level: "B2",
    code: "PL",
  },
  {
    language: "English",
    level: "B1",
    code: "EN",
  },
];

const education = [
  {
    period: "Bachelor's Degree",
    title: "Informatics",
    institution: "Silesian University of Technology",
    description:
      "Practical profile focused on software development, programming, databases, algorithms and computer science.",
  },
];

const currentlyLearning = [
  "ASP.NET Core",
  "Entity Framework Core",
  "REST APIs",
  "SQL",
  "Software Architecture",
  "Clean Code",
  "Git & GitHub",
  "Docker",
];

const navigationItems = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "languages", label: "Languages" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  /*
   * ACTIVE NAVIGATION
   *
   * Instead of IntersectionObserver we calculate
   * which section is closest to the navbar.
   *
   * This works much more reliably with large sections
   * such as Projects.
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      let currentSection = "top";

      for (const item of navigationItems) {
        const section = document.getElementById(item.id);

        if (!section) continue;

        const sectionTop = section.offsetTop;

        if (scrollPosition >= sectionTop) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="absolute right-[-200px] top-[30%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
      </div>

      {/* NAVIGATION */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#050505]/70 px-6 py-4 backdrop-blur-xl md:px-8 md:py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* LOGO */}
          <Link
            href="#top"
            className="text-xl font-bold tracking-tight transition-transform hover:scale-105"
          >
            RB<span className="text-blue-500">.</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-7 md:flex">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative py-1 text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}

                  <motion.span
                    initial={false}
                    animate={{
                      width: isActive ? "100%" : "0%",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="absolute -bottom-1 left-0 h-px bg-blue-400"
                  />
                </a>
              );
            })}
          </div>

          {/* AVAILABILITY */}
          <div className="hidden items-center gap-2 text-xs text-gray-500 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Available for opportunities
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition hover:border-blue-500/40 hover:text-white md:hidden"
            aria-label="Toggle navigation"
          >
            <div className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition-transform ${
                  mobileMenuOpen
                    ? "translate-y-[4px] rotate-45"
                    : ""
                }`}
              />

              <span
                className={`h-px w-full bg-current transition-opacity ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`h-px w-full bg-current transition-transform ${
                  mobileMenuOpen
                    ? "-translate-y-[4px] -rotate-45"
                    : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          className="overflow-hidden md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-white/5 pb-2 pt-4">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={closeMobileMenu}
                  className={`relative rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.label}

                  <motion.span
                    initial={false}
                    animate={{
                      width: isActive ? "32px" : "0px",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="absolute bottom-1 left-4 h-px bg-blue-400"
                  />
                </a>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* HERO */}
      <section id="top" className="scroll-mt-24">
        <Hero />
      </section>

      {/* ABOUT */}
      <About />

      {/* PROJECTS */}
      <Projects />

      {/* SKILLS */}
      <section
        id="skills"
        className="relative scroll-mt-24 px-6 py-28 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
              Skills
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-6xl">
              Technologies.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Technologies and tools I use while developing applications,
              working on university projects and learning new concepts.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/40"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      {group.title}
                    </h3>

                    <span className="text-blue-400 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {group.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400 transition-colors duration-300 group-hover:border-blue-500/20 group-hover:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section
        id="education"
        className="relative scroll-mt-24 border-y border-white/10 px-6 py-28 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
              Education
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-6xl">
              Where I&apos;m learning.
            </h2>
          </motion.div>

          <div className="mt-16">
            {education.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-blue-500 via-blue-500/40 to-transparent" />

                <div className="absolute left-[-5px] top-1 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

                <div className="max-w-4xl">
                  <span className="text-sm uppercase tracking-[0.2em] text-blue-400">
                    {item.period}
                  </span>

                  <h3 className="mt-4 text-3xl font-bold md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-lg text-gray-400">
                    {item.institution}
                  </p>

                  <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGES */}
      <section
        id="languages"
        className="relative scroll-mt-24 px-6 py-28 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
              Languages
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-6xl">
              Communication.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Languages I use for everyday communication, education and
              professional development.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {languages.map((language, index) => (
              <motion.div
                key={language.language}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/40"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium text-blue-400">
                      {language.code}
                    </span>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-500">
                      {language.level}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold">
                    {language.language}
                  </h3>

                  <div className="mt-6 h-px bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width:
                          language.level === "Native"
                            ? "100%"
                            : language.level === "B2"
                              ? "75%"
                              : "55%",
                      }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + index * 0.08,
                      }}
                      className="h-px bg-blue-500"
                    />
                  </div>

                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-600">
                    Proficiency
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRENTLY LEARNING */}
      <section
        id="learning"
        className="relative border-y border-white/10 px-6 py-28 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

                <span className="text-sm uppercase tracking-[0.25em] text-green-400">
                  Currently learning
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-bold md:text-6xl">
                Always
                <br />
                <span className="text-gray-500">improving.</span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500">
                I&apos;m continuously expanding my knowledge of the .NET
                ecosystem and improving my understanding of modern software
                development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="text-sm text-gray-500">
                    Current focus
                  </span>

                  <span className="rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 text-xs text-green-400">
                    In progress
                  </span>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {currentlyLearning.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-400 transition-colors hover:border-blue-500/30 hover:text-gray-200"
                    >
                      <span className="mr-2 text-blue-400">+</span>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative scroll-mt-24 border-t border-white/10 px-6 py-28 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                Contact
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                Let&apos;s build
                <br />
                <span className="text-gray-500">something.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
                Interested in working together, have a question or just want
                to connect? Feel free to get in touch.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                {/* EMAIL */}
                <a
                  href="mailto:ruslan.balatskyi@gmail.com"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="m3 7 9 6 9-6" />
                  </svg>

                  Email me

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                {/* GITHUB */}
                <a
                  href="https://github.com/Logendip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>

                  GitHub
                </a>

                {/* LINKEDIN */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  LinkedIn ↗
                </a>
              </div>
            </motion.div>

            {/* PAPER AIRPLANE */}
            <div className="relative hidden h-[330px] overflow-hidden rounded-3xl border border-white/5 bg-white/[0.015] lg:block">
              {/* Ambient glow */}
              <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Small particles */}
              <motion.span
                animate={{
                  opacity: [0.15, 0.8, 0.15],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-[22%] top-[30%] h-1 w-1 rounded-full bg-blue-300"
              />

              <motion.span
                animate={{
                  opacity: [0.1, 0.7, 0.1],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.8,
                  ease: "easeInOut",
                }}
                className="absolute right-[22%] top-[25%] h-1.5 w-1.5 rounded-full bg-cyan-300"
              />

              <motion.span
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: 1.4,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[25%] left-[30%] h-1 w-1 rounded-full bg-blue-400"
              />

              {/* Flight path */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 600 330"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M20 285 C110 90, 205 285, 305 155 C380 55, 475 100, 580 35"
                  stroke="rgba(96,165,250,0.16)"
                  strokeWidth="1.5"
                  strokeDasharray="5 9"
                />

                <path
                  d="M20 285 C110 90, 205 285, 305 155 C380 55, 475 100, 580 35"
                  stroke="rgba(96,165,250,0.35)"
                  strokeWidth="1"
                  strokeDasharray="2 14"
                />
              </svg>

              {/* AIRPLANE */}
              <motion.div
                className="absolute left-0 top-0 z-10"
                initial={{
                  x: -60,
                  y: 220,
                  opacity: 1,
                  rotate: -25,
                }}
                animate={{
                  x: [
                    -60,
                    40,
                    150,
                    260,
                    390,
                    520,
                    700,
                  ],
                  y: [
                    220,
                    120,
                    210,
                    95,
                    70,
                    35,
                    -30,
                  ],
                  rotate: [
                    -25,
                    18,
                    -10,
                    16,
                    7,
                    -8,
                    -10,
                  ],
                  opacity: [
                    0,
                    1,
                    1,
                    1,
                    1,
                    1,
                    0,
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                  times: [
                    0,
                    0.14,
                    0.30,
                    0.47,
                    0.65,
                    0.82,
                    1,
                  ],
                }}
              >
                {/* Airplane glow */}
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-xl" />

                {/* Airplane */}
                <svg
                  width="92"
                  height="92"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="relative drop-shadow-[0_0_12px_rgba(96,165,250,0.55)]"
                >
                  <path
                    d="M82 18 17 45c-2.4 1-2.3 4.4.2 5.2l25.1 8.2 8.2 25.1c.8 2.5 4.2 2.6 5.2.2L82 18Z"
                    fill="rgba(15,23,42,0.92)"
                    stroke="rgba(147,197,253,0.95)"
                    strokeWidth="2"
                  />

                  <path
                    d="m17 45 36.5 13.4L82 18"
                    stroke="rgba(96,165,250,0.9)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="m53.5 58.4 2.9 25.3"
                    stroke="rgba(125,211,252,0.7)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="m53.5 58.4 14.8-18.1"
                    stroke="rgba(191,219,254,0.6)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* Small label */}
              <div className="absolute bottom-5 left-6 flex items-center gap-2 text-xs text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400/60" />
                Let&apos;s connect
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Ruslan Balatsky
            </p>

            <p className="mt-1 text-xs text-gray-700">
              Junior .NET Developer
            </p>
          </div>

          <a
            href="#top"
            className="text-sm text-gray-600 transition-colors hover:text-white"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}