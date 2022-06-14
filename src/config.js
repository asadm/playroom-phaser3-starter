import DefaultGameConfig from "../runner/defaultGameConfig";
import MyGame from "./scene";

const config = {
  ...DefaultGameConfig,
  scene: MyGame
};

console.log(config)

export default config;