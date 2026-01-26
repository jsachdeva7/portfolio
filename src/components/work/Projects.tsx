import { useEffect, useRef, useState } from 'react'
import Autonomous from './assets/Autonomous.svg'
import CheckIn from './assets/CheckIn.png'
import Gravity from './assets/Gravity.svg'
import RMS from './assets/RMS.svg'
import Robotech from './assets/Robotech.svg'
import Soar from './assets/Soar.png'
import Stylistic from './assets/Stylistic.png'
import Tmp from './assets/Tmp.svg'

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

interface ThumbnailProps {
  project: Project
  isInViewport?: boolean
}

function Thumbnail({ project, isInViewport = false }: ThumbnailProps) {
  const scaleClass = isInViewport ? 'scale-105 desktop:scale-100' : ''
  const hoverClass = 'group-hover:scale-105'
  if (project.title === 'Roboligent') {
    return (
      <div className='flex aspect-square w-full items-center justify-center overflow-hidden bg-[#0b2e5b]'>
        <img
          src={RMS.src}
          alt='Robot Management System'
          className={`h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${scaleClass} ${hoverClass}`}
        />
      </div>
    )
  }

  if (project.title === 'CheckIn') {
    return (
      <div className='flex aspect-square w-full items-center justify-center overflow-hidden bg-[#452f21] p-6'>
        <img
          src={CheckIn.src}
          alt='CheckIn'
          className={`h-full w-auto max-w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${scaleClass} ${hoverClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Stylistic') {
    return (
      <div className='flex aspect-square w-full items-center justify-center overflow-hidden bg-[#1c4a34] p-6'>
        <img
          src={Stylistic.src}
          alt='Stylistic'
          className={`h-full w-auto max-w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${scaleClass} ${hoverClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Soar') {
    return (
      <div className='flex aspect-square w-full items-center justify-center overflow-hidden bg-[#333333] p-6'>
        <img
          src={Soar.src}
          alt='Soar'
          className={`h-full w-auto max-w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${scaleClass} ${hoverClass}`}
        />
      </div>
    )
  }

  if (project.title === '/tmp') {
    return (
      <div className='flex aspect-square w-full items-center justify-center overflow-hidden bg-[#1d2c49]'>
        <img
          src={Tmp.src}
          alt='/tmp'
          className={`h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${scaleClass} ${hoverClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Gravity Visualizer') {
    return (
      <div className='flex aspect-square w-full items-center justify-center overflow-hidden bg-[#333333]'>
        <img
          src={Gravity.src}
          alt='Gravity Visualizer'
          className={`h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${scaleClass} ${hoverClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Autonomous Car') {
    return (
      <div className='flex aspect-square w-full items-center justify-center overflow-hidden bg-[#39332d]'>
        <img
          src={Autonomous.src}
          alt='Autonomous Car'
          className={`h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${scaleClass} ${hoverClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Resistor Sorter') {
    return (
      <div className='flex aspect-square w-full items-center justify-center overflow-hidden bg-[#242b42]'>
        <img
          src={Robotech.src}
          alt='Resistor Sorter'
          className={`h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${scaleClass} ${hoverClass}`}
        />
      </div>
    )
  }

  return <div className='aspect-square w-full bg-white' />
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
    title: 'Stylistic',
    description: 'Let your clothes continue to live on',
    detail: 'HackTX 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      "{{Built in 24 hours}} at {{HackTX 2025}} with three teammates, {{Stylistic}} is a mobile app that helps you understand which clothes in your closet {{you actually use}}, and which {{you're just hoarding}}.",
    devSkills: ['React', 'Flask', 'Supabase', 'Render'],
    designSkills: ['Rapid Prototyping', 'Low Fidelity Prototyping'],
    highlights: [
      'Log daily outfits in seconds and build a {{true picture}} of what you {{actually wear}}',
      '{{Reality-check donation recommendations}} that you approve or deny as you scroll',
      'A ready-to-go donation basket with {{nearby drop-off locations}} for an {{easy donation run}}'
    ]
  },
  {
    title: '/tmp',
    description: 'Seamlessly move context from IDE to web',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      'Ever {{waste a ton of time}} moving code from your {{IDE}} into {{ChatGPT}}/{{Claude}}? {{/tmp}} is a lightweight {{React}} + {{Electron}} widget that lets you {{drag in the files you need}} and generate a clean, GPT-ready {{markdown context package}}—or {{zip}}—in one click.',
    devSkills: ['React', 'Electron'],
    designSkills: ['Figma', 'Rapid Prototyping', 'Low Fidelity Prototyping'],
    highlights: [
      'Drag-and-drop files into an {{ephemeral mini-filesystem}} that lives in the corner of your screen',
      'Recreate coding context with a {{GPT-ready markdown bundle}} of {{select folders + file contents}}',
      '{{One-click zip export}} when the context is too large to paste, for fast upload'
    ]
  },
  {
    title: 'Autonomous Car',
    description: 'Autonomous car in a simulated city',
    detail: 'Shipped 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      '{{Autonomous BMW X5 Controller}} is a {{Webots-based}} self-driving controller I built that performs {{lane keeping}} and {{traffic-light compliance}} in a simulated city using {{vision}}, lightweight {{"HD map" cues}}, and {{closed-loop control}}.',
    devSkills: ['C', 'Python', 'Computer Vision'],
    designSkills: [],
    highlights: [
      '{{YOLO}} traffic-light detection and decision making trained on {{5,000+ labeled images}} ({{98% accuracy}})',
      'Lane-line vision + PID steering control for {{stable lane keeping}}'
    ]
  },
  {
    title: 'Resistor Sorter',
    description: "An ECE lab tech's dream",
    detail: 'RoboTech 2025',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      'At {{RoboTech 2025}}, my two teammates (staff at the ECE Makerspace) and I built a {{Resistor Sorter}} in {{36 hours}}—a robot that measures resistor values with {{Arduino-based ohmmeter circuitry}} and {{automatically sorts them}}, eliminating the hassle of doing it by hand.',
    devSkills: ['Arduino', 'Python', 'Raspberry Pi'],
    designSkills: [
      'Customer Interviews',
      'Rapid Prototyping',
      'Low Fidelity Prototyping'
    ],
    highlights: [
      '{{Intuitive GUI}} to configure {{sorting logic}} and control the microcontroller over {{serial}}',
      '{{Arduino firmware}} for resistor measurement using {{muxed voltage dividers}}',
      '{{Servo-driven sorting}} mechanism with a {{custom conveyor}} and housing'
    ]
  },
  {
    title: 'Gravity Visualizer',
    description: 'Explore how gravitational quantities change',
    detail: 'Shipped 2024',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      'An interactive tool I made for {{IB Physics}} (my favorite high school class) students to {{visualize}} relatively {{abstract astrophysics concepts}} like gravitational potential and gravitational field strength. {{My first coding project ever!}}',
    devSkills: ['Python'],
    designSkills: ['User Interviews', 'Low Fidelity Prototyping'],
    highlights: [
      'Drag planets around and watch {{gravitational field}} and {{potential graphs}} update in {{real time}}',
      '{{Customize planetary systems}} to explore how {{mass}} and {{distance}} shape gravitational relationships',
      'Adopted by my {{high school physics teacher}} to teach {{astrophysics concepts}} in class'
    ]
  }
]

interface ProjectCardProps {
  project: Project
  onClick: () => void
  isCentered?: boolean
}

function ProjectCard({
  project,
  onClick,
  isCentered = false
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className='group flex cursor-pointer flex-col gap-3'
      onClick={onClick}
      data-card-index={project.title}
    >
      <Thumbnail project={project} isInViewport={isCentered} />
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
  const [centeredProject, setCenteredProject] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const findCenteredCard = () => {
      // Only run on mobile (viewport width < 769px)
      if (window.innerWidth >= 769) {
        setCenteredProject(null)
        return
      }

      if (!containerRef.current) return

      const cards = containerRef.current.querySelectorAll('[data-card-index]')
      const viewportCenter = window.innerHeight / 2
      let closestCard: Element | null = null
      let closestDistance = Infinity

      cards.forEach(card => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const distance = Math.abs(cardCenter - viewportCenter)

        // Only consider cards that are in the center 50% of the viewport
        const isInCenterZone =
          cardCenter >= viewportCenter * 0.5 &&
          cardCenter <= viewportCenter * 1.5

        if (isInCenterZone && distance < closestDistance) {
          closestDistance = distance
          closestCard = card
        }
      })

      if (closestCard) {
        const projectTitle = closestCard.getAttribute('data-card-index')
        setCenteredProject(projectTitle)
      } else {
        setCenteredProject(null)
      }
    }

    // Check on scroll and initial load
    findCenteredCard()
    window.addEventListener('scroll', findCenteredCard, { passive: true })
    window.addEventListener('resize', findCenteredCard)

    return () => {
      window.removeEventListener('scroll', findCenteredCard)
      window.removeEventListener('resize', findCenteredCard)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='desktop:grid-cols-4 grid grid-cols-1 gap-4'
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          onClick={() => onSelectProject(project)}
          isCentered={centeredProject === project.title}
        />
      ))}
    </div>
  )
}
