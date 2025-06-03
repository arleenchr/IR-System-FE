import { Documents } from "./documents";
import { Expansion, QueryWeight } from "./query";
import { InvertedFile } from "./retrieval";
import { RetrievalResult } from "./retrieval-result";

export interface ResultType {
    documents?: Documents;
    invertedFile?: InvertedFile;
    expansion?: Expansion;
    isInteractive: boolean;
    retrievalOriginal?: RetrievalResult;
    retrievalExpanded?: RetrievalResult;
    queryWeightOriginal?: QueryWeight;
    queryWeightExpanded?: QueryWeight;
    error?: string;
}
