import {userDto} from "../data/User.Type.ts";
import {createContext} from "react";


export const UserContext = createContext<{userLoginDto: userDto | undefined, setUserLoginDto: (value: userDto | undefined)=> void}>;



