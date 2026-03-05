"use client"
import { Field, FieldLabel } from "@/shared/components/ui/field"
import { Progress } from "@/shared/components/ui/progress"

export function ProgressContainer({ progress = 0 }: { progress?: number }) {
    return (
        <Field className="w-full max-w-[77vh]">
            <FieldLabel htmlFor="progress-upload">
                <span className="text-gray-400">Upload progress</span>
                <span className="ml-auto">{progress}%</span>
            </FieldLabel>
            <Progress value={progress} id="progress-upload" />
        </Field>
    )
}
