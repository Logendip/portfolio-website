"use client";

import { motion } from "motion/react";
import { useState } from "react";

import ProjectModal from "./ProjectModal";

type Project = {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  type: string;
  status: string;
  features: string[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "Student Management System",
    description:
      "Desktop application for managing student information, personal data, addresses and study years.",
    technologies: ["C#", ".NET", "Windows Forms", "JSON"],
    type: "Desktop Application",
    status: "Completed",
    features: [
      "Student information management",
      "Personal data and address handling",
      "Study year selection",
      "Input validation",
      "JSON serialization",
      "GUID-based student identification",
    ],
  },
  {
    number: "02",
    title: "Room Reservation System",
    description:
      "University room reservation application with rooms, departments, lecturers and conflict detection.",
    technologies: ["C#", ".NET", "Windows Forms", "OOP"],
    type: "University Project",
    status: "Completed",
    features: [
      "Room management",
      "Department management",
      "Lecturer management",
      "Reservation management",
      "Reservation conflict detection",
      "Object-oriented architecture",
    ],
  },
  {
    number: "03",
    title: "Quiz Application",
    description:
      "Interactive desktop quiz application with questions, answers and a modern graphical interface.",
    technologies: ["C#", ".NET", "WPF", "XAML"],
    type: "Desktop Application",
    status: "Completed",
    features: [
      "Interactive quiz interface",
      "Question and answer handling",
      "Graphical user interface",
      "WPF-based application",
      "XAML interface design",
      "Application logic in C#",
    ],
  },
  {
    number: "04",
    title: "2D RPG Game",
    description:
      "2D RPG-style game focused on player movement, game logic, graphics and interactive elements.",
    technologies: ["C++", "SFML", "CMake"],
    type: "Game Development",
    status: "In Development",
    features: [
      "2D player movement",
      "Game state and logic",
      "Interactive game elements",
      "Graphics rendering",
      "SFML-based development",
      "CMake project configuration",
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null
  );

  return (
    <>
      <section id="projects" className="relative px-6 py-28 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
              Projects
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-6xl">
              Things I&apos;ve built.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              A selection of projects I&apos;ve worked on while studying
              software development and exploring different technologies.
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-left backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/40"
                >
                  {/* Glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl transition-all duration-500 group-hover:bg-blue-600/20" />

                  {/* Header */}
                  <div className="relative flex items-start justify-between">
                    <span className="text-sm font-medium text-blue-400">
                      {project.number}
                    </span>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-500 transition-colors duration-300 group-hover:border-blue-500/30 group-hover:text-gray-400">
                      {project.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="relative mt-10 text-2xl font-bold md:text-3xl">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-4 min-h-[90px] text-base leading-relaxed text-gray-500">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="relative mt-8 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400 transition-colors duration-300 group-hover:border-blue-500/20 group-hover:text-gray-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Bottom */}
                  <div className="relative mt-auto pt-8">
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-green-400" />

                        <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-400">
                          {project.status}
                        </span>
                      </div>

                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          rotate: -5,
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 group-hover:text-white"
                      >
                        <span className="text-lg">→</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom glow line */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all duration-500 group-hover:w-full" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center text-sm text-gray-600"
          >
            More projects coming soon.
          </motion.p>
        </div>
      </section>

      {/* Project modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}