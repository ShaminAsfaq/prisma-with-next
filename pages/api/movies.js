import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
    let data = req.body;

    const createdMovie = await prisma.movie.create({
        data
    })

    res.status(201).json(createdMovie);
}
