export interface WeightingMethod {
    tf_raw: boolean;
    tf_log: boolean;
    tf_binary: boolean;
    tf_augmented: boolean;
    use_idf: boolean;
    use_normalization: boolean;
}

export interface InvertedFile {
    status: string;
    total_documents: number;
    total_terms: number;
    inverted_file: Record<string, Record<string, number>>;
    parameters: {
        use_stemming: boolean;
        use_stopword_removal: boolean;
        document_weighting_method: WeightingMethod;
    };
    cached: boolean;
    cached_info: string;
}
