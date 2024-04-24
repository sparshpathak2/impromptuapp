import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";


export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');
        // const prompts = await Prompt.find({});

        return new Response(JSON.stringify(prompts), { status: 200 })
    
    } catch (error) {
        return new Response("Failed to fetch Prompts", { status: 500 })    
    }
}