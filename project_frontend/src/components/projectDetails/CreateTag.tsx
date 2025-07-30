
import { useParams } from "react-router";
import { useForm } from "../../hooks/useForm";
import useTagStore from "../../stores/tag_store";
import type { TagFormValues } from "../../types/tag";




const CreateTag = () => {
    const { teamId } = useParams();
    const { createTag } = useTagStore();
    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues,
    } = useForm<TagFormValues>({
        initialValues: { name: "" },
        validate: (values: TagFormValues) => {
            const errors: Partial<Record<keyof TagFormValues, string>> = {};
            if (!values.name.trim()) {
                errors.name = "Name is required";
            }
            return errors;
        },
        onSubmit: async (values) => {
            await createTag(values.name, teamId ?? '');
            setValues({ name: "" });
        },
    });

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 w-72"
        >
            <h3 className="text-lg font-semibold">Create Tag</h3>
            <input
                type="text"
                name="name"
                placeholder="Name of the tag"
                value={values.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-1"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white py-1 rounded hover:bg-green-700 transition"
            >
                {isSubmitting ? "Create..." : "Create Tag"}
            </button>
        </form>
    );
};

export default CreateTag;
