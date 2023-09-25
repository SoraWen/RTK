//import React from "react";
import { GoTrash } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/useThunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    //console.log(user.id);
    doRemoveUser(user);
  };

  const header1 = (
    <>
      <Button className=" mr-6" loading={isLoading} onClick={handleClick}>
        <GoTrash></GoTrash>
      </Button>
      {error && <div>Error deleting user...</div>}
      {user.name}
    </>
  );
  return (
    <ExpandablePanel header={header1}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
