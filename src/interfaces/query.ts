import { WeightingMethod } from "./retrieval";

export interface ExpansionTerm {
    term: string;
    similarity: number;
}

export interface Expansion {
    status?: string;
    query_id?: string;
    original_query: string;
    original_terms: string[];
    expansion_terms: Record<string, ExpansionTerm[]>;
    expanded_terms: string[];
    total_original_terms: number;
    total_expanded_terms: number;
    parameters?: {
        threshold: number;
        limit: number;
    };
}

export interface ExpansionBatch {
    status: string;
    total_queries: number;
    query_results: Expansion[];
    parameters: {
        threshold: number;
        limit: number;
    };
    processing_info: {
        query_file_path: string;
        successful_expansions: number;
        failed_expansions: number;
    };
}

export interface QueryWeight {
    status: string;
    query: string;
    query_vector: Record<string, number>;
    total_terms: number;
    weighting_method: WeightingMethod;
    message: string;
}
