import socketio from "socket.io-client";

const socket = socketio("http://192.168.0.7:3333", {
  autoConnect: false
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on("new-dev", subscribeFunction);
}

function subscribeToRemoveDev(subscribeFunction) {
  socket.on("remove-dev", subscribeFunction);
}

function subscribeToUpdateDev(subscribeFunction) {
  socket.on("update-dev", subscribeFunction);
}

function connect(latitude, longitude, techs) {
  disconnect();
  socket.io.opts.query = { latitude, longitude, techs };
  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewDevs,
  subscribeToRemoveDev,
  subscribeToUpdateDev
};
