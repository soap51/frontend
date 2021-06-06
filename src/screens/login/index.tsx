import React, { useState } from "react";
import { Button, Card, Text, InputForm } from "../../components";
import { useHistory } from "react-router-dom";
import { login } from "../../networks/api";
import './style.css'
import { FONT_TYPE } from "../../constant";
import { useUseContext } from "../../context/userContext";
import { emailIsValid } from "../../utils/validation";
export const LoginScreen = () => {
  const history = useHistory();
  const [,setContext] = useUseContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if(emailIsValid(email)){
        const data = await login({
          user: {
            email,
            password,
          },
        });
  
        if(setContext) {
          setContext({
            token:data.token
          })
        }
        history.replace(`/profile/${data.id}`);
      }else{
        setErrorMessage('Email is invalid')

      }
    
    } catch (err) {

      if(err?.response){
        setErrorMessage(err?.response?.data?.message)
      }
    }
  };
  return (
    <div className="login-screen"
    >
      <form onSubmit={onSubmit}>
        <Card>
          <Text fontSize="h1" >{"Login"}</Text>          
          <InputForm
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">{"Login"}</Button>
          { errorMessage && <Text type={FONT_TYPE.ERROR}>{errorMessage}</Text>}
        </Card>
      </form>
    </div>
  );
};


