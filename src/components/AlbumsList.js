import React from "react";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  // isFetching表示每次發送請求時就為true
  //console.log(data, error, isFetching);

  const [addAlbum, results] = useAddAlbumMutation();
  //console.log(results);
  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className=" h-10 w-full" times={3}></Skeleton>;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album}></AlbumsListItem>;
    });
  }

  return (
    <div>
      <div className=" m-2 flex flex-row items-center justify-between">
        <h3 className=" text-lg font-bold">AlbumsList {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
