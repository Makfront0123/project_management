export const generateAvatar = (name: string) => {
    const colors = [
        "ef4444",
        "f97316",
        "eab308",
        "22c55e",
        "06b6d4",
        "3b82f6",
        "8b5cf6",
        "ec4899",
    ]

    const hash = name
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const background = colors[hash % colors.length]

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
    )}&background=${background}&color=fff&size=256`
}