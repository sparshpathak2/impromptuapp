import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import PromptSequence from "../../../../models/promptsequence";
import Space from "../../../../models/space";

// export const POST = async (req) => {
//     const { userID, prompt, tag } = await req.json();

//     try {
//         await connectToDB();
//         const newPrompt = new Prompt({
//             creator: userID,
//             prompt,
//             tag,
//         })

//         await newPrompt.save();

//         return new Response(JSON.stringify(newPrompt), { status: 201 })
//     } catch (error) {
//         console.log(error)
//         return new Response("Failed to create new prompt", { status: 500 })
//     }
// }



// export const POST = async (req) => {
//     const { userID, promptSequenceTitle, tagCategories, prompts } = await req.json();

//     try {
//         await connectToDB();

//         // Check if the user exists
//         const user = await User.findById(userID);
//         if (!user) {
//             return new Response("User not found", { status: 404 });
//         }

//         const newPromptSequence = new PromptSequence({
//             promptSequenceTitle,
//             tagCategories,
//             createdBy: userID,
//             prompts
//         });

//         await newPromptSequence.save();

//         return new Response(JSON.stringify(newPromptSequence), { status: 201 });
//     } catch (error) {
//         console.log(error);
//         return new Response("Failed to create new prompt sequence", { status: 500 });
//     }
// };


export const POST = async (req) => {
    // const { createdBy, promptSequenceTitle, tags, prompts } = await req.json();
    const { name, createdBy, workspace } = await req.json();

    try {
        await connectToDB();

        const newSpace = new Space({
            name,
            createdBy,
            workspace
        });

        await newSpace.save();

        return new Response(JSON.stringify(newSpace), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new Space", { status: 500 });
    }
};