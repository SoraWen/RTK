import React from "react";
import { useRemovePhotosMutation } from "../store";
import { GoTrash } from "react-icons/go";

function PhotoListItem({ photo }) {
  const [removePhoto, results] = useRemovePhotosMutation();

  const handleRemovePhotos = () => {
    removePhoto(photo);
  };

  return (
    <div onClick={handleRemovePhotos} className=" relative m-2 cursor-pointer">
      <img className="h-20 w-20" src={photo.url} alt="random pic" />
      <div className=" absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrash className=" text-3xl" />
      </div>
    </div>
  );
}

export default PhotoListItem;
