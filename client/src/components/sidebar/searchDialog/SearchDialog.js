import React from "react";
import { useSelector } from "react-redux";
import { selectSearchUsers } from "../../../reducers/searchSlice";
import "./SearchDialog.css";
import SearchUser from "./searchUser/SearchUser";

const SearchDialog = () => {
  const users = useSelector(selectSearchUsers);
  console.log(users);

  return (
    <div className="searchDialog">
      <div className="searchDialog__users">
        {users?.map((u, idx) => (
          <SearchUser user={u} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default SearchDialog;
