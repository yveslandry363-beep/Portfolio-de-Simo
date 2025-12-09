
import { Folder, Database, Globe, Cpu, Layers } from 'lucide-react';

// STABLE CDN VIDEO ASSETS (Google Storage)
const VIDEOS = {
  SCIFI: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",        // AI, Quantum, Cyber
  DATA: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",       // Data, Complex Logic
  WEB: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",      // Design, Frontend, Motion
  TECH: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",      // DevOps, Scripting, Automation
  AUTO: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", // Engineering, Automotive
  NATURE: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",       // Biology, Lifestyle, Tutor
  CINEMATIC: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"  // General Cinematic
};

export const experience = [
  {
    id: 1,
    title: "Psb Intralogistics",
    category: "Assistant Engineer",
    category_fr: "Ingénieur Assistant",
    category_de: "Assistenzingenieur",
    year: "Current",
    year_fr: "Actuel",
    year_de: "Aktuell",
    image: "https://picsum.photos/id/4/1920/1080",
    videoDemo: VIDEOS.TECH,
    description: "Creating reports, planning technical projects, and optimizing production processes. Working deeply with automation systems and logic control.",
    description_fr: "Création de rapports, planification de projets techniques et optimisation des processus de production. Travail approfondi sur les systèmes d'automatisation.",
    description_de: "Erstellung von Berichten, Planung technischer Projekte und Optimierung von Produktionsprozessen. Tiefe Einarbeitung in Automatisierungssysteme.",
    details: "As an Assistant Engineer, I play a crucial role in the planning and execution of technical projects. My daily tasks involve creating detailed reports that drive decision-making and optimizing production processes to ensure maximum efficiency. I work closely with senior engineers to implement new intralogistics solutions.",
    details_fr: "En tant qu'ingénieur assistant, je joue un rôle crucial dans la planification et l'exécution de projets techniques. Mes tâches quotidiennes impliquent la création de rapports détaillés pour la prise de décision et l'optimisation des processus de production.",
    details_de: "Als Assistenzingenieur spiele ich eine entscheidende Rolle bei der Planung und Durchführung technischer Projekte. Meine täglichen Aufgaben umfassen die Erstellung detaillierter Berichte zur Entscheidungsfindung und die Optimierung von Produktionsprozessen.",
    stack: ["Project Management", "Optimization", "Reporting", "Logistics"]
  },
  {
    id: 2,
    title: "Lern-Academy",
    category: "Tutor",
    category_fr: "Tuteur",
    category_de: "Nachhilfelehrer",
    year: "2024",
    image: "https://picsum.photos/id/20/1920/1080",
    videoDemo: VIDEOS.NATURE,
    description: "Tutoring in Mathematics, Physics, French, English, and Biology.",
    description_fr: "Soutien scolaire en mathématiques, physique, français, anglais et biologie.",
    description_de: "Nachhilfeunterricht in Mathematik, Physik, Französisch, Englisch und Biologie.",
    details: "I provided comprehensive tutoring to students in various subjects including Mathematics, Physics, and Languages. My approach focused on simplifying complex concepts and adapting teaching methods to individual learning styles.",
    details_fr: "J'ai fourni un soutien scolaire complet aux étudiants dans diverses matières, notamment les mathématiques et la physique. Mon approche se concentre sur la simplification de concepts complexes.",
    details_de: "Ich bot umfassenden Nachhilfeunterricht in verschiedenen Fächern an, darunter Mathematik und Physik. Mein Ansatz konzentrierte sich darauf, komplexe Konzepte zu vereinfachen.",
    stack: ["Mathematics", "Physics", "Languages", "Pedagogy"]
  },
  {
    id: 3,
    title: "DCON GmbH",
    category: "Data Analyst",
    category_fr: "Analyste de Données",
    category_de: "Datenanalyst",
    year: "2023-2024",
    image: "https://picsum.photos/id/60/1920/1080",
    videoDemo: VIDEOS.DATA,
    description: "Data analysis with Excel & SQL, process automation, and quality assurance.",
    description_fr: "Analyse de données avec Excel & SQL, automatisation des processus et assurance qualité.",
    description_de: "Datenanalyse mit Excel & SQL, Prozessautomatisierung und Qualitätssicherung.",
    details: "At DCON GmbH, I was responsible for analyzing large datasets using Excel and SQL to support business decisions. I also automated repetitive data processes, significantly reducing manual workload and improving data quality assurance protocols.",
    details_fr: "Chez DCON GmbH, j'étais responsable de l'analyse de grands ensembles de données à l'aide d'Excel et SQL pour soutenir les décisions commerciales. J'ai également automatisé des processus de données répétitifs.",
    details_de: "Bei der DCON GmbH war ich für die Analyse großer Datensätze mit Excel und SQL verantwortlich, um Geschäftsentscheidungen zu unterstützen. Ich habe auch repetitive Datenprozesse automatisiert.",
    stack: ["Excel", "SQL", "Data Analysis", "QA"]
  },
  {
    id: 4,
    title: "BMW",
    category: "Software Engineer",
    category_fr: "Ingénieur Logiciel",
    category_de: "Softwareingenieur",
    year: "2022-2023",
    image: "https://picsum.photos/id/180/1920/1080",
    videoDemo: VIDEOS.AUTO,
    description: "Software project planning, integration of new technologies, Python & JavaScript development.",
    description_fr: "Planification de projets logiciels, intégration de nouvelles technologies, développement Python & JavaScript.",
    description_de: "Planung von Softwareprojekten, Integration neuer Technologien, Entwicklung in Python & JavaScript.",
    details: "During my time at BMW, I contributed to the planning and analysis of software projects. I was involved in integrating new technologies into existing systems and developing software solutions using Python and JavaScript, focusing on efficiency and scalability.",
    details_fr: "Durant mon passage chez BMW, j'ai contribué à la planification et à l'analyse de projets logiciels. J'ai participé à l'intégration de nouvelles technologies dans les systèmes existants.",
    details_de: "Während meiner Zeit bei BMW habe ich an der Planung und Analyse von Softwareprojekten mitgewirkt. Ich war an der Integration neuer Technologien in bestehende Systeme beteiligt.",
    stack: ["Python", "JavaScript", "Software Architecture", "Automotive Tech"]
  }
];

export const projects = [
  {
    id: 200,
    title: "VMed237",
    category: "Quantum Health Ecosystem",
    category_fr: "Écosystème de Santé Quantique",
    category_de: "Quanten-Gesundheits-Ökosystem",
    description: "Medical quantum interface that will revolutionize the world of medicine.",
    description_fr: "Interface quantique médicale qui va révolutionner le monde de la médecine.",
    description_de: "Medizinische Quantenschnittstelle, die die Welt der Medizin revolutionieren wird.",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=2525&auto=format&fit=crop",
    videoDemo: VIDEOS.SCIFI,
    private: true,
    details: "VMed237 is a groundbreaking private initiative focused on creating a quantum health ecosystem. This interface leverages quantum computing principles to optimize medical data processing and diagnostic precision.",
    details_fr: "VMed237 est une initiative privée révolutionnaire axée sur la création d'un écosystème de santé quantique. Cette interface exploite les principes de l'informatique quantique pour optimiser le traitement des données médicales et la précision du diagnostic.",
    details_de: "VMed237 ist eine bahnbrechende private Initiative, die sich auf die Schaffung eines Quanten-Gesundheitsökosystems konzentriert. Diese Schnittstelle nutzt Prinzipien des Quantencomputings zur Optimierung der medizinischen Datenverarbeitung.",
    stack: ["Quantum Tech", "Medical AI", "React", "WebGL"],
    featured: true
  },
  { id: 101, title: "Sales Dashboard", category: "Data Analysis", videoDemo: VIDEOS.DATA, description: "Analyzed retail sales data using Python Pandas to identify seasonal trends.", stack: ["Python", "Pandas", "Matplotlib"] },
  { id: 102, title: "Customer Segmentation", category: "Data Science", videoDemo: VIDEOS.DATA, description: "Clustered customer data using K-Means to target marketing campaigns.", stack: ["Python", "Scikit-Learn", "K-Means"] },
  { id: 103, title: "Predictive Maintenance", category: "Machine Learning", videoDemo: VIDEOS.SCIFI, description: "Built a model to predict equipment failure using sensor data.", stack: ["Python", "XGBoost", "IoT"] },
  { id: 104, title: "Stock Analysis", category: "FinTech", videoDemo: VIDEOS.DATA, description: "Visualized historical stock prices using Matplotlib and Yahoo Finance API.", stack: ["Python", "API", "Finance"] },
  { id: 105, title: "Weather Visualization", category: "Data Viz", videoDemo: VIDEOS.DATA, description: "Created an interactive weather dashboard using D3.js and OpenWeatherMap.", stack: ["D3.js", "JavaScript", "API"] },
  { id: 106, title: "Sentiment Analysis", category: "NLP", videoDemo: VIDEOS.DATA, description: "Processed Twitter data to gauge public sentiment on trending topics.", stack: ["Python", "NLTK", "Twitter API"] },
  { id: 107, title: "House Price Prediction", category: "Real Estate Tech", videoDemo: VIDEOS.DATA, description: "Implemented a linear regression model for real estate valuation.", stack: ["Python", "Regression", "Data Science"] },
  { id: 108, title: "Traffic Optimization", category: "Smart City", videoDemo: VIDEOS.TECH, description: "Simulated traffic flow to optimize traffic light timing.", stack: ["Python", "Simulation", "Algorithms"] },
  { id: 109, title: "Marketing ROI", category: "Business Intelligence", videoDemo: VIDEOS.DATA, description: "Analyzed campaign performance metrics to optimize ad spend.", stack: ["Excel", "PowerBI", "Analytics"] },
  { id: 110, title: "Demographic Trends", category: "Sociology", videoDemo: VIDEOS.DATA, description: "Visualized population growth trends using public census data.", stack: ["Python", "Seaborn", "Data Viz"] },
  { id: 111, title: "Personal Blog", category: "Web Dev", videoDemo: VIDEOS.WEB, description: "Developed a static blog generator using Next.js and Markdown.", stack: ["Next.js", "React", "Markdown"] },
  { id: 112, title: "E-commerce Store", category: "Web Dev", videoDemo: VIDEOS.WEB, description: "Built a mock online shop with cart functionality using React.", stack: ["React", "Redux", "Stripe"] },
  { id: 113, title: "Portfolio V1", category: "Web Dev", videoDemo: VIDEOS.WEB, description: "My first portfolio website built with HTML and CSS.", stack: ["HTML", "CSS", "Design"] },
  { id: 114, title: "Recipe Finder", category: "Lifestyle", videoDemo: VIDEOS.NATURE, description: "Integrated a food API to search recipes based on ingredients.", stack: ["JavaScript", "Rest API", "CSS"] },
  { id: 115, title: "Fitness Tracker", category: "Health Tech", videoDemo: VIDEOS.WEB, description: "Designed a dashboard to log and visualize workout progress.", stack: ["React", "Chart.js", "Node.js"] },
  { id: 116, title: "Real-time Chat", category: "Communication", videoDemo: VIDEOS.WEB, description: "Implemented a real-time chat room using Socket.io and Node.js.", stack: ["Socket.io", "Node.js", "Express"] },
  { id: 117, title: "Weather Widget", category: "Web Components", videoDemo: VIDEOS.WEB, description: "Built a lightweight JS widget for local weather updates.", stack: ["JavaScript", "HTML", "CSS"] },
  { id: 118, title: "Todo App", category: "Productivity", videoDemo: VIDEOS.WEB, description: "A classic Todo app with local storage persistence.", stack: ["React", "LocalStorage", "UX"] },
  { id: 119, title: "Markdown Editor", category: "Dev Tools", videoDemo: VIDEOS.TECH, description: "Created a browser-based markdown editor with live preview.", stack: ["React", "Regex", "Text Parsing"] },
  { id: 120, title: "Snippet Manager", category: "Dev Tools", videoDemo: VIDEOS.TECH, description: "Built a tool to save and organize reusable code snippets.", stack: ["Electron", "JavaScript", "Local Storage"] },
  { id: 121, title: "Web Scraper", category: "Automation", videoDemo: VIDEOS.TECH, description: "Python script to extract job listings from various career sites.", stack: ["Python", "BeautifulSoup", "Selenium"] },
  { id: 122, title: "File Organizer", category: "Automation", videoDemo: VIDEOS.TECH, description: "Automating file sorting by extension using Python OS module.", stack: ["Python", "OS", "Automation"] },
  { id: 123, title: "Email Automator", category: "Automation", videoDemo: VIDEOS.TECH, description: "Script to send personalized emails from a CSV list.", stack: ["Python", "SMTP", "Pandas"] },
  { id: 124, title: "PDF Merger", category: "Utilities", videoDemo: VIDEOS.TECH, description: "Created a utility to merge and split PDF documents programmatically.", stack: ["Python", "PyPDF2", "Scripting"] },
  { id: 125, title: "Batch Image Resizer", category: "Media Processing", videoDemo: VIDEOS.TECH, description: "Built a batch image processing tool using Pillow library.", stack: ["Python", "Pillow", "Image Processing"] },
  { id: 126, title: "Backup Script", category: "SysAdmin", videoDemo: VIDEOS.TECH, description: "Automated daily directory backups to an external drive.", stack: ["Bash", "Cron", "Linux"] },
  { id: 127, title: "Log Analyzer", category: "DevOps", videoDemo: VIDEOS.SCIFI, description: "Parsed server logs to generate traffic reports and error alerts.", stack: ["Python", "Regex", "Monitoring"] },
  { id: 128, title: "Invoice Generator", category: "Business Tools", videoDemo: VIDEOS.TECH, description: "Automated invoice creation from spreadsheet data.", stack: ["Python", "PDFKit", "Excel"] },
  { id: 129, title: "Telegram Notifier", category: "Bot Dev", videoDemo: VIDEOS.TECH, description: "Script to send system status updates to a Telegram channel.", stack: ["Python", "Telegram API", "Webhooks"] },
  { id: 130, title: "Data Cleaner", category: "Data Engineering", videoDemo: VIDEOS.DATA, description: "Developed a pipeline to handle missing values in datasets.", stack: ["Python", "Pandas", "ETL"] },
  { id: 131, title: "Sudoku Solver", category: "Algorithms", videoDemo: VIDEOS.SCIFI, description: "Implemented a backtracking algorithm to solve Sudoku puzzles.", stack: ["Python", "Algorithms", "Backtracking"] },
  { id: 132, title: "Pathfinding Visualizer", category: "Algorithms", videoDemo: VIDEOS.WEB, description: "Visualized A* and Dijkstra algorithms on a grid.", stack: ["JavaScript", "Canvas", "Algorithms"] },
  { id: 133, title: "Sorting Visualizer", category: "Algorithms", videoDemo: VIDEOS.WEB, description: "Animated bubble, merge, and quick sort algorithms.", stack: ["React", "Algorithms", "Education"] },
  { id: 134, title: "Fractal Generator", category: "Math", videoDemo: VIDEOS.DATA, description: "Generated Mandelbrot set images using complex number math.", stack: ["Python", "NumPy", "Mathematics"] },
  { id: 135, title: "Prime Finder", category: "Math", videoDemo: VIDEOS.SCIFI, description: "Optimized sieve algorithms to find large prime numbers.", stack: ["C++", "Mathematics", "Performance"] },
  { id: 136, title: "Matrix Calculator", category: "Math", videoDemo: VIDEOS.DATA, description: "Built a tool for matrix multiplication and determinant calculation.", stack: ["Python", "NumPy", "Linear Algebra"] },
  { id: 137, title: "Graph Visualizer", category: "Graph Theory", videoDemo: VIDEOS.DATA, description: "Visualized graph theory concepts like connectivity and cycles.", stack: ["D3.js", "Graph Theory", "Data Viz"] },
  { id: 138, title: "Pi Estimator", category: "Math", videoDemo: VIDEOS.SCIFI, description: "Estimated Pi using Monte Carlo simulation methods.", stack: ["Python", "Simulation", "Statistics"] },
  { id: 139, title: "Game of Life", category: "Simulation", videoDemo: VIDEOS.WEB, description: "Implemented Conway's Game of Life cellular automaton.", stack: ["JavaScript", "Canvas", "Automata"] },
  { id: 140, title: "Physics Simulator", category: "Simulation", videoDemo: VIDEOS.SCIFI, description: "Created a 2D physics engine for collision detection.", stack: ["C++", "Physics", "Mechanics"] },
  { id: 141, title: "Digit Recognizer", category: "Deep Learning", videoDemo: VIDEOS.SCIFI, description: "Trained a CNN on MNIST dataset to recognize handwritten digits.", stack: ["Python", "TensorFlow", "Deep Learning"] },
  { id: 142, title: "Spam Filter", category: "AI", videoDemo: VIDEOS.DATA, description: "Built a Naive Bayes classifier to detect spam emails.", stack: ["Python", "Scikit-Learn", "NLP"] },
  { id: 143, title: "Chatbot", category: "AI", videoDemo: VIDEOS.WEB, description: "Created a rule-based chatbot for customer service FAQs.", stack: ["Python", "NLP", "Dialogflow"] },
  { id: 144, title: "Face Detector", category: "Computer Vision", videoDemo: VIDEOS.SCIFI, description: "Used OpenCV Haar Cascades for real-time face detection.", stack: ["Python", "OpenCV", "Vision"] },
  { id: 145, title: "Translator Tool", category: "API Integration", videoDemo: VIDEOS.WEB, description: "Integrated Google Translate API for a multi-language tool.", stack: ["JavaScript", "API", "Translation"] },
  { id: 146, title: "Text Summarizer", category: "NLP", videoDemo: VIDEOS.DATA, description: "Used NLP techniques to summarize long articles.", stack: ["Python", "HuggingFace", "Transformers"] },
  { id: 147, title: "Voice Assistant", category: "AI", videoDemo: VIDEOS.SCIFI, description: "Built a simple voice command recognition tool.", stack: ["Python", "SpeechRecognition", "Audio"] },
  { id: 148, title: "Recommendation Engine", category: "Data Science", videoDemo: VIDEOS.DATA, description: "Built a movie recommendation system using collaborative filtering.", stack: ["Python", "Pandas", "Surprise"] },
  { id: 149, title: "Music Classifier", category: "Audio AI", videoDemo: VIDEOS.CINEMATIC, description: "Analyzed audio features to classify music genres.", stack: ["Python", "Librosa", "Audio Processing"] },
  { id: 150, title: "Credit Scoring", category: "FinTech", videoDemo: VIDEOS.DATA, description: "Built a decision tree model to assess loan risk.", stack: ["Python", "Decision Trees", "Risk Analysis"] }
];