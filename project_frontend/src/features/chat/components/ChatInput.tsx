import { Icon } from "@iconify/react";

type Props = {
    value: string
    error?: string
    isSubmitting: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
}

const ChatInput = ({
    value,
    error,
    isSubmitting,
    onChange,
    onSubmit
}: Props) => {

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">

            <div className="flex items-center justify-between p-2 rounded-l bg-gray-100 text-gray-800">
                <input
                    value={value}
                    onChange={onChange}
                    className="w-full border-none"
                    placeholder="Mensaje para el equipo..."
                    disabled={isSubmitting}

                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white  mx-3 rounded-md overflow-hidden"
                    disabled={isSubmitting}
                >
                    <Icon icon="ic:round-send" className="size-10 p-2 hover:bg-blue-600" />
                </button>

            </div>

            {error && (
                <span className="text-red-500 text-sm">
                    {error}
                </span>
            )}

        </form>
    )
}

export default ChatInput