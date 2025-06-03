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

export interface DocumentDetails {
    id: string;
    title: string;
    author: string;
    content: string;
    bibliographic: string;
}

export interface RetrievedDocumentDetails {
    status: string;
    total_requested: number;
    total_found: number;
    documents: DocumentDetails[];
    not_found_ids: string[];
    message: string;
}
