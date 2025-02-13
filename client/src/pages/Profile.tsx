import { TextField } from "@mui/material";
import "./Profile.css";
import { useUser } from "../context/UserContext";

export default function Profile() {
    const { user } = useUser();

    return (
        <div className="profile-page">
            <div className="settings">
                <h2>Profile</h2>
                <div style={{ width: '100%', display: 'flex', marginBottom: 12, justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="profile-image">
                        <img src="https://avatars.githubusercontent.com/u/104318152?v=4&size=64"></img>
                        <i className="bi bi-pencil-fill edit"></i>
                    </div>
                    <TextField defaultValue={user?.displayName} label="Display name" sx={{ flex: 1, ml: '16px' }} />
                </div>
                <TextField defaultValue={user?.email} disabled label="Email" sx={{ mt: '12px' }} />
                <TextField multiline maxRows={4} rows={4} label="Bio" sx={{ my: '12px' }} />
                <div style={{ display: 'flex' }}>
                    <div className="save">Save</div>
                    <div className="save discard">Discard</div>
                </div>
            </div>
        </div>
    );
}
