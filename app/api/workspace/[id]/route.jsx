import { connectToDB } from "@/utils/database";
// import PromptSeqeunce from "@/models/promptsequence";
import Workspace from "@/models/workspace";

// GET (read)
export const GET = async (request, { params }) => {

    console.log(params.id)
    // alert(params.id)
    try {
        await connectToDB();

        const workspace = await Workspace.findById(params.id).populate('createdBy');
        // const prompts = await Prompt.find({});

        if (!workspace) new Response("Workspace not found", { status: 404 })

        return new Response(JSON.stringify(workspace), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch Workspace", { status: 500 })
    }
}


// PATCH (update)
// export const PATCH = async (request, { params }) => {
//     try {
//         await connectToDB();

//         const { promptSequenceTitle, tags, prompt, promptId } = await request.json();

//         const existingPromptSequence = await PromptSeqeunce.findById(params.id);

//         if (!existingPromptSequence) {
//             return new Response("Prompt Sequence not found", { status: 404 });
//         }

//         // Check if promptId is provided and find the existing prompt object
//         let existingPromptObject;
//         if (promptId) {
//             existingPromptObject = existingPromptSequence.prompts.find(p => p.id === promptId);
//         }

//         // Update existing prompt or add new prompt
//         if (existingPromptObject) {
//             existingPromptObject.prompt = prompt || existingPromptObject.prompt;
//         } else if (prompt) {
//             const newPrompt = { prompt };
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

        const { folderId, folderName } = await request.json();

        const existingWorkspace = await Workspace.findById(params.id);

        if (!existingWorkspace) {
            return new Response("Workspace not found", { status: 404 });
        }

        // Check if folderId is provided and find the existing folder object
        let existingFolder;
        if (folderId) {
            existingFolder = existingWorkspace.folders.find(
                (f) => f._id.toString() === folderId?.itemId?.toString()
            );
        }

        // Update existing folder or add new folder
        if (existingFolder) {
            // existingFolder.folder = folderName || existingFolder.folder;
            existingFolder.folder = folderName;
        } else if (folderName) {
            const newFolder = { folder: folderName };
            // const newFolder = { folderName };
            existingWorkspace.folders.push(newFolder);
        }

        await existingWorkspace.save();

        return new Response(JSON.stringify(existingWorkspace), { status: 200 });
    } catch (error) {
        return new Response(`Failed to update the workspace with : ${error}`, { status: 404 });
    }
};


// DELETE (delete)
// export const DELETE = async (request, { params }) => {

//     const { folderId } = await request.json();

//     try {
//         await connectToDB();

//         const existingWorkspace = await Workspace.findById(params.id);

//         if (!existingWorkspace) {
//             return new Response("Workspace not found", { status: 404 });
//         }

//         else {

//             await existingWorkspace.folders.findByIdAndDelete(
//                 (f) => f._id.toString() === folderId?.itemId?.toString()
//             );

//             // await PromptSeqeunce.findByIdAndDelete(params.id);
//             return new Response("Collection deleted successfully", { status: 200 });
//         }

//     } catch (error) {
//         console.error("Error deleting collection due to: ", error);
//         return new Response("Failed to delete collection", { status: 500 });
//     }
// }


// DELETE (delete)
export const DELETE = async (request, { params }) => {

    const { folderId } = await request.json();

    try {
        await connectToDB();

        const existingWorkspace = await Workspace.findById(params.id);

        if (!existingWorkspace) {
            return new Response("Workspace not found", { status: 404 });
        }

        else {

            // await existingWorkspace.folders.findByIdAndDelete(
            //     (f) => f._id.toString() === folderId?.itemId?.toString()
            // );

            // // await PromptSeqeunce.findByIdAndDelete(params.id);
            // return new Response("Collection deleted successfully", { status: 200 });

            const updatedFolders = existingWorkspace.folders.filter(
                (f) => f._id.toString() !== folderId?.itemId?.toString()
            );
    
            existingWorkspace.folders = updatedFolders;
            await existingWorkspace.save();

            return new Response("Collection deleted successfully", { status: 200 });
        }

    } catch (error) {
        console.error("Error deleting collection due to: ", error);
        return new Response("Failed to delete collection", { status: 500 });
    }
}