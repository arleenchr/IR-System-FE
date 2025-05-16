export function RetrievalResult() {
    return (
        <main className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">
                Results for <span>Query</span>
            </h2>

            {/* Add components for: results table, expanded query, MAP score, inverted file, etc. */}
            <p className="text-gray-500">
                Your results will appear here after running the retrieval.
            </p>
        </main>
    );
}
