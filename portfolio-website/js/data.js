// Portfolio Data Configuration for Suraj Gholap
// Tailored for: Data Analysis, Data Administration, Master Data Management (MDM),
// Vendor Data Management via SAP, Advanced Excel, Ariba Administration, Fiori & MDG at LanceSoft (Client: British Petroleum)

const portfolioData = {
  personal: {
    name: "Suraj Gholap",
    role: "Data Administrator & Master Data Management (MDM) Specialist",
    tagline: "Leading Master Data Management (MDM), Vendor Data Governance, and Data Analytics across SAP (MDG, Fiori, S/4HANA), SAP Ariba Administration, and Advanced Excel at LanceSoft (Client: British Petroleum).",
    organization: "LanceSoft (Client: British Petroleum)",
    location: "Pune, India",
    status: "Data Administrator & MDM Specialist • Open for Opportunities",
    email: "suraj.m.gholap@gmail.com",
    phone: "+91-9373780875",
    github: "https://github.com/surajgholap1",
    linkedin: "https://linkedin.com/in/surajmohangholap",
    bio: [
      "Enterprise Data Administrator and Master Data Management (MDM) Specialist with LanceSoft, currently driving supplier master data migration, data quality governance, and reporting for global client British Petroleum (BP).",
      "Specialized in governing and validating 4,500+ vendor master records through SAP MDG, SAP Fiori, and SAP Ariba Administration. Expert in deploying Advanced Excel validation trackers, automated error reconciliation, and Power BI dashboards to ensure 98%+ data accuracy, SOX-compliant banking governance, and seamless cutover execution."
    ],
    stats: [
      { label: "Vendor Records Governed", value: 4500, suffix: "+" },
      { label: "Migration & MDG Accuracy", value: 98, suffix: "%+" },
      { label: "Data Quality KPIs Monitored", value: 10, suffix: "+" },
      { label: "Coordination & Flow Gain", value: 30, suffix: "%+" }
    ]
  },

  roles: [
    "Data Administrator",
    "Master Data Management (MDM) Specialist",
    "Vendor Data Governance Lead",
    "SAP (MDG, Fiori, S/4HANA) & Ariba Administrator",
    "Data Analyst & Advanced Excel Specialist"
  ],

  skills: [
    {
      category: "Master Data & SAP Ecosystem",
      items: [
        { name: "SAP MDG (Master Data Governance)", level: 96, icon: "database" },
        { name: "Vendor Data Management & Governance", level: 98, icon: "check-circle" },
        { name: "SAP Fiori (Launchpad & Workflows)", level: 92, icon: "layout" },
        { name: "SAP Ariba Administration", level: 90, icon: "shield-check" },
        { name: "SAP S/4HANA & SAP ECC Migration", level: 95, icon: "cpu" },
        { name: "Sensitive Vendor Banking Controls", level: 94, icon: "lock" }
      ]
    },
    {
      category: "Analytics & Advanced Excel",
      items: [
        { name: "Advanced Excel (Formulas, VBA & Macros)", level: 98, icon: "file-spreadsheet" },
        { name: "Automated Validation Logic & Trackers", level: 96, icon: "table" },
        { name: "Power BI & Dashboard Development", level: 92, icon: "bar-chart-3" },
        { name: "Tableau & Executive KPI Reporting", level: 86, icon: "pie-chart" },
        { name: "Data Quality & Anomaly Detection", level: 95, icon: "activity" }
      ]
    },
    {
      category: "Programming, Cloud & Automation",
      items: [
        { name: "SQL & Relational Databases (MySQL)", level: 90, icon: "server" },
        { name: "Python (Pandas, NumPy, Scikit-learn)", level: 90, icon: "terminal" },
        { name: "Process Optimization & Power Automate", level: 88, icon: "workflow" },
        { name: "UiPath Robotic Process Automation (RPA)", level: 84, icon: "cpu" },
        { name: "AWS & Google Cloud Platform", level: 82, icon: "cloud" },
        { name: "Generative AI & LLM Evaluation", level: 86, icon: "sparkles" }
      ]
    }
  ],

  projects: [
    {
      id: "project-1",
      title: "Enterprise Vendor Master Data Governance & SAP S/4HANA Cutover",
      category: "sap",
      categoryLabel: "SAP MDG & Vendor Data",
      shortDescription: "Governing 4,500+ global vendor master records, banking workflows, and data cutover from SAP ECC to SAP S/4HANA via SAP MDG and Fiori for British Petroleum (BP).",
      fullDescription: "At LanceSoft for client British Petroleum (BP), spearheaded enterprise supplier master data migration and governance. Cleansed, validated, and mapped vendor records, audited sensitive banking changes, resolved reverted/rejected loading errors, and built automated validation trackers that sustained 98%+ cutover accuracy across refinery operations.",
      technologies: ["SAP MDG", "SAP Fiori", "SAP S/4HANA", "Vendor Data Governance", "Advanced Excel", "Power BI"],
      featured: true,
      stats: "4,500+ Vendor Records • 98%+ Accuracy",
      gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#06b6d4",
      liveUrl: "https://github.com/surajgholap1",
      githubUrl: "https://github.com/surajgholap1"
    },
    {
      id: "project-2",
      title: "SAP Ariba & Enterprise Procurement Master Data Administration",
      category: "sap",
      categoryLabel: "Ariba & MDM Administration",
      shortDescription: "Procurement master data administration, vendor catalog synchronization, and cross-platform alignment across SAP Ariba and SAP ERP.",
      fullDescription: "Led vendor and procurement data administration across SAP Ariba, establishing consistent master data structures, supplier onboarding controls, and validation rules. Synchronized vendor master records between SAP Ariba and backend SAP S/4HANA/ECC to eliminate procurement data discrepancies and purchase order stalls.",
      technologies: ["SAP Ariba", "Vendor Management", "SAP ECC", "Data Quality Auditing", "Excel VBA"],
      featured: true,
      stats: "Procurement Data Harmony & Compliance",
      gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      accentColor: "#10b981",
      liveUrl: "https://github.com/surajgholap1",
      githubUrl: "https://github.com/surajgholap1"
    },
    {
      id: "project-3",
      title: "Automated Vendor Data Validation & KPI Monitoring Engine",
      category: "analytics",
      categoryLabel: "Data Analysis & Advanced Excel",
      shortDescription: "Automated Excel validation logic, reconciliation tracker spreadsheets, and interactive Power BI dashboards monitoring 10+ data quality KPIs.",
      fullDescription: "Engineered high-throughput automated Excel validation workbooks using advanced formula logic, lookup matrices, and error-catching macros. Paired with dynamic Power BI dashboards to track 10+ critical data quality metrics in real time, enabling executive decision-makers to audit data integrity prior to system cuts.",
      technologies: ["Advanced Excel", "Power BI", "Data Validation", "KPI Dashboards", "Process Automation"],
      featured: true,
      stats: "10+ Live Data Quality KPIs Monitored",
      gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
      accentColor: "#f59e0b",
      liveUrl: "https://github.com/surajgholap1",
      githubUrl: "https://github.com/surajgholap1"
    },
    {
      id: "project-4",
      title: "Deepfake Detection using NLP and Machine Learning",
      category: "ai",
      categoryLabel: "AI & Machine Learning",
      shortDescription: "AI-powered detection system utilizing computer vision, NLP, and deep learning pipelines to identify manipulated video content.",
      fullDescription: "Architected an end-to-end machine learning pipeline to classify manipulated videos. Leveraged Python, OpenCV, TensorFlow, Keras, Scikit-learn, NLTK, NumPy, and Pandas for facial landmark extraction, temporal consistency analysis, and automated classification with high accuracy.",
      technologies: ["Python", "TensorFlow", "OpenCV", "Scikit-learn", "Keras", "NLTK", "Pandas"],
      featured: false,
      stats: "Automated ML Video Classification",
      gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/20",
      accentColor: "#a855f7",
      liveUrl: "https://github.com/surajgholap1",
      githubUrl: "https://github.com/surajgholap1"
    }
  ],

  experience: [
    {
      period: "May 2025 – Present",
      role: "Data Cleansing Coordinator",
      company: "LanceSoft (Client: British Petroleum (BP))",
      location: "Pune, India",
      highlights: [
        "Orchestrated enterprise-scale supplier master data migration for BP’s oil & gas refinery operations, cleansing, validating, and transforming records from SAP ECC to SAP S/4HANA via SAP MDG.",
        "Governed sensitive vendor banking records through controlled modification, validation, and authorized deletion procedures; rectified reverted, rejected, and loading errors by investigating source-to-target discrepancies and validating corrected records.",
        "Used advanced Excel formulas, validation logic, and reporting trackers to standardize vendor data, automate quality checks, and support accurate migration reporting.",
        "Managed 4,500+ vendor master records and developed Excel trackers and Power BI dashboards to monitor 10+ data quality KPIs, enabling standardized reporting and analysis.",
        "Directed data quality controls supporting 98%+ accuracy, consistent governance, and cutover readiness across migration activities."
      ]
    },
    {
      period: "Sep 2024 – Jan 2025",
      role: "Analyst L2 (Promoted to QC)",
      company: "Innodata",
      location: "Remote (Noida, India)",
      highlights: [
        "Supported an AI model-training Q&A Extraction program, delivering 99% accuracy across data extraction, annotation, formatting, and dataset validation for LLM workflows.",
        "Promoted to Quality Control (QC) to review deliverables, identify complex data inconsistencies, validate model outputs, and enforce strict client quality standards.",
        "Optimized data-handling workflows and supported Prompt Evaluation, Response Ranking, and Data Categorization, boosting processing efficiency by 25%."
      ]
    },
    {
      period: "Jul 2023 – Nov 2023",
      role: "Data Operations Intern",
      company: "Interview Kickstart",
      location: "Remote (Bangalore, India)",
      highlights: [
        "Executed a comprehensive data migration project covering validation, transformation, and system integration, ensuring accurate and timely delivery across business systems.",
        "Streamlined operational workflows and project tracking using CRM, LMS, and collaboration platforms, improving team coordination efficiency by 30%.",
        "Enhanced data handling, system integration, and cross-functional coordination processes, contributing to a 25% improvement in overall operational efficiency."
      ]
    }
  ],

  education: [
    {
      period: "2021 – 2024",
      degree: "Bachelor of Technology in Data Science",
      institution: "G.H. Raisoni College of Engineering & Management (GHRCEM)",
      honors: "Pune, India"
    }
  ],

  certifications: [
    {
      title: "Introduction to Large Language Models (LLMs) & Generative AI",
      issuer: "Google Cloud Skills Boost",
      icon: "cloud"
    },
    {
      title: "Oracle Cloud Infrastructure (OCI) AI Foundations Certification",
      issuer: "Oracle",
      icon: "award"
    },
    {
      title: "Robotic Process Automation (RPA) using UiPath",
      issuer: "UiPath",
      icon: "cpu"
    },
    {
      title: "Google Cloud Compute Fundamentals",
      issuer: "Google Cloud Skills Boost",
      icon: "server"
    }
  ],

  testimonials: [
    {
      quote: "Suraj demonstrated exceptional mastery across SAP MDG, Fiori, and Vendor Master Data during our enterprise SAP S/4HANA supplier migration for British Petroleum. His automated Excel trackers and Power BI dashboards gave our team complete visibility over 4,500+ vendor records.",
      author: "Enterprise Data Lead",
      role: "Oil & Gas Operations",
      company: "LanceSoft / British Petroleum (BP)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Promoting Suraj to Quality Control was one of our easiest decisions. His accuracy in validating complex AI/LLM datasets was consistently above 99%, and his workflow improvements sped up team throughput by 25%.",
      author: "Operations Manager",
      role: "AI & LLM Services",
      company: "Innodata",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Suraj has exceptional analytical thinking and reliable execution. He transformed our cross-system data operations and improved our coordination efficiency by over 30%.",
      author: "Lead Systems Architect",
      role: "Data Operations",
      company: "Interview Kickstart",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    }
  ]
};
