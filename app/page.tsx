"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import DesignShowcase from "@/components/DesignShowcase";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import type { Project } from "@/types/project";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setProjects(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <GitHubStats />
        <About />
        <Projects projects={projects} loading={loading} />
        <DesignShowcase />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
