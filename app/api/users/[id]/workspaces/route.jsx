import { connectToDB } from "@/utils/database";
// import Prompt from "@models/prompt";
// import PromptSeqeunce from "@/models/promptsequence";
import Workspace from "@/models/workspace";


export const GET = async (request, { params }) => {

    try {
        await connectToDB();

        const workspaces = await Workspace.find({ createdBy: params.id }).populate('createdBy');

        return new Response(JSON.stringify(workspaces), { status: 200 })
        
    
    } catch (error) {
        return new Response("Failed to fetch Prompt Sequences", { status: 500 })    
    }
}