import axios from "axios";
import {userDto} from "../../data/User.Type.ts";
import {baseUrl} from "../../config/config.ts";

export const postLogin = async (username: string, password: string) => {
  try{
    return (await axios.post<userDto>(`${baseUrl}/login`, {username: username, password: password})).data;
  }catch (e){
    console.error(e);
    throw e;
  }
}

export const postRegister = async (username: string, password: string) => {
  try{
    return (await axios.post<userDto>(`${baseUrl}/register`, {username: username, password: password})).data;
  }catch(e){
    console.error(e);
    throw e;
  }
}