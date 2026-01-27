import { images } from '../core/images'

const Hero = () => {
    return (
        <div className="min-h-screen flex items-center justify-center gap-x-10 w-full">
            <div className="flex flex-col">
                <h1 className="text-5xl text-black font-bold mb-5">
                    Manage Your <strong className="text-[#4e38f5]">Projects</strong>. Empower Your Team.
                </h1>
                <p className="text-gray-400 ">
                    Team Flow is a strong management tool that helps you
                    organize your projects, tasks, and team members in one
                    place. With Team Flow.
                </p>
            </div>
            <img src={images.hero} alt="user" className="w-1/2 object-contain" />
        </div>
    )
}

export default Hero