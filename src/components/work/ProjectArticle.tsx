import { LuArrowLeft } from 'react-icons/lu'
import ProjectArticleHeader from './ProjectArticleHeader'
import type { Project } from './Projects'

interface ProjectArticleProps {
  project: Project
  onBack: () => void
}

export default function ProjectArticle({
  project,
  onBack
}: ProjectArticleProps) {
  return (
    <div className='flex flex-col gap-16'>
      <button
        onClick={onBack}
        className='font-tertiary fixed top-20 left-8 z-40 flex items-center gap-2 text-neutral-400 uppercase transition-colors hover:text-white'
      >
        <LuArrowLeft />
        Back
      </button>
      <div className='mx-auto flex w-[680px] flex-col gap-16'>
        <ProjectArticleHeader
          description={project.description}
          thumbnail={project.thumbnail}
          caption={project.caption}
          highlights={project.highlights}
          designSkills={project.designSkills}
          devSkills={project.devSkills}
        />
        {/* Future article content goes here */}
      </div>
    </div>
  )
}
