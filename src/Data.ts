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
    title: string,
    description: string,
    technologies: string[],
    liveLink: string,
    githubLink: string,
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
        skills: ['React', 'TypeScript', 'Material UI', 'Blazor', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
        color: 'text-blue-600 dark:text-blue-400'
    },
    {
        title: 'Backend',
        icon: Server,
        skills: ['C#', 'ASP.NET Core', 'Entity Framework', 'Node.js', 'Express.js', 'Go (Basic)', 'REST APIs'],
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
        title: 'Blog CRUD App',
        description: 'Full-stack blog application with create, read, update, and delete functionality.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        liveLink: '#',
        githubLink: '#',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop&auto=format'
    },
    {
        title: 'Social App',
        description: 'Modern social media application with real-time features and optimistic updates.',
        technologies: ['TypeScript', 'React Query', 'Prisma', 'PostgreSQL'],
        liveLink: '#',
        githubLink: '#',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&auto=format'
    },
    {
        title: 'Dev Portfolio API',
        description: 'RESTful API for developer portfolios with GitHub integration and CI/CD pipeline.',
        technologies: ['Express.js', 'GitHub API', 'Neon', 'GitHub Actions'],
        liveLink: '#',
        githubLink: '#',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&auto=format'
    },
    {
        title: 'Movie Watchlist',
        description: 'Mobile app for tracking movies and managing personal watchlists.',
        technologies: ['React Native', 'TypeScript', 'SQLite', 'REST API'],
        liveLink: '#',
        githubLink: '#',
        image: 'https://images.unsplash.com/photo-1489599150050-48b4b5b0e8cb?w=400&h=250&fit=crop&auto=format'
    },
    {
        title: 'Go Wallet API',
        description: 'Golang-based wallet API with mock data simulation and financial operations.',
        technologies: ['Go', 'REST API', 'JSON', 'HTTP Server'],
        liveLink: '#',
        githubLink: '#',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop&auto=format'
    }
];

export const experiences: experienceType[] = [
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


export const typeWriterItems: string[] = [
    'Full Stack Developer',
    'Digital Nomad'
]