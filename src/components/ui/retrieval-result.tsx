import { Separator } from "@/components/ui/separator";
import DocumentPreview from "./document-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Button } from "./button";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "@deemlol/next-icons";
import { Card } from "./card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import { ScrollArea } from "./scroll-area";
import { InvertedFileModal } from "./inverted-file-modal";
import { QueryDetailsModal } from "./query-details-modal";
import { ResultType } from "@/interfaces/result";
import {
    RetrievalResult as RetrievalResultType,
    SingleQueryResult,
} from "@/interfaces/retrieval-result";
import { WeightingMethod } from "@/interfaces/retrieval";
import api from "@/lib/api";
import { ExpansionTerm, QueryWeight } from "@/interfaces/query";
import { RetrievedDocumentDetails } from "@/interfaces/documents";

export function RetrievalResult({
    result,
    loading,
    docWeightingMethod,
    queryWeightingMethod,
}: {
    result: ResultType | null;
    loading: boolean;
    docWeightingMethod: WeightingMethod | null;
    queryWeightingMethod: WeightingMethod | null;
}) {
    if (loading) {
        return (
            <main className="flex-1 flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin" />
                    <p className="text-lg text-gray-600">Loading...</p>
                </div>
            </main>
        );
    }
    if (!result)
        return (
            <main className="flex-1 flex items-center justify-center h-full">
                <Search size={128} color="#9EA3F7" />
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#9EA3F7] to-[#4AFCED] bg-clip-text text-transparent">
                    Information Retrieval
                </h1>
            </main>
        );

    const [page, setPage] = useState(0);
    const [showInvertedFileModal, setShowInvertedFileModal] = useState(false);
    const [showQueryDetailsModal, setShowQueryDetailsModal] = useState(false);

    const [queryWeightOriginal, setQueryWeightOriginal] =
        useState<QueryWeight | null>(null);
    const [queryWeightExpanded, setQueryWeightExpanded] =
        useState<QueryWeight | null>(null);
    const [queryExpansionTerms, setQueryExpansionTerms] = useState<Record<
        string,
        ExpansionTerm[]
    > | null>(null);

    const [retrievalResultExpanded, setRetrievalResultExpanded] =
        useState<RetrievalResultType | null>(result.retrievalExpanded ?? null);

    const [
        retrievedDocumentDetailsOriginal,
        setRetrievedDocumentDetailsOriginal,
    ] = useState<RetrievedDocumentDetails | null>(null);
    const [
        retrievedDocumentDetailsExpanded,
        setRetrievedDocumentDetailsExpanded,
    ] = useState<RetrievedDocumentDetails | null>(null);

    const expansion = result.expansion;
    const originalQuery = expansion?.original_query;
    const expandedTerms = expansion?.expanded_terms;
    const expansionTerms = expansion?.expansion_terms;

    const expansionBatch = result.expansionBatch;

    const isInteractive = result.isInteractive || false;
    const retrievalResultOriginal = result.retrievalOriginal;

    // batch query result
    const totalPages = isInteractive
        ? 0
        : retrievalResultOriginal?.total_queries;

    const documentsList = result.documents?.documents;
    const invertedFile = result.invertedFile?.inverted_file;

    const handleViewQueryDetail = async (
        query: string,
        expandedQuery: string
    ) => {
        try {
            const promises = [];
            // Query weights
            promises.push(
                api
                    .post("/retrieval/calculate-query-weight", {
                        query: query,
                        weighting_method: queryWeightingMethod,
                    })
                    .then((res) => setQueryWeightOriginal(res.data))
            );
            promises.push(
                api
                    .post("/retrieval/calculate-query-weight", {
                        query: expandedQuery,
                        weighting_method: queryWeightingMethod,
                    })
                    .then((res) => setQueryWeightExpanded(res.data))
            );
            await Promise.all(promises);
        } catch (error) {
            console.error("Error fetching query weights", error);
        }
    };

    const retrieveExpandedBatchQuery = async (
        query: string,
        relevant_doc: string[]
    ) => {
        try {
            const promises = [];
            promises.push(
                api
                    .post("/retrieval/retrieve", {
                        relevant_doc: relevant_doc,
                        query: query,
                        weighting_method: docWeightingMethod,
                    })
                    .then((res) => {
                        setRetrievalResultExpanded(res.data);
                        console.log(
                            "retrievalResultExpanded",
                            retrievalResultExpanded
                        );
                    })
            );
        } catch (error) {
            console.error(
                "Error fetching retrieval for expanded batch query",
                error
            );
        }
    };

    const getDocumentDetails = async (
        idsOriginal: string[],
        idsExpanded: string[]
    ) => {
        try {
            const promises = [];
            promises.push(
                api
                    .post("/documents/retrieve-by-ids", {
                        ids: idsOriginal,
                    })
                    .then((res) => {
                        setRetrievedDocumentDetailsOriginal(res.data);
                        console.log("GET DOC DETAILS ORIGINAL", res.data);
                    })
            );
            promises.push(
                api
                    .post("/documents/retrieve-by-ids", {
                        ids: idsExpanded,
                    })
                    .then((res) => {
                        setRetrievedDocumentDetailsExpanded(res.data);
                        console.log("GET DOC DETAILS EXPANDED", res.data);
                    })
            );
            // console.log(
            //     "GET DOC DETAILS ORIGINAL",
            //     retrievedDocumentDetailsOriginal
            // );
            // console.log(
            //     "GET DOC DETAILS EXPANDED",
            //     retrievedDocumentDetailsExpanded
            // );

            await Promise.all(promises);
        } catch (error) {
            console.error("Failed to fetch document details", error);
        }
    };

    useEffect(() => {
        if (isInteractive) {
            retrieveExpandedBatchQuery(expandedTerms?.join(" ") ?? "", []);
            setQueryExpansionTerms(expansionTerms ?? {});
        } else if (expansionBatch?.query_results?.[page]?.expanded_terms) {
            retrieveExpandedBatchQuery(
                expansionBatch.query_results[page].expanded_terms.join(" "),
                retrievalResultOriginal?.query_results?.[page]
                    .relevant_judgement ?? []
            );
            setQueryExpansionTerms(
                expansionBatch.query_results[page].expansion_terms
            );
        }
    }, [page, expansionBatch]);

    useEffect(() => {
        if (!retrievalResultOriginal) return;

        const idsOriginal = isInteractive
            ? retrievalResultOriginal?.ranked_documents?.map((doc) => doc.id) ??
              []
            : retrievalResultOriginal?.query_results?.[
                  page
              ]?.top_documents?.map((doc) => doc.id) ?? [];

        const idsExpanded =
            retrievalResultExpanded?.ranked_documents?.map((doc) => doc.id) ??
            [];

        getDocumentDetails(idsOriginal, idsExpanded);

        console.log("idsOriginal", idsOriginal);
        console.log("idsExpanded", idsExpanded);
        console.log(
            "retrievedDocumentDetailsOriginal",
            retrievedDocumentDetailsOriginal
        );
        console.log(
            "retrievedDocumentDetailsExpanded",
            retrievedDocumentDetailsExpanded
        );
    }, [retrievalResultOriginal, retrievalResultExpanded, page]);

    return (
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <div className="flex flex-row mb-1">
                <div className="flex-1 mb-4 mr-8 justify-start">
                    <h2 className="text-2xl font-semibold mb-2">
                        Results for{" "}
                        <span className="font-bold text-2xl bg-gradient-to-r from-[#9EA3F7] to-[#4AFCED] bg-clip-text text-transparent">
                            {isInteractive
                                ? originalQuery
                                : retrievalResultOriginal?.query_results?.[page]
                                      ?.query}
                        </span>
                    </h2>
                    <p className="text-base text-[#8b8b8b]">
                        Expanded query terms:{" "}
                        <span className="text-[#BFBFC5]">
                            {isInteractive
                                ? expandedTerms?.join(" ")
                                : expansionBatch?.query_results?.[
                                      page
                                  ].expanded_terms.join(" ")}
                        </span>
                    </p>
                    <Button
                        variant="link"
                        className="p-0 m-0 text-xs text-accent"
                        onClick={() => {
                            try {
                                handleViewQueryDetail(
                                    (isInteractive
                                        ? retrievalResultOriginal?.query_used
                                        : retrievalResultOriginal
                                              ?.query_results?.[page]?.query) ??
                                        "",
                                    retrievalResultExpanded?.query_used ?? ""
                                );
                            } catch (error) {
                                console.error(
                                    "Error fetching query weights",
                                    error
                                );
                            } finally {
                                setShowQueryDetailsModal(true);
                            }
                        }}
                    >
                        View query details
                    </Button>
                </div>
                {!isInteractive && (
                    <div className="flex flex-col shrink-0 my-3 px-2 h-fit items-center text-foreground text-center content-center">
                        <p className="text-xs">MAP score</p>
                        {/* <p className="text-xs">original query</p> */}
                        <p className="text-base font-bold">
                            {retrievalResultOriginal?.mean_average_precision?.toFixed(
                                5
                            )}
                        </p>
                        {/* <p className="text-xs">expanded query</p>
                        <p className="text-base font-bold">
                            {retrievalResultExpanded?.mean_average_precision?.toFixed(
                                5
                            )}
                        </p> */}
                    </div>
                )}

                {!isInteractive && (
                    <div className="flex shrink-0 items-center gap-2 h-fit py-2 w-fit justify-end">
                        <Button
                            variant="ghost"
                            disabled={page === 0}
                            onClick={() => {
                                setPage((p) => Math.max(p - 1, 0));
                                // retrieveExpandedBatchQuery(
                                //     expansionBatch?.query_results?.[
                                //         page
                                //     ].expanded_terms.join(" ") || ""
                                // );
                            }}
                        >
                            <ChevronLeft />
                        </Button>
                        <span className="text-sm text-foreground">
                            Query {page + 1} of {totalPages}
                        </span>
                        <Button
                            variant="ghost"
                            disabled={page === (totalPages ?? 0) - 1}
                            onClick={() => {
                                setPage((p) =>
                                    Math.min(p + 1, (totalPages ?? 0) - 1)
                                );
                                // retrieveExpandedBatchQuery(
                                //     expansionBatch?.query_results?.[
                                //         page
                                //     ].expanded_terms.join(" ") || ""
                                // );
                            }}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                )}
            </div>

            <Tabs defaultValue="original" className="w-full">
                <div className="flex flex-row gap-4">
                    <TabsList className="mb-4 flex-grow">
                        <TabsTrigger value="original">
                            Original Query Result
                        </TabsTrigger>
                        <TabsTrigger value="expanded">
                            Expanded Query Result
                        </TabsTrigger>
                    </TabsList>

                    <Button
                        onClick={(event) => {
                            setShowInvertedFileModal(true);
                        }}
                    >
                        Inverted File
                    </Button>
                </div>

                {/* Tab: Original */}
                <TabsContent value="original" className="mx-2">
                    <p className="text-sm text-[#8b8b8b] mb-4">
                        <strong>
                            {isInteractive
                                ? retrievalResultOriginal?.total_retrieved
                                : retrievalResultOriginal?.query_results?.[page]
                                      ?.total_retrieved}
                        </strong>{" "}
                        documents retrieved
                        {!isInteractive && (
                            <>
                                {" "}
                                • AP score:{" "}
                                <strong>
                                    {isInteractive
                                        ? retrievalResultOriginal?.average_precision?.toFixed(
                                              5
                                          )
                                        : retrievalResultOriginal?.query_results?.[
                                              page
                                          ]?.average_precision.toFixed(5)}
                                </strong>
                            </>
                        )}
                    </p>

                    <div className="space-y-4">
                        {(isInteractive
                            ? retrievalResultOriginal?.ranked_documents
                            : retrievalResultOriginal?.query_results?.[page]
                                  ?.top_documents
                        )?.map((doc: SingleQueryResult, index: number) => (
                            <div key={doc.id}>
                                <DocumentPreview
                                    id={doc.id}
                                    rank={index + 1}
                                    title={
                                        retrievedDocumentDetailsOriginal
                                            ?.documents?.[index]?.title ??
                                        `Document ${doc.id}`
                                    }
                                    author={
                                        retrievedDocumentDetailsOriginal
                                            ?.documents?.[index]?.author ??
                                        `Author ${doc.id}`
                                    }
                                    content={
                                        retrievedDocumentDetailsOriginal
                                            ?.documents?.[index]?.content ?? ""
                                    }
                                    bibliographic={
                                        retrievedDocumentDetailsOriginal
                                            ?.documents?.[index]
                                            ?.bibliographic ?? ""
                                    }
                                    similarity={doc.similarity}
                                />
                                <Separator />
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* Tab: Expanded */}
                <TabsContent value="expanded" className="mx-2">
                    <p className="text-sm text-[#8b8b8b] mb-4">
                        <strong>
                            {retrievalResultExpanded?.total_retrieved}
                        </strong>{" "}
                        documents retrieved
                        {!isInteractive && (
                            <>
                                {" "}
                                • AP score:{" "}
                                <strong>
                                    {retrievalResultExpanded?.average_precision?.toFixed(
                                        5
                                    )}
                                </strong>
                            </>
                        )}
                    </p>

                    <div className="space-y-4">
                        {retrievalResultExpanded?.ranked_documents?.map(
                            (doc: SingleQueryResult, index: number) => (
                                <div key={doc.id}>
                                    <DocumentPreview
                                        id={doc.id}
                                        rank={index + 1}
                                        title={
                                            retrievedDocumentDetailsExpanded
                                                ?.documents?.[index]?.title ??
                                            `Document ${doc.id}`
                                        }
                                        author={
                                            retrievedDocumentDetailsExpanded
                                                ?.documents?.[index]?.author ??
                                            `Author ${doc.id}`
                                        }
                                        content={
                                            retrievedDocumentDetailsExpanded
                                                ?.documents?.[index]?.content ??
                                            ""
                                        }
                                        bibliographic={
                                            retrievedDocumentDetailsExpanded
                                                ?.documents?.[index]
                                                ?.bibliographic ?? ""
                                        }
                                        similarity={doc.similarity}
                                    />
                                    <Separator />
                                </div>
                            )
                        )}
                    </div>
                </TabsContent>
            </Tabs>
            {showQueryDetailsModal && (
                <QueryDetailsModal
                    expansionTerms={expansionTerms}
                    setShowQueryDetailsModal={setShowQueryDetailsModal}
                    queryWeightOriginal={queryWeightOriginal?.query_vector}
                    queryWeightExpanded={queryWeightExpanded?.query_vector}
                    queryExpansionTerms={queryExpansionTerms ?? {}}
                />
            )}
            {showInvertedFileModal && (
                <InvertedFileModal
                    invertedFile={invertedFile}
                    documentsList={documentsList ?? []}
                    setShowInvertedFileModal={setShowInvertedFileModal}
                />
            )}
        </main>
    );
}
