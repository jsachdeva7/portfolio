'use client'

import { useState } from 'react'
import Header from './Header'
import ProjectArticle from './ProjectArticle'
import Projects, { type Project } from './Projects'

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className='flex h-full w-full flex-col gap-16'>
      {!selectedProject && <Header />}
      {selectedProject ? (
        <ProjectArticle
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      ) : (
        <Projects onSelectProject={setSelectedProject} />
      )}
    </div>
  )
}
