import {useState} from "react";
import { Card } from "react-bootstrap";

interface Props {
    text: string
}
const HoverableCardText = ({ text }: Props) => {
    const [hover, setHover] = useState(false);

    return (
        <Card.Text
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                borderRadius: '15px',
                backgroundColor: hover ? '#555' : '#696969',
                padding: '1em',
                color: 'white',
                marginBottom: '1em'
            }}
        >
            {text}
        </Card.Text>
    );
};

export default HoverableCardText;