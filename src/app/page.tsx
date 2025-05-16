"use client";

import { RetrievalForm } from "@/components/ui/retrieval-form";
import { RetrievalResult } from "@/components/ui/retrieval-result";

export default function Home() {
    return (
        <div className="flex h-screen overscroll-none">
            <RetrievalForm />
            <RetrievalResult />
        </div>
    );
}
