import { useEffect, useRef, useState } from 'react'
import Autonomous from './assets/Autonomous.svg'
import CheckIn from './assets/CheckIn.png'
import Gravity from './assets/Gravity.svg'
import RMS from './assets/RMS.svg'
import Robotech from './assets/Robotech.svg'
import Soar from './assets/Soar.png'
import Stylistic from './assets/Stylistic.png'
import Tmp from './assets/Tmp.svg'
import Allrecipes from './assets/Allrecipes.svg'
import TF from './assets/TF.png'
import TFLandscape from './assets/TFLandscape.png'

export type ProjectSection = 'work' | 'playground'

export interface Project {
  title: string
  description: string
  detail: string
  thumbnail: string
  caption: string
  devSkills: string[]
  designSkills: string[]
  highlights: string[]
  section: ProjectSection
}

interface ThumbnailProps {
  project: Project
  isInViewport?: boolean
}

const thumbImgShadow = 'drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]'

/** Inset light glow on hover; drop-shadow stays on the img without hover scale to avoid filter glitches. */
const thumbFrameHoverGlow =
  'transition-shadow duration-300 ease-out group-hover:shadow-[inset_0_0_88px_rgba(255,255,255,0.12)]'

function Thumbnail({ project, isInViewport = false }: ThumbnailProps) {
  const animationClass = isInViewport
    ? 'animate-scale-once tablet:animate-none'
    : ''
  const aspectClass =
    project.section === 'work'
      ? 'aspect-square tablet:aspect-800/520'
      : 'aspect-square'
  if (project.title === 'Talking Fingers') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#e5ecf7] ${thumbFrameHoverGlow}`}
      >
        <picture>
          <source media='(max-width: 767px)' srcSet={TF.src} />
          <img
            src={TFLandscape.src}
            alt='Talking Fingers'
            className={`${thumbImgShadow} h-auto w-full rounded-2xl ${animationClass}`}
          />
        </picture>
      </div>
    )
  }

  if (project.title === 'Roboligent') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0b2e5b] ${thumbFrameHoverGlow}`}
      >
        <img
          src={RMS.src}
          alt='Robot Management System'
          className={`${thumbImgShadow} h-auto w-full ${animationClass}`}
        />
      </div>
    )
  }

  if (project.title === 'CheckIn') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-3xl bg-[#452f21] p-6 ${thumbFrameHoverGlow}`}
      >
        <img
          src={CheckIn.src}
          alt='CheckIn'
          className={`${thumbImgShadow} h-full w-auto max-w-full object-contain ${animationClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Stylistic') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-3xl bg-[#1c4a34] p-6 ${thumbFrameHoverGlow}`}
      >
        <img
          src={Stylistic.src}
          alt='Stylistic'
          className={`${thumbImgShadow} h-full w-auto max-w-full object-contain ${animationClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Soar') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#333333] p-6 ${thumbFrameHoverGlow}`}
      >
        <img
          src={Soar.src}
          alt='Soar'
          className={`${thumbImgShadow} h-full w-auto max-w-full object-contain ${animationClass}`}
        />
      </div>
    )
  }

  if (project.title === '/tmp') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#1d2c49] ${thumbFrameHoverGlow}`}
      >
        <img
          src={Tmp.src}
          alt='/tmp'
          className={`${thumbImgShadow} h-auto w-full ${animationClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Gravity Visualizer') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#333333] ${thumbFrameHoverGlow}`}
      >
        <img
          src={Gravity.src}
          alt='Gravity Visualizer'
          className={`${thumbImgShadow} h-auto w-full ${animationClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Autonomous Car') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#39332d] ${thumbFrameHoverGlow}`}
      >
        <img
          src={Autonomous.src}
          alt='Autonomous Car'
          className={`${thumbImgShadow} h-auto w-full ${animationClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Resistor Sorter') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#242b42] ${thumbFrameHoverGlow}`}
      >
        <img
          src={Robotech.src}
          alt='Resistor Sorter'
          className={`${thumbImgShadow} h-auto w-full ${animationClass}`}
        />
      </div>
    )
  }

  if (project.title === 'Allrecipes.com') {
    return (
      <div
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#964D36] ${thumbFrameHoverGlow}`}
      >
        <img
          src={Allrecipes.src}
          alt='Allrecipes'
          className={`${thumbImgShadow} h-auto w-full ${animationClass}`}
        />
      </div>
    )
  }

  return (
    <div
      className={`${aspectClass} w-full overflow-hidden rounded-2xl bg-white`}
    />
  )
}

export const projects: Project[] = [
  {
    title: 'Talking Fingers',
    description: 'Intentionally learn sign language',
    detail: 'shipping soon',
    thumbnail: 'https://via.placeholder.com/150',
    caption: 'Coming soon',
    devSkills: [],
    designSkills: [],
    highlights: [],
    section: 'work'
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
    ],
    section: 'work'
  },
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
    ],
    section: 'work'
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
    ],
    section: 'work'
  },
  {
    title: 'Allrecipes.com',
    description: 'Apply popular tweaks to recipes',
    detail: 'Concept',
    thumbnail: 'https://via.placeholder.com/150',
    caption: 'Coming soon',
    devSkills: [],
    designSkills: [],
    highlights: [],
    section: 'playground'
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
    ],
    section: 'playground'
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
    ],
    section: 'playground'
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
    ],
    section: 'playground'
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
    ],
    section: 'playground'
  },
  {
    title: 'Gravity Visualizer',
    description: 'Explore gravitational quantities',
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
    ],
    section: 'playground'
  }
]

const workProjects = projects.filter(p => p.section === 'work')
const playgroundProjects = projects.filter(p => p.section === 'playground')

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
  const [animatingProject, setAnimatingProject] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const previousCenterState = useRef<Map<string, boolean>>(new Map())
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const findCenteredCard = () => {
      // Only run when grid is single column (container width < 560px, i.e., 2 * 280px min-width)
      if (window.innerWidth >= 560) {
        setAnimatingProject(null)
        return
      }

      if (!containerRef.current) return

      const cards = containerRef.current.querySelectorAll('[data-card-index]')
      const viewportCenter = window.innerHeight / 2
      const currentCenterState = new Map<string, boolean>()

      cards.forEach(card => {
        if (!(card instanceof HTMLElement)) return

        const projectTitle = card.getAttribute('data-card-index')
        if (!projectTitle) return

        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2

        // Check if card is in the center zone (within 100px of center)
        const distance = Math.abs(cardCenter - viewportCenter)
        const isInCenterZone = distance < 100

        const wasInCenter =
          previousCenterState.current.get(projectTitle) || false
        currentCenterState.set(projectTitle, isInCenterZone)

        // Trigger animation if card just crossed into center (entering the center zone)
        if (isInCenterZone && !wasInCenter) {
          // Clear any existing timeout
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current)
          }

          setAnimatingProject(projectTitle)

          // Reset after animation completes (300ms duration)
          animationTimeoutRef.current = setTimeout(() => {
            setAnimatingProject(null)
          }, 300)
        }
      })

      previousCenterState.current = currentCenterState
    }

    // Check on scroll and initial load
    findCenteredCard()
    window.addEventListener('scroll', findCenteredCard, { passive: true })
    window.addEventListener('resize', findCenteredCard)

    return () => {
      window.removeEventListener('scroll', findCenteredCard)
      window.removeEventListener('resize', findCenteredCard)
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  const workGridClass = 'grid grid-cols-1 tablet:grid-cols-2 gap-6'
  const playgroundGridClass =
    'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'
  const sectionTitleClass =
    'font-primary text-2xl italic text-neutral-400 desktop:text-3xl'
  const sectionTitleBarStackClass = 'flex flex-col gap-[14px]'

  return (
    <div ref={containerRef} className='flex flex-col gap-12'>
      <section id='work' className='flex scroll-mt-28 flex-col gap-4'>
        <div className={sectionTitleBarStackClass}>
          <h2 className={sectionTitleClass}>WORK</h2>
          <div className='h-px w-full shrink-0 bg-neutral-600/50' aria-hidden />
        </div>
        <div className={workGridClass}>
          {workProjects.map(project => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => onSelectProject(project)}
              isCentered={animatingProject === project.title}
            />
          ))}
        </div>
      </section>
      <section id='play' className='flex scroll-mt-28 flex-col gap-4'>
        <div className={sectionTitleBarStackClass}>
          <h2 className={sectionTitleClass}>PLAY</h2>
          <div className='h-px w-full shrink-0 bg-neutral-600/50' aria-hidden />
        </div>
        <div className={playgroundGridClass}>
          {playgroundProjects.map(project => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => onSelectProject(project)}
              isCentered={animatingProject === project.title}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
