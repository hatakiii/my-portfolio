"use client";

import React, { createContext, useContext, useState } from "react";

export type Lang = "mn" | "en";

export interface Translations {
  navbar: {
    home: string;
    github: string;
    about: string;
    projects: string;
    experience: string;
    certificates: string;
    contact: string;
    login: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta_projects: string;
    cta_contact: string;
    stat_projects: string;
    stat_contributions: string;
    stat_prs: string;
    focus_label: string;
    focus_value: string;
    experience_label: string;
    experience_value: string;
    advantage_label: string;
    advantage_value: string;
    language_label: string;
    language_value: string;
    for_recruiters_title: string;
    for_recruiters_body: string;
  };
  about: {
    tag: string;
    title: string;
    title_name: string;
    desc: string;
    role: string;
    bio1: string;
    bio2: string;
    tech_title: string;
    highlights: Array<{ title: string; text: string }>;
  };
  projects: {
    tag: string;
    title: string;
    desc: string;
    filter_all: string;
    empty: string;
    featured: string;
    view: string;
    screenshot_waiting: string;
  };
  experience: {
    tag: string;
    title: string;
    title_highlight: string;
    desc: string;
    items: Array<{
      date: string;
      role: string;
      company: string;
      desc: string;
    }>;
  };
  certificates: {
    tag: string;
    title: string;
    subtitle: string;
  };
  contact: {
    tag: string;
    title: string;
    title_highlight: string;
    desc: string;
    phone_label: string;
    location_label: string;
    location_value: string;
    available_badge: string;
    available_desc: string;
    name_label: string;
    name_placeholder: string;
    email_label: string;
    subject_label: string;
    subject_placeholder: string;
    message_label: string;
    message_placeholder: string;
    send: string;
    sending: string;
    sent: string;
  };
  footer: {
    rights: string;
    built_with: string;
  };
}

const mn: Translations = {
  navbar: {
    home: "Нүүр",
    github: "GitHub",
    about: "Миний тухай",
    projects: "Төслүүд",
    experience: "Туршлага",
    certificates: "Сертификат",
    contact: "Холбоо барих",
    login: "Нэвтрэх",
  },
  hero: {
    badge: "Backend дадлага + Full stack bootcamp",
    title1: "Backend, frontend, full stack",
    title2: "хөгжүүлэлтэд бэлэн",
    subtitle:
      "Telcocom дадлага, Pinecone Academy багийн төслүүд, PR review болон production workflow туршлагатай junior developer.",
    cta_projects: "Төслүүдийг үзэх",
    cta_contact: "Холбоо барих",
    stat_projects: "Нийт төсөл",
    stat_contributions: "Хувь нэмэр",
    stat_prs: "PR нэгтгэсэн",
    focus_label: "Одоогийн фокус",
    focus_value: "Review-гээр батлагдсан код бичих",
    experience_label: "Туршлага",
    experience_value: "Telcocom дадлага",
    advantage_label: "Давуу тал",
    advantage_value: "Хурдан суралцагч",
    language_label: "Хэл",
    language_value: "IELTS 6.5",
    for_recruiters_title: "💼 Ажилд авагчдад",
    for_recruiters_body:
      "React, Next.js, Node.js, Java/Spring Boot stack дээр хурдан дасан зохицож, review орчинд feature-ээ дуусгаж чадна.",
  },
  about: {
    tag: "✦ Миний тухай",
    title: "Хэн бэ би?",
    title_name: "Хатанбаатар",
    desc: "Хурдан суралцдаг, бодит хэрэгцээг ойлгодог, frontend ба backend аль алинд нь хувь нэмэр оруулдаг full-stack хөгжүүлэгч.",
    role: "Full Stack Developer",
    bio1: "Анагаахын боловсролтой ч гэлээ карьераа software development-д төвлөрүүлж, Pinecone Academy bootcamp болон бодит дадлагын хугацаанд веб бүтээгдэхүүн хөгжүүлэлт дээр эрчимтэй өссөн.",
    bio2: "React, Next.js дээр суурилсан full stack ажилтай зэрэгцээд Java/Spring Boot-ийг бие даан сурч production-д ашигласан. Шинэ технологид маш богино хугацаанд дасан зохицох чадвартай.",
    tech_title: "Ашигладаг технологиуд",
    highlights: [
      {
        title: "Career transition",
        text: "Анагаахын суурь боловсролоос software development рүү амжилттай шилжиж, хэрэглэгчийн бодит хэрэгцээг ойлгож шийдэл санал болгодог.",
      },
      {
        title: "Production mindset",
        text: "Staging merge, code review, CI/CD алдаанаас сэргийлэх local build check зэрэг бодит инженерийн урсгал дээр ажилласан.",
      },
      {
        title: "Team contribution",
        text: "Agile орчинд 7 хүнтэй багуудад sprint, standup, PR review хийж, feature-ээ эцэс хүртэл хүргэж байсан туршлагатай.",
      },
    ],
  },
  projects: {
    tag: "Portfolio",
    title: "Хийсэн ажлуудын portfolio",
    desc: "Төсөл бүр технологийн стек болон шууд үзэх холбоостой. Продакшн түвшний код бичих туршлагаа эдгээр төслүүдээр харуулж байна.",
    filter_all: "Бүгд",
    empty: "Энэ ангилалд төсөл олдсонгүй.",
    featured: "Онцлох",
    view: "Танилцах",
    screenshot_waiting: "Screenshot хүлээгдэж байна",
  },
  experience: {
    tag: "✦ Туршлага",
    title: "Ажлын",
    title_highlight: "Туршлага",
    desc: "Бодит багийн орчинд ажиллаж, production-д код нийлүүлсэн туршлага болон миний боловсролын түүх.",
    items: [
      {
        date: "2026.03 — 2026.04",
        role: "Backend Developer Intern",
        company: "Телкоком ХХК",
        desc: "Spring Boot, MongoDB, Java ашиглан CRUD REST API, JWT authentication бүхий систем хөгжүүлж, invoice list, call report, dashboard зэрэг production хэсгүүдэд сайжруулалт хийж staging орчинд нийлүүлсэн.",
      },
      {
        date: "2025.06 — 2026.02",
        role: "Full Stack Bootcamp Trainee",
        company: "Pinecone Academy",
        desc: "Next.js, GraphQL, PostgreSQL, NX monorepo, Cypress, Jest зэрэг орчинд 7 хүнтэй багуудаар ажиллаж, club platform, exam system, leave management system зэрэг төслүүд дээр feature хөгжүүлэлт, PR review, Agile workflow туршлага хуримтлуулсан.",
      },
      {
        date: "2018.09 — 2024.06",
        role: "Бакалавр, Хүний их эмч",
        company: "АШУҮИС",
        desc: "Эмчийн сургалтаар системтэй сэтгэлгээ, хариуцлага, хэрэглэгч буюу хүний хэрэгцээг анзаарах дадал суусан нь өнөөдрийн хөгжүүлэлтийн ажилд маань хүчтэй нөлөөлдөг.",
      },
    ],
  },
  certificates: {
    tag: "Credentials",
    title: "Сертификатууд & Диплом",
    subtitle:
      "Өөрийн мэргэжлийн ур чадвар болон боловсролын баталгааг эндээс харах боломжтой.",
  },
  contact: {
    tag: "✦ Холбоо барих",
    title: "Хамт",
    title_highlight: "Ажиллацгаая",
    desc: "Шинэ төсөл, ажлын санал эсвэл зүгээр л танилцахыг хүсвэл мессеж үлдээгээрэй. Би 24 цагийн дотор хариу өгөх болно.",
    phone_label: "Утас",
    location_label: "Байршил",
    location_value: "Улаанбаатар, Монгол",
    available_badge: "Ажлын байранд нээлттэй",
    available_desc:
      "Би одоогоор Junior Full Stack / Backend чиглэлээр шинэ ажлын саналд нээлттэй байна. Багийн соёлтой, хурдтай хөгжиж буй хамт олонтой нэгдэхэд бэлэн.",
    name_label: "Нэр",
    name_placeholder: "Таны нэр",
    email_label: "Имэйл",
    subject_label: "Сэдэв",
    subject_placeholder: "Хамтран ажиллах хүсэлт",
    message_label: "Мессеж",
    message_placeholder: "Сайн байна уу? Бид тантай...",
    send: "Мессеж илгээх",
    sending: "Илгээж байна...",
    sent: "Амжилттай илгээгдлээ!",
  },
  footer: {
    rights: "Khatanbaatar A. All rights reserved.",
    built_with: "Built with",
  },
};

const en: Translations = {
  navbar: {
    home: "Home",
    github: "GitHub",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    certificates: "Certificates",
    contact: "Contact",
    login: "Login",
  },
  hero: {
    badge: "Backend Intern + Full Stack Bootcamp",
    title1: "Backend, frontend, full stack",
    title2: "ready to build",
    subtitle:
      "Junior developer with Telcocom internship experience, Pinecone Academy team projects, PR review and production workflow practice.",
    cta_projects: "View Projects",
    cta_contact: "Contact Me",
    stat_projects: "Total Projects",
    stat_contributions: "Contributions",
    stat_prs: "PRs Merged",
    focus_label: "Current Focus",
    focus_value: "Writing review-approved code",
    experience_label: "Experience",
    experience_value: "Telcocom Internship",
    advantage_label: "Strength",
    advantage_value: "Fast Learner",
    language_label: "Language",
    language_value: "IELTS 6.5",
    for_recruiters_title: "💼 For Recruiters",
    for_recruiters_body:
      "Quickly adapts to React, Next.js, Node.js, Java/Spring Boot stacks and can deliver features end-to-end in a review environment.",
  },
  about: {
    tag: "✦ About Me",
    title: "Who am I?",
    title_name: "Khatanbaatar",
    desc: "A fast learner who understands real-world needs and contributes across both frontend and backend as a full-stack developer.",
    role: "Full Stack Developer",
    bio1: "Despite a medical background, I focused my career on software development, growing intensively in web product development through the Pinecone Academy bootcamp and real-world internship.",
    bio2: "Alongside full-stack work built on React and Next.js, I independently learned Java/Spring Boot and used it in production. Capable of adapting to new technologies in a very short time.",
    tech_title: "Technologies I Use",
    highlights: [
      {
        title: "Career transition",
        text: "Successfully transitioned from a medical background to software development, bringing an ability to understand and address real user needs.",
      },
      {
        title: "Production mindset",
        text: "Worked in real engineering workflows including staging merges, code review, CI/CD, and local build checks to prevent failures.",
      },
      {
        title: "Team contribution",
        text: "Participated in sprints, standups, and PR reviews in 7-person Agile teams, delivering features end-to-end.",
      },
    ],
  },
  projects: {
    tag: "Portfolio",
    title: "My Project Portfolio",
    desc: "Each project includes the tech stack and a live link. These projects demonstrate my experience writing production-level code.",
    filter_all: "All",
    empty: "No projects found in this category.",
    featured: "Featured",
    view: "View",
    screenshot_waiting: "Screenshot pending",
  },
  experience: {
    tag: "✦ Experience",
    title: "Work",
    title_highlight: "Experience",
    desc: "My history of working in real team environments, shipping code to production, and my educational background.",
    items: [
      {
        date: "2026.03 — 2026.04",
        role: "Backend Developer Intern",
        company: "Telcocom LLC",
        desc: "Built CRUD REST APIs and JWT authentication systems using Spring Boot, MongoDB, and Java. Delivered improvements to production sections including invoice lists, call reports, and dashboards, then merged to staging.",
      },
      {
        date: "2025.06 — 2026.02",
        role: "Full Stack Bootcamp Trainee",
        company: "Pinecone Academy",
        desc: "Worked in 7-person teams in environments using Next.js, GraphQL, PostgreSQL, NX monorepo, Cypress, and Jest. Gained experience in feature development, PR review, and Agile workflow on projects like a club platform, exam system, and leave management system.",
      },
      {
        date: "2018.09 — 2024.06",
        role: "Bachelor of Medicine (MD)",
        company: "MNUMS",
        desc: "Medical training instilled systematic thinking, accountability, and the habit of noticing human needs — all of which strongly influence my approach to software development today.",
      },
    ],
  },
  certificates: {
    tag: "Credentials",
    title: "Certificates & Diplomas",
    subtitle:
      "Browse my professional skill validations and educational credentials.",
  },
  contact: {
    tag: "✦ Contact",
    title: "Let's Work",
    title_highlight: "Together",
    desc: "If you have a new project, job offer, or just want to connect — leave me a message. I'll reply within 24 hours.",
    phone_label: "Phone",
    location_label: "Location",
    location_value: "Ulaanbaatar, Mongolia",
    available_badge: "Open to Opportunities",
    available_desc:
      "I'm currently open to new Junior Full Stack / Backend positions. Ready to join a team with a strong culture and a fast-growing environment.",
    name_label: "Name",
    name_placeholder: "Your name",
    email_label: "Email",
    subject_label: "Subject",
    subject_placeholder: "Collaboration request",
    message_label: "Message",
    message_placeholder: "Hi there! I'd like to...",
    send: "Send Message",
    sending: "Sending...",
    sent: "Successfully sent!",
  },
  footer: {
    rights: "Khatanbaatar A. All rights reserved.",
    built_with: "Built with",
  },
};

const translations: Record<Lang, Translations> = { mn, en };

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "mn",
  setLang: () => {},
  t: mn,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("mn");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
