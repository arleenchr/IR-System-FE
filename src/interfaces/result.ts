import { Documents } from "./documents";
import { Expansion } from "./query";
import { InvertedFile } from "./retrieval";

export interface ResultType {
    documents?: Documents;
    invertedFile?: InvertedFile;
    expansion?: Expansion;
    retrieval?: any;
    error?: string;
}
