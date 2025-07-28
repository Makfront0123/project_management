type TextInputProps = {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  error?: string
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
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={name} className="text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-[20px] p-3 w-[30rem] text-white"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
