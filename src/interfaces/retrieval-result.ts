export interface RetrievalResult {
    status: string;
    ranked_documents: string[];
    average_precision: number;
    total_retrieved: number;
    query_used: string;
}
