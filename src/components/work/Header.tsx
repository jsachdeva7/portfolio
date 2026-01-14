export default function Header() {
  const workExperience = [
    {
      year: '2025',
      company: 'Roboligent',
      position: 'Software Engineer Intern'
    },
    { year: '2025', company: 'Soar', position: 'Founder & CREATE-X Fellow' },
    { year: '2024', company: 'Hack4Impact GT', position: 'Full Stack Engineer' }
  ]

  return (
    <div className='flex h-auto w-full flex-row items-start'>
      <div className='h-auto w-1/2 pr-20'>
        <h1 className='font-primary text-4xl'>
          Formal work or a cheeky build, I obsess over the user, break things{' '}
          <span className='text-neutral-400'>(responsibly)</span>, and have the
          most fun watching pixels come to life.
        </h1>
      </div>
      <div className='h-auto w-auto pt-2 pl-20'>
        <div className='font-secondary grid grid-cols-[auto_auto_auto] gap-x-12 gap-y-1'>
          {workExperience.flatMap((work, index) => [
            <div key={`year-${index}`} className='text-neutral-400'>
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
