import { useState } from "react"

export const useEmojiPicker = (value: string, onChange: (value: string) => void) => {

    const [open, setOpen] = useState(false)

    const toggle = () => setOpen((prev) => !prev)

    const close = () => setOpen(false)

    const addEmoji = (emoji: string) => {
        onChange(value + emoji)
        close()
    }

    return {
        open,
        toggle,
        close,
        addEmoji
    }
}