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
  github?: string;
  githubBackend?: string;
  githubFrontend?: string;
  liveDemo?: string;
  nickname?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Freegram",
    description:
      "Full-stack real-time messenger application with authentication, private chats, groups, chat requests and live messaging. The application is available online and uses the nickname Logendip.",
    technologies: [
      "C#",
      ".NET 9",
      "ASP.NET Core",
      "PostgreSQL",
      "React",
      "JavaScript",
      "SignalR",
    ],
    type: "Full-Stack Application",
    status: "In Development",
    githubBackend: "https://github.com/Logendip/Freegram-Backend",
    githubFrontend: "https://github.com/Logendip/Freegram-Frontend",
    liveDemo: "https://freegram-frontend.vercel.app/",
    nickname: "Logendip",
    features: [
      "User registration and login",
      "JWT authentication",
      "Private conversations",
      "Real-time messaging with SignalR",
      "Group chats",
      "Chat requests",
      "Group invitations",
      "Unread message counter",
      "Read receipts",
      "Delete messages for everyone or for yourself",
      "User search",
      "Responsive messenger interface",
    ],
  },
  {
    number: "02",
    title: "Frontend Likarnyam",
    description:
      "Frontend web project developed with TypeScript, focused on building a modern web interface.",
    technologies: ["TypeScript", "React", "Frontend"],
    type: "Web Application",
    status: "Completed",
    github: "https://github.com/Logendip/frontend-likarnyam",
    features: [
      "TypeScript-based frontend",
      "Component-based architecture",
      "Responsive interface",
      "Modern web development approach",
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null
  );

  return (
    <>
      <section
        id="projects"
        className="relative px-6 py-28 md:px-8 md:py-32"
      >
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
                className={`h-full ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/40 md:p-10">
                  {/* Glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl transition-all duration-500 group-hover:bg-blue-600/20" />

                  {/* Header */}
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="text-sm font-medium text-blue-400">
                      {project.number}
                    </span>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-500 transition-colors duration-300 group-hover:border-blue-500/30 group-hover:text-gray-400">
                      {project.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="relative mt-8 text-3xl font-bold md:text-4xl">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-4 max-w-3xl text-base leading-relaxed text-gray-500 md:text-lg">
                    {project.description}
                  </p>

                  {/* Nickname */}
                  {project.nickname && (
                    <div className="relative mt-5 flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        In-app nickname:
                      </span>

                      <span className="font-medium text-blue-400">
                        {project.nickname}
                      </span>
                    </div>
                  )}

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
                    <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      {/* Status */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            project.status === "Completed"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                          }`}
                        />

                        <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-400">
                          {project.status}
                        </span>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap items-center gap-3">
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 transition-all duration-300 hover:border-blue-500/60 hover:bg-blue-500/20 hover:text-white"
                          >
                            Live Demo ↗
                          </a>
                        )}

                        {project.githubBackend && (
                          <a
                            href={project.githubBackend}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                          >
                            Backend ↗
                          </a>
                        )}

                        {project.githubFrontend && (
                          <a
                            href={project.githubFrontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                          >
                            Frontend ↗
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                          >
                            GitHub ↗
                          </a>
                        )}

                        {/* Open project */}
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                          aria-label={`Open ${project.title}`}
                        >
                          <motion.span
                            whileHover={{
                              scale: 1.15,
                              rotate: -5,
                            }}
                            className="text-lg"
                          >
                            →
                          </motion.span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom glow line */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all duration-500 group-hover:w-full" />
                </div>
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