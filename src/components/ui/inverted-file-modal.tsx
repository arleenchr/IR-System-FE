import { Button } from "./button";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";
import { formatStringJSON } from "@/utils/format-json";
import { useEffect, useState } from "react";
import { Document, DocumentWeights } from "@/interfaces/documents";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import api from "@/lib/api";

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

export function InvertedFileModal({
    invertedFile,
    documentsList,
    setShowInvertedFileModal,
}: {
    invertedFile: any;
    documentsList: Document[];
    setShowInvertedFileModal: (showInvertedFileModal: boolean) => void;
}) {
    const [selectedDoc, setSelectedDoc] = useState("all");
    const [documentWeights, setDocumentWeights] =
        useState<DocumentWeights | null>(null);
    const [loadingDocWeights, setLoadingDocWeights] = useState(false);

    useEffect(() => {
        if (selectedDoc === "all") {
            setDocumentWeights(null);
            return;
        }
        setLoadingDocWeights(true);
        api.get(`/retrieval/document-weights/${selectedDoc}`)
            .then((res) => setDocumentWeights(res.data))
            .catch((err) => console.error("Failed to fetch doc weights", err))
            .finally(() => setLoadingDocWeights(false));
    }, [selectedDoc]);

    return (
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
                        <p className="text-lg font-semibold">Inverted File</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-transparent"
                            onClick={() => setShowInvertedFileModal(false)}
                        >
                            ✕
                        </Button>
                    </div>
                    <Select value={selectedDoc} onValueChange={setSelectedDoc}>
                        <SelectTrigger className="w-full flex-grow bg-background text-foreground cursor-pointer">
                            <SelectValue placeholder="Select document" />
                        </SelectTrigger>
                        <SelectContent className="bg-background text-white max-h-100">
                            <SelectItem
                                key="all"
                                value="all"
                                className="cursor-pointer"
                            >
                                All Documents
                            </SelectItem>
                            {documentsList.map((doc: Document) => (
                                <SelectItem
                                    key={doc.id}
                                    value={doc.id}
                                    className="cursor-pointer"
                                >
                                    {doc.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <ScrollArea className="overflow-y-auto h-128 border p-2 rounded-md bg-sidebar">
                        {loadingDocWeights ? (
                            <p className="text-sm">
                                Loading document weights...
                            </p>
                        ) : (
                            <pre className="text-sm whitespace-pre-wrap font-mono">
                                {selectedDoc === "all"
                                    ? formatStringJSON(invertedFile).slice(
                                          0,
                                          10000
                                      ) + "...\n(Truncated)"
                                    : JSON.stringify(
                                          documentWeights?.weights,
                                          null,
                                          2
                                      )}
                            </pre>
                        )}
                    </ScrollArea>
                </div>
            </Card>
        </div>
    );
}
