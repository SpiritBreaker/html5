package websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/ws")
public class WebSocketTest {
	private static final List<Session> sessions = new ArrayList<Session>();

	@OnMessage
	public void onMessage(String message, Session session) throws IOException, InterruptedException {
		System.out.println("Received from web browser: " + message);

		// Send the first message to the client
		session.getBasicRemote().sendText("Hi,web browser, i have received message["+message+"]");

		// Send 3 messages to the client every 5 seconds
		int sentMessages = 0;
		while (sentMessages < 3) {
			Thread.sleep(5000);
			session.getBasicRemote().sendText("Server Info has updated=" + sentMessages);
			sentMessages++;
		}
	}

	@OnOpen
	public void onOpen(Session session) {
		sessions.add(session);
		System.out.println("Client connected");
	}

	@OnClose
	public void onClose(Session session,CloseReason closeReason) {
		sessions.remove(session);
		for(Session s : sessions){
            try {
                s.getBasicRemote().sendText(String.valueOf(closeReason.getCloseCode()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
		System.out.println("Connection closed "+closeReason.getReasonPhrase());
	}
}