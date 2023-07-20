'use client';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@app/contexts/authContext";
import { deleteContent } from "@app/api/ApiContent";
import Link from "next/link";
import { getPermission } from "@utils/getPermission";
import AddContentModal from "./AddContentModal";
import Divider from "@mui/material/Divider";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import { indigo } from '@mui/material/colors';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useRouter } from "next/navigation"
import DialogTitle from '@mui/material/DialogTitle';

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

export default function ContentCard({ content, updated, setUpdated }) {
  const [expanded, setExpanded] = useState(false);
  const { authState, isUserAuthenticated } = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    if(!isUserAuthenticated()) router.push('/')
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await deleteContent(authState, content.id);
    setIsDeleting(true);
  
    try { 
      // Check the response and handle accordingly
      if (response.error) {
        console.log(response.message);
      } else {
        console.log("Content deleted successfully");
        setUpdated(!updated);
        handleCloseDelete();
      }
    } catch (error) {
      console.log("Error deleting content:", error.message);
    }
  
    setIsDeleting(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <Card sx={{ height: '100%' }}>
      <CardHeader
        action={
          <IconButton aria-label="add robot">
           <SmartToyOutlinedIcon sx={{ color: indigo[500] }} onClick={() => setOpen(true)}/>
          </IconButton>
        }
        title={content.title}
        titleTypographyProps={{variant:'h6'}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {content.categories.map(({ category }) => (
                <p key={category.id}>
                  {category.name}
                </p>
            ))}
        </Typography>
        <Divider variant="middle" sx={{ m: 1 }}/>
        <Typography variant="body2" color="text.secondary">
          {content.isPublic ? 'Público': 'Privado'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {(getPermission(authState.user.role.permissions, "edit-all-contents") || (content.user.id === authState.user.id && !content.isPublic)) && (
        <>
          <IconButton aria-label="edit the content">
              <Link 
                href={{
                  pathname: "/create-content",
                  query: {
                    id: content.id
                  }
                }}
              >
                <EditOutlinedIcon sx={{ color: indigo[500] }} />
              </Link>
           </IconButton>

          <IconButton aria-label="delete">
            <DeleteOutlineOutlinedIcon sx={{ color: indigo[500] }} onClick={handleClickOpenDelete} />
          </IconButton>
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Tem certeza que deseja deletar?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Cancelar</Button>
              <Button onClick={(e) => handleDelete(e)}>
                {isDeleting ? "Deleting..." : "Deletar"}
              </Button>
            </DialogActions>
          </Dialog>

        </>
      )}

          <ExpandMore
            sx={{ color: indigo[500] }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Descrição:</Typography>
              <Typography paragraph>
                {content.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      <AddContentModal open={open} contentId={content.id} handleClose={handleClose}/>
    </>
  );
}
