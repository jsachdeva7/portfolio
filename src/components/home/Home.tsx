import Image from 'next/image'
import deltaU from './assets/deltaU.jpg'
import puertoRico from './assets/puertoRico.jpg'

export default function Home() {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute bottom-0 left-0 flex w-1/2 flex-col gap-6'>
        <h1 className='font-primary mb-2 text-7xl'>Hey, I&apos;m Jagat.</h1>
        <p className='font-primary text-3xl'>
          I&apos;m a full stack developer, aspiring designer, and proud GT
          Yellow Jacket!
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
              className='rounded-2xl shadow-2xl saturate-[0.6] hover:saturate-[1]'
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
              className='rounded-2xl shadow-2xl saturate-[0.6] hover:saturate-[1]'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
