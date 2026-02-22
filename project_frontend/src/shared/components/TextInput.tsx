type TextInputProps = {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  error?: string
  labelColor?: string
  textColor?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  labelColor,
  textColor
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label
        htmlFor={name}
        className={`text-sm font-medium ${labelColor ?? "text-gray-700"}`}
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full
          border
          border-gray-300
          rounded-xl
          px-4
          py-2.5
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500/30
          focus:border-blue-500
          transition
          ${textColor ?? ""}
        `}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  )
}