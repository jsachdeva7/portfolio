interface ProjectArticleHeaderProps {
  description: string
  thumbnail: string
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

export default function ProjectArticleHeader({
  description,
  thumbnail,
  highlights,
  designSkills,
  devSkills
}: ProjectArticleHeaderProps) {
  return (
    <div className='flex flex-col'>
      {/* Title */}
      <h1 className='font-primary mb-5 text-4xl text-white'>{description}</h1>

      {/* Thumbnail */}
      <div className='mb-5 aspect-[800/520] w-full bg-neutral-800' />

      {/* Caption */}
      <div className='font-secondary mb-14 text-neutral-400'>
        Lorem ipsum dolor sit amet,{' '}
        <span className='text-white'>consectetur adipiscing</span> elit. Sed do
        eiusmod tempor incididunt ut{' '}
        <span className='text-white'>labore et dolore</span> magna aliqua.
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
            <div className='grid grid-cols-[100px_1fr] gap-4'>
              <span className='font-secondary text-sm text-neutral-400'>
                Design
              </span>
              <span className='font-secondary text-sm text-white'>
                {designSkills.map((skill, index) => (
                  <span key={index}>
                    {index > 0 && <span className='text-neutral-400'>, </span>}
                    {skill}
                  </span>
                ))}
              </span>
            </div>
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
