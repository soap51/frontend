import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Text, InputForm } from "../../components";
import { FONT_TYPE } from "../../constant";
import { register } from "../../networks/api";
import { useUseContext } from "../../context/userContext";
import './style.css'
import { emailIsValid } from "../../utils/validation";
export const RegisterScreen = () => {
    const history = useHistory();
    const [,setContext] = useUseContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

  
    const onSubmit = async (e: React.FormEvent) => {        
        try{
            e.preventDefault();

            if(emailIsValid(email)){
                const data = await register({
                    email,
                    password,
                    name
                })
                if(setContext){
                    setContext({
                        token: data.token
                    })
                }       
                history.push(`/profile/${data.id}`)
            }else{
                setErrorMessage('Email is invalid')
            }
            
        }catch(err){
            if(err.response  ){
                setErrorMessage(err?.response?.data?.message)
            }
        }
        
    }
    return (
        <div className="register-screen">
            <form onSubmit={onSubmit}>
            <Card>               
                <Text fontSize="h1">
                    {"Register"}
                </Text>
                <InputForm placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} />
                <InputForm placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <InputForm type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />               
                { errorMessage && <Text type={FONT_TYPE.ERROR}>{errorMessage}</Text>}
                <Button type="submit">
                    {"Register"}
                </Button>                                                  
            </Card>
            </form>
        </div>
    )
}