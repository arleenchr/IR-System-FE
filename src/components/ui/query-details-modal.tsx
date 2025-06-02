import { Button } from "./button";
import { Card } from "./card";
import { ScrollArea } from "./scroll-area";

export function QueryDetailsModal({
    expansionTerms,
    setShowQueryDetailsModal,
}: {
    expansionTerms: any;
    setShowQueryDetailsModal: (showQueryDetailsModal: boolean) => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setShowQueryDetailsModal(false)}
        >
            <Card
                className="w-full max-w-4xl p-6 flex-row"
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
                            sample
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
                            onClick={() => setShowQueryDetailsModal(false)}
                        >
                            ✕
                        </Button>
                    </div>
                    <ScrollArea className="overflow-y-auto max-h-100 border p-2 rounded-md bg-sidebar">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                            *to be edited with actual weights, not similarity
                            <br></br>
                            {JSON.stringify(expansionTerms, null, 2)}
                        </pre>
                    </ScrollArea>
                </div>
            </Card>
        </div>
    );
}
