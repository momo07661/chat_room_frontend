import SubPage from "./component/SubPage.tsx";
import {useState} from "react";
import {userDto} from "../../data/User.Type.ts";
import {Container} from "react-bootstrap";

export default function ChatRoom(){
  const [userLoginDto, setUserLoginDto] = useState<userDto | undefined>(undefined);


  return(
    <>
      <Container>
        <SubPage userLoginDto={userLoginDto} setUserLoginDto={setUserLoginDto}/>
      </Container>
    </>
  )
}