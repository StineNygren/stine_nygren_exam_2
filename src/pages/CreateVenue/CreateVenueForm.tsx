import { Controller, useForm } from "react-hook-form";
import { Button, Grid, TextField } from "@mui/material";
import { useCreateVenueMutation } from "../../services/api.reducer";



type FormData = {

  name: string;
  description: string;
  media: [{
    url: string;
    alt: string;
}];
  price: number;
  maxGuests: number;

};


function CreateVenueForm() {
const [createVenue] = useCreateVenueMutation();
    const onSubmit = async (data: FormData) => {
    data.price = Number(data.price);
    data.maxGuests = Number(data.maxGuests);
        try{
          const result = await createVenue(data).unwrap();
          console.log(result);
        } catch (error) {
          console.error("Failed to create the venue: ", error);
        }
    };
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({defaultValues: {name: "", description: "", media: [{url: "", alt: ""}], price: 0, maxGuests: 0}});
    return ( 
        <>
        <form onSubmit={handleSubmit(onSubmit)} >
        <Grid container direction={"column"} paddingX={5} width={450} >
                <Controller control={control} name="name" rules={{required: "name is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="Name" onChange={onChange} value={value}  helperText={errors.name ? errors.name.message : null} />
                }/>
                <Controller control={control} name="description" rules={{required: "description is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="Description" onChange={onChange} value={value}  helperText={errors.description ? errors.description.message : null} />
                }/>
                <Controller control={control}  name="media.0.url"   render={({ field }) => (
                <TextField {...field} label="Image URL" variant="outlined" margin="normal" fullWidth />
                )} />
                <Controller control={control} name="price" rules={{required: "price is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="number" variant="outlined" label="Price" onChange={onChange} value={value}  helperText={errors.price ? errors.price.message : null} />
                }/>
                <Controller control={control} name="maxGuests" rules={{required: "Maxguests is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="number" variant="outlined" label="Maxguests" onChange={onChange} value={value}  helperText={errors.maxGuests ? errors.maxGuests.message : null} />
                }/>

                <Button  type="submit" variant="contained" color="primary">Register</Button>
                </Grid>
        </form>
        </>
     );
}

export default CreateVenueForm;