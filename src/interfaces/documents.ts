export interface Document {
    id: string;
    label: string;
}

export interface Documents {
    status: string;
    total_documents: number;
    documents: Document[];
}

export interface DocumentWeights {
    status: string;
    document_id: string;
    weights: Record<string, number>;
    total_terms: number;
    message: string;
}
