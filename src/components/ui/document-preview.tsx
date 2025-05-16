export default function DocumentPreview({
    i,
    title,
    author,
    content,
    similarity,
}: {
    i: number;
    title: string;
    author: string;
    content: string;
    similarity: number;
}) {
    return (
        <div className="flex flex-row gap-20 mb-6 w-full">
            <div className="flex flex-grow flex-col min-w-0">
                <h3 className="truncate overflow-hidden whitespace-nowrap text-lg font-medium text-primary">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground">by {author}</p>
                <p className="truncate overflow-hidden whitespace-nowrap text-sm mt-1">
                    {content}
                </p>
            </div>
            <div className="flex flex-col flex-shrink-0 items-center text-muted-foreground pt-1">
                <div className="flex-grow border rounded-lg w-full text-center content-center ">
                    <p className="text-xs">Rank</p>
                    <p className="text-base font-bold">#{i}</p>
                </div>
                <p className="text-xs">
                    Similarity: <span className="font-bold">{similarity}</span>
                </p>
            </div>
        </div>
    );
}
