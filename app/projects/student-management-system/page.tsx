"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";

const navigationItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "Languages", id: "languages" },
  { label: "Contact", id: "contact" },
];

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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 30);

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0 ? Math.min(scrollY / documentHeight, 1) : 0;

      setScrollProgress(progress);

      const sections = navigationItems
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => section !== null);

      let currentSection = "about";

      for (const section of sections) {
        const sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 220) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      id="top"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-white"
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="absolute right-[-200px] top-[30%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
      </div>

      {/* Scroll progress */}
      <div className="fixed left-0 right-0 top-0 z-[60] h-[2px]">
        <motion.div
          className="h-full origin-left bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]"
          style={{
            scaleX: scrollProgress,
          }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 px-6 transition-all duration-500 md:px-8 ${
          scrolled
            ? "border-b border-white/10 bg-[#050505]/95 py-3 shadow-[0_10px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            : "border-b border-white/5 bg-[#050505]/70 py-5 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <Link
            href="#top"
            className="text-xl font-bold tracking-tight transition-transform duration-300 hover:scale-105"
          >
            RB<span className="text-blue-500">.</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 text-sm md:flex">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group relative rounded-full px-4 py-2.5 transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500/10 text-white"
                      : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  <span
                    className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-blue-500 transition-all duration-300 ${
                      isActive
                        ? "w-6 opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                        : "w-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Availability */}
          <div className="hidden items-center gap-2 text-xs text-gray-500 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <span>Available for opportunities</span>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition hover:border-blue-500/40 hover:text-white md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            <div className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition-transform ${
                  mobileMenuOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />

              <span
                className={`h-px w-full bg-current transition-opacity ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`h-px w-full bg-current transition-transform ${
                  mobileMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile navigation */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
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
                  className={`rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}

                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    )}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Projects */}
      <Projects />

      {/* Skills */}
      <section id="skills" className="relative px-6 py-28 md:px-8 md:py-32">
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
                    <h3 className="text-xl font-semibold">{group.title}</h3>

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

      {/* Education */}
      <section
        id="education"
        className="relative border-y border-white/10 px-6 py-28 md:px-8 md:py-32"
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

      {/* Languages */}
      <section
        id="languages"
        className="relative px-6 py-28 md:px-8 md:py-32"
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

      {/* Currently Learning */}
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

      {/* Contact */}
      <section
        id="contact"
        className="relative border-t border-white/10 px-6 py-28 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-16"
          >
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

            <div className="relative">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                Contact
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
                Let&apos;s build
                <br />
                <span className="text-gray-500">something.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
                Interested in working together, have a question or just want
                to connect? Feel free to get in touch.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="mailto:your-email@example.com"
                  className="rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
                >
                  Send me an email
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  GitHub ↗
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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