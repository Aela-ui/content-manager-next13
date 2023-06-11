'use client';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@app/contexts/authContext";

const ContentCard = ({ content, handleContentClick, handleEdit, handleDelete }) => {
  const { isUserAuthenticated } = useContext(AuthContext);
  const [ logged, setLogged ] = useState(false);

  useEffect(() => {
    setLogged(isUserAuthenticated());
  }, []);
  
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {content.title}
          </h3>

          <p className="my-4 font-satoshi text-sm text-gray-700">
            {content.description}
          </p>

          <p className="font-inter text-sm blue_gradient cursor-pointer
            onClick={() => handleContentClick && handleContentClick(content.categoria)}
          ">
            {content.categoria}
          </p>

          {logged?.user.id === postMessage.content.id && (
            <div>
              <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}>
                Editar
              </p>

              <p
              className="font-inter text-sm indigo_gradient cursor-pointer"
              onClick={handleDelete}>
                Deletar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentCard