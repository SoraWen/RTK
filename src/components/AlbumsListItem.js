import React from "react";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrash } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotoList from "./PhotoList";

function AlbumsListItem({ album }) {
  const [removeAlbum, result] = useRemoveAlbumMutation();

  const handleRemove = () => {
    removeAlbum(album);
  };
  const header = (
    <>
      <Button
        className=" mr-4"
        loading={result.isLoading}
        onClick={handleRemove}
      >
        <GoTrash />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotoList album={album} />
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
