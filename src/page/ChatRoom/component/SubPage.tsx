import LoginForm from "./LoginForm.tsx";
import {userDto} from "../../../data/User.Type.ts";
import React from "react";

type Props = {
  userLoginDto: userDto | undefined,
  setUserLoginDto: React.Dispatch<React.SetStateAction<userDto | undefined>>
}

export default function SubPage(props: Props){


  return (
    <>
      <LoginForm userLoginDto={props.userLoginDto} setUserLoginDto={props.setUserLoginDto}/>
    </>
  )
}