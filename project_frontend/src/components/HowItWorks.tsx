import { steps } from '../data/steps'

const HowItWorks = () => {
    return (
        <section className="min-h-screen w-full flex flex-col items-center gap-2 justify-start">
            <span className="text-sm text-gray-600 font-medium">
                Our Features
            </span>
            <h2 className="text-5xl font-bold">Everything you need to manage your projects</h2>
            <p className="text-lg text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                ut nisi euismod, aliquam magna eu, convallis nisl. Sed
            </p>
            <div className="flex items-center gap-x-20 mt-30">
                {
                    steps.map((feature, index) => (
                        <div key={index} className="flex flex-col gap-2 items-center justify-center text-center">
                            <img src={feature.image} alt="feature" className="w-16 h-16 object-contain bg-purple-300 rounded-full p-4" />
                            <h3 className="text-2xl font-bold">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default HowItWorks