export interface ExpansionTerm {
    term: string;
    similarity: number;
}

export interface Expansion {
    status: string;
    original_query: string;
    original_terms: string[];
    expansion_terms: Record<string, ExpansionTerm[]>;
    expanded_terms: string[];
    total_original_terms: number;
    total_expanded_terms: number;
    parameters: {
        threshold: number;
        limit: number;
    };
}

export interface QueryWeight {
    status: string;
    query: string;
    query_vector: Record<string, number>;
    total_terms: number;
    weighting_method: {
        tf_raw: boolean;
        tf_log: boolean;
        tf_binary: boolean;
        tf_augmented: boolean;
        use_idf: boolean;
        use_normalization: boolean;
    };
    message: string;
}
