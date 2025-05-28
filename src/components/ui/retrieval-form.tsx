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

export function RetrievalForm() {
    const [queryType, setQueryType] = useState("interactive");

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
                <RadioGroup value={queryType} onValueChange={setQueryType}>
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

                {queryType === "interactive" && (
                    <div className="flex flex-row gap-2 justify-center">
                        <Label className="text-base">Query</Label>
                        <Input placeholder="Enter query..." />
                    </div>
                )}

                {queryType === "batch" && (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Label className="w-40 text-base">Query</Label>
                            <Input
                                type="file"
                                className="flex-grow cursor-pointer"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="w-40 text-base">
                                Relevance judgement
                            </Label>
                            <Input
                                type="file"
                                className="flex-grow cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="stemming" className="cursor-pointer" />
                    <Label htmlFor="stemming">Apply Stemming</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="stopwords" className="cursor-pointer" />
                    <Label htmlFor="stopwords">Remove Stop Words</Label>
                </div>
            </div>

            {/* Query Expansion Threshold */}
            <div className="flex flex-row gap-2 my-4">
                <Label className="flex-grow whitespace-nowrap">
                    Query Expansion Threshold
                </Label>
                <Input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={0}
                />
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
                            />
                            <Label htmlFor={method}>{method}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Retrieve Button */}
            <Button className="w-full mt-2 text-black font-semibold bg-gradient-to-r from-[#9EA3F7] to-[#4AFCED] cursor-pointer">
                Retrieve
            </Button>
        </aside>
    );
}
