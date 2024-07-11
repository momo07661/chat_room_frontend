import Header from "./component/Header.tsx";
import ChatRoomComponent from "./component/ChatRoomComponent.tsx";

export default function ChatRoom(){
  return(
    <>
      <Header/>
      <ChatRoomComponent room={1} username={'user'}/>
    </>
  )
}