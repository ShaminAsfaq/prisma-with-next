import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

import { PrismaClient } from '.prisma/client';
import { TextareaAutosize } from '@mui/material';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MovieIcon from '@mui/icons-material/Movie';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';

import axios from 'axios';

const prisma = new PrismaClient();

export default function Home({ data }) {
  const [formData, setFormData] = useState({});


  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [slugError, setSlugError] = useState(false);

  const [list, setList] = useState([]);

  const saveMovie = async (e) => {
    e.preventDefault();

    const singleMovie = {
      title, year, description, slug
    }

    console.log(singleMovie);

    if (titleError || yearError || descriptionError || slugError) {
      alert('Value Missing 1');
    } else if(title.length === 0 || year.length === 0 || description.length === 0 || slug.length === 0) {
      alert('Value Missing 2');
    } else {
      const response = await axios.post('/api/movies', JSON.stringify(singleMovie));

      // setList([...data, singleMovie]);
      console.log(response);
      //  ERROR TODO
      return response;
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
          style={{width: '30%'}}
        >
          <div style={{display: 'flex', flexDirection: 'column', padding: '8px'}}>
            <TextField
              error={titleError}
              required
              id="outlined-basic"
              label="Title"
              placeholder="Title"
              variant="outlined"
              value={title}
              onChange={e => {
                  if (e.target.value?.length === 0) {
                    setTitleError(true);
                  } else {
                    setTitleError(false);
                  }
                  setTitle(e.target.value);
                }
              }
            />
            <TextField
              error={yearError}
              required
              id="outlined-basic"
              label="Year"
              placeholder="Year"
              variant="outlined"
              value={year}
              onChange={e => {
                if (e.target.value?.length === 0) {
                  setYearError(true);
                } else {
                  setYearError(false);
                }
                setYear(e.target.value);
              }
            }
            />
            <TextField
              error={descriptionError}
              id="outlined-textarea"
              label="Description"
              placeholder="description"
              multiline
              rows={4}
              value={description}
              onChange={e => {
                if (e.target.value?.length === 0) {
                  setDescriptionError(true);
                } else {
                  setDescriptionError(false);
                }
                setDescription(e.target.value);
              }
            }
            />
            <TextField
              error={slugError}
              required
              id="outlined-basic"
              label="Slug"
              placeholder="Slug"
              variant="outlined"
              value={slug}
              onChange={e => {
                if (e.target.value?.length === 0) {
                  setSlugError(true);
                } else {
                  setSlugError(false);
                }
                setSlug(e.target.value);
              }
            }
            />
            <Button style={{margin: 'auto'}} onClick={saveMovie} variant="outlined">Add Movie</Button>
          </div>
        </Box>

        <List style={{marginLeft: '8px'}} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
            data.map(item => {
              return (
                <ListItemButton key={item?.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <MovieIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.year}
                      </Typography>
                      {` | ${item.description}`}
                    </React.Fragment>
                  } />
                </ListItemButton>
              );
            })
          }
        </List>
      </main>
    </div>
  )
}

export async function getServerSideProps() {

  const movieList = await prisma.movie.findMany();

  return {
    props: {
      data: movieList
    }
  }
}
