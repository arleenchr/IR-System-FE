"use client";

import { RetrievalForm } from "@/components/ui/retrieval-form";
import { RetrievalResult } from "@/components/ui/retrieval-result";
import { ResultType } from "@/interfaces/result";
import { WeightingMethod } from "@/interfaces/retrieval";
import { useState } from "react";

export default function Home() {
    const [docWeightingMethod, setDocWeightingMethod] =
        useState<WeightingMethod | null>(null);
    const [queryWeightingMethod, setQueryWeightingMethod] =
        useState<WeightingMethod | null>(null);
    const [result, setResult] = useState<ResultType | null>(null);

    const [loading, setLoading] = useState(false);

    return (
        <div className="flex h-screen overscroll-none">
            <RetrievalForm
                setResult={setResult}
                setLoading={setLoading}
                setDocWeightingMethod={setDocWeightingMethod}
                setQueryWeightingMethod={setQueryWeightingMethod}
            />
            <RetrievalResult
                result={result}
                loading={loading}
                docWeightingMethod={docWeightingMethod}
                queryWeightingMethod={queryWeightingMethod}
            />
        </div>
    );
}
