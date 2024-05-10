import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      hola: "mundo",
      authentication: token,
    },
  });

  socket?.removeAllListeners();
  socket = manager.socket("/");
  addListener();
};

const addListener = () => {
  const serverStatusLabel = document.querySelector("#server-status")!;
  const clientListLabel = document.querySelector("#clients-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>("#msg-form")!;
  const messageInput = document.querySelector<HTMLInputElement>("#msg-input")!;
  const messagesUl = document.querySelector<HTMLUListElement>("#msg-ul")!;

  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "connected";
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
    serverStatusLabel.innerHTML = "disconnect";
  });

  socket.on("client-list", (clients: string[]) => {
    console.log(clients);
    let clientsHtml = "";

    clients.forEach((clientId) => {
      clientsHtml += `
        <li>${clientId}</li>
        `;
    });

    clientListLabel.innerHTML = clientsHtml;
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-client", {
      fullName: "Yooo",
      message: messageInput.value,
    });

    messageInput.value = "";
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      console.log(payload);

      let msgsHtml = "";

      const newMessages = `
          <li>
            <strong>${payload.fullName}</strong>
            <span>${payload.message}</span>
          </li>
          `;

      const li = document.createElement("li");
      li.innerHTML = newMessages;
      messagesUl.append(li);
    }
  );
};
