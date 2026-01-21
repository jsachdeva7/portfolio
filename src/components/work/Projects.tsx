export interface Project {
  title: string
  description: string
  detail: string
  thumbnail: string
  caption: string
  devSkills: string[]
  designSkills: string[]
  highlights: string[]
}

export const projects: Project[] = [
  {
    title: 'Roboligent',
    description: 'A platform for robot management',
    detail: 'Internship 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      "The {{Robot Management System}} is a {{full-stack edge application}} that I shipped during my internship at {{Roboligent}}. It enables our customers' technicians to {{monitor}}, {{command}}, and {{orchestrate}} Roboligent robots and devices through an {{intuitive interface}} on the factory floor.",
    devSkills: [
      'React',
      'Flask',
      'Apache Kafka',
      'Websockets',
      'MySQL',
      'AWS EC2',
      'MQTT',
      'ROS',
      'Bitbucket Pipelines (CI/CD)'
    ],
    designSkills: ['Figma', 'Wireframing', 'Customer Interviews'],
    highlights: [
      'Interactive SLAM map and control panel for {{live robot control}}',
      'Drag-and-drop behavior tree builder for {{custom robot workflows}}',
      'My {{personal demos}} to investors contributed to {{$4m in funding}}'
    ]
  },
  {
    title: 'Soar',
    description: 'Small business content creation app',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      'Backed by Georgia Tech {{CREATE-X}}, {{Soar}} is an {{AI-powered app}} that I built for {{small handmade goods-business owners}} (like my mom, a home baker!). It facilitates {{authentic}} content creation and {{automates}} the {{tedious aspects}} of social media management.',
    devSkills: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'n8n',
      'Clerk',
      'Microsoft Azure'
    ],
    designSkills: [
      'Figma',
      'Rapid Prototyping',
      'Customer Interviews',
      'Customer Journey Mapping'
    ],
    highlights: [
      'Seamless workflow for {{creating captions}}, {{building posts}}, and {{sharing to Instagram}}',
      '{{10+ paying customers}} saving ~{{2 hours per week}} on content creation',
      '{{100+}} customer discovery and product testing {{interviews}}'
    ]
  },
  {
    title: 'CheckIn',
    description: 'A better way to keep in touch',
    detail: 'Shipping soon',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      'Ever said {{"We have to stay in touch!"}} and then never followed up? Inspired by my time away from campus interning last fall, {{CheckIn}} is a {{mobile app}} that I\'m currently developing to help you {{actually stay in touch}} with those you care about, {{even when geography isn\'t on your side}}.',
    devSkills: ['React Native', 'Supabase', 'Twilio'],
    designSkills: ['Figma', 'Rapid Prototyping'],
    highlights: [
      'A {{streamlined flow}} for {{starting check-ins}} and {{handling reschedules}}',
      '{{Gentle}}, {{human reminders}} that show up in a {{shared group chat}}',
      'Scheduling that {{adapts automatically}} to your {{calendar}} and {{calling habits}}'
    ]
  },
  {
    title: 'Styleis.tech',
    description: 'Let your clothes continue to live on',
    detail: 'HackTX 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption: '',
    devSkills: ['React, Flask, Supabase, Render'],
    designSkills: ['Rapid Prototyping', 'Low Fidelity Prototyping'],
    highlights: []
  },
  {
    title: '/tmp',
    description: 'Seamlessly move context from IDE to web',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption: '',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: 'Resistor Sorter',
    description: "An ECE lab tech's dream",
    detail: 'RoboTech 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption: '',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: 'Autonomous Car',
    description: 'Autonomous car in a simulated city',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption: '',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: 'Gravity Visualizer',
    description: 'See how gravitational quantities change',
    detail: 'Shipped 2024',
    thumbnail: 'https://via.placeholder.com/150',
    caption: '',
    devSkills: [],
    designSkills: [],
    highlights: []
  }
]

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className='flex cursor-pointer flex-col gap-3' onClick={onClick}>
      <div className='aspect-square w-full bg-neutral-800' />
      <div className='flex flex-col gap-1'>
        <div className='font-secondary text-white'>{project.description}</div>
        <div className='font-tertiary text-neutral-400 uppercase'>
          {project.title} • {project.detail}
        </div>
      </div>
    </div>
  )
}

interface ProjectsProps {
  onSelectProject: (project: Project) => void
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  return (
    <div className='grid grid-cols-4 gap-6'>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          onClick={() => onSelectProject(project)}
        />
      ))}
    </div>
  )
}
