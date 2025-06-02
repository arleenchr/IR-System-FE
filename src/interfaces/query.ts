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
