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
    <main className='flex w-full flex-col gap-24'>
      {selectedProject ? (
        <ProjectArticle
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      ) : (
        <>
          <section id='about' className='w-full scroll-mt-28'>
            <Home />
          </section>
          <section className='desktop:pt-0 pt-10'>
            <Projects onSelectProject={handleSelectProject} />
          </section>
        </>
      )}
    </main>
  )
}
