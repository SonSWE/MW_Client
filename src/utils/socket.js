import { w3cwebsocket as W3CWebSocket } from "websocket";
import { constHostAddressConfig } from "./constData";
import { useDispatch, useSelector } from "react-redux";
import { triggerEvent } from "./utils";

export const wsReadyState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
  ERROR: 4,
};
// let wsClient = null;
let lastMsgTime = 0;
let checkAliveIntervalId = 0;

export const connectWS = () => {
  try {
    // let wsClient = new W3CWebSocket(constHostAddressConfig.WsHostAddress);
    // wsClient?.close();
    let wsClient = null;

    triggerEvent({
      name: "update-connect-status",
      data: wsReadyState.CONNECTING,
    });
    // dispatch({ type: "SET_CONNECTSTATUS", payload: "0" });
    if (wsClient === null || wsClient?.readyState === wsReadyState.CLOSED) {
      wsClient = new W3CWebSocket(constHostAddressConfig.WsHostAddress);

      wsClient.onopen = () => {
        triggerEvent({
          name: "update-connect-status",
          data: wsReadyState.OPEN,
        });
        // sendMessage(1);

        lastMsgTime = new Date().getTime();
        checkAliveIntervalId = setInterval(() => {
          if (new Date().getTime() - lastMsgTime > 30000) {
            wsClient?.close();
          }
        }, 1000);
      };
      wsClient.onmessage = (evt) => {
        lastMsgTime = new Date().getTime();

        triggerEvent({
          name: "socket-message",
          data: JSON.parse(evt.data),
        });
        // console.log("socket-message: ", JSON.parse(evt.data));
      };
      wsClient.onerror = (evt) => {
        triggerEvent({
          name: "update-connect-status",
          data: wsReadyState.ERROR,
        });
        console.log("Socket connect failed");
        wsClient.close();
      };
      wsClient.onclose = (evt) => {
        console.log(
          "Socket is closed. Reconnect will be attempted in 1 second.",
        );
        triggerEvent({
          name: "update-connect-status",
          data: wsReadyState.CLOSED,
        });
        setTimeout(function () {
          connectWS();
        }, 1000);
      };
    }
  } catch (error) {
    console.error("socket error:", error);
  }
};

// const onClose = () => {
//   // clearInterval(checkAliveIntervalId);
//   triggerEvent({
//     name: "update-connect-status",
//     data: wsReadyState.CLOSED,
//   });
//   connectWS();
// };
