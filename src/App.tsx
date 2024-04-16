

import { Button } from '@mui/material';
import { useGetVenuesQuery } from './services/api.reducer'



function App() {
  const { data, error, isLoading } = useGetVenuesQuery()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {data?.map((venue) => (
          <li key={venue.id}>
            {venue.name} - {venue.description}
          </li>
        ))}
        <Button variant="contained" color="primary">Primary</Button>
      </ul>

    </div>
  );
}

export default App