const projects = [
  {
    title: 'Project 1',
    description: 'This is a project description',
    detail: 'Project Detail',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Project 2',
    description: 'This is a project description',
    detail: 'Project Detail',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Project 3',
    description: 'This is a project description',
    detail: 'Project Detail',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Project 4',
    description: 'This is a project description',
    detail: 'Project Detail',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Project 5',
    description: 'This is a project description',
    detail: 'Project Detail',
    thumbnail: 'https://via.placeholder.com/150'
  },
  {
    title: 'Project 6',
    description: 'This is a project description',
    detail: 'Project Detail',
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
