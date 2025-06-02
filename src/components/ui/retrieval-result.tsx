import { Separator } from "@/components/ui/separator";
import DocumentPreview from "./document-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Button } from "./button";
import { Pagination } from "./pagination";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@deemlol/next-icons";
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

const mockResults = [
    {
        original:
            "Original query 1 lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
        expanded:
            "Expanded query 1 lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
        documents: Array(5).fill(null),
    },
    {
        original: "Original query 2",
        expanded: "Expanded query 2",
        documents: Array(5).fill(null),
    },
    {
        original: "Original query 3",
        expanded: "Expanded query 3",
        documents: Array(5).fill(null),
    },
];

export function RetrievalResult({ result }: { result: any }) {
    if (!result) return <div></div>;

    const [page, setPage] = useState(0);
    const [showInvertedFileModal, setShowInvertedFileModal] = useState(false);
    const [showQueryDetailsModal, setShowQueryDetailsModal] = useState(false);

    const totalPages = mockResults.length;

    const expansion = result.expansion;
    const originalQuery = expansion.original_query;
    const expandedTerms = expansion.expanded_terms;
    const expansionTerms = expansion.expansion_terms;

    const documentsList = result.documents.documents;
    const invertedFile = result.invertedFile.inverted_file;

    const mockResult = mockResults[page];

    return (
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <div className="flex flex-row mb-1">
                <div className="flex-1 mb-4 mr-8 justify-start">
                    <h2 className="text-2xl font-semibold mb-2">
                        Results for{" "}
                        <span className="font-bold text-2xl bg-gradient-to-r from-[#9EA3F7] to-[#4AFCED] bg-clip-text text-transparent">
                            {originalQuery}
                        </span>
                    </h2>
                    <p className="text-base text-[#8b8b8b]">
                        Expanded query terms:{" "}
                        <span className="text-[#BFBFC5]">
                            {expandedTerms.join(" ")}
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
                <div className="flex flex-col shrink-0 my-3 px-2 h-fit items-center text-foreground text-center content-center">
                    <p className="text-xs">MAP score</p>
                    <p className="text-base font-bold">0.XX</p>
                </div>

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
                        disabled={page === totalPages - 1}
                        onClick={() =>
                            setPage((p) => Math.min(p + 1, totalPages - 1))
                        }
                    >
                        <ChevronRight />
                    </Button>
                </div>
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
                        5 documents retrieved • AP score: <strong>0.73</strong>
                    </p>

                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div>
                                <DocumentPreview
                                    key={i}
                                    i={i + 1}
                                    title={`Document Title ${
                                        i + 1
                                    } Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Long Title`}
                                    author={`Author ${i + 1}`}
                                    content={`This is a preview of the document content. It will truncate to a single line with ellipsis if it's too long lorem ipsum dolor sit amet lorem ipsum`}
                                    similarity={0.95}
                                />
                                <Separator />
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* Tab: Expanded */}
                <TabsContent value="expanded" className="mx-2">
                    <p className="text-sm text-[#8b8b8b] mb-4">
                        5 documents retrieved • AP score: <strong>0.73</strong>
                    </p>

                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div>
                                <DocumentPreview
                                    key={i}
                                    i={i + 1}
                                    title={`Document Title ${
                                        i + 1
                                    } Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Long Title`}
                                    author={`Author ${i + 1}`}
                                    content={`This is a preview of the document content. It will truncate to a single line with ellipsis if it's too long lorem ipsum dolor sit amet lorem ipsum`}
                                    similarity={0.95}
                                />
                                <Separator />
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
            {showQueryDetailsModal && (
                <QueryDetailsModal expansionTerms={expansionTerms} setShowQueryDetailsModal={setShowQueryDetailsModal} />
            )}
            {showInvertedFileModal && (
                <InvertedFileModal invertedFile={invertedFile} documentsList={documentsList} setShowInvertedFileModal={setShowInvertedFileModal} />
            )}
        </main>
    );
}
