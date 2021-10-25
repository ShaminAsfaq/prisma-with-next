import Head from "next/head";
import styles from '../../styles/Home.module.css';

import { PrismaClient } from ".prisma/client";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';



const prisma = new PrismaClient();

export default function Movie({ movie }) {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { movie.title }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { movie.description }
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query;

    const movie = await prisma.movie.findFirst({
        where: {
            slug
        }
    });

    return {
        props: {
            movie
        }
    }
} 