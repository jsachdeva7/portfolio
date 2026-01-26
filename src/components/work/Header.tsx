export default function Header() {
  const workExperience = [
    {
      year: '2025',
      company: 'Roboligent',
      position: 'Software Engineering + Product Intern'
    },
    { year: '2025', company: 'Soar', position: 'Founder & CREATE-X Fellow' },
    { year: '2024', company: 'Hack4Impact GT', position: 'Full Stack Engineer' }
  ]

  return (
    <div className='desktop:flex-row desktop:items-end desktop:gap-4 flex h-auto w-full flex-col gap-8'>
      <div className='desktop:w-1/2 desktop:pr-20 h-auto w-full'>
        <h1 className='font-primary desktop:text-4xl text-3xl leading-tight'>
          Formal work or a cheeky build, I obsess over the user, break things{' '}
          <span className='text-neutral-400'>(responsibly)</span>, and have the
          most fun watching pixels come to life.
        </h1>
      </div>
      <div className='h-auto w-auto pt-2'>
        <div className='font-secondary desktop:gap-x-14 desktop:text-base grid grid-cols-[auto_auto_auto] gap-x-6 gap-y-1 text-sm'>
          {workExperience.flatMap((work, index) => [
            <div
              key={`year-${index}`}
              className='font-tertiary text-neutral-400'
            >
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
    </div>
  )
}
