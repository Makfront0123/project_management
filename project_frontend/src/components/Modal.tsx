import React, { useEffect } from "react"
import ReactDOM from "react-dom"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  showCloseButton?: boolean
  footer?: React.ReactNode
  className?: string
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  footer,
  className = "",
}: ModalProps) => {
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
    }

    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  // Portal root
  const modalRoot = document.getElementById("modal-root") || document.body

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative animate-fadeIn ${className}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
            aria-label="Cerrar"
          >
            ✕
          </button>
        )}

        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}

        <div className="mb-4">{children}</div>

        {footer && <div className="pt-4 border-t">{footer}</div>}
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
