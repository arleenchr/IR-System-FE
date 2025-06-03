import { WeightingMethod } from "./retrieval";

export interface SingleQueryResult {
    id: string;
    similarity: number;
}

export interface BatchQueryResult {
    query_index: number;
    query: string;
    average_precision: number;
    total_retrieved: number;
    relevant_judgement: string[];
    top_documents: SingleQueryResult[];
}

export interface BatchProcessingInfo {
    query_file_path: string;
    total_relevant_queries: number;
    weighting_method: WeightingMethod;
    cache_terms_count: number;
}

export interface RetrievalResult {
    status: string;
    // interactive query
    ranked_documents?: SingleQueryResult[];
    average_precision?: number;
    total_retrieved?: number;
    query_used?: string;
    // batch query
    total_queries?: number;
    query_results?: BatchQueryResult[];
    mean_average_precision?: number;
    processing_info?: BatchProcessingInfo;
}
