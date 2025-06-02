"use client";

import { RetrievalForm } from "@/components/ui/retrieval-form";
import { RetrievalResult } from "@/components/ui/retrieval-result";
import { useState } from "react";

export default function Home() {
    const [result, setResult] = useState({});
    
    return (
        <div className="flex h-screen overscroll-none">
            <RetrievalForm setResult={setResult} />
            <RetrievalResult result={result} />
        </div>
    );
}
