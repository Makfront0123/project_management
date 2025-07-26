export interface Tag {
    _id: string;
    name: string;
    teamId: string;
}

export interface TagModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
    initialName: string;
}

export interface TagListProps {
    tags: Tag[];
    onRemoveTag?: (tagId: string) => Promise<void>;
    onEditTag?: (tag: Tag) => void;
}

export type TagFormValues = {
    name: string;
};