import { connectToDB } from "@/utils/database";
import PromptSeqeunce from "@/models/promptsequence";

// GET (read)
export const GET = async (request, { params }) => {

    // console.log(params.id)
    // alert(params.id)
    try {
        await connectToDB();

        const promptSequence = await PromptSeqeunce.findById(params.id).populate('createdBy');
        // const prompts = await Prompt.find({});

        if (!promptSequence) new Response("Prompt Sequence not found", { status: 404 })

        return new Response(JSON.stringify(promptSequence), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch Prompt Sequence", { status: 500 })
    }
}



// PATCH (update)
// export const PATCH = async (request, { params }) => {
//     const { promptSequenceTitle, tags, prompt, promptId } = await request.json();
//     try {
//         await connectToDB();

//         const existingPromptSequence = await PromptSeqeunce.findById(params.id);

//         if (!existingPromptSequence) return new Response("Prompt Sequence not found", { status: 404 });

//         const existingPromptObject = existingPromptSequence.prompts.find(p => p.id === promptId);

//         if (existingPromptObject) {
//             // Update existing prompt
//             existingPromptObject.prompt = prompt;
//         } else {
//             // Add new prompt
//             const newPrompt = {
//                 // promptNumber: existingPromptSequence.prompts.length + 1,
//                 prompt: prompt
//             };
//             existingPromptSequence.prompts.push(newPrompt);
//         }

//         // Update the prompt sequence title and tags if provided
//         if (promptSequenceTitle) {
//             existingPromptSequence.promptSequenceTitle = promptSequenceTitle;
//         }
//         if (tags) {
//             existingPromptSequence.tags = tags;
//         }

//         await existingPromptSequence.save();

//         return new Response(JSON.stringify(existingPromptSequence), { status: 200 });
//     } catch (error) {
//         return new Response(`Failed to update the prompt sequence with : ${error}`, { status: 404 });
//     }
// };



export const PATCH = async (request, { params }) => {
    try {
        await connectToDB();

        const { promptSequenceTitle, tags, prompt, promptId } = await request.json();

        const existingPromptSequence = await PromptSeqeunce.findById(params.id);

        if (!existingPromptSequence) {
            return new Response("Prompt Sequence not found", { status: 404 });
        }

        // Check if promptId is provided and find the existing prompt object
        let existingPromptObject;
        if (promptId) {
            existingPromptObject = existingPromptSequence.prompts.find(p => p.id === promptId);
        }

        // Update existing prompt or add new prompt
        if (existingPromptObject) {
            existingPromptObject.prompt = prompt || existingPromptObject.prompt;
        } else if (prompt) {
            const newPrompt = { prompt };
            existingPromptSequence.prompts.push(newPrompt);
        }

        // Update the prompt sequence title and tags if provided
        if (promptSequenceTitle) {
            existingPromptSequence.promptSequenceTitle = promptSequenceTitle;
        }
        if (tags) {
            existingPromptSequence.tags = tags;
        }

        await existingPromptSequence.save();

        return new Response(JSON.stringify(existingPromptSequence), { status: 200 });
    } catch (error) {
        return new Response(`Failed to update the prompt sequence with : ${error}`, { status: 404 });
    }
};



// DELETE (delete)
export const DELETE = async (request, { params }) => {
    const { action, promptId } = await request.json();

    try {
        await connectToDB();

        // Find the prompt sequence document by ID
        const promptSequence = await PromptSeqeunce.findById(params.id);

        if (!promptSequence) {
            return new Response("Prompt sequence not found", { status: 404 });
        }

        if (action === "deletePrompt") {
            // Find the index of the prompt in the prompts array based on the promptNumber
            const promptIndex = promptSequence.prompts.findIndex(prompt => prompt.id === promptId);

            if (promptIndex === -1) {
                return new Response("Prompt not found in the sequence", { status: 404 });
            }

            // Remove the prompt from the prompts array at the identified index
            promptSequence.prompts.splice(promptIndex, 1);

            // Save the updated prompt sequence document
            await promptSequence.save();

            return new Response(JSON.stringify(promptSequence), { status: 200 });

        }

        else if (action === "deletePromptSequence") {
            // Delete the entire prompt sequence
            await PromptSeqeunce.findByIdAndDelete(params.id);

            return new Response("Prompt sequence deleted successfully", { status: 200 });
        }

        else {
            return new Response("Invalid action specified", { status: 400 });
        }

    } catch (error) {
        console.error("Error deleting prompt or Prompt Sequence due to: ", error);
        return new Response("Failed to delete prompt or prompt sequence", { status: 500 });
    }
}