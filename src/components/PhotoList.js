import React from "react";
import { useFetchPhotosQuery, useAddPhotosMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotoListItem from "./PhotoListItem";

function PhotoList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhotos, addPhotosResults] = useAddPhotosMutation();
  const handleAddPkhoto = () => {
    addPhotos(album);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error Photos...</div>;
  } else {
    content = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <div>
      <div className=" m-2 flex flex-row items-center justify-between">
        <h3 className=" text-lg font-bold">Photo In {album.title}</h3>
        <Button loading={addPhotosResults.isLoading} onClick={handleAddPkhoto}>
          Add Photo
        </Button>
      </div>
      <div className=" mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

export default PhotoList;
