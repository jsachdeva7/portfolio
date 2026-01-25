import Image, { type StaticImageData } from 'next/image'
import Autonomous from './assets/Autonomous.svg'
import CheckIn from './assets/CheckIn.png'
import Gravity from './assets/Gravity.svg'
import RMS from './assets/RMS.svg'
import Robotech from './assets/Robotech.svg'
import Soar from './assets/Soar.png'
import Stylistic from './assets/Stylistic.png'
import Tmp from './assets/Tmp.svg'

interface ProjectArticleHeaderProps {
  title: string
  description: string
  caption: string
  highlights: string[]
  designSkills: string[]
  devSkills: string[]
}

function renderHighlightedText(text: string) {
  const parts = text.split(/(\{\{.*?\}\})/g)
  return parts.map((part, index) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      return (
        <span key={index} className='text-white'>
          {part.slice(2, -2)}
        </span>
      )
    }
    return part
  })
}

const thumbnailConfig: Record<
  string,
  { bg: string; src: StaticImageData; alt: string; style: 'full' | 'padded' }
> = {
  Roboligent: {
    bg: 'bg-[#0b2e5b]',
    src: RMS,
    alt: 'Robot Management System',
    style: 'full'
  },
  CheckIn: {
    bg: 'bg-[#452f21]',
    src: CheckIn,
    alt: 'CheckIn',
    style: 'padded'
  },
  Stylistic: {
    bg: 'bg-[#1c4a34]',
    src: Stylistic,
    alt: 'Stylistic',
    style: 'padded'
  },
  Soar: { bg: 'bg-[#333333]', src: Soar, alt: 'Soar', style: 'padded' },
  '/tmp': { bg: 'bg-[#1d2c49]', src: Tmp, alt: '/tmp', style: 'full' },
  'Gravity Visualizer': {
    bg: 'bg-[#333333]',
    src: Gravity,
    alt: 'Gravity Visualizer',
    style: 'full'
  },
  'Autonomous Car': {
    bg: 'bg-[#39332d]',
    src: Autonomous,
    alt: 'Autonomous Car',
    style: 'full'
  },
  'Resistor Sorter': {
    bg: 'bg-[#242b42]',
    src: Robotech,
    alt: 'Resistor Sorter',
    style: 'full'
  }
}

function ArticleThumbnail({ title }: { title: string }) {
  const config = thumbnailConfig[title]

  if (!config) {
    return <div className='mb-5 aspect-800/520 w-full bg-neutral-800' />
  }

  const baseContainerClasses = `mb-5 flex aspect-800/520 w-full items-center justify-center overflow-hidden ${config.bg}`
  const containerClasses =
    config.style === 'padded'
      ? `${baseContainerClasses} p-12`
      : baseContainerClasses

  const imgClasses =
    config.style === 'padded'
      ? 'h-full w-auto max-w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]'
      : 'h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]'

  return (
    <div className={`${containerClasses} relative`}>
      <Image
        src={config.src}
        alt={config.alt}
        fill
        className={imgClasses}
        style={{ objectFit: config.style === 'padded' ? 'contain' : 'cover' }}
      />
    </div>
  )
}

export default function ProjectArticleHeader({
  title,
  description,
  caption,
  highlights,
  designSkills,
  devSkills
}: ProjectArticleHeaderProps) {
  return (
    <div className='flex flex-col'>
      {/* Title */}
      <h1 className='font-primary mb-5 text-4xl text-white'>{description}</h1>

      {/* Thumbnail */}
      <ArticleThumbnail title={title} />

      {/* Caption */}
      <div className='font-secondary mb-14 text-lg text-neutral-400'>
        {renderHighlightedText(caption)}
      </div>

      {/* Highlights and Skills */}
      <div className='grid grid-cols-2 gap-16'>
        {/* Highlights Section */}
        <div className='flex flex-col gap-4'>
          <h2 className='font-tertiary text-neutral-400 uppercase'>
            Highlights
          </h2>
          <ul className='flex flex-col gap-2'>
            {highlights.map((item, index) => (
              <li
                key={index}
                className='font-secondary flex items-start gap-2 text-sm text-neutral-400'
              >
                <span className='mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white' />
                <span>{renderHighlightedText(item)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills Section */}
        <div className='flex flex-col gap-4'>
          <h2 className='font-tertiary text-neutral-400 uppercase'>Skills</h2>
          <div className='flex flex-col gap-4'>
            {/* Design Skills */}
            {designSkills.length > 0 && (
              <div className='grid grid-cols-[100px_1fr] gap-4'>
                <span className='font-secondary text-sm text-neutral-400'>
                  Design
                </span>
                <span className='font-secondary text-sm text-white'>
                  {designSkills.map((skill, index) => (
                    <span key={index}>
                      {index > 0 && (
                        <span className='text-neutral-400'>, </span>
                      )}
                      {skill}
                    </span>
                  ))}
                </span>
              </div>
            )}
            {/* Development Skills */}
            <div className='grid grid-cols-[100px_1fr] gap-4'>
              <span className='font-secondary text-sm text-neutral-400'>
                Development
              </span>
              <span className='font-secondary text-sm text-white'>
                {devSkills.map((skill, index) => (
                  <span key={index}>
                    {index > 0 && <span className='text-neutral-400'>, </span>}
                    {skill}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
