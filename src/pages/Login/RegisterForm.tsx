import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { LoginResponse } from "../../types/types";
import { useRegisterMutation } from "../../services/api.reducer";
import { useLoginMutation } from "../../services/api.reducer";
import { saveData } from "./LoginForm";



type FormData = {
    email: string;
    password: string;
    name: string;
    venueManager: boolean;
  };

function RegisterForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({defaultValues: {email: "", password: "", name: "", venueManager: false}});

    const [Register] = useRegisterMutation();
    const [login] = useLoginMutation();

    const onSubmit = async (data: FormData) => {
        try {
          const registerResult = await Register(data).unwrap();
          console.log(registerResult);
      
          const loginResult = await login(data).unwrap();
          console.log(loginResult);
      
          saveData(loginResult as LoginResponse);
        } catch (error) {
          console.error('Failed to register or log in:', error);
        }
      };

    return ( 
        <>
        <Grid container> 
        <form onSubmit={handleSubmit(onSubmit)}>
                <Controller control={control} name="name" rules={{required: "name is required"}} render={({field:{onChange, value}}) =>
                <TextField type="text" variant="outlined" label="Name" onChange={onChange} value={value}  helperText={errors.name ? errors.name.message : null} />
                }/>
                <Controller control={control} name="email" rules={{required: "email is required",pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "invalid email address"
                }}} render={({field:{onChange, value}}) =>
                <TextField type="email" variant="outlined" label="Email" onChange={onChange} value={value}  helperText={errors.email ? errors.email.message : null} />
                }/>
                <Controller control={control} name="password" rules={{required: "password is required", minLength: { value: 8, message: "password must be at least 8 characters long"
                }}} render={({field:{onChange, value}}) =>
                <TextField type="password" variant="outlined" label="Password" onChange={onChange} value={value} helperText={errors.password ? errors.password.message : null} />
                }/>
                <Controller
                    control={control}
                    name="venueManager"
                    render={({ field }) => (
                        <label>
                        Are you a venue manager?
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                        />
                        </label>
                    )}
                    />
                <Button type="submit" variant="contained" color="primary">Register</Button>
        </form>

        </Grid>
    
        </>
     );
}

export default RegisterForm;