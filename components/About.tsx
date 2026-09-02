"use client";

import { motion } from "motion/react";

const technologies = [
  {
    name: "C#",
    description: "Object-oriented programming",
  },
  {
    name: ".NET",
    description: "Application development",
  },
  {
    name: "SQL",
    description: "Databases & data",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-8 py-32">
      <div className="mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            About me
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Building things.
            <br />
            <span className="text-gray-500">
              Learning every day.
            </span>
          </h2>
        </motion.div>

        {/* ================= CONTENT ================= */}

        <div className="mt-16 grid gap-16 md:grid-cols-2">
          {/* TEXT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            transition={{ duration: 0.8 }}
            className="text-lg leading-relaxed text-gray-400"
          >
            <p>
              I&apos;m a Junior .NET Developer interested in
              software development and modern technologies.
            </p>

            <p className="mt-6">
              My main focus is C# and the .NET ecosystem.
              I enjoy creating applications, solving problems
              and learning how things work under the hood.
            </p>

            <p className="mt-6">
              Currently, I&apos;m studying Informatics at the
              Silesian University of Technology.
            </p>
          </motion.div>

          {/* TECHNOLOGIES */}

          <div className="grid gap-4">
            {technologies.map((technology, index) => (
              <motion.div
                key={technology.name}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{
                  scale: 1.03,
                  x: 8,
                }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-blue-500/40"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">
                    {technology.name}
                  </h3>

                  <span className="text-gray-600 transition group-hover:text-blue-400">
                    →
                  </span>
                </div>

                <p className="mt-2 text-gray-500">
                  {technology.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= STATS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{ duration: 0.8 }}
          className="mt-24 grid grid-cols-3 border-y border-white/10 py-10"
        >
          <div className="text-center">
            <div className="text-3xl font-bold md:text-5xl">
              C#
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Main language
            </p>
          </div>

          <div className="border-x border-white/10 text-center">
            <div className="text-3xl font-bold md:text-5xl">
              .NET
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Main ecosystem
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold md:text-5xl">
              01
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Goal: keep learning
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}