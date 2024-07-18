import React, {FormEvent, useEffect, useState,} from 'react';
import {Alert, Button, Form, FormControl, ListGroup} from 'react-bootstrap';
import * as ChatApi from "../../../api/chat/chat.ts"
import {userDto} from "../../../data/User.Type.ts";
import ChatRoomComponent from "./ChatRoomComponent.tsx";
import UserTable from "./UserTable.tsx";
import {chatDto} from "../../../data/Chat.Type.ts";
import LoadingEffect from "./LoadingEffect.tsx";

type Props = {
  userLoginDto: userDto | undefined,
  setUserLoginDto: React.Dispatch<React.SetStateAction<userDto | undefined>>
}

const SearchComponent = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResultDtoList, setSearchResultDtoList] = useState<userDto[] | undefined>(undefined);
  const [receiverDto, setReceiverDto] = useState<userDto | undefined>(undefined);

  const [isFindNoOneAlert, setIsFindNoOneAlert] = useState<boolean>(false);
  const [isLoadingReceiverDtoList, setIsLoadingReceiverDtoList] = useState<boolean>(false);
  const [chatDto, setChatDto] = useState<chatDto | undefined>(undefined);

  useEffect(() => {
    if (receiverDto) {
      fetchInitiateChatDto();
    }
  }, [receiverDto]);

  const handleSearch = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchTerm){
      setIsLoadingReceiverDtoList(true);
      const userDtoList = await ChatApi.searchUser(searchTerm, props.userLoginDto?.username??"");
      setSearchResultDtoList(userDtoList);
      if (userDtoList){
        setIsLoadingReceiverDtoList(false);
      }

      if (userDtoList.length === 0){
        setIsFindNoOneAlert(true);
        const alertTimeout = setTimeout(()=>{
          setIsFindNoOneAlert(false)
          clearTimeout(alertTimeout);
        }, 2000)
      }
    }else {
      console.error("please enter receiver name");
    }

    console.log('Searching for:', searchTerm);
    // Update the user context or handle the search result here
  };

  const fetchInitiateChatDto = async ()=> {
    if (props.userLoginDto && receiverDto){
      const temChatDto = await ChatApi.initiateChat(props.userLoginDto.uid, receiverDto.uid);
      setChatDto(temChatDto);
      console.log(chatDto)
    }else{
      console.error("missing enquiry data");
      console.log("user: " + props.userLoginDto);
      console.log("receiver: " + receiverDto);
    }
  }

  useEffect(() => {
    console.log(searchResultDtoList)
  }, [searchResultDtoList]);


  return (
    <>
      <ListGroup className="mb-3">
        <ListGroup.Item active variant="info" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>

            <Button
              variant="outline-success"
              onClick={() => {
                window.location.reload()
              }}
            >
              Logout
            </Button>
          </div>

          <div>
            <strong>Welcome! </strong>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                 className="bi bi-emoji-sunglasses" viewBox="0 0 16 16">
              <path
                d="M4.968 9.75a.5.5 0 1 0-.866.5A4.5 4.5 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.5 3.5 0 0 1 8 11.5a3.5 3.5 0 0 1-3.032-1.75M7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A3 3 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.2 4.2 0 0 0 8 5c-.35 0-.69.04-1 .116"/>
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0"/>
            </svg>
            <strong>{props.userLoginDto?.username}</strong>
          </div>
        </ListGroup.Item>
      </ListGroup>
      {
        (searchResultDtoList && searchResultDtoList.length > 0)
          ? <>
            {receiverDto === undefined
              ? <UserTable fetchChatDto={fetchInitiateChatDto} searchResultDtoList={searchResultDtoList}
                           receiverDto={receiverDto} setReceiverDto={setReceiverDto}/>
              : <>
                {
                  chatDto
                    ? props.userLoginDto &&
                      <ChatRoomComponent receiverDto={receiverDto} loginUser={props.userLoginDto} room={chatDto.cid.toString()} username={props.userLoginDto.username??''} uid={props.userLoginDto.uid?.toString()??''}/>
                    : <LoadingEffect/>
                }
              </>
            }</>
          : <>
            {
              isFindNoOneAlert
              && <Alert variant={'warning'}>
              Not that user yet, we find nobody
              </Alert>
            }
            <Form
              className="d-flex"
              onSubmit={handleSearch}
            >
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {
                isLoadingReceiverDtoList
                  ? <LoadingEffect/>
                  : <Button
                    variant="primary"
                    type="submit"
                  >
                    Search
                  </Button>
              }

          </Form>
        </>
      }
    </>
  );
};

export default SearchComponent;
