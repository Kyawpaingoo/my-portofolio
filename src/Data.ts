import {
    Briefcase,
    Calendar,
    Code2,
    Database,
    Server,
    FileText,
    GitBranch,
    type LucideProps,
    MessageCircle,
    User
} from "lucide-react";
import React from "react";
import devPortfolio from './assets/img/dev-portfolio.jpg';

export type Theme = 'light' | 'dark';

export type SectionKey = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

export type navItemType = {
    id: SectionKey,
    label: string,
    icon:  React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export type skillCategoryType = {
    title: string,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    skills: string[],
    color: string
}

export type projectType = {
    id: number,
    title: string,
    description: string,
    technologies: string[],
    keyFeatures?: string[],
    technicalHighlights?: string,
    ecosystem?: string,
    liveLink: string | null,
    githubLink?: string,
    image: string,
}

export type experienceType = {
    title: string,
    company: string,
    period: string,
    type: string,
    description: string,
    technologies: string[],
}

export const navItems: navItemType[] = [
    {id: 'home', label: 'Home', icon: User},
    {id: 'about', label: 'About', icon: FileText },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Calendar },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
];

export const skillCategories: skillCategoryType[] = [
    {
        title: 'Frontend',
        icon: Code2,
        skills: ['React', 'React Native', 'TypeScript', 'Material UI', 'Blazor', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
        color: 'text-blue-600 dark:text-blue-400'
    },
    {
        title: 'Backend',
        icon: Server,
        skills: ['C#', 'ASP.NET Core', 'Entity Framework', 'Node.js', 'Express.js', 'NestJS', 'Python', 'Go (Basic)', 'REST APIs'],
        color: 'text-green-600 dark:text-green-400'
    },
    {
        title: 'Database',
        icon: Database,
        skills: ['PostgresSQL', 'MongoDB', 'SQL Server', 'Prisma', 'Redis'],
        color: 'text-purple-600 dark:text-purple-400'
    },
    {
        title: 'DevOps',
        icon: GitBranch,
        skills: ['Git','GitHub Actions', 'AWS', 'Docker (Basic)', 'CI/CD', 'Linux', 'Cloud Deployment'],
        color: 'text-orange-600 dark:text-orange-400'
    }
]

export const projects: projectType[] = [
    {
        id: 1,
        title: 'NomadFocus: An Integrated Productivity Ecosystem for Digital Nomads',
        description: `NomadFocus is a high-performance, full-stack productivity suite designed specifically for the lifestyle of digital nomads. It bridges the gap between task management and travel logistics by integrating a specialized Visa Tracking system alongside traditional productivity tools.`,
        ecosystem: 'Built using a decoupled architecture featuring a React frontend, a Node.js/Express core REST API, and a specialized Golang service for low-latency real-time communication.',
        keyFeatures: ['Dynamic Kanban Board with infinite scroll and optimized DTOs.', 'Integrated Expense Tracker and Meeting Scheduler.', 'Automated Visa Tracking system.', 'Real-time updates with WebSocket integration.'],
        technicalHighlights: 'Implemented efficient data handling with Pagination and Prisma ORM. Currently undergoing a strategic migration of the core API from Express to NestJS to enhance scalability and maintainability.',
        technologies: ['React', 'TypeScript', 'Material UI', 'React-Query', 'Web Socket', 'Node.js', 'Express', 'PostgresSQL', 'Prisma-ORM', 'Golang'],
        liveLink: null,
        githubLink: 'https://github.com/Kyawpaingoo/normad-focus-web',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop&auto=format'
    },
    {
        id: 3, // Adjust ID as needed
        title: 'DevCanvas: A Block-Based Headless CMS for Developer Portfolios',
        description: `DevCanvas is a specialized, full-stack Content Management System designed to empower developers to build and manage high-fidelity portfolios without touching raw HTML. It moves beyond traditional static site generators by offering a dynamic, Notion-style editing experience, allowing users to construct complex project narratives through intuitive drag-and-drop content blocks.`,
        ecosystem: 'Architected using the Next.js 14 App Router for a hybrid rendering approach (combining server-side SEO benefits with client-side interactivity). It utilizes a serverless API backend layer managed by Prisma ORM, with secure, multi-strategy authentication via NextAuth.js.',
        keyFeatures: [
            'Hybrid Authentication (Email magic links + Google OAuth integration).',
            'Granular visibility controls for public vs. private portfolio instances.',
            'SEO-optimized public rendering layer with dynamic metadata.',
            'Intuitive project organization with drag-and-drop reordering capabilities.'
        ],
        technicalHighlights: 'The core engineering challenge was developing the custom block-based WYSIWYG editor. It leverages advanced drag-and-drop primitives (dnd-kit) to manage complex, mutable data structures in real-time. The editor supports diverse content schema—including rich text, syntax-highlighted code snippets, and asynchronous GitHub repository embeds—all type-safe via rigorous TypeScript implementation from database to UI.',
        technologies: [
            'Next.js 14 (App Router)',
            'TypeScript',
            'Tailwind CSS',
            'Prisma ORM',
            'SQLite (Swappable)',
            'NextAuth.js',
            'DnD Kit',
            'UploadThing'
        ],
        liveLink: null, // Add if you have one
        githubLink: 'https://github.com/Kyawpaingoo/portfolio-builder', // Replace with actual link
        image: devPortfolio // Replace with an actual screenshot of the editor
    },
    
    // {
    //     title: 'Social App',
    //     description: 'Modern social media application with real-time features and optimistic updates.',
    //     technologies: ['TypeScript', 'React Query', 'Prisma', 'PostgresSQL'],
    //     liveLink: null,
    //     githubLink: 'https://github.com/Kyawpaingoo/Social-Project',
    //     image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // },
    // {
    //     title: 'Dev Portfolio API',
    //     description: 'RESTful API for developer portfolios with GitHub integration and CI/CD pipeline.',
    //     technologies: ['Express.js', 'GitHub API', 'Neon', 'GitHub Actions'],
    //     liveLink: null,
    //     githubLink: 'https://github.com/SFU-IT-Club/ITClubWeb',
    //     image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // },
    // {
    //     title: 'Movie Watchlist',
    //     description: 'Mobile app for tracking movies and managing personal watchlist.',
    //     technologies: ['React Native', 'JavaScript', 'Expo'],
    //     liveLink: null,
    //     githubLink: 'https://github.com/Kyawpaingoo/movie-app',
    //     image: 'https://i.pinimg.com/736x/fb/af/f5/fbaff54cb503d9f092976eab24d1eed3.jpg'
    // }
];

export const experiences: experienceType[] = [
    {
        title: 'Freelance Full Stack Developer',
        company: 'Self-Employed',
        period: '2024 June - Present',
        type: 'Remote',
        description: 'Collaborated with clients to develop and maintain web applications using modern technologies. Delivered end-to-end solutions from frontend design to backend development and deployment. Ensured responsive design and optimal performance across devices.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgresSQL', 'AWS']
    },
    {
        title: 'Software Engineer',
        company: 'Yammobots',
        period: '2024 January - Present',
        type: 'Remote',
        description: 'Developed RESTful API services for admin dashboards, mobile applications, SMS \n' +
            'services, Email service and notification systems using C# .NET Entity Framework Core. ' +
            'Built and maintained enterprise grade Blazor Server and WebAssembly applications \n' +
            'using .NET 8 and .NET 9. Collaborated closely with cross-functional teams (designers, mobile developers, and \n' +
            'product managers) to deliver scalable and maintainable solutions.',
        technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server', 'Azure']
    },
    {
        title: 'Software Engineer Intern',
        company: 'Yammobots',
        period: '2023 September - 2023 December',
        type: 'On-site',
        description: 'Learnt C# .NET with Entity Framework Core and Blazor Framework. Developed a Real-time chat app using C# .NET EF Core, Blazor and SingalR as internship \n' +
            'project.',
        technologies: ['C#', 'ASP.NET', 'Blazor']
    },
]

export const pdfFile = "/files/Kyaw_Paing_Oo_Resume.pdf"

export const typeWriterItems: string[] = [
    'Full Stack Developer',
    'Digital Nomad',
    'AI Enthusiast'
]