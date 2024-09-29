// Checks collision between two rectangles x and y positions and their width and height to determine if they are overlapping
export const checkCollision = (entity1, entity2) => {
  return (
    entity1.position.x < entity2.position.x + entity2.width &&
    entity1.position.x + entity1.width > entity2.position.x &&
    entity1.position.y < entity2.position.y + entity2.height &&
    entity1.position.y + entity1.height > entity2.position.y
  );
};

// Score saving functions
export const saveHighScore = (level, score) => {
  const highScoreKey = `${level}_high_score`;
  const highScore = parseInt(localStorage.getItem(highScoreKey), 10);
  if (isNaN(highScore) || score > highScore) {
    localStorage.setItem(highScoreKey, score);
  }
};

export const saveFinalScore = () => {
  const finalScore = calculateFinalScore();
  const finalScoreKey = "final_score";
  const highFinalScore = parseInt(localStorage.getItem(finalScoreKey), 10);
  if (isNaN(highFinalScore) || finalScore > highFinalScore) {
    localStorage.setItem(finalScoreKey, finalScore);
  }
};

const calculateFinalScore = () => {
  let finalScore = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("LV") && key.endsWith("_high_score")) {
      finalScore += parseInt(localStorage.getItem(key), 10) || 0;
    }
  }
  return finalScore;
};

export const getHighScore = (level) => {
  const highScoreKey = `${level}_high_score`;
  return parseInt(localStorage.getItem(highScoreKey), 10) || 0;
};

export const getFinalScore = () => {
  const finalScoreKey = "final_score";
  return parseInt(localStorage.getItem(finalScoreKey), 10) || 0;
};

export const clearScores = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.endsWith("_high_score") || key === "final_score") {
      localStorage.removeItem(key);
    }
  }
}
