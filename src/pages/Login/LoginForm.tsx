import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/api.reducer";
import { errorsSelector } from "../../services/redux.reducer";
import { useAppSelector } from "../../services/store";

type FormData = {
    email: string;
    password: string;
  };

function LoginForm() {

    
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({defaultValues: {email: "", password: ""}});

    const [login] = useLoginMutation();
    const ApiErrors = useAppSelector(errorsSelector);

    const onSubmit = async (data: FormData) => {
        try {
            await login(data);
          } catch (error) {
            console.error('Failed to log in:', error);
          }
    }
    return ( 
        <>
        {ApiErrors.map((error, index) => (
                <p key={index}>
                    {error.message}
                </p>
            ))}
        <Grid container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller control={control} name="email" rules={{required: "email is required",pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "invalid email address"
                }}} render={({field:{onChange, value}}) =>
                <TextField type="email" variant="outlined" label="Mail" onChange={onChange} value={value}  helperText={errors.email ? errors.email.message : null} />
                }/>
                <Controller control={control} name="password" rules={{required: "password is required", minLength: { value: 8, message: "password must be at least 8 characters long"
                }}} render={({field:{onChange, value}}) =>
                <TextField type="password" variant="outlined" label="Password" onChange={onChange} value={value} helperText={errors.password ? errors.password.message : null} />
                }/>
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>      
        </Grid>
        </>
     );
}

export default LoginForm;