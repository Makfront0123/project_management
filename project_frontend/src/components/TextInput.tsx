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
    <div className="flex flex-col gap-y-1">
      <label htmlFor={name} className={`text-sm font-medium ${labelColor}`}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-[20px] p-3 md:w-[30rem] w-[25rem] ${textColor}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
