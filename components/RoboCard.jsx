'use client';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@app/contexts/authContext";
import { useRouter } from "next/navigation";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { indigo } from '@mui/material/colors';
import Divider from "@mui/material/Divider";
import Link from "next/link";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));
  
export default function RoboCard({ robot }) {
    const [expanded, setExpanded] = useState(false);
    const { authState, isUserAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
    if(!isUserAuthenticated()) router.push('/')
    }, []);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (
    <Card sx={{ maxWidth: 300 }}>
        <CardHeader
            action={
            <IconButton aria-label="settings" sx={{ ml: 3 }}>
                <Link href={{
                    pathname: "/create-robot",
                    query: {
                    id: robot.id
                    }
                }}>
                    <EditIcon sx={{ color: indigo[500] }} />
                </Link>
            </IconButton>
            }
            title={robot.nickname}
            subheader={robot.mac}
        />
        <Divider variant="middle"/>
        <CardContent>
            <Typography paragraph>Conteúdo:</Typography>
            <Typography paragraph>
                {robot.content?.title || 'Sem conteúdo'}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
                <ExpandMoreIcon sx={{ color: indigo[500] }}/>
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography variant="body2" color="text.secondary">
                Usuários: {robot.users.map(({ user }) => (
                <p key={user.id}>
                  {user.name}
                </p>
              ))}
            </Typography>
        </CardContent>
        </Collapse>
    </Card>
    );
}


