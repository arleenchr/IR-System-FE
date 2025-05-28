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

const invertedFile = {
    to: {
        "1": 3.0,
        "2": 2.0,
    },
    do: {
        "1": 0.8300749985576875,
        "3": 1.072856372028895,
        "4": 1.072856372028895,
    },
    is: {
        "1": 4.0,
    },
    be: {
        "1": 0.0,
        "2": 0.0,
        "3": 0.0,
        "4": 0.0,
    },
};

export function RetrievalResult() {
    const [page, setPage] = useState(0);
    const [showInvertedFileModal, setShowInvertedFileModal] = useState(false);
    const [showQueryWeightsModal, setShowQueryWeightsModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState("all");

    const totalPages = mockResults.length;

    const result = mockResults[page];

    const documentOptions = [
        "all",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
    ];

    function formatStringJSON(
        data: Record<string, Record<string, number>>
    ): string {
        return (
            `{\n` +
            Object.entries(data)
                .map(
                    ([term, docs]) =>
                        `    ${term}: {\n` +
                        Object.entries(docs)
                            .map(
                                ([doc, value]) =>
                                    `        "${doc}": ${value.toFixed(1)},`
                            )
                            .join("\n") +
                        `\n    },`
                )
                .join("\n") +
            `\n}`
        );
    }

    return (
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <div className="flex flex-row mb-1">
                <div className="flex-1 mb-4 mr-8 justify-start">
                    <h2 className="text-2xl font-semibold mb-2">
                        Results for{" "}
                        <span className="font-bold text-2xl bg-gradient-to-r from-[#9EA3F7] to-[#4AFCED] bg-clip-text text-transparent">
                            {result.original}
                        </span>
                    </h2>
                    <p className="text-base text-[#8b8b8b]">
                        Expanded query:{" "}
                        <span className="text-[#BFBFC5]">
                            {result.expanded}
                        </span>
                    </p>
                    <Button
                        variant="link"
                        className="p-0 m-0 text-xs text-accent"
                        onClick={() => setShowQueryWeightsModal(true)}
                    >
                        View query weights
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
            {showQueryWeightsModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    onClick={() => setShowQueryWeightsModal(false)}
                >
                    <Card
                        className="w-full max-w-2xl p-6 flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-4 w-full">
                            <div className="flex justify-between items-center">
                                <p className="text-lg py-1 font-semibold">
                                    Original query weights
                                </p>
                            </div>
                            <ScrollArea className="overflow-y-auto max-h-100 border p-2 rounded-md bg-sidebar">
                                <pre className="text-sm whitespace-pre-wrap font-mono">
                                    {formatStringJSON(invertedFile)}
                                </pre>
                            </ScrollArea>
                        </div>
                        <div className="space-y-4 w-full">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">
                                    Expanded query weights
                                </p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent"
                                    onClick={() =>
                                        setShowQueryWeightsModal(false)
                                    }
                                >
                                    ✕
                                </Button>
                            </div>
                            <ScrollArea className="overflow-y-auto max-h-100 border p-2 rounded-md bg-sidebar">
                                <pre className="text-sm whitespace-pre-wrap font-mono">
                                    {formatStringJSON(invertedFile)}
                                </pre>
                            </ScrollArea>
                        </div>
                    </Card>
                </div>
            )}
            {showInvertedFileModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    onClick={() => setShowInvertedFileModal(false)}
                >
                    <Card
                        className="w-full max-w-lg p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">
                                    Inverted File
                                </p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent"
                                    onClick={() =>
                                        setShowInvertedFileModal(false)
                                    }
                                >
                                    ✕
                                </Button>
                            </div>
                            <Select
                                value={selectedDoc}
                                onValueChange={setSelectedDoc}
                            >
                                <SelectTrigger className="w-full flex-grow bg-background text-foreground cursor-pointer">
                                    <SelectValue placeholder="Select document" />
                                </SelectTrigger>
                                <SelectContent className="bg-background text-white max-h-64">
                                    {documentOptions.map((doc) => (
                                        <SelectItem
                                            key={doc}
                                            value={doc}
                                            className="cursor-pointer"
                                        >
                                            {doc === "all"
                                                ? "All Documents"
                                                : `Document ${doc}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <ScrollArea className="overflow-y-auto max-h-100 border p-2 rounded-md bg-sidebar">
                                <pre className="text-sm whitespace-pre-wrap font-mono">
                                    {formatStringJSON(invertedFile)}
                                </pre>
                            </ScrollArea>
                        </div>
                    </Card>
                </div>
            )}
        </main>
    );
}
