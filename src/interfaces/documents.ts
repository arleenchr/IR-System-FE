export interface Document {
    id: string;
    label: string;
}

export interface Documents {
    status: string;
    total_documents: number;
    documents: Document[];
}
