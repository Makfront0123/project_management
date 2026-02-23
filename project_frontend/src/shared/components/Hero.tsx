import { images } from '../constants/images'

const Hero = () => {
    return (
        <div className="min-h-screen flex items-center justify-center gap-x-10 w-full">
            <div className="flex flex-col">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-5">
                    Manage Your <strong className="text-[#4e38f5]">Projects</strong>. Empower Your Team.
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Team Flow is a strong management tool that helps you
                    organize your projects, tasks, and team members in one
                    place. With Team Flow.
                </p>
            </div>
            <div className='flex overflow-hidden max-w-[60vh] object-cover rounded-lg shadow-sm'>
                <img src={images.hero} alt="user" className="hover:scale-105 duration-300" />
            </div>
        </div>
    )
}

export default Hero