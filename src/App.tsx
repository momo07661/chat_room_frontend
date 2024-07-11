import {useState} from "react";
import {userDto} from "./data/User.Type.ts";
import ChatRoom from "./page/ChatRoom";
import UserContext from "./context/UserContext.tsx";

function App() {
  const [userLoginDto, setUserLoginDto] = useState<userDto | undefined>(undefined);


  return (
    <UserContext.Provider value={{userLoginDto, setUserLoginDto}}>
      <ChatRoom/>
      {/*<ChatRoomComponent room={2} username={'user5'}/>*/}
    </UserContext.Provider>
  );
}

export default App;
