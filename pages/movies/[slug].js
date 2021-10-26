import Head from "next/head";
import styles from '../../styles/Home.module.css';

import { PrismaClient } from ".prisma/client";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";



const prisma = new PrismaClient();

export default function Movie({ movie }) {
    return (
        <span className={styles.movieDetails}> 
            <Card sx={{ maxWidth: 345 }} style={{width: '100%', textAlign: 'end'}}>
                <CardActionArea>
                    <CardContent>
                        <Link href={`/`}>
                            <ArrowBackIcon/>
                        </Link>
                        <Typography gutterBottom variant="h5" component="div">
                            { movie.title }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            { movie.description }
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </span>
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