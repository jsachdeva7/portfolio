import Autonomous from './assets/Autonomous.svg'
import CheckIn from './assets/CheckIn.png'
import CheckInSquare from './assets/CheckInSquare.png'
import Gravity from './assets/Gravity.svg'
import RMS from './assets/RMS.svg'
import Robotech from './assets/Robotech.svg'
import Soar from './assets/Soar.png'
import Stanley from './assets/Stanley.png'
import StanleySquare from './assets/StanleySquare.png'
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
}

const thumbImgShadow = 'drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]'

/** Inset light glow on hover; drop-shadow stays on the img without hover scale to avoid filter glitches. */
const thumbFrameHoverGlow =
  'transition-shadow duration-300 ease-out group-hover:shadow-[inset_0_0_88px_rgba(255,255,255,0.12)]'

/** Overlay that renders the hover glow above a full-bleed image, where the container's own inset shadow would be hidden. */
const thumbHoverGlowOverlay =
  'pointer-events-none absolute inset-0 z-10 rounded-2xl transition-shadow duration-300 ease-out group-hover:shadow-[inset_0_0_88px_rgba(255,255,255,0.12)]'

function Thumbnail({ project }: ThumbnailProps) {
  const aspectClass =
    project.section === 'work'
      ? 'aspect-square tablet:aspect-800/520'
      : 'aspect-square'
  if (project.title === 'Talking Fingers') {
    return (
      <div
        className={`relative flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#e5ecf7]`}
      >
        <picture>
          <source media='(max-width: 767px)' srcSet={TF.src} />
          <img
            src={TFLandscape.src}
            alt='Talking Fingers'
            className={`${thumbImgShadow} h-auto w-full rounded-2xl`}
          />
        </picture>
        <div className={thumbHoverGlowOverlay} aria-hidden />
      </div>
    )
  }

  if (project.title === 'Stanley') {
    return (
      <div
        className={`relative flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#eae8f8]`}
      >
        <picture>
          <source media='(max-width: 767px)' srcSet={StanleySquare.src} />
          <img
            src={Stanley.src}
            alt='Stanley'
            className={`${thumbImgShadow} h-auto w-full rounded-2xl`}
          />
        </picture>
        <div className={thumbHoverGlowOverlay} aria-hidden />
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
          className={`${thumbImgShadow} h-auto w-full`}
        />
      </div>
    )
  }

  if (project.title === 'CheckIn') {
    return (
      <div
        className={`relative flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-2xl bg-[#452f21]`}
      >
        <picture>
          <source media='(max-width: 767px)' srcSet={CheckInSquare.src} />
          <img
            src={CheckIn.src}
            alt='CheckIn'
            className={`${thumbImgShadow} h-auto w-full rounded-2xl`}
          />
        </picture>
        <div className={thumbHoverGlowOverlay} aria-hidden />
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
          className={`${thumbImgShadow} h-full w-auto max-w-full object-contain`}
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
          className={`${thumbImgShadow} h-full w-auto max-w-full object-contain`}
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
          className={`${thumbImgShadow} h-auto w-full`}
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
          className={`${thumbImgShadow} h-auto w-full`}
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
          className={`${thumbImgShadow} h-auto w-full`}
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
          className={`${thumbImgShadow} h-auto w-full`}
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
          className={`${thumbImgShadow} h-auto w-full`}
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
    detail: 'Shipped 2026',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      "Sign language apps show you a clip to copy, then leave you guessing whether you got it right. {{Talking Fingers}} is a {{mobile app}} I built with GT iOS Club that uses {{computer vision}} to {{recognize your signs in real time}}, showing you exactly {{what you're getting right}}—and what to fix—as you go.",
    devSkills: ['Swift', 'SwiftUI', 'CoreML', 'OpenCV'],
    designSkills: [
      'Figma',
      'Low Fidelity Prototyping',
      'High Fidelity Prototyping',
      'Branding',
      'User Research',
      'Usability Testing'
    ],
    highlights: [
      '{{Camera-based feedback}} that checks your {{handshape and movement}} as you sign',
      'Lessons built around {{producing signs}}, not just {{multiple-choice recognition}}',
      'A {{guided path}} from your {{first signs}} to {{real conversation}}'
    ],
    section: 'work'
  },
  {
    title: 'Stanley',
    description: 'A full AI Content OS for creators',
    detail: 'Concept 2026',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      'Creators juggle their ideas, calendars, and publishing across a dozen disconnected tools. {{Stanley}} is a product by {{Stan}} that reimagines this as a single {{Content OS}}—where {{planning}}, {{creating}}, and {{shipping}} all live in one place. Working {{directly with the CTO}}, I helped do some of the {{concept design}}, exploring how creators could run their entire {{content workflow}} from one home.',
    devSkills: [],
    designSkills: ['Figma', 'Concept Design', 'Product Design', 'Prototyping'],
    highlights: [
      'A unified {{Content Calendar}} spanning {{drafts}}, {{scheduled}}, and {{published}} posts',
      'A {{Compose}} workspace that turns {{ideas}} into {{ready-to-ship content}}',
      '{{Insights}} and {{rituals}} that keep creators {{proactive}}, not reactive'
    ],
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
    section: 'playground'
  },
  {
    title: 'Allrecipes.com',
    description: 'Apply recipe tweaks like code diffs',
    detail: 'Concept 2026',
    thumbnail: 'https://via.placeholder.com/150',
    caption:
      'On Allrecipes, the best tips are buried in the reviews, disconnected from the recipe itself. This {{Figma concept}} reimagines that: apply a popular {{tweak}} and see it as a {{diff}} against the original recipe, then {{accept the changes}} you want with a tap.',
    devSkills: [],
    designSkills: ['Figma', 'Low Fidelity Prototyping', 'Rapid Prototyping'],
    highlights: [
      'Surface {{popular tweaks}} from the reviews {{right next to the recipe}}',
      'See each tweak as a {{clear diff}} you can {{accept or skip}}'
    ],
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
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className='group flex cursor-pointer flex-col gap-3' onClick={onClick}>
      <Thumbnail project={project} />
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
  const workGridClass = 'grid grid-cols-1 tablet:grid-cols-2 gap-6'
  const playgroundGridClass =
    'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'
  const sectionTitleClass =
    'font-primary text-2xl italic text-neutral-400 desktop:text-3xl'
  const sectionTitleBarStackClass = 'flex flex-col gap-[14px]'

  return (
    <div className='tablet:gap-16 flex flex-col gap-6'>
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
            />
          ))}
        </div>
      </section>
      <section id='play' className='flex scroll-mt-28 flex-col gap-4'>
        <div className={sectionTitleBarStackClass}>
          <h2 className={`${sectionTitleClass} text-left`}>PLAY</h2>
          <div className='h-px w-full shrink-0 bg-neutral-600/50' aria-hidden />
        </div>
        <div className={playgroundGridClass}>
          {playgroundProjects.map(project => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => onSelectProject(project)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
