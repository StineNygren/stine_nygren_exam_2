import { Button, TextField } from "@mui/material";
import { user } from "../../services/localeStorage/localeStorage";
import { useEditProfileMutation } from "../../services/api.reducer";
import { Controller, useForm } from "react-hook-form";

type FormData = {
    bio: string;
    avatar: {
        url: string;
        alt: string;
    };
    banner: {
        url: string;
        alt: string;
    };
    venueManager: boolean;
  };


function EditProfile() {
    const {
        control,
        handleSubmit,

    } = useForm<FormData>({defaultValues: {bio: "", avatar: { url: "", alt: "" }, banner: { url: "", alt: "" }, venueManager: false}});

    const [editProfile] = useEditProfileMutation();
    const onSubmit = async (data: FormData)=>{
        try {
            editProfile({ user: user, profile: data  });
            console.log("Profile edited")
        } catch (error) {
            console.error("Failed to edit the profile: ", error);
        }
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Edit Profile</h3>
            <Controller control={control}  name="bio" render={({ field }) => <TextField {...field} label="Bio" variant="outlined" margin="normal" fullWidth />} />
            <Controller control={control}  name="avatar.url" render={({ field }) => <TextField {...field} label="Avatar URL" variant="outlined" margin="normal" fullWidth />} />
            <Controller control={control}  name="banner.url" render={({ field }) => <TextField {...field} label="Banner URL" variant="outlined" margin="normal" fullWidth />} />
            <Controller
                    control={control}
                    name="venueManager"
                    render={({ field }) => (
                        <label>
                        Venue manager
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                        />
                        </label>
                    )}
                    />
            <Button sx={{width: 100, margin: '0 auto'}} type="submit" variant="contained" color="primary">Edit</Button>
        </form>

     );
}

export default EditProfile;