# Phaser 3 Playroom Template

A template for creating a Phaser 3 Playroom game.

This template provides a development environment and mock APIs for multiplayer parts that you can use to test your Phaser game locally without embedding the entire Playroom codebase.

The game is under `src/` which uses the helper code from `runner/` to start Phaser game and use keyboard inputs to simulate multiplayer controls.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

Please note that the files under `runner/` are not to be edited. Feel free to contact if you have any questions or need help with the provided API.
