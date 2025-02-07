import { useParams } from 'react-router-dom';
import './Play.css';

function Play() {
    const { lobby } = useParams<{ lobby: string }>();

    return (
        <div>{lobby}</div>
    );
}

export default Play;
