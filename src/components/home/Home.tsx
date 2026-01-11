export default function Home() {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute bottom-0 left-0 flex flex-col gap-6 p-16'>
        <h1 className='font-primary mb-2 text-8xl'>Hi, I&apos;m Jagat.</h1>
        <p className='font-primary text-4xl'>
          I&apos;m a developer,{' '}
          <span className='text-neutral-400'>(aspiring)</span> designer, and{' '}
          <span className='italic'>proud</span> Yellow Jacket 🐝
        </p>
      </div>
    </div>
  )
}
