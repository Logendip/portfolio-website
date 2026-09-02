"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ElectronConfig = {
  duration: number;
  delay: number;
  rx: number;
  ry: number;
  rotation: number;
};

const electrons: ElectronConfig[] = [
  { duration: 10, delay: 0, rx: 350, ry: 190, rotation: -8 },
  { duration: 12, delay: 3, rx: 315, ry: 165, rotation: 18 },
  { duration: 14, delay: 5, rx: 205, ry: 350, rotation: 22 },
  { duration: 16, delay: 7, rx: 160, ry: 260, rotation: -28 },
  { duration: 18, delay: 8, rx: 315, ry: 235, rotation: 55 },
  { duration: 20, delay: 10, rx: 220, ry: 220, rotation: -55 },
];

const orbitColors = [
  "rgba(59,130,246,0.32)",
  "rgba(250,204,21,0.25)",
  "rgba(192,132,252,0.30)",
  "rgba(103,232,249,0.27)",
  "rgba(34,211,238,0.22)",
  "rgba(252,165,165,0.20)",
];

const orbitGlowColors = [
  "rgba(59,130,246,0.07)",
  "rgba(250,204,21,0.05)",
  "rgba(192,132,252,0.06)",
  "rgba(103,232,249,0.05)",
  "rgba(34,211,238,0.04)",
  "rgba(252,165,165,0.04)",
];

const electronColors = [
  "#60a5fa",
  "#fde047",
  "#c084fc",
  "#67e8f9",
  "#22d3ee",
  "#fca5a5",
];

const electronNames = [
  "C#",
  "Python",
  ".NET",
  "SQL",
  "C++",
  "Java",
];

export default function Hero() {
  const backRefs = useRef<(SVGGElement | null)[]>([]);
  const frontRefs = useRef<(SVGGElement | null)[]>([]);

  const [animationKey, setAnimationKey] = useState(0);
  const [showAtom, setShowAtom] = useState(false);

  /*
   * ============================================================
   * ATOM ANIMATION
   * ============================================================
   *
   * Timeline:
   *
   * 0.0s  - photo starts expanding
   * 0.5s  - energy glow appears
   * 0.8s  - orbit system starts expanding
   * 1.8s  - electrons start flying from the center
   * 2.8s  - normal electron animation begins
   *
   */

  useEffect(() => {
    setShowAtom(false);

    const timer = window.setTimeout(() => {
      setShowAtom(true);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [animationKey]);

  /*
   * ============================================================
   * ELECTRON MOVEMENT
   * ============================================================
   */

  useEffect(() => {
    if (!showAtom) return;

    let frame = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;

      electrons.forEach((electron, index) => {
        /*
         * Small delay before the electron starts its normal orbit.
         * This creates the feeling that it flew out of the center.
         */
        const launchDelay = 1.8 + index * 0.12;

        if (elapsed < launchDelay) {
          const back = backRefs.current[index];
          const front = frontRefs.current[index];

          if (back) {
            back.style.display = "none";
          }

          if (front) {
            front.style.display = "none";
          }

          return;
        }

        const orbitElapsed = elapsed - launchDelay;

        const t =
          (orbitElapsed + electron.delay) % electron.duration;

        const progress = t / electron.duration;

        const angle = progress * Math.PI * 2;

        /*
         * Original elliptical orbit calculation.
         */
        const x = electron.rx * Math.sin(angle);
        const y = -electron.ry * Math.cos(angle);

        const rotation =
          (electron.rotation * Math.PI) / 180;

        const rotatedX =
          x * Math.cos(rotation) -
          y * Math.sin(rotation);

        const rotatedY =
          x * Math.sin(rotation) +
          y * Math.cos(rotation);

        const svgX = 400 + rotatedX;
        const svgY = 400 + rotatedY;

        /*
         * IMPORTANT:
         *
         * Front/back is calculated BEFORE rotation.
         *
         * This keeps the electron completely behind
         * or completely in front of the photo.
         */
        const isFront = x >= 0;

        const transform = `translate(${svgX} ${svgY})`;

        const back = backRefs.current[index];

        if (back) {
          back.setAttribute("transform", transform);

          back.style.display = isFront
            ? "none"
            : "block";
        }

        const front = frontRefs.current[index];

        if (front) {
          front.setAttribute("transform", transform);

          front.style.display = isFront
            ? "block"
            : "none";
        }
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [showAtom]);

  /*
   * ============================================================
   * RESTART WHEN HERO ENTERS VIEW
   * ============================================================
   */

  const restartAtom = () => {
    setShowAtom(false);

    setAnimationKey((previous) => previous + 1);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-8 pt-24"
      onMouseEnter={() => {
        /*
         * No restart on mouse.
         * Kept intentionally empty.
         */
      }}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
  {/* ======================================================
      LEFT SIDE
  ====================================================== */}

  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{
      once: false,
      amount: 0.3,
    }}
    transition={{ duration: 0.8 }}
    className="relative z-10"
  >
    {/* STATUS */}

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,
        amount: 0.3,
      }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.06] px-4 py-2 text-sm text-blue-300"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
      </span>

      Available for opportunities
    </motion.div>

    {/* GREETING */}

    <p className="mb-5 text-sm uppercase tracking-[0.35em] text-blue-400">
      Hi, I&apos;m Ruslan
    </p>

    {/* TITLE */}

    <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
      Junior .NET
      <br />

      <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
        Developer.
      </span>
    </h1>

    {/* DESCRIPTION */}

    <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-400">
      Informatics student at Silesian University of Technology
      focused on building software with C# and .NET. I enjoy
      solving problems, developing applications and continuously
      improving my technical skills.
    </p>

    {/* TECHNOLOGIES */}

    <div className="mt-7 flex flex-wrap gap-2">
      {["C#", ".NET", "ASP.NET Core", "SQL"].map((technology) => (
        <span
          key={technology}
          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-300 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/[0.08] hover:text-blue-300"
        >
          {technology}
        </span>
      ))}
    </div>

    {/* BUTTONS */}

    <div className="mt-9 flex flex-wrap gap-4">
      <a
        href="#projects"
        className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-lg hover:shadow-white/10"
      >
        View my projects

        <span className="transition-transform duration-300 group-hover:translate-y-1">
          ↓
        </span>
      </a>

      <a
        href="#contact"
        className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-blue-500/10"
      >
        Contact me

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>

    {/* SMALL INTRO LINE */}

    <div className="mt-8 flex items-center gap-3 text-sm text-gray-600">
      <span className="h-px w-8 bg-gray-700" />

      <span>Building software. Learning every day.</span>
    </div>
  </motion.div>

  {/* ======================================================
      RIGHT SIDE — ATOM
  ====================================================== */}

  {/* ТУТ ПОЧИНАЄТЬСЯ ТВОЄМУ ІСНУЮЧИЙ ATOM <motion.div> */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          onViewportEnter={() => {
            restartAtom();
          }}
          className="relative flex h-[700px] w-full items-center justify-center"
        >
          <div className="relative h-[680px] w-[680px] max-w-full">
            {/* ==================================================
                CENTRAL ENERGY GLOW
            ================================================== */}

            <motion.div
              key={`energy-${animationKey}`}
              initial={{
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                opacity: [0, 1, 0.5, 0.7],
                scale: [0.3, 1.4, 1.1, 1],
              }}
              transition={{
                duration: 1.6,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="absolute left-1/2 top-1/2 z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[120px]"
            />

            {/* ==================================================
                PHOTO
            ================================================== */}

            <motion.div
              key={`photo-${animationKey}`}
              initial={{
                scale: 0.55,
                opacity: 0,
              }}
              animate={{
                scale: [0.55, 1.08, 0.98, 1],
                opacity: [0, 1, 1, 1],
              }}
              transition={{
                duration: 1.1,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-1/2 top-1/2 z-30 h-52 w-52 -translate-x-1/2 -translate-y-1/2"
            >
              {/* PHOTO GLOW */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: [0, 1, 0.5],
                  scale: [0.5, 1.5, 1.1],
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.2,
                }}
                className="absolute -inset-8 rounded-full bg-blue-500/20 blur-3xl"
              />

              {/* PHOTO */}

              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 bg-[#080b14] shadow-[0_0_80px_rgba(59,130,246,0.3)]">
                <Image
                  src="/me.png"
                  alt="Profile photo"
                  fill
                  priority
                  sizes="208px"
                  className="object-cover"
                />
              </div>

              {/* PHOTO BORDER */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: [0, 1, 0.4],
                  scale: [0.7, 1.2, 1],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.25,
                }}
                className="pointer-events-none absolute -inset-2 rounded-full border border-blue-400/30"
              />
            </motion.div>

            {/* ==================================================
                BACK ORBITS
            ================================================== */}

            <motion.svg
              key={`back-orbits-${animationKey}`}
              viewBox="0 0 800 800"
              className="absolute inset-0 z-20 h-full w-full"
              initial={{
                opacity: 0,
                scale: 0.15,
              }}
              animate={{
                opacity: 1,
                scale: [0.15, 1.12, 0.98, 1],
              }}
              transition={{
                duration: 1.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <g transform="translate(400 400) rotate(-8)">
                <path
                  d="M 0,-190 A 350,190 0 0 0 0,190"
                  fill="none"
                  stroke={orbitColors[0]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,-190 A 350,190 0 0 0 0,190"
                  fill="none"
                  stroke={orbitGlowColors[0]}
                  strokeWidth="12"
                  opacity="0.5"
                />
              </g>

              <g transform="translate(400 400) rotate(18)">
                <path
                  d="M 0,-165 A 315,165 0 0 0 0,165"
                  fill="none"
                  stroke={orbitColors[1]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,-165 A 315,165 0 0 0 0,165"
                  fill="none"
                  stroke={orbitGlowColors[1]}
                  strokeWidth="10"
                  opacity="0.5"
                />
              </g>

              <g transform="translate(400 400) rotate(22)">
                <path
                  d="M 0,-350 A 205,350 0 0 0 0,350"
                  fill="none"
                  stroke={orbitColors[2]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,-350 A 205,350 0 0 0 0,350"
                  fill="none"
                  stroke={orbitGlowColors[2]}
                  strokeWidth="12"
                  opacity="0.5"
                />
              </g>

              {/* SQL */}

              <g transform="translate(400 400) rotate(-28)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="160"
                  ry="260"
                  fill="none"
                  stroke={orbitColors[3]}
                  strokeWidth="2"
                />

                <ellipse
                  cx="0"
                  cy="0"
                  rx="160"
                  ry="260"
                  fill="none"
                  stroke={orbitGlowColors[3]}
                  strokeWidth="10"
                  opacity="0.5"
                />
              </g>

              <g transform="translate(400 400) rotate(55)">
                <path
                  d="M 0,-235 A 315,235 0 0 0 0,235"
                  fill="none"
                  stroke={orbitColors[4]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,-235 A 315,235 0 0 0 0,235"
                  fill="none"
                  stroke={orbitGlowColors[4]}
                  strokeWidth="10"
                  opacity="0.5"
                />
              </g>

              <g transform="translate(400 400) rotate(-55)">
                <path
                  d="M 0,-220 A 220,220 0 0 0 0,220"
                  fill="none"
                  stroke={orbitColors[5]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,-220 A 220,220 0 0 0 0,220"
                  fill="none"
                  stroke={orbitGlowColors[5]}
                  strokeWidth="10"
                  opacity="0.5"
                />
              </g>
            </motion.svg>

            {/* ==================================================
                BACK ELECTRONS
            ================================================== */}

            <svg
              viewBox="0 0 800 800"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
            >
              {electrons.map((electron, index) => (
                <g
                  key={`back-electron-${electronNames[index]}`}
                  ref={(element) => {
                    backRefs.current[index] = element;
                  }}
                  style={{
                    display: "none",
                  }}
                >
                  <circle
                    r="30"
                    fill="#080b14"
                    stroke={electronColors[index]}
                    strokeWidth="1.5"
                  />

                  <text
                    x="0"
                    y="1"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={electronColors[index]}
                    fontSize={index === 0 ? "13" : "12"}
                    fontWeight="700"
                  >
                    {electronNames[index]}
                  </text>
                </g>
              ))}
            </svg>

            {/* ==================================================
                FRONT ORBITS
            ================================================== */}

            <motion.svg
              key={`front-orbits-${animationKey}`}
              viewBox="0 0 800 800"
              className="absolute inset-0 z-40 h-full w-full"
              initial={{
                opacity: 0,
                scale: 0.15,
              }}
              animate={{
                opacity: 1,
                scale: [0.15, 1.12, 0.98, 1],
              }}
              transition={{
                duration: 1.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <g transform="translate(400 400) rotate(-8)">
                <path
                  d="M 0,190 A 350,190 0 0 0 0,-190"
                  fill="none"
                  stroke={orbitColors[0]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,190 A 350,190 0 0 0 0,-190"
                  fill="none"
                  stroke={orbitGlowColors[0]}
                  strokeWidth="12"
                  opacity="0.5"
                />
              </g>

              <g transform="translate(400 400) rotate(18)">
                <path
                  d="M 0,165 A 315,165 0 0 0 0,-165"
                  fill="none"
                  stroke={orbitColors[1]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,165 A 315,165 0 0 0 0,-165"
                  fill="none"
                  stroke={orbitGlowColors[1]}
                  strokeWidth="10"
                  opacity="0.5"
                />
              </g>

              <g transform="translate(400 400) rotate(22)">
                <path
                  d="M 0,350 A 205,350 0 0 0 0,-350"
                  fill="none"
                  stroke={orbitColors[2]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,350 A 205,350 0 0 0 0,-350"
                  fill="none"
                  stroke={orbitGlowColors[2]}
                  strokeWidth="12"
                  opacity="0.5"
                />
              </g>

              {/* SQL */}

              <g transform="translate(400 400) rotate(-28)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="160"
                  ry="260"
                  fill="none"
                  stroke={orbitColors[3]}
                  strokeWidth="2"
                />

                <ellipse
                  cx="0"
                  cy="0"
                  rx="160"
                  ry="260"
                  fill="none"
                  stroke={orbitGlowColors[3]}
                  strokeWidth="10"
                  opacity="0.5"
                />
              </g>

              <g transform="translate(400 400) rotate(55)">
                <path
                  d="M 0,235 A 315,235 0 0 0 0,-235"
                  fill="none"
                  stroke={orbitColors[4]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,235 A 315,235 0 0 0 0,-235"
                  fill="none"
                  stroke={orbitGlowColors[4]}
                  strokeWidth="10"
                  opacity="0.5"
                />
              </g>

              <g transform="translate(400 400) rotate(-55)">
                <path
                  d="M 0,220 A 220,220 0 0 0 0,-220"
                  fill="none"
                  stroke={orbitColors[5]}
                  strokeWidth="2"
                />

                <path
                  d="M 0,220 A 220,220 0 0 0 0,-220"
                  fill="none"
                  stroke={orbitColors[5]}
                  strokeWidth="2"
                />
              </g>
            </motion.svg>

            {/* ==================================================
                ELECTRON LAUNCH EFFECT
            ================================================== */}

            <motion.div
              key={`launch-${animationKey}`}
              initial={{
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0.2, 2.5, 4],
              }}
              transition={{
                duration: 1.2,
                delay: 1.65,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-45 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/40"
            />

            {/* ==================================================
                FRONT ELECTRONS
            ================================================== */}

            <svg
              viewBox="0 0 800 800"
              className="pointer-events-none absolute inset-0 z-50 h-full w-full"
            >
              {electrons.map((electron, index) => (
                <g
                  key={`front-electron-${electronNames[index]}`}
                  ref={(element) => {
                    frontRefs.current[index] = element;
                  }}
                  style={{
                    display: "none",
                  }}
                >
                  <circle
                    r="30"
                    fill="#080b14"
                    stroke={electronColors[index]}
                    strokeWidth="1.5"
                  />

                  <text
                    x="0"
                    y="1"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={electronColors[index]}
                    fontSize={index === 0 ? "13" : "12"}
                    fontWeight="700"
                  >
                    {electronNames[index]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </motion.div>
      </div>

      {/* ========================================================
          SCROLL INDICATOR
      ======================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: false,
          amount: 0.5,
        }}
        transition={{
          delay: 1.2,
        }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-gray-600 md:flex"
      >
        <span>Scroll</span>

        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-8 w-px bg-gray-700"
        />
      </motion.div>
    </section>
  );
}