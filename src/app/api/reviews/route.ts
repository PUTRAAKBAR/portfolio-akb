import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/reviews.json");

// GET /api/reviews - Get all reviews
export async function GET() {
    try {
        const fileData = fs.readFileSync(dataFilePath, "utf-8");
        const reviews = JSON.parse(fileData);

        // Sort by newest first
        reviews.sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.error("Error reading reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}

// POST /api/reviews - Add new review
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, rating, text } = body;

        // Validation
        if (!name || !text || typeof rating !== "number") {
            return NextResponse.json(
                { error: "Name, rating, and text are required" },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        // Read existing reviews
        const fileData = fs.readFileSync(dataFilePath, "utf-8");
        const reviews = JSON.parse(fileData);

        // Create new review
        const newReview = {
            id: Date.now(),
            name: name.trim(),
            rating,
            text: text.trim(),
            avatar: "",
            createdAt: new Date().toISOString()
        };

        // Add to beginning of array
        reviews.unshift(newReview);

        // Save to file
        fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 4), "utf-8");

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error("Error adding review:", error);
        return NextResponse.json(
            { error: "Failed to add review" },
            { status: 500 }
        );
    }
}
