import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import PromptSequence from "@/models/promptsequence";


// export const GET = async (request) => {
//     try {
//         await connectToDB();

//         const prompts = await Prompt.find({}).populate('creator');
//         // const prompts = await Prompt.find({});

//         return new Response(JSON.stringify(prompts), { status: 200 })
    
//     } catch (error) {
//         return new Response("Failed to fetch Prompts", { status: 500 })    
//     }
// }


export const GET = async (request) => {
    try {
        await connectToDB();

        const promptSequences = await PromptSequence.find({}).populate('createdBy');
        // const prompts = await Prompt.find({});

        return new Response(JSON.stringify(promptSequences), { status: 200 })
    
    } catch (error) {
        return new Response("Failed to fetch Prompts", { status: 500 })    
    }
}