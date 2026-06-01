'use client'

import Home from '@/components/home/Home'
import ProjectArticle from '@/components/work/ProjectArticle'
import Projects, { type Project } from '@/components/work/Projects'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const scrollPositionRef = useRef<number>(0)

  const handleSelectProject = useCallback((project: Project) => {
    scrollPositionRef.current = window.scrollY
    setSelectedProject(project)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' })
      })
    }
  }, [selectedProject])

  return (
    <main className='flex w-full flex-col gap-6 tablet:gap-16'>
      {selectedProject ? (
        <div className='p-6 tablet:p-16'>
          <ProjectArticle
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        </div>
      ) : (
        <>
          <section id='about' className='w-full scroll-mt-28'>
            <Home />
          </section>
          <section className='px-6 pb-6 tablet:px-16 tablet:pb-16'>
            <Projects onSelectProject={handleSelectProject} />
          </section>
        </>
      )}
    </main>
  )
}
