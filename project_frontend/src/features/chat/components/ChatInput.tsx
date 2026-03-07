import ImageUploader from "@/shared/components/ImageUploader";
import { Icon } from "@iconify/react";
import { useEmojiPicker } from "../hooks/useEmojiPicker";
import EmojiPickerComponent from "./EmojiPickerComponent";

type Props = {
    value: string
    error?: string
    isSubmitting: boolean
    file: File | null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
    onFileChange: (file: File | null) => void
}

const ChatInput = ({
    value,
    file,
    error,
    isSubmitting,
    onChange,
    onFileChange,
    onSubmit
}: Props) => {
    const { open, toggle, addEmoji } = useEmojiPicker(
        value,
        (val) => onChange({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>)
    )

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">

            <div className="flex items-center gap-2">
                {open && (
                    <EmojiPickerComponent
                        onSelect={addEmoji}
                    />
                )}
                <div className="flex items-center flex-1 p-2 rounded bg-gray-100 dark:bg-[#171717]">
                    <input
                        value={value}
                        onChange={onChange}
                        className="w-full border-none dark:text-gray-200 text-black bg-transparent"
                        placeholder="Mensaje para el equipo..."
                        disabled={isSubmitting}
                    />
                    <button
                        type="button"
                        onClick={toggle}
                        className="px-1"
                    >
                        <Icon icon="mdi:emoji-outline" className="size-8 p-1 text-gray-700 hover:opacity-70 duration-400" />
                    </button>
                    <ImageUploader
                        value={file}
                        onChange={onFileChange}
                        icon="mdi:paperclip"
                        className="size-10 border-none"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 dark:bg-gray-700 hover:opacity-70 duration-400 text-white mx-2 rounded-md"
                    >
                        <Icon icon="ic:round-send" className="size-8 p-1" />
                    </button>


                </div>
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