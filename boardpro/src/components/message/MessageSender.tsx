import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

export const sendMessage = (boardId: string) => {
    const message = boardId;
    const client = Stomp.over(new SockJS('http://localhost:8080/stomp'));
    client.connect({}, () => {
        client.send('/app/chat', {}, JSON.stringify({ message }));
        client.disconnect(() => {
        });
    });
};