"use client";

import { RetrievalForm } from "@/components/ui/retrieval-form";
import { RetrievalResult } from "@/components/ui/retrieval-result";
import { ResultType } from "@/interfaces/result";
import { useState } from "react";

export default function Home() {
    const [result, setResult] = useState<ResultType | null>(null);
    const [loading, setLoading] = useState(false);
    
    return (
        <div className="flex h-screen overscroll-none">
            <RetrievalForm setResult={setResult} setLoading={setLoading} />
            <RetrievalResult result={result} loading={loading} />
        </div>
    );
}
