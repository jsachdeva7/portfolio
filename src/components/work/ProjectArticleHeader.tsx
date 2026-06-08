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
  {
    bg: string
    src: string
    mobileSrc?: string
    alt: string
    style: 'full' | 'padded'
  }
> = {
  'Talking Fingers': {
    bg: 'bg-[#e5ecf7]',
    src: TFLandscape.src,
    mobileSrc: TF.src,
    alt: 'Talking Fingers',
    style: 'full'
  },
  Stanley: {
    bg: 'bg-[#eae8f8]',
    src: Stanley.src,
    mobileSrc: StanleySquare.src,
    alt: 'Stanley',
    style: 'full'
  },
  Roboligent: {
    bg: 'bg-[#0b2e5b]',
    src: RMS.src,
    alt: 'Robot Management System',
    style: 'full'
  },
  CheckIn: {
    bg: 'bg-[#452f21]',
    src: CheckIn.src,
    mobileSrc: CheckInSquare.src,
    alt: 'CheckIn',
    style: 'full'
  },
  Stylistic: {
    bg: 'bg-[#1c4a34]',
    src: Stylistic.src,
    alt: 'Stylistic',
    style: 'padded'
  },
  Soar: { bg: 'bg-[#333333]', src: Soar.src, alt: 'Soar', style: 'padded' },
  '/tmp': { bg: 'bg-[#1d2c49]', src: Tmp.src, alt: '/tmp', style: 'full' },
  'Gravity Visualizer': {
    bg: 'bg-[#333333]',
    src: Gravity.src,
    alt: 'Gravity Visualizer',
    style: 'full'
  },
  'Autonomous Car': {
    bg: 'bg-[#39332d]',
    src: Autonomous.src,
    alt: 'Autonomous Car',
    style: 'full'
  },
  'Resistor Sorter': {
    bg: 'bg-[#242b42]',
    src: Robotech.src,
    alt: 'Resistor Sorter',
    style: 'full'
  },
  'Allrecipes.com': {
    bg: 'bg-[#964D36]',
    src: Allrecipes.src,
    alt: 'Allrecipes',
    style: 'full'
  }
}

function ArticleThumbnail({ title }: { title: string }) {
  const config = thumbnailConfig[title]

  if (!config) {
    return (
      <div className='tablet:aspect-800/520 mb-5 aspect-square w-full rounded-2xl bg-neutral-800' />
    )
  }

  const baseContainerClasses = `mb-5 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl tablet:aspect-800/520 ${config.bg} transition-shadow duration-300 ease-out hover:shadow-[inset_0_0_88px_rgba(255,255,255,0.12)]`
  const containerClasses =
    config.style === 'padded'
      ? `${baseContainerClasses} p-6 tablet:p-12`
      : baseContainerClasses

  const imgClasses =
    config.style === 'padded'
      ? 'h-full w-auto max-w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]'
      : 'h-auto w-full rounded-2xl drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]'

  return (
    <div className={containerClasses}>
      {config.mobileSrc ? (
        <picture>
          <source media='(max-width: 767px)' srcSet={config.mobileSrc} />
          <img src={config.src} alt={config.alt} className={imgClasses} />
        </picture>
      ) : (
        <img src={config.src} alt={config.alt} className={imgClasses} />
      )}
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
      <h1 className='font-primary tablet:mb-5 tablet:text-4xl mb-3 text-3xl text-white'>
        {description}
      </h1>

      {/* Thumbnail */}
      <ArticleThumbnail title={title} />

      {/* Caption */}
      <div className='font-secondary tablet:mb-14 tablet:text-md mb-8 text-base leading-relaxed text-neutral-400'>
        {renderHighlightedText(caption)}
      </div>

      {/* Highlights and Skills */}
      <div className='tablet:grid tablet:grid-cols-2 tablet:gap-16 flex flex-col gap-8'>
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
            {/* Mobile: Stacked with headings */}
            <div className='tablet:hidden flex flex-col gap-3'>
              {/* Design Skills */}
              {designSkills.length > 0 && (
                <div className='flex flex-col gap-2'>
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
              <div className='flex flex-col gap-2'>
                <span className='font-secondary text-sm text-neutral-400'>
                  Development
                </span>
                <span className='font-secondary text-sm text-white'>
                  {devSkills.map((skill, index) => (
                    <span key={index}>
                      {index > 0 && (
                        <span className='text-neutral-400'>, </span>
                      )}
                      {skill}
                    </span>
                  ))}
                </span>
              </div>
            </div>
            {/* Desktop: Grid layout */}
            <div className='tablet:flex hidden flex-col gap-4'>
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
                      {index > 0 && (
                        <span className='text-neutral-400'>, </span>
                      )}
                      {skill}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
