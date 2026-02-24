import { useEffect, useState } from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/shared/lib/utils"

type ImageUploaderProps = {
    value: File | null
    onChange: (file: File | null) => void
    error?: string
    label?: string
    className?: string
}

const ImageUploader = ({
    value,
    onChange,
    error,
    label = "Upload image",
    className,
}: ImageUploaderProps) => {
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        if (!value) {
            setPreview(null)
            return
        }

        const objectUrl = URL.createObjectURL(value)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [value])

    return (
        <div className="flex flex-col items-center gap-3">
            <label
                className={cn(
                    "relative size-24 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer transition hover:border-primary overflow-hidden",
                    error && "border-red-500",
                    className
                )}
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                onChange(null)
                            }}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black"
                        >
                            <X size={14} />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <Upload size={20} />
                        <span className="text-xs">{label}</span>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null
                        onChange(file)
                    }}
                />
            </label>

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

export default ImageUploader