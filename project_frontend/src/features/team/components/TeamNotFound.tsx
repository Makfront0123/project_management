import { Button } from "@/shared/components/ui/button"
import { icons } from "@/shared/constants/icons"

interface TeamNotFoundProp {
    onCreate: () => void
}

export function TeamNotFound({ onCreate }: TeamNotFoundProp) {
    return (
        <div className="flex flex-col items-center gap-3 bg-gray-50 rounded-sm p-10 mx-10 min-h-[40vh]">
            <img src={icons.sidebar01} alt="No workspace" />

            <span className="text-lg font-medium">
                No workspace found
            </span>

            <p className="text-gray-500">
                Create a new workspace to get started
            </p>

            <Button
                onClick={onCreate}
                className="cursor-pointer flex items-center gap-2"
            >
                <img
                    src={icons.add}
                    alt="Add"
                    className="w-4 h-4"
                />
                Create new team
            </Button>
        </div>
    )
}