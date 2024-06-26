import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/api.reducer";
import { errorsSelector } from "../../services/redux.reducer";
import { useAppSelector } from "../../services/store";
import { LoginResponse } from "../../types/types";

type FormData = {
    email: string;
    password: string;
  };

  export function saveData(result: LoginResponse) {
    if (result && result.data) {
        console.log(result.data)
        localStorage.setItem('token', result.data.accessToken);
        localStorage.setItem('name', result.data.name);
        localStorage.setItem('email', result.data.email);
        localStorage.setItem('avatar', result.data.avatar.url);
localStorage.setItem('isManager', result.data.venueManager.toString());
        window.location.href = "/";
      } else {
        console.error('No data in result:', result);
      }
}

function LoginForm() {
    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({defaultValues: {email: "", password: ""}});

    const [login] = useLoginMutation();
    const ApiErrors = useAppSelector(errorsSelector);

    const onSubmit = async (data: FormData) => {
        try {
            const result = await login(data).unwrap();
            saveData(result as LoginResponse)


            
          } catch (error) {
            console.error('Failed to log in:', error);
          }
    }
    return ( 
        <>

        <Grid container   justifyContent="center" >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction={"column"} paddingX={5} width={450}>
                <Controller control={control} name="email" rules={{required: "email is required",pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "invalid email address"
                }}} render={({field:{onChange, value}}) =>
                <TextField id="login_email_input" sx={{
                  // Root class for the input field
                  "& .MuiOutlinedInput-root": {
                    color: "#FFF",

                    // Class for the border around the input field
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FFCC6A",
                    },
                  },
                  // Class for the label of the input field
                  "& .MuiInputLabel-outlined": {
                    color: "#FFF",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#FFF", // Change this to the color you want
                  },
                  mb: 2,
                }}  type="email" variant="outlined" label="Mail" onChange={onChange} value={value}  helperText={errors.email ? errors.email.message : null} />
                }/>
                <Controller control={control} name="password" rules={{required: "password is required", minLength: { value: 8, message: "password must be at least 8 characters long"
                }}} render={({field:{onChange, value}}) =>
                <TextField id="login_password_input" sx={{
                  // Root class for the input field
                  "& .MuiOutlinedInput-root": {
                    color: "#FFF",

                    // Class for the border around the input field
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FFCC6A",
                    },
                  },
                  // Class for the label of the input field
                  "& .MuiInputLabel-outlined": {
                    color: "#FFF",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#FFF", // Change this to the color you want
                  },
                  mb: 2,
                }}  type="password" variant="outlined" label="Password" onChange={onChange} value={value} helperText={errors.password ? errors.password.message : null} />
                }/>
                        {ApiErrors.map((error, index) => (
                <p key={index}>
                    {error.message}
                </p>
            ))}
                <Button id="login_btn"  sx={{width: 100, margin: '0 auto'}} type="submit" variant="contained" color="primary">Login</Button>
                </Grid>
            </form>      
        </Grid>
        </>
     );
}

export default LoginForm;
