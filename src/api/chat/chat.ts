import {baseUrl} from "../../config/config.ts";
import axios from "axios";
import {userDto} from "../../data/User.Type.ts";

export const searchUser = async (username: string)=> {
  try{
    return (await axios.get<userDto[]>(`${baseUrl}/search_user/${username}`)).data;
  }catch(e){
    console.error(e);
    throw e;
  }
}

export const initiateChat = async (userId: number, recipientId: number)=>{
  try{
    return (await axios.post<userDto>(`${baseUrl}/initiate_chat`, {user_id: userId, recipient_id: recipientId})).data;
  }catch(e){
    console.error(e);
    throw e;
  }
}