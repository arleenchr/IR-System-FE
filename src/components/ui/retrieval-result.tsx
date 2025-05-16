import { Separator } from "@/components/ui/separator";
import DocumentPreview from "./document-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export function RetrievalResult() {
    const invertedFile = `"information": [1, 3, 5]
"retrieval": [2, 4]
"model": [1, 2, 3]
...`;

    return (
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">
                    Results for{" "}
                    <span className="font-bold text-2xl bg-gradient-to-r from-[#9EA3F7] to-[#4AFCED] bg-clip-text text-transparent">
                        Query as in original query
                    </span>
                </h2>
                <p className="text-base text-[#8b8b8b]">
                    Expanded query:{" "}
                    <span className="text-[#BFBFC5]">
                        Query after query expansion goes here
                    </span>
                </p>
            </div>

            <Tabs defaultValue="original" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="original">
                        Original Query Result
                    </TabsTrigger>
                    <TabsTrigger value="expanded">
                        Expanded Query Result
                    </TabsTrigger>
                    <TabsTrigger value="inverted">Inverted File</TabsTrigger>
                </TabsList>

                {/* Tab: Original */}
                <TabsContent value="original" className="mx-2">
                    <p className="text-sm text-[#8b8b8b] mb-4">
                        5 documents retrieved • MAP score: <strong>0.73</strong>
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
                        5 documents retrieved • MAP score: <strong>0.73</strong>
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

                {/* Tab: Inverted File */}
                <TabsContent value="inverted" className="mx-2">
                    <h2 className="text-xl font-semibold mb-2">
                        Inverted File
                    </h2>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                        {invertedFile}
                    </pre>
                </TabsContent>
            </Tabs>
        </main>
    );
}
