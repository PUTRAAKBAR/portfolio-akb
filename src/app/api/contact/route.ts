import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/messages.json");

// POST /api/contact - Save contact message
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Read existing messages
        let messages = [];
        try {
            const fileData = fs.readFileSync(dataFilePath, "utf-8");
            messages = JSON.parse(fileData);
        } catch {
            // File doesn't exist or is empty, start with empty array
            messages = [];
        }

        // Create new message
        const newMessage = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject?.trim() || "No Subject",
            message: message.trim(),
            createdAt: new Date().toISOString(),
            read: false
        };

        // Add to beginning of array
        messages.unshift(newMessage);

        // Save to file
        fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 4), "utf-8");

        return NextResponse.json(
            { success: true, message: "Message sent successfully!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving message:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}

// GET /api/contact - Get all messages
export async function GET() {
    try {
        const fileData = fs.readFileSync(dataFilePath, "utf-8");
        const messages = JSON.parse(fileData);

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error("Error reading messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}
