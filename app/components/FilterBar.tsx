"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const MEDIUMS = [
    { id: "other-media", label: "Other Media" },
    { id: "oils-and-acrylics", label: "Oils and Acrylics" },
    { id: "calligraphy", label: "Calligraphy" },
    { id: "water-colors", label: "Water Colors" },
    { id: "sketching", label: "Sketching" },
    { id: "pastels", label: "Pastels" },
    { id: "color-pencils", label: "Color Pencils" },
    { id: "100-day-project", label: "100 Day Project" },
    { id: "book-covers", label: "Book Covers" },
    { id: "book-illustrations", label: "Book Illustrations" },
    { id: "wanderlust", label: "Wanderlust" },
];

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentMedium = searchParams.get("medium") || "";
    const currentAvailability = searchParams.get("availability") || "";

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleFilterChange = (name: string, value: string) => {
        router.push(`/?${createQueryString(name, value)}`);
    };

    return (
        <div className="flex flex-col gap-6 py-6 border-b border-border mb-8">
            {/* Visual Medium Categories */}
            <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4 font-medium">Browse by Medium</h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => handleFilterChange("medium", "")}
                        className={`filter-btn px-4 py-2 text-sm rounded-full transition-colors ${currentMedium === ""
                            ? "bg-foreground text-background"
                            : "bg-muted text-foreground hover:bg-muted/80"
                            }`}
                    >
                        All Works
                    </button>
                    {MEDIUMS.map((medium) => (
                        <button
                            key={medium.id}
                            onClick={() => handleFilterChange("medium", medium.id)}
                            className={`filter-btn px-4 py-2 text-sm rounded-full transition-colors ${currentMedium === medium.id
                                ? "bg-foreground text-background"
                                : "bg-muted text-foreground hover:bg-muted/80"
                                }`}
                        >
                            {medium.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                    <label htmlFor="availability-filter" className="text-sm font-medium text-muted-foreground">Status:</label>
                    <select
                        id="availability-filter"
                        className="bg-transparent border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                        value={currentAvailability}
                        onChange={(e) => handleFilterChange("availability", e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>

                {(currentMedium || currentAvailability) && (
                    <button
                        onClick={() => router.push("/")}
                        className="text-sm text-accent hover:underline"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>
        </div>
    );
}
