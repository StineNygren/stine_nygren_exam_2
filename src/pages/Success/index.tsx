import { useLocation } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Table, TableBody, TableRow, TableCell } from '@mui/material';

function Success() {
    const location = useLocation();
    const result = location.state.result.data;
    
    const dateFrom = new Date(result.dateFrom);
    const dateTo = new Date(result.dateTo);

    const formattedDateFrom = dateFrom.toISOString().split('T')[0];
    const formattedDateTo = dateTo.toISOString().split('T')[0];

    console.log(result);
    return ( 
        <Box marginY={10}>
            <Box p={5} sx={{backgroundColor: "#FFCC6A"}} display={"flex"} alignItems={"center"} flexDirection={"column"}>
                <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'white' }} />
                <h1>Success!</h1>
            </Box>

                            <Box m={5} > 
                <Table sx={{maxWidth: "400px", margin: "0 auto"}}>
                    <TableBody>
                    <TableRow>
                        <TableCell>Venue</TableCell>
                        <TableCell>{result.venue.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>{formattedDateFrom} - {formattedDateTo}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>{result.venue.price}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Guests</TableCell>
                        <TableCell>{result.guests}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Ord Nr.</TableCell>
                        <TableCell>{result.id}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </Box>

        </Box>
     );
}

export default Success;