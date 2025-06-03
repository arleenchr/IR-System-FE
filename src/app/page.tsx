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
    const [globalUseStemming, setGlobalUseStemming] = useState(false);
    const [globalUseStopwords, setGlobalUseStopwords] = useState(false);

    const [loading, setLoading] = useState(false);

    return (
        <div className="flex h-screen overscroll-none">
            <RetrievalForm
                setResult={setResult}
                setLoading={setLoading}
                setDocWeightingMethod={setDocWeightingMethod}
                setQueryWeightingMethod={setQueryWeightingMethod}
                globalUseStemming={globalUseStemming}
                setGlobalUseStemming={setGlobalUseStemming}
                globalUseStopwords={globalUseStopwords}
                setGlobalUseStopwords={setGlobalUseStopwords}
            />
            <RetrievalResult
                result={result}
                loading={loading}
                docWeightingMethod={docWeightingMethod}
                queryWeightingMethod={queryWeightingMethod}
                useStemming={globalUseStemming}
                useStopwords={globalUseStopwords}
            />
        </div>
    );
}
