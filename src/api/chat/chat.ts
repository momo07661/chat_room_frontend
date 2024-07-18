import {baseUrl} from "../../config/config.ts";
import axios from "axios";
import {userDto} from "../../data/User.Type.ts";
import {chatDto} from "../../data/Chat.Type.ts";

export const searchUser = async (username: string, chatUser: string)=> {
  try{
    return (await axios.get<userDto[]>(`${baseUrl}/search_user?username=${username}&chatUser=${chatUser}`)).data;
  }catch(e){
    console.error(e);
    throw e;
  }
}

export const initiateChat = async (userId: number | undefined, recipientId: number | undefined)=>{
  try{
    if (!userId || !recipientId){
      console.error("missing required data")
      return
    }
    return (await axios.post<chatDto>(`${baseUrl}/initiate_chat`, {userId: userId, recipientId: recipientId})).data;
  }catch(e){
    console.error(e);
    throw e;
  }
}

export const getMessages = async (chatId: string)=> {
  try{
    return (await axios.get(`${baseUrl}/get_history?chatId=${chatId}`)).data;
  }catch (e) {
    console.error('error in fetch history')
  }
}