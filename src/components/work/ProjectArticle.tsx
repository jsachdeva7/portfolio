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
    <div className='desktop:gap-16 flex flex-col gap-8'>
      <button
        onClick={onBack}
        className='font-tertiary desktop:fixed desktop:top-20 desktop:left-8 desktop:z-40 flex items-center gap-2 text-neutral-400 uppercase transition-colors hover:text-white'
      >
        <LuArrowLeft />
        Back
      </button>
      <div className='desktop:w-[680px] desktop:gap-16 mx-auto flex w-full flex-col gap-8'>
        <ProjectArticleHeader
          title={project.title}
          description={project.description}
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
