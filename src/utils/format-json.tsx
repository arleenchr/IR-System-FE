export function formatStringJSON(
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
