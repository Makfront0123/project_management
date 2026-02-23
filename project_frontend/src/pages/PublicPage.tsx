
import { Link } from "react-router"
import Features from "../shared/components/Features"
import Footer from "../shared/layout/Footer"
import Hero from "../shared/components/Hero"
import HowItWorks from "../shared/components/HowItWorks"
import { icons } from "../shared/constants/icons"
import { ModeToggle } from "@/shared/components/ModeToggle"


const PublicPage = () => {
    return (
        <>
            <div className="flex flex-col mx-auto max-w-6xl">
                <header className=" w-full py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={icons.logo} alt="logo" className="h-8 object-contain"
                        />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Team Flow
                        </h1>
                    </div>
                    <div className="flex items-center gap-x-6">
                        <div className="flex items-center gap-6">
                            <Link to="/login" className="text-black dark:text-white font-medium px-4 py-2 rounded-md cursor-pointer hover:opacity-80 transition-all">
                                Log In
                            </Link>
                            <Link to="/register" className="bg-[#4e38f5] text-white px-8 py-2 rounded-xl cursor-pointer hover:scale-105 transition-all">
                                Get Started
                            </Link>
                        </div>
                        <ModeToggle />
                    </div>
                </header>
                <Hero />
                <Features />
                <HowItWorks />

            </div>
            <Footer />
        </>
    )
}

export default PublicPage