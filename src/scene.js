import Phaser from 'phaser';
import CommonGameScene from '../runner/gamescene';
import logoImg from './assets/logo.png';
import sfxJoin from "./assets/playerjoin.mp3";
import sfxPush from "./assets/push.mp3";

/**
 * This is an example game scene that uses CommonGameScene to create a (local) multiplayer game.
 */
class MyGame extends CommonGameScene {
  constructor() {
    super();
    this.playerNameTags = {};
  }

  preload() {
    this.load.image('logo', logoImg);
    this.load.audio("join", sfxJoin);
    this.load.audio("push", sfxPush);
  }

  create() {
    super.create();
  }

  addPlayerSprite(playerState, profile) {
    const sprite = this.add.image(500 * Math.random(), 300 * Math.random(), 'logo');
    sprite.setOrigin(0.5, 0.5);
    sprite.setScale(0.5);

    // add text for player name
    var style = {
      font: "20px Russo One",
      fill: "#000000",
      wordWrap: true,
      align: "center",
      backgroundColor: "#ffff0033",
      padding: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 10,
      },
    };

    var text = this.add.text(
      100,
      100,
      profile ? profile.name : "Player",
      style
    );
    text.setOrigin(0.5, 0);
    this.playerNameTags[playerState.id] = text;

    this.sound.play("join");
    return sprite;
  }

  updateCommon(playerId, sprite, state) {
    const profile = state.getState("profile");
    const speed = 20;
    if (state.isKeyDown("left")) {
      sprite.x -= speed;
    }
    if (state.isKeyDown("right")) {
      sprite.x += speed;
    }
    if (state.isKeyDown("up")) {
      sprite.y -= speed;
    }
    if (state.isKeyDown("down")) {
      sprite.y += speed;
    }

    if (state.isKeyDown("b1") || state.isKeyDown("b2")) {
      this.sound.play("push");
    }

    const text = this.playerNameTags[playerId];
    text.setText(profile ? profile.name : "");
    text.x = Math.floor(sprite.x);
    text.y = Math.floor(sprite.y - (sprite.height/2) - text.height);
  }

  handlePlayerQuit(playerState) {
    if (this.playerNameTags[playerState.id]) {
      this.playerNameTags[playerState.id].destroy();
      delete this.playerNameTags[playerState.id];
    }
  }
}

export default MyGame;