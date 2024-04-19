import ProfileDisplay from "./ProfileDisplay";
import { token } from "../../services/localeStorage/localeStorage";

function Profile() {
    console.log(token)
    return ( 
        <div>
            <ProfileDisplay />
        </div>
     );
}

export default Profile;