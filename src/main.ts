import "./style.css";
import { connectToServer } from "./socket-client.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
      <h2>Websocket - Client</h2>
      <input id="jwt-token" placeholder="Json Web Token" />
      <button id="btn-connect">Connect</button>

      <br/>
      <span id="server-status"></span>

      <ul id="clients-ul"></ul>

      <form id="msg-form">
        <input placeholder="message" id="msg-input"/>
      </form>

      <h3>Messages</h3>
      <ul id="msg-ul"></ul>
  </div>
`;

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
// connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token")!;
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!;

btnConnect.addEventListener("click", () => {
  if (jwtToken.value.trim().length <= 0) return;
  connectToServer(jwtToken.value.trim());
});
