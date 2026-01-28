"use client"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

export function ProgressContainer({ progress = 66 }: { progress?: number }) {
    return (
        <Field className="w-full min-w-[77vh]">
            <FieldLabel htmlFor="progress-upload">
                <span className="text-gray-400">Upload progress</span>
                <span className="ml-auto">{progress}%</span>
            </FieldLabel>
            <Progress value={progress} id="progress-upload" />
        </Field>
    )
}
