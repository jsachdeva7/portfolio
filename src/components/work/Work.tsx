'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import ProjectArticle from './ProjectArticle'
import Projects, { type Project } from './Projects'

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const scrollPositionRef = useRef<number>(0)

  const handleSelectProject = useCallback((project: Project) => {
    // Save current scroll position before navigating to project
    scrollPositionRef.current = window.scrollY
    setSelectedProject(project)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      // Scroll to top when project is selected
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      // Restore scroll position when going back, after render completes
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' })
      })
    }
  }, [selectedProject])

  return (
    <div className='flex h-full w-full flex-col gap-16'>
      {!selectedProject && <Header />}
      {selectedProject ? (
        <ProjectArticle
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      ) : (
        <Projects onSelectProject={handleSelectProject} />
      )}
    </div>
  )
}
