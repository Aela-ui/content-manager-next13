//fetch do map

import ContentCard from "@components/ContentCard";

export const GET = async (request) => {
    try{
        await ('');

        const contents = await ContentCard.find({})

        return new Response(JSON.stringify(contents), {
            status:200
        })
    }catch (error) {
        return new Response("Failed to fetch all", {
            status:500
        })
    }
}