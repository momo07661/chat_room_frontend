import {userDto} from "../data/User.Type.ts";
import {createContext} from "react";

export type UserContextType = {
  userLoginDto: userDto | undefined;
  fetchUserLoginDto: () => void;
}

const UserContext = createContext<{userLoginDto: userDto | undefined, setUserLoginDto}>({});

export default UserContext;