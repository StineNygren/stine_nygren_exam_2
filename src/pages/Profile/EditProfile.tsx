import * as React from 'react';
import { Button, TextField, Box } from "@mui/material";
import { user } from "../../services/localeStorage/localeStorage";
import { useEditProfileMutation } from "../../services/api.reducer";
import { Controller, useForm } from "react-hook-form";
import Modal from '@mui/material/Modal';
import { ProfileResponse } from '../../types/types';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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

  interface EditProfileProps {
    profile: ProfileResponse;
    refetch: () => void;
  }

function EditProfile({profile, refetch} : EditProfileProps){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(profile)

    const defaultFormData: FormData = {
        bio: profile.bio || "",
        avatar: profile.avatar || { url: "", alt: "" },
        banner: profile.banner || { url: "", alt: "" },
        venueManager: profile.venueManager || false
    };

    const {
        control,
        handleSubmit,

    } = useForm<FormData>({defaultValues: {...defaultFormData}});

    const [editProfile] = useEditProfileMutation();
    const onSubmit = async (data: FormData)=>{
        try {
            await editProfile({ user: user, profile: data  });
            localStorage.setItem('isManager', JSON.stringify(data.venueManager));
            console.log("Profile edited")
            handleClose()
            refetch();
            window.location.reload();
        } catch (error) {
            console.error("Failed to edit the profile: ", error);
        }
    }

    return ( 
        <div>
        <Button variant='contained' onClick={handleOpen}>Edit</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
  
              
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
          </Box>
        </Modal>
      </div>


     );
}

export default EditProfile;