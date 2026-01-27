
import { Card } from './ui/card'

const CardStasts = ({ title, value, icon }: { title: string, value: string, icon: string }) => {
    return (
        <Card className='rounded-sm'>
            <div className="flex items-start px-5 justify-between gap-y-2 min-w-[270px]">
                <div>
                    <h2 className="text-md text-gray-400 font-medium">{title}</h2>
                    <p className="text-black font-extrabold text-xl">{value}</p>
                </div>
                <img src={icon} alt="feature" className="size-8 object-contain bg-purple-300 rounded-md p-1" />
            </div>
        </Card>
    )
}

export default CardStasts