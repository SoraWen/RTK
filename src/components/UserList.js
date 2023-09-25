import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import UsersListItem from "./UsersListItem";

function UserList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  //   const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  //   const [loadingUsersError, setLoadingUsersError] = useState(null);
  //-------------
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  //   const [isCreatingUser, setIsCreatingUser] = useState(false);
  //   const [creatingUserError, setCreatingUserError] = useState(null);

  //const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
    // setIsLoadingUsers(true);
    // dispatch(fetchUsers())
    //   .unwrap() //發送新Promise
    //   .then(() => {
    //     //只有promise成功時才調用
    //     setIsLoadingUsers(false);
    //   })
    //   .catch((err) => {
    //     //只有promise失敗時才調用 //(err)?
    //     setLoadingUsersError(err);
    //     setIsLoadingUsers(false);
    //   })
    //   .finally(() => {}); //最後都會執行不管成功與否
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
    // setIsCreatingUser(true);
    // dispatch(addUser())
    //   .unwrap()
    //   .catch((err) => {
    //     //只有promise失敗時才調用 //(err)?
    //     setCreatingUserError(err);
    //   })
    //   .finally(() => {
    //     setIsCreatingUser(false);
    //   });
  };

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className=" h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Erroe data</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className=" flex flex-row justify-between items-center m-3">
        <h1 className=" m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          Add User
        </Button>
        {creatingUserError && "Error creating user"}
      </div>
      {content}
    </div>
  );
}

export default UserList;
