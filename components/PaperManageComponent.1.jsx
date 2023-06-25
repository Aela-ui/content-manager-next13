import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from "next/link";

export default function PaperManageComponent() {
  return (
    <center>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: "auto",
          width: "fit-content",
          '& > :not(style)': {
            m: 4,
            width: 300,
            p:2
          }
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h6" component="h3">
            Conteúdo
          </Typography>

          <Divider variant="middle" sx={{ m: 1 }}/>

          <Typography variant="body1" component="p">
            Aqui você pode criar um novo conteúdo à página.
          </Typography>

          <Divider variant="middle" sx={{ m: 2 }}/>

          <Link href="/create-content" className="indigo_btn">
            Criar Conteúdo
          </Link>
        </Paper>

        <Paper elevation={3}>
          <Typography variant="h6" component="h3">
            Usuário
          </Typography>

          <Divider variant="middle" sx={{ m: 1 }}/>

          <Typography variant="body1" component="p">
            Aqui você pode cadastrar um novo usuário
          </Typography>

          <Divider variant="middle" sx={{ m: 2 }}/>

          <Link href="/register" className="indigo_btn">
            Cadastro Usuário
          </Link>
        </Paper>

        <Paper elevation={3}>
          <Typography variant="h6" component="h3">
            Robô
          </Typography>

          <Divider variant="middle" sx={{ m: 1 }}/>

          <Typography variant="body1" component="p">
            Aqui você pode adicionar um novo robô, ou ver a listagem
          </Typography>

          <Divider variant="middle" sx={{ m: 2 }}/>

          <Stack direction="row" spacing={2}>
            <Link href="/create-robo" className="indigo_btn">
              Adicionar Robô
            </Link>

            <Link href="/listing-robot" className="indigo_btn">
              Listagem
            </Link>
          </Stack>
        </Paper>
      </Box>
    </center>
  );
}
