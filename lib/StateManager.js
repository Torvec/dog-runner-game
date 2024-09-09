export class StateManager {
  constructor(game) {
    this.game = game;
    this.currentState = null;
  }
  setState(state) {
    this.currentState = state;
    if (state.type === "level") {
      this.game.currentLevel = state;
      this.game.currentMenu = null;
    } else if (state.type === "menu") {
      this.game.currentMenu = state;
      this.game.currentLevel = null;
    }
  }
  render(deltaTime, c) {
    this.currentState.update(deltaTime);
    this.currentState.draw(c);
  }
}