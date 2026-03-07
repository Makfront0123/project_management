import EmojiPicker from "emoji-picker-react"

type Props = {
  onSelect: (emoji: string) => void
}

const EmojiPickerComponent = ({ onSelect }: Props) => {

  const handleEmojiClick = (emojiData: any) => {
    onSelect(emojiData.emoji)
  }

  return (
    <div className="absolute bottom-14 right-0 z-50">
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        theme="dark"
      />
    </div>
  )
}

export default EmojiPickerComponent