export interface Project {
  title: string
  description: string
  detail: string
  thumbnail: string
  devSkills: string[]
  designSkills: string[]
  highlights: string[]
}

export const projects: Project[] = [
  {
    title: 'Roboligent',
    description: 'A platform for robot orchestration',
    detail: 'Internship 2025',
    thumbnail: 'https://via.placeholder.com/150',
    devSkills: [
      'React',
      'Python Flask',
      'Apache Kafka',
      'Websockets',
      'MySQL',
      'MQTT'
    ],
    designSkills: [
      'Figma',
      'Wireframing',
      'Prototyping',
      'Customer Interviews'
    ],
    highlights: [
      'Interactive SLAM map and control panel for {{live robot control}}',
      'Drag-and-drop behavior tree builder for {{custom robot workflows}}',
      'My {{personal demos}} to investors contributed to {{$4m in funding}}'
    ]
  },
  {
    title: 'Soar',
    description: 'Small business content creation tool',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: 'CheckIn',
    description: 'A better way to keep in touch',
    detail: 'Shipping soon',
    thumbnail: 'https://via.placeholder.com/150',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: 'Styleis.tech',
    description: 'Let your clothes continue to live on',
    detail: 'HackTX 2025',
    thumbnail: 'https://via.placeholder.com/150',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: '/tmp',
    description: 'Seamlessly move context from IDE to web',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: 'Resistor Sorter',
    description: "An ECE lab tech's dream",
    detail: 'RoboTech 2025',
    thumbnail: 'https://via.placeholder.com/150',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: 'Autonomous Car',
    description: 'Autonomous car in a simulated city',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150',
    devSkills: [],
    designSkills: [],
    highlights: []
  },
  {
    title: 'Gravity Visualizer',
    description: 'See how gravitational quantities change',
    detail: 'Shipped 2024',
    thumbnail: 'https://via.placeholder.com/150',
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
