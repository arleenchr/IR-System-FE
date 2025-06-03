export interface BatchQueryResult {
    query_index: number;
    average_precision: number;
    total_retrieved: number;
    top_documents: string[];
}

export interface BatchProcessingInfo {
    query_file_path: string;
    total_relevant_queries: number;
    weighting_method: Record<string, boolean>;
    cache_terms_count: number;
}

export interface RetrievalResult {
    status: string;
    // interactive query
    ranked_documents?: string[];
    average_precision?: number;
    total_retrieved?: number;
    query_used?: string;
    // batch query
    total_queries?: number;
    query_results?: BatchQueryResult[];
    mean_average_precision?: number;
    processing_info?: BatchProcessingInfo;
}
