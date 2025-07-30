import type { TagListProps } from "../../types/tag";



const TagList = ({ tags, onRemoveTag, onEditTag }: TagListProps) => {
    return (
        <div className="flex flex-wrap gap-2 mt-10">
            {tags.map((tag) => (
                <span
                    key={tag._id}
                    className="bg-gray-200 text-sm text-gray-800 px-4 py-1 rounded-full flex items-center gap-2 cursor-pointer"
                    onClick={() => onEditTag?.(tag)}
                >
                    {tag.name}
                    {onRemoveTag && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveTag(tag._id);
                            }}
                            className="text-red-500 font-bold"
                        >
                            ×
                        </button>
                    )}
                    {onEditTag && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditTag(tag);
                            }}
                            className="text-blue-500 font-bold"
                        >
                            Edit
                        </button>
                    )}
                </span>
            ))}
        </div>
    );
};
export default TagList;
