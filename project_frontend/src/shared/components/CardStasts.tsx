import type { ReactNode } from 'react';
import { Card } from './ui/card';


interface CardStatsProps {
    title: string;
    value: string | number;
    icon?: string;        // opcional
    rightContent?: ReactNode; // opcional (más flexible)
}

const CardStats = ({
    title,
    value,
    icon,
    rightContent,
}: CardStatsProps) => {
    return (
        <Card className="rounded-sm">
            <div className="flex items-start px-5 justify-between gap-y-2 min-w-[270px]">

                {/* Left */}
                <div>
                    <h2 className="text-md text-gray-400 font-medium">
                        {title}
                    </h2>

                    <p className="text-black font-extrabold text-xl">
                        {value}
                    </p>
                </div>

                {/* Right */}
                <div>
                    {icon && (
                        <img
                            src={icon}
                            alt={title}
                            className="size-8 object-contain bg-purple-300 rounded-md p-1"
                        />
                    )}

                    {rightContent && rightContent}
                </div>

            </div>
        </Card>
    );
};

export default CardStats;
