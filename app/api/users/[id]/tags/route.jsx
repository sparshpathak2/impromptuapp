import { connectToDB } from "@/utils/database";
import PromptSequence from "@/models/promptsequence";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const url = new URL(request.url)
        // const workspaceId = url.searchParams.get("workspace")
        const folderId = url.searchParams.get("f")

    const promptSequences = await PromptSequence.find({ createdBy: params.id, folder: folderId }).populate('createdBy');
    // const promptSequences = await PromptSeqeunce.find({ createdBy: params.id, folder: folderId }).populate('createdBy');

    // Combine all tags into a single array
    const allTags = promptSequences.reduce((acc, promptSequence) => [...acc, ...promptSequence.tags], []);

    // Remove duplicates using Set
    const uniqueTags = Array.from(new Set(allTags));

    return new Response(JSON.stringify(uniqueTags), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response("Failed to fetch unique tags", { status: 500 });
  }
};
