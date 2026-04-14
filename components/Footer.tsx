"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

export default function Footer() {
  const year = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/hatakiii", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:hbbaatar@gmail.com", label: "Email" },
  ];

  return (
    <footer className="footer relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col items-center py-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex gap-6 mb-8"
          >
            {socialLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full border border-white/10 text-text-secondary hover:text-accent-primary hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-text-primary font-medium mb-2">
              © {year} Khatanbaatar A. All rights reserved.
            </p>
            <p className="footer-copyright text-text-muted text-sm flex items-center justify-center gap-2">
              Built with <Heart className="w-4 h-4 text-accent-rose fill-accent-rose animate-pulse" /> using Next.js & MongoDB
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
    </footer>
  );
}
