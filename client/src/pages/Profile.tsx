import { CircularProgress, styled, TextField } from "@mui/material";
import "./Profile.css";
import { useUser } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Cookie from 'js-cookie';
import Success from "../components/Success";
import urlJoin from "url-join";
import { resizeImage } from "../util/image-util";

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
                borderColor: secondary
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
    const { user, login } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [imgState, setImgState] = useState<'none' | 'edit' | 'confirm'>('none');
    const prevImgState = useRef<'none' | 'edit' | 'confirm'>('none');
    const [state, setState] = useState<'none' | 'saving' | 'saved' | 'error'>('none');
    const [image, setImage] = useState('');
    const displayNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setDisplayName(user?.displayName || '');
        setBio(user?.bio || '');
        setImage(user?.profileImg || '');
    }, [user]);

    useEffect(() => {
        prevImgState.current = imgState;
    }, [imgState]);

    let displayNameError = '';
    if (displayName.length < 3 || displayName.length > 60) {
        displayNameError = 'Name must be at least 3 characters long';
    }

    function exit() {
        const params = new URLSearchParams(location.search);
        if (params.get('justCreated') === 'true') {
            navigate('/');
        } else {
            navigate(-1);
        }
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
                bio,
                profileImg: image
            })
        });
        if (resp.ok) {
            setState('saved');
            if (user) {
                login({ ...user, profileImg: image, bio, displayName });
            }
            setTimeout(() => setState('none'), 1000);
        } else {
            setState('error');
        }
    }

    function uploadImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.addEventListener('change', () => {
            const file = input.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (ev) => {
                    if (ev.target?.result) {
                        setImage(await resizeImage(ev.target.result as string, 512));
                        setImgState('confirm');
                    }
                };
                reader.readAsDataURL(file);
            }
        });

        input.click();
    }

    function clickEditImage() {
        if (!user || user.isGuest) {
            return;
        }
        setImgState('edit');
    }

    function cancelImgUpdate(ev: MouseEvent) {
        ev.stopPropagation();
        setImage(user?.profileImg || '');
        setImgState('none');
    }

    return (
        <div className="profile-page">
            <div className="settings">
                <h2>Profile</h2>
                <div className="profile-form">
                    {
                        {
                            none: (
                                <div onClick={clickEditImage} className={`profile-image ${prevImgState.current !== 'none' && 'anim'}`}>
                                    {
                                        image ?
                                            <img src={image} alt="profile"></img> :
                                            <i className="bi bi-person-fill"></i>
                                    }
                                    {
                                        user && !user.isGuest && <i className="bi bi-pencil-fill edit"></i>
                                    }
                                </div>
                            ),
                            edit: (
                                <div onClick={uploadImage} className={`profile-img-open ${prevImgState.current === 'none' && 'anim'}`}>
                                    <div className="profile-img-drag">
                                        <i className="bi bi-cloud-arrow-up"></i>
                                    </div>
                                    <div onClick={cancelImgUpdate} className="cancel"><i className="bi bi-x"></i></div>
                                </div>
                            ),
                            confirm: (
                                <div className="profile-confirm">
                                    <img src={image}></img>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', left: 0, bottom: 0, right: 1, backgroundColor: '#a5a5a5a5', paddingBottom: 2 }}>
                                        <div onClick={() => setImgState('none')} className="profile-confirm-btn">Confirm</div>
                                        <div onClick={() => setImgState('edit')} className="profile-confirm-btn">Retry</div>
                                    </div>
                                </div>
                            )
                        }[imgState]
                    }

                    <div className="profile-name-container">
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
                                width: 'calc(100% - 16px)',
                                ml: '16px',
                                mt: '4px',
                                ...textFieldStyle(!!displayNameError)
                            }}
                        />
                        <div className="counter-profile">{displayName.length} / 60</div>
                        {displayNameError && <div className="input-error">{displayNameError}</div>}
                    </div>

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

                <div style={{ position: 'relative' }}>
                    <TextField
                        value={bio}
                        onChange={(ev) => setBio(ev.target.value)}
                        disabled={!user || user?.isGuest}
                        multiline
                        rows={4}
                        label="Bio"
                        sx={{ my: '12px', width: '100%', ...textFieldStyle(false) }}
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
                    <div onClick={exit} className="save discard">Cancel</div>
                </div>
            </div>
        </div>
    );
}
