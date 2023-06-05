'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ContentCard = ({ content, handleContentClick, handleEdit, handleDelete }) => {
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
        </div>
      </div>
    </div>
  )
}

export default ContentCard