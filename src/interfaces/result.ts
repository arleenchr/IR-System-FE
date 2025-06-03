import { Documents } from "./documents";
import { Expansion } from "./query";
import { InvertedFile } from "./retrieval";
import { RetrievalResult } from "./retrieval-result";

export interface ResultType {
    documents?: Documents;
    invertedFile?: InvertedFile;
    expansion?: Expansion;
    isInteractive: boolean;
    retrievalOriginal?: RetrievalResult;
    retrievalExpanded?: RetrievalResult;
    error?: string;
}
