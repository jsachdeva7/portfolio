import deltaU from '@/assets/deltaU.jpg'
import puertoRico from '@/assets/puertoRico.jpg'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute bottom-0 left-0 flex flex-col gap-6'>
        <h1 className='font-primary mb-2 text-7xl'>Hi, I&apos;m Jagat.</h1>
        <p className='font-primary text-4xl'>
          I&apos;m a developer,{' '}
          <span className='text-neutral-400'>(aspiring)</span> designer, and
          damn proud <span className='text-yellow-100'>Yellow Jacket</span> 🐝
        </p>
      </div>
      <div className='absolute top-[-3em] right-0 p-16'>
        <div className='relative'>
          {/* Top/Back Image - puertoRico */}
          <div className='relative -rotate-3 transition-transform duration-500 hover:scale-105 hover:-rotate-6'>
            <Image
              src={puertoRico}
              alt='Puerto Rico'
              width={280}
              height={350}
              className='rounded-2xl shadow-2xl'
              priority
            />
          </div>
          {/* Bottom/Front Image - deltaU */}
          <div className='absolute -bottom-15 -left-30 rotate-3 transition-transform duration-500 hover:scale-105 hover:rotate-6'>
            <Image
              src={deltaU}
              alt='Delta U'
              width={220}
              height={280}
              className='rounded-2xl shadow-2xl'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
