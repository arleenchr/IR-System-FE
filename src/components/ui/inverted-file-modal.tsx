
import { Button } from "./button";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";
import { formatStringJSON } from "@/utils/format-json";
import { useState } from "react";
import { Document } from "@/interfaces/documents";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

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
    documentsList: any;
    setShowInvertedFileModal: (showInvertedFileModal: boolean) => void;
}) {
    const [selectedDoc, setSelectedDoc] = useState("all");

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
                                    value={doc.label}
                                    className="cursor-pointer"
                                >
                                    {doc.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <ScrollArea className="overflow-y-auto max-h-128 border p-2 rounded-md bg-sidebar">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                            {formatStringJSON(invertedFile).slice(0, 10000) + '...\n(Truncated)'}
                        </pre>
                    </ScrollArea>
                </div>
            </Card>
        </div>
    );
}
