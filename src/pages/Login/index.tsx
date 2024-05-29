import  { useState } from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button, Card, Box } from '@mui/material';
import bgImage from '../../assets/auth_bg.png';

function Login() {
    const [isLoginForm, setIsLoginForm] = useState(true);

    return ( 
        <Box display="flex" justifyContent="center" alignItems="center"
        sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 'calc(100vh - 241px)',
        }}
        >
        <Card variant="outlined"  sx={{ maxWidth: 500, maxHeight: 600, padding: 3, backgroundColor: "rgba(000,0,0,0.8)", color: "white"}} >
            
            <Box display="flex" flexDirection="column" alignItems="center"  >
            <h1>{isLoginForm ? 'Login' : 'Register'}</h1>
            {isLoginForm ? <LoginForm /> : <RegisterForm />}
            <p>or</p>
            <Button onClick={() => setIsLoginForm(!isLoginForm)}>
                {isLoginForm ? 'Register' : 'Login'}
            </Button>
            </Box>
        </Card>
        </Box>
     );
}

export default Login;
