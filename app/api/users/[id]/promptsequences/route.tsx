import { connectToDB } from "@/utils/database";
// import Prompt from "@models/prompt";
import PromptSeqeunce from "@/models/promptsequence";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest,  { params }: { params: { id: string } } ) => {
    try {
        await connectToDB();

        
        // Get URL parameters (params)
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get("workspace")

        const url = new URL(request.url)
        const workspaceId = url.searchParams.get("workspace")
        const folderId = url.searchParams.get("f")
        // console.log(folderId)


        // const { id } = request.params as { id: string };
        // Get query parameters (query)
        // const { workspace } = request.query;

        // const { workspace } = request.query;

        // const promptSequences = await PromptSeqeunce.find({ createdBy: params.id, workspace: workspaceId }).populate('createdBy');
        const promptSequences = await PromptSeqeunce.find({ createdBy: params.id, folder: folderId }).populate('createdBy');
        // const promptSequences = await PromptSeqeunce.find({ createdBy: params.id, workspace: query.workspace }).populate('createdBy');

        // console.log(promptSequences)

        return new Response(JSON.stringify(promptSequences), { status: 200 })
        
    
    } catch (error) {
        return new Response("Failed to fetch Prompt Sequences", { status: 500 })    
    }
}