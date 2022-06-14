const Mousetrap = require('mousetrap');
import SuperEventEmitter from "./superEventEmitter";
import PlayerState from "./playerState";
import PlayersConfig from "./playersConfig";

class Multiplayer extends SuperEventEmitter {
  constructor() {
    super();
    this.isHost = false;
    this.connection = false;
    this.currentRoom = false;
    this.isConnected = false;
    this.players = {};
    this.emit("connected");
    this.state = {};

    Mousetrap.bind("enter", () => {
      this._addPlayer();
    })
    Mousetrap.bind("backspace", () => {
      if (Object.keys(this.players).length >= 1) {
        const victim = Object.keys(this.players)[0];
        this.players[victim].disconnect();
        delete this.players[victim];
      }
    })
  }

  isRenderServer() {
    return true
  }

  _addPlayer() {
    const newPlayerConfig = PlayersConfig[Object.keys(this.players).length];
    if (!newPlayerConfig) return;

    this.players[newPlayerConfig.id] = new PlayerState({
      id: newPlayerConfig.id,
      keys: newPlayerConfig.keys,
      initialState: {
        profile: {
          name: newPlayerConfig.name,
          color: newPlayerConfig.color
        }
      }
    });
  }
  /*
    listenToEvents() {
      // forward some events
      this.connection.on("joined", (player) => {
        this.emit("joined", player);
      });
      this.connection.on("state", (state, key) => {
        this.emit("state", state, key);
      });
      this.connection.on("connected", () => {
        this.isConnected = true;
        this.emit("connected");
        if (this.isHost) this.emit("room_created", { id: this.currentRoom });
        // URLHash.setUrlHashParameters({room: this.currentRoom, host: this.isHost});
      });
  
      this.connection.on("reconnecting", () => {
        this.emit("reconnecting");
      });
  
      this.connection.on("permission_error", () => {
        if (this.isHost) {
          // probably the room id is owned by someone else. Create another with new id
          this.createRoom();
        } else {
          this.isConnected = false;
          this.emit("permission_error");
        }
      });
      this.connection.on("host_left", () => {
        this.isConnected = false;
        this.emit("host_left");
      });
  
      this.connection.on("disconnected", () => {
        this.isConnected = false;
        this.emit("disconnected");
      });
  
      this.connection.on("players", (players) => {
        this.emit("players", players);
      });
    }
  */
  on(eventName, handler) {
    if (eventName === "joined" && this.connection) {
      Object.keys(this.connection.playerStates).forEach((key) => {
        handler(this.connection.playerStates[key]);
      });
    }
    if (eventName === "players" && this.connection) {
      handler(this.connection.playerStates);
    }
    return super.on(eventName, handler);
  }

  getState(key) {
    if (key) return this.state[key];
    else return this.state;
  }

  setState(key, newState) {
    this.state[key] = newState;
    this.emit("state", this.state, key);
  }

  getMyPlayerState() {
    throw new Error("getMyPlayerState is not defined in shim class");
  }

  getPlayers() {
    return this.players;
  }
}

export default function createSingleton() {
  if (!window._multiplayer) {
    window._multiplayer = new Multiplayer();
  }

  return window._multiplayer;
}
