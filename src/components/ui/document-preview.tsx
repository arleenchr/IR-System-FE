export default function DocumentPreview({
    id,
    rank,
    title,
    author,
    content,
    bibliographic,
    similarity,
}: {
    id: string;
    rank: number;
    title: string;
    author: string;
    content: string;
    bibliographic: string;
    similarity: number;
}) {
    return (
        <div className="flex flex-row gap-20 mb-6 w-full max-w-full">
            <div className="flex flex-grow flex-col min-w-0">
                <p className="flex flex-row gap-1.5 text-xs text-accent/70">
                    Document ID: <strong>{id}</strong>
                    {" • "}
                    Rank
                    <strong>#{rank}</strong>
                    {" • "}
                    Similarity:
                    <strong>{similarity.toFixed(5)}</strong>
                </p>
                <h3 className="line-clamp-2 text-lg font-medium text-primary">
                    {title}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground">
                    by {author}
                </p>
                <p className="line-clamp-3 text-sm mt-1">{content}</p>
                <p className="text-xs text-muted-foreground">
                    {bibliographic !== "" && `Bibliography: ${bibliographic}`}
                </p>
            </div>
        </div>
    );
}
