import { CircularProgress, styled, TextField } from "@mui/material";
import "./Profile.css";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Cookie from 'js-cookie';
import Success from "../components/Success";
import urlJoin from "url-join";

function textFieldStyle(error: boolean) {
    const border = error ? 'var(--color-error)' : 'var(--color-card-border)';
    const secondary = error ? 'var(--color-error)' : 'var(--color-secondary)';
    return {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: border
            },
            '&:hover fieldset': {
                borderColor: secondary
            },
            '&.Mui-focused fieldset': {
                borderColor: border
            }
        },
        '& .MuiInputLabel-root': {
            color: border
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: secondary
        }
    };
}

export default function Profile() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [state, setState] = useState<'none' | 'saving' | 'saved' | 'error'>('none');
    const displayNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setDisplayName(user?.displayName || '');
        setBio(user?.bio || '');
    }, [user]);

    let displayNameError = '';
    if (displayName.length < 3 || displayName.length > 60) {
        displayNameError = 'Name must be at least 3 characters long';
    }

    async function save() {
        if (displayNameError) {
            if (displayNameRef.current) {
                displayNameRef.current.focus();
            }
            return;
        }
        setState('saving');
        const resp = await fetch(urlJoin(import.meta.env.VITE_API_ROOT, '/api/v1/user/' + user?.id), {
            method: 'PATCH',
            headers: {
                Authorization: Cookie.get('accessToken') || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                displayName,
                bio
            })
        });
        if (resp.ok) {
            setState('saved');
        } else {
            setState('error');
        }
    }

    return (
        <div className="profile-page">
            <div className="settings">
                <h2>Profile</h2>
                <div className="profile-form">
                    <div className="profile-image">
                        {
                            user?.profileImg ?
                                <img src={user?.profileImg} alt="profile"></img> :
                                <i className="bi bi-person-fill"></i>
                        }
                        <i className="bi bi-pencil-fill edit"></i>
                    </div>

                    <TextField
                        inputRef={displayNameRef}
                        value={displayName}
                        onChange={(ev) => setDisplayName(ev.target.value)}
                        disabled={!user || user?.isGuest}
                        label="Display name"
                        inputProps={{
                            maxLength: 60
                        }}
                        sx={{
                            flex: 1,
                            ml: '16px',
                            ...textFieldStyle(!!displayNameError)
                        }}
                    />
                    <div className="counter-profile">{displayName.length} / 60</div>
                    {displayNameError && <div className="input-error">{displayNameError}</div>}

                </div>
                <TextField
                    defaultValue={user?.email}
                    disabled
                    label="Email"
                    sx={{ mt: '12px' }}
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />

                <div style={{ width: '100%', position: 'relative' }}>
                    <TextField
                        value={bio}
                        onChange={(ev) => setBio(ev.target.value)}
                        disabled={!user || user?.isGuest}
                        multiline
                        rows={4}
                        label="Bio"
                        sx={{ my: '12px', width: '100%' }}
                        inputProps={{ maxLength: 400 }}
                    />
                    <div className="counter-profile bottom">{bio.length} / 400</div>
                </div>

                <div style={{ display: 'flex' }}>
                    <div
                        onClick={save}
                        className="save"
                        style={{
                            backgroundColor: state === 'error' ?
                                'var(--color-error)' :
                                'var(--color-secondary)'
                        }}
                    >
                        {
                            {
                                none: 'Save',
                                saving: <CircularProgress sx={{ '& .MuiCircularProgress-svg': { color: 'white', margin: '8px' } }} />,
                                saved: <Success color="var(--color-text-on-primary)" width={2} size={32} />,
                                error: <div>Error!</div>
                            }[state]
                        }
                    </div>
                    <div onClick={() => navigate(-1)} className="save discard">Discard</div>
                </div>
            </div>
        </div>
    );
}
