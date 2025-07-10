type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  )
}

export default Modal
