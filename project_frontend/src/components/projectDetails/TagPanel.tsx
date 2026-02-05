import type { Tag } from "@/types/tag";

interface Props {
    tags: Tag[];
    onCreate: () => void;
    onDelete?: (id: string) => void;
}

const TagPanel = ({
    tags,
    onCreate,
    onDelete,
}: Props) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">

            <div className="flex justify-between mb-3">
                <h3 className="font-semibold">Etiquetas</h3>

                <button
                    onClick={onCreate}
                    className="text-sm text-blue-600"
                >
                    + Agregar
                </button>
            </div>

            <div className="flex flex-wrap gap-2">

                {tags.map((tag) => (
                    <div
                        key={tag._id}
                        className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded"
                    >
                        <span>{tag.name}</span>

                        {onDelete && (
                            <button
                                onClick={() => onDelete(tag._id)}
                                className="text-red-500 text-xs"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}

            </div>

        </div>
    );
};

export default TagPanel;
