import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {FormEvent, useEffect, useState} from "react";
import * as AuthApi from "../../../api/auth/auth.ts"
import userContext, {UserContextType} from "../../../context/UserContext.tsx";

function LoginForm() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const { userLoginDto, setUserLoginDto }: UserContextType = userContext;

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value);
  }

  const handleSubmit = async ( event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    await fetchUserLoginDto().then();
    setUsername(undefined);
    setPassword(undefined);
  }

  const fetchUserLoginDto = async () =>{
    username && password && setUserLoginDto(await AuthApi.postLogin(username, password))
  }

  useEffect(() => {
    console.log(userLoginDto?.username)
  }, [userLoginDto]);

  return (
    <>
      {
        userLoginDto ? <div>
            Welcome {userLoginDto.username}
          </div>
          : <Form
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
      }
    </>

  );
}

export default LoginForm;