import { Documents } from "./documents";
import { Expansion, ExpansionBatch } from "./query";
import { InvertedFile } from "./retrieval";
import { RetrievalResult } from "./retrieval-result";

export interface ResultType {
    documents?: Documents;
    invertedFile?: InvertedFile;
    expansion?: Expansion;
    expansionBatch?: ExpansionBatch;
    isInteractive: boolean;
    retrievalOriginal?: RetrievalResult;
    retrievalExpanded?: RetrievalResult;
    error?: string;
}
