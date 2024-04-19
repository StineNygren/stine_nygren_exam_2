import { useGetProfileQuery } from "../../services/api.reducer";
import { user } from "../../services/localeStorage/localeStorage";


// const ProfileDisplay: React.FC = () => {
//   const { data, error, isLoading } = useGetProfileQuery();
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   return (
//     <div>
//       <h1>{data?.name}</h1>
//       <p>{data?.email}</p>
//     </div>
//   );
// };

function ProfileDisplay() {
    const { data, error, isLoading } = useGetProfileQuery(user);
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error:</div>;
    return ( 
        <div>
            <h1>{data?.name}</h1>
            <p>{data?.email}</p>
        </div>
     );
}

export default ProfileDisplay;