"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import axios from "axios";
import api from "@/lib/api";
import { ResultType } from "@/interfaces/result";
import { WeightingMethod } from "@/interfaces/retrieval";

export function RetrievalForm({
    setResult,
    setLoading,
    setDocWeightingMethod,
    setQueryWeightingMethod,
}: {
    setResult: (data: any) => void;
    setLoading: (state: boolean) => void;
    setDocWeightingMethod: (docWeightingMethod: WeightingMethod) => void;
    setQueryWeightingMethod: (queryWeightingMethod: WeightingMethod) => void;
}) {
    const [formData, setFormData] = useState({
        documentCollection: "",
        queryType: "interactive",
        queryText: "",
        queryFile: "",
        relevanceJudgement: "",
        useStemming: false,
        useStopwords: false,
        queryExpansionLimit: -1,
        queryExpansionThreshold: 0.7,
        docTF: true,
        docTFMethod: "raw",
        docIDF: false,
        docNormalization: false,
        queryTF: true,
        queryTFMethod: "raw",
        queryIDF: false,
        queryNormalization: false,
    });

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const {
                documentCollection,
                queryType,
                queryText,
                queryFile,
                relevanceJudgement,
                useStemming,
                useStopwords,
                queryExpansionLimit,
                queryExpansionThreshold,
                docTF,
                docTFMethod,
                docIDF,
                docNormalization,
                queryTF,
                queryTFMethod,
                queryIDF,
                queryNormalization,
            } = formData;

            console.log(formData);

            const results: ResultType = {
                isInteractive: queryType == "interactive",
            };

            const doc_weighting_method = {
                tf_raw: docTF && docTFMethod === "raw",
                tf_log: docTF && docTFMethod === "logarithmic",
                tf_binary: docTF && docTFMethod === "binary",
                tf_augmented: docTF && docTFMethod === "augmented",
                use_idf: docIDF,
                use_normalization: docNormalization,
            };
            const query_weighting_method = {
                tf_raw: queryTF && queryTFMethod === "raw",
                tf_log: queryTF && queryTFMethod === "logarithmic",
                tf_binary: queryTF && queryTFMethod === "binary",
                tf_augmented: queryTF && queryTFMethod === "augmented",
                use_idf: queryIDF,
                use_normalization: queryNormalization,
            };
            setDocWeightingMethod(doc_weighting_method);
            setQueryWeightingMethod(query_weighting_method);

            const promises = [];

            if (queryType == "interactive") {
                // Query Expansion
                promises.push(
                    api
                        .post("/query/expand", {
                            query: queryText,
                            threshold: queryExpansionThreshold,
                            limit: queryExpansionLimit,
                        })
                        .then((res) => {
                            results.expansion = res.data;

                            const expandedTerms: string[] =
                                res.data.expanded_terms || [];
                            const expandedQuery = expandedTerms.join(" ");

                            // Retrieve with expanded query
                            promises.push(
                                api
                                    .post("/retrieval/retrieve", {
                                        relevant_doc: [],
                                        query: expandedQuery,
                                        weighting_method: doc_weighting_method,
                                    })
                                    .then(
                                        (res) =>
                                            (results.retrievalExpanded =
                                                res.data)
                                    )
                            );
                        })
                );
                // Retrieval (original query)
                promises.push(
                    api
                        .post("/retrieval/retrieve", {
                            relevant_doc: [],
                            query: queryText,
                            weighting_method: doc_weighting_method,
                        })
                        .then((res) => (results.retrievalOriginal = res.data))
                );
                const requestBody = {
                    relevant_doc: [],
                    query: queryText,
                    weighting_method: doc_weighting_method,
                };

                console.log("Request Body:", requestBody);
            } else {
                // Batch query
                // Query Expansion
                promises.push(
                    api
                        .post("/query/expand-batch", {
                            query_file: queryFile,
                            threshold: queryExpansionThreshold,
                            limit: queryExpansionLimit,
                        })
                        .then((res) => {
                            results.expansionBatch = res.data;
                        })
                );
                // Retrieval (batch query)
                promises.push(
                    api
                        .post("/retrieval/retrieve-batch", {
                            query_file: queryFile,
                            relevant_doc_filename: relevanceJudgement,
                            weighting_method: doc_weighting_method,
                        })
                        .then((res) => (results.retrievalOriginal = res.data))
                );

                const requestBody = {
                    query_file: queryFile,
                    relevant_doc_filename: relevanceJudgement,
                    weighting_method: doc_weighting_method,
                };

                console.log("Request Body:", requestBody);
            }

            // Inverted File
            promises.push(
                api
                    .get("/retrieval/inverted-file", {
                        params: {
                            use_stemming: useStemming,
                            use_stopword_removal: useStopwords,
                            tf_raw: docTF && docTFMethod == "raw",
                            tf_log: docTF && docTFMethod == "logarithmic",
                            tf_binary: docTF && docTFMethod == "binary",
                            tf_augmented: docTF && docTFMethod == "augmented",
                            use_idf: docIDF,
                            use_normalization: docNormalization,
                        },
                    })
                    .then((res) => (results.invertedFile = res.data))
            );

            // Documents List
            promises.push(
                api
                    .get("/documents/list")
                    .then((res) => (results.documents = res.data))
            );

            await Promise.all(promises);
            console.log(results);
            setResult(results);
        } catch (error) {
            console.error("Error fetching:", error);
            setResult({ error: "Failed to fetch" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="w-86 min-w-0 p-6 bg-sidebar border-r overflow-y-auto custom-scrollbar">
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#9EA3F7] to-[#4AFCED] bg-clip-text text-transparent">
                Information Retrieval
            </h1>

            {/* Document Collection */}
            <div className="flex flex-col gap-2 mb-4">
                <Label className="text-base">Document Collection</Label>
                <Input type="file" className="cursor-pointer" />
            </div>

            <Separator />

            {/* Query Type */}
            <div className="flex flex-col gap-2 my-4">
                <Label className="text-base">Query Type</Label>
                <RadioGroup
                    value={formData.queryType}
                    onValueChange={(value) =>
                        setFormData((prev) => ({
                            ...prev,
                            queryType: value,
                        }))
                    }
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="interactive"
                            id="r1"
                            className="cursor-pointer"
                        />
                        <Label htmlFor="r1">Interactive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="batch"
                            id="r2"
                            className="cursor-pointer"
                        />
                        <Label htmlFor="r2">Batch</Label>
                    </div>
                </RadioGroup>

                {formData.queryType === "interactive" && (
                    <div className="flex flex-row gap-2 justify-center">
                        <Label className="text-base">Query</Label>
                        <Input
                            placeholder="Enter query..."
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    queryText: (e.target as HTMLInputElement)
                                        .value,
                                }))
                            }
                        />
                    </div>
                )}

                {formData.queryType === "batch" && (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Label className="w-40 text-base">Query</Label>
                            <Select
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        queryFile: value,
                                    }))
                                }
                            >
                                <SelectTrigger
                                    id="query-file"
                                    className="w-full flex-grow bg-sidebar text-foreground cursor-pointer"
                                >
                                    <SelectValue placeholder="Select a query file" />
                                </SelectTrigger>
                                <SelectContent className="bg-sidebar text-white">
                                    <SelectItem
                                        value="app/data/parsing/query.text"
                                        className="cursor-pointer"
                                    >
                                        query.text
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="w-40 text-base">
                                Relevance judgement
                            </Label>
                            <Select
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        relevanceJudgement: value,
                                    }))
                                }
                            >
                                <SelectTrigger
                                    id="relevance-file"
                                    className="w-full flex-grow bg-sidebar text-foreground cursor-pointer"
                                >
                                    <SelectValue placeholder="Select a file" />
                                </SelectTrigger>
                                <SelectContent className="bg-sidebar text-white">
                                    <SelectItem
                                        value="app/data/parsing/qrels.text"
                                        className="cursor-pointer"
                                    >
                                        qrels.text
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="stemming"
                        className="cursor-pointer"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                useStemming: (e.target as HTMLInputElement)
                                    .checked,
                            }))
                        }
                    />
                    <Label htmlFor="stemming">Apply Stemming</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="stopwords"
                        className="cursor-pointer"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                useStopwords: (e.target as HTMLInputElement)
                                    .checked,
                            }))
                        }
                    />
                    <Label htmlFor="stopwords">Remove Stop Words</Label>
                </div>
            </div>

            <Separator />

            {/* Query Expansion Threshold */}

            <div className="flex flex-col gap-2 my-4">
                <Label className="text-base">Query Expansion</Label>
                <div className="flex flex-row gap-2">
                    <Label className="flex-grow whitespace-nowrap">
                        Word Limit
                    </Label>
                    <Input
                        type="number"
                        min={-1}
                        max={100}
                        step={1}
                        defaultValue={-1}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                queryExpansionLimit: Number(e.target.value),
                            }))
                        }
                    />
                </div>
                <p className="text-xs text-[#888888]">
                    Word limit value -1 means no limitation for the expansion
                    word count.
                </p>
                <div className="flex flex-row gap-2">
                    <Label className="flex-grow whitespace-nowrap">
                        Similarity Threshold
                    </Label>
                    <Input
                        type="number"
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={0.7}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                queryExpansionThreshold: Number(e.target.value),
                            }))
                        }
                    />
                </div>
            </div>

            <Separator />

            {/* Document Weighting Methods */}
            {/* TF Methods */}
            <div className="flex flex-col gap-2 my-4">
                <Label className="text-base">Document Weighting Method</Label>
                <div className="flex flex-row gap-2 content-center">
                    <Label
                        htmlFor="tf-method"
                        className="text-sm whitespace-nowrap"
                    >
                        TF Method
                    </Label>
                    <Select defaultValue="logarithmic">
                        <SelectTrigger
                            id="tf-method"
                            className="w-full flex-grow bg-sidebar text-foreground cursor-pointer"
                        >
                            <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                        <SelectContent className="bg-sidebar text-white">
                            {["logarithmic", "binary", "augmented", "raw"].map(
                                (method) => (
                                    <SelectItem
                                        key={method}
                                        value={method}
                                        className="cursor-pointer"
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                docTFMethod: (
                                                    e.target as HTMLInputElement
                                                ).value,
                                            }))
                                        }
                                    >
                                        {method}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* IDF & Normalization */}
            <div className="space-y-2 mb-4">
                <RadioGroup defaultValue="TF only">
                    {[
                        "TF only",
                        "IDF only",
                        "TF x IDF",
                        "TF x IDF x cosine normalization",
                    ].map((method) => (
                        <div
                            key={method}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={method}
                                id={method}
                                className="cursor-pointer"
                                onChange={(e) => {
                                    const val = (e.target as HTMLInputElement)
                                        .value;
                                    setFormData((prev) => ({
                                        ...prev,
                                        docTF: [
                                            "TF only",
                                            "TF x IDF",
                                            "TF x IDF x cosine normalization",
                                        ].includes(val),
                                        docIDF: [
                                            "IDF only",
                                            "TF x IDF",
                                            "TF x IDF x cosine normalization",
                                        ].includes(val),
                                        docNormalization:
                                            val ===
                                            "TF x IDF x cosine normalization",
                                    }));
                                }}
                            />
                            <Label htmlFor={method}>{method}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <Separator />

            {/* Query Weighting Methods */}
            {/* TF Methods */}
            <div className="flex flex-col gap-2 my-4">
                <Label className="text-base">Query Weighting Method</Label>
                <div className="flex flex-row gap-2 content-center">
                    <Label
                        htmlFor="tf-method"
                        className="text-sm whitespace-nowrap"
                    >
                        TF Method
                    </Label>
                    <Select defaultValue="logarithmic">
                        <SelectTrigger
                            id="tf-method"
                            className="w-full flex-grow bg-sidebar text-foreground cursor-pointer"
                        >
                            <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                        <SelectContent className="bg-sidebar text-white">
                            {["logarithmic", "binary", "augmented", "raw"].map(
                                (method) => (
                                    <SelectItem
                                        key={method}
                                        value={method}
                                        className="cursor-pointer"
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                queryTFMethod: (
                                                    e.target as HTMLInputElement
                                                ).value,
                                            }))
                                        }
                                    >
                                        {method}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* IDF & Normalization */}
            <div className="space-y-2 mb-4">
                <RadioGroup defaultValue="TF only">
                    {[
                        "TF only",
                        "IDF only",
                        "TF x IDF",
                        "TF x IDF x cosine normalization",
                    ].map((method) => (
                        <div
                            key={method}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={method}
                                id={method}
                                className="cursor-pointer"
                                onChange={(e) => {
                                    const val = (e.target as HTMLInputElement)
                                        .value;
                                    setFormData((prev) => ({
                                        ...prev,
                                        queryTF: [
                                            "TF only",
                                            "TF x IDF",
                                            "TF x IDF x cosine normalization",
                                        ].includes(val),
                                        queryIDF: [
                                            "IDF only",
                                            "TF x IDF",
                                            "TF x IDF x cosine normalization",
                                        ].includes(val),
                                        queryNormalization:
                                            val ===
                                            "TF x IDF x cosine normalization",
                                    }));
                                }}
                            />
                            <Label htmlFor={method}>{method}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Retrieve Button */}
            <Button
                className="w-full mt-2 text-black font-semibold bg-gradient-to-r from-[#9EA3F7] to-[#4AFCED] cursor-pointer"
                onClick={handleSubmit}
            >
                Retrieve
            </Button>
        </aside>
    );
}
