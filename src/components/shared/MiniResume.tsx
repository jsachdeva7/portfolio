export interface WorkExperience {
  year: string
  company: string
  position: string
}

export const workExperience: WorkExperience[] = [
  {
    year: 'CURR',
    company: 'Companyon Ventures',
    position: 'Software Engineer Intern'
  },
  {
    year: 'CURR',
    company: 'GT iOS Club',
    position: 'Design Engineer'
  },
  {
    year: '2025',
    company: 'Roboligent',
    position: 'Software Engineer Intern'
  },
  { year: '2025', company: 'Soar', position: 'Founder & CREATE-X Fellow' }
]

interface MiniResumeProps {
  className?: string
  experiences?: WorkExperience[]
}

const typography = 'font-secondary text-sm desktop:text-base'

export default function MiniResume({
  className = '',
  experiences = workExperience
}: MiniResumeProps) {
  return (
    <div className={`w-fit max-w-full ${typography} ${className}`}>
      <div className='tablet:hidden flex flex-col gap-4'>
        {experiences.map((work, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <div className='flex gap-4'>
              <span className='font-tertiary w-10 shrink-0 text-neutral-400'>
                {work.year}
              </span>
              <span className='text-white'>{work.company}</span>
            </div>
            <p className='pl-14 text-neutral-400'>{work.position}</p>
          </div>
        ))}
      </div>

      <div className='tablet:grid desktop:gap-x-8 hidden w-fit max-w-full grid-cols-[2.5rem_auto_auto] gap-x-4 gap-y-1'>
        {experiences.flatMap((work, index) => [
          <div key={`year-${index}`} className='font-tertiary text-neutral-400'>
            {work.year}
          </div>,
          <div key={`company-${index}`} className='text-white'>
            {work.company}
          </div>,
          <div key={`position-${index}`} className='text-neutral-400'>
            {work.position}
          </div>
        ])}
      </div>
    </div>
  )
}
