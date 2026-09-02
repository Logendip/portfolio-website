"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

type Project = {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  type: string;
  status: string;
  features: string[];
};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <div className="relative p-7 md:p-10">
              {/* Header */}
              <div className="flex items-start gap-5 pr-12">
                <span className="text-sm font-medium text-blue-400">
                  {project.number}
                </span>

                <div>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-500">
                    {project.type}
                  </span>

                  <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                    {project.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-500">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mt-8 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />

                <span className="text-sm text-gray-400">
                  {project.status}
                </span>
              </div>

              {/* Features */}
              <div className="mt-10">
                <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  Key features
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                      }}
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-gray-400"
                    >
                      <span className="mr-2 text-blue-400">+</span>
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-10 border-t border-white/10 pt-8">
                <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  Technologies
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-sm text-blue-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  Personal / University Project
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-gray-400 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}