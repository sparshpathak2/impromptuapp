import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import PromptSequence from "@/models/promptsequence";
import User from "@/models/User"; // Assuming you have a User model
import TagCategory from "@/models/tagcategory"; // Import the TagCategory model


// Define the POST route handler
export const POST = async (req) => {
    // Extract data from the request body
    const { tagCategory, tags, userID } = await req.json();

    try {
        // Connect to the database
        await connectToDB();

        // Create a new instance of the TagCategory model
        const newTagCategory = new TagCategory({
            tagCategory,
            tags: tags.map(tag => ({ tag })),
            createdBy: userID
        });

        // Save the new tag category to the database
        await newTagCategory.save();

        // Return a success response with the created tag category
        return new Response(JSON.stringify(newTagCategory), { status: 201 });
    } catch (error) {
        // Return an error response if something goes wrong
        console.log(error);
        return new Response("Failed to create new tag category", { status: 500 });
    }
};
