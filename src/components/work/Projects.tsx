const projects = [
  {
    title: 'Roboligent',
    description: 'A platform for robot orchestration',
    detail: 'Internship 2025',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Soar',
    description: 'Small business content creation tool',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'CheckIn',
    description: 'A better way to keep in touch',
    detail: 'Shipping soon',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Styleis.tech',
    description: 'Let your clothes continue to live on',
    detail: 'HackTX 2025',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: '/tmp',
    description: 'Seamlessly move context from IDE to web',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Resistor Sorter',
    description: "An ECE lab tech's dream",
    detail: 'RoboTech 2025',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Autonomous Car',
    description: 'Autonomous car in a simulated city',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Gravity Visualizer',
    description: 'See how gravitational quantities change',
    detail: 'Shipped 2024',
    thumbnail: 'https://via.placeholder.com/150'
  }
]

interface ProjectCardProps {
  title: string
  description: string
  detail: string
  thumbnail: string
}

function ProjectCard({
  title,
  description,
  detail,
  thumbnail
}: ProjectCardProps) {
  return (
    <div className='flex flex-col gap-3'>
      <div className='aspect-square w-full bg-neutral-800' />
      <div className='flex flex-col gap-1'>
        <div className='font-secondary text-white'>{description}</div>
        <div className='font-tertiary text-neutral-400 uppercase'>
          {title} • {detail}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <div className='grid grid-cols-4 gap-6'>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          detail={project.detail}
          thumbnail={project.thumbnail}
        />
      ))}
    </div>
  )
}
