export interface WorkExperience {
  year: string
  company: string
  position: string
}

export const workExperience: WorkExperience[] = [
  {
    year: '2026',
    company: 'Companyon Ventures',
    position: 'Software Engineer Intern'
  },
  {
    year: '2026',
    company: 'GT iOS Club',
    position: 'Design Engineer'
  },
  {
    year: '2025',
    company: 'Roboligent',
    position: 'Software Engineer Intern'
  },
  { year: '2025', company: 'Soar', position: 'Founder & CREATE-X Fellow' },
]

interface MiniResumeProps {
  className?: string
  experiences?: WorkExperience[]
}

export default function MiniResume({
  className = '',
  experiences = workExperience
}: MiniResumeProps) {
  return (
    <div
      className={`font-secondary desktop:text-base grid w-fit max-w-full grid-cols-[2.5rem_auto_auto] gap-x-4 gap-y-1 text-sm desktop:gap-x-8 ${className}`}
    >
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
  )
}
