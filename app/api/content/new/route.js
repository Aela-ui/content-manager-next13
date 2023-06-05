export const POST = async (req) => {
    const { userId, categoria, title, description, file } = await req.json();
}