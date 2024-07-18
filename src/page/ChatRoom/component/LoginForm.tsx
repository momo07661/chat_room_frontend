import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {FormEvent, useEffect, useState} from "react";
import * as AuthApi from "../../../api/auth/auth.ts"
import {userDto} from "../../../data/User.Type.ts";
import SearchComponent from "./SearchComponent.tsx";
import {Alert} from "react-bootstrap";


type Props = {
  userLoginDto: userDto | undefined,
  setUserLoginDto: React.Dispatch<React.SetStateAction<userDto | undefined>>
}

function LoginForm(props: Props) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);
  const [isConfirmPasswordFailed, setIsConfirmPasswordFailed] = useState<boolean>(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState<boolean>(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value);
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setConfirmPassword(event.target.value);
  }

  const handleSubmit = async ( event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    await fetchUserLoginDto().then();
    setUsername('');
    setPassword('');
  }

  const handleRegister = async ( event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    if (confirmPassword === password){
      await fetchRegisterDto().then();
      setUsername('');
      setPassword('');
    } else {
      setIsConfirmPasswordFailed(true);
      const temAlert = setTimeout(()=>{
        setIsConfirmPasswordFailed(false);
        clearTimeout(temAlert);
      }, 2000)
    }
  }

  const fetchUserLoginDto = async () =>{
    // console.log(username, password, props.setUserLoginDto)
    try{
      if (username && password){
        const loginDto = await AuthApi.postLogin(username, password)
        props.setUserLoginDto(loginDto);
      }
    }catch (e){
      setIsLoginFailed(true);
      const temAlert = setTimeout(()=>{
        setIsLoginFailed(false);
        clearTimeout(temAlert);
      }, 2000)
    }
  }

  const fetchRegisterDto = async () =>{
    try{
      if (username && password){
        const loginDto = await AuthApi.postRegister(username, password)
        props.setUserLoginDto(loginDto);
        setIsRegisterSuccess(true);
        const temAlert = setTimeout(()=>{
          setIsRegisterSuccess(false);
          clearTimeout(temAlert);
        }, 2000)
      }
    }catch (e){
      setIsRegisterFailed(true);
      const temAlert = setTimeout(()=>{
        setIsRegisterFailed(false);
        clearTimeout(temAlert);
      }, 2000)
    }
  }

  useEffect(() => {
    console.log(props.userLoginDto)
  }, [props.userLoginDto]);

  return (
    <>
      {
        props.userLoginDto ? <>
            {
              isRegisterSuccess
              && <Alert variant={'success'}>
                    Success Register! Enjoy your chat!
                </Alert>
            }
            <SearchComponent userLoginDto={props.userLoginDto} setUserLoginDto={props.setUserLoginDto}/>
          </>
          : <>
            {
              isLoginFailed
              && <Alert variant={'warning'}>
                    Not that user yet, we find nobody
                </Alert>
            }

            {
              isConfirmPasswordFailed
              && <Alert variant={'warning'}>
                    Please enter same password in password and confirm password!
                </Alert>
            }

            {
              isRegisterFailed
              && <Alert variant={'warning'}>
                    User already exists!
                </Alert>
            }

            {/*Login form*/}
            <Form
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" value={username} onChange={handleUsernameChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>

            {/*Register form*/}
            <Form
              onSubmit={handleRegister}
            >

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password (Below for register use only)</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
              >
                Register
              </Button>
            </Form>
          </>
      }
    </>

  );
}

export default LoginForm;