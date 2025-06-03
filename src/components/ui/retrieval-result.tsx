import { Separator } from "@/components/ui/separator";
import DocumentPreview from "./document-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Button } from "./button";
import { Pagination } from "./pagination";
import { useState } from "react";
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
import { SingleQueryResult } from "@/interfaces/retrieval-result";

export function RetrievalResult({
    result,
    loading,
}: {
    result: ResultType | null;
    loading: boolean;
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

    const expansion = result.expansion;
    const originalQuery = expansion?.original_query;
    const expandedTerms = expansion?.expanded_terms;
    const expansionTerms = expansion?.expansion_terms;

    const isInteractive = result.isInteractive || false;
    const retrievalResultOriginal = result.retrievalOriginal;
    const retrievalResultExpanded = result.retrievalExpanded;

    const queryWeightOriginal = result.queryWeightOriginal;
    const queryWeightExpanded = result.queryWeightExpanded;

    // batch query result
    const totalPages = isInteractive
        ? 0
        : retrievalResultOriginal?.total_queries;

    const documentsList = result.documents?.documents;
    const invertedFile = result.invertedFile?.inverted_file;

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
                            {expandedTerms?.join(" ")}
                        </span>
                    </p>
                    <Button
                        variant="link"
                        className="p-0 m-0 text-xs text-accent"
                        onClick={() => setShowQueryDetailsModal(true)}
                    >
                        View query details
                    </Button>
                </div>
                {!isInteractive && (
                    <div className="flex flex-col shrink-0 my-3 px-2 h-fit items-center text-foreground text-center content-center">
                        <p className="text-xs">MAP score</p>
                        <p className="text-base font-bold">
                            {retrievalResultOriginal?.mean_average_precision?.toFixed(
                                5
                            )}
                        </p>
                    </div>
                )}

                {!isInteractive && (
                    <div className="flex shrink-0 items-center gap-2 h-fit py-2 w-fit justify-end">
                        <Button
                            variant="ghost"
                            disabled={page === 0}
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        >
                            <ChevronLeft />
                        </Button>
                        <span className="text-sm text-foreground">
                            Query {page + 1} of {totalPages}
                        </span>
                        <Button
                            variant="ghost"
                            disabled={page === (totalPages ?? 0) - 1}
                            onClick={() =>
                                setPage((p) =>
                                    Math.min(p + 1, (totalPages ?? 0) - 1)
                                )
                            }
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
                            <div>
                                <DocumentPreview
                                    key={doc.id}
                                    i={doc.id}
                                    rank={index + 1}
                                    title={`Document ${doc.id}`}
                                    author={`Author ${doc.id}`}
                                    content={`This is a preview of the document content. It will truncate to a single line with ellipsis if it's too long lorem ipsum dolor sit amet lorem ipsum`}
                                    similarity={doc.similarity}
                                />
                                <Separator />
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* Tab: Expanded */}
                {isInteractive && (
                    <TabsContent value="expanded" className="mx-2">
                        <p className="text-sm text-[#8b8b8b] mb-4">
                            <strong>
                                {isInteractive &&
                                    retrievalResultExpanded?.total_retrieved}
                            </strong>{" "}
                            documents retrieved
                            {!isInteractive && (
                                <>
                                    {" "}
                                    • AP score:{" "}
                                    <strong>
                                        {isInteractive &&
                                            retrievalResultExpanded?.average_precision}
                                    </strong>
                                </>
                            )}
                        </p>

                        <div className="space-y-4">
                            {retrievalResultExpanded?.ranked_documents?.map(
                                (doc: SingleQueryResult, index: number) => (
                                    <div>
                                        <DocumentPreview
                                            key={doc.id}
                                            i={doc.id}
                                            rank={index + 1}
                                            title={`Document ${doc.id}`}
                                            author={`Author ${doc.id}`}
                                            content={`This is a preview of the document content. It will truncate to a single line with ellipsis if it's too long lorem ipsum dolor sit amet lorem ipsum`}
                                            similarity={doc.similarity}
                                        />
                                        <Separator />
                                    </div>
                                )
                            )}
                        </div>
                    </TabsContent>
                )}
            </Tabs>
            {showQueryDetailsModal && (
                <QueryDetailsModal
                    expansionTerms={expansionTerms}
                    setShowQueryDetailsModal={setShowQueryDetailsModal}
                    queryWeightOriginal={queryWeightOriginal?.query_vector}
                    queryWeightExpanded={queryWeightExpanded?.query_vector}
                />
            )}
            {showInvertedFileModal && (
                <InvertedFileModal
                    invertedFile={invertedFile}
                    documentsList={documentsList}
                    setShowInvertedFileModal={setShowInvertedFileModal}
                />
            )}
        </main>
    );
}
