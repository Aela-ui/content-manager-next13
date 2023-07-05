'use client';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@app/contexts/authContext";
import { deleteContent } from "@app/api/ApiContent";
import Link from "next/link";
import { getPermission } from "@utils/getPermission";
import AddContentModal from "./AddContentModal";

export const ContentCard = ({ content, updated, setUpdated }) => {
  const { authState, isUserAuthenticated } = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

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
  
  return (
    <>   
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {content.title}
            </h3>

            <p className="my-4 font-satoshi text-sm text-gray-700">
              {content.description}
            </p>

            <p className="my-4 font-satoshi text-sm text-gray-700">
              {content.isPublic ? 'Público': 'Privado'}
            </p>

            <p className="font-inter text-sm blue_gradient">
              {content.categories.map(({ category }) => (
                <p key={category.id}>
                  {category.name}
                </p>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        {(getPermission(authState.user.role.permissions, "edit-all-contents") || content.user.id === authState.user.id) && (
         <>
          <Link href={{
              pathname:"/create-content",
              query:{
                id:content.id
              }
            }}>
              <p
              className="font-inter text-sm green_gradient cursor-pointer"
              >
                Editar
              </p>
            </Link>

            <p
            className="font-inter text-sm red_gradient cursor-pointer"onClick={(e) => handleDelete(e)}>
              {isDeleting ? "Deleting..." : "Deletar"}
            </p>
            </>
        )}
            <p
              className="font-inter text-sm indigo_gradient cursor-pointer" onClick={() => setOpen(true)}>
              Adicionar a um robô
            </p>
        </div>
        <AddContentModal open={open} contentId={content.id} handleClose={handleClose}/>
      </div>
    </>
  );
};