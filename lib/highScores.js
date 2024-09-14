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
    if (key.startsWith("Level-") && key.endsWith("_high_score")) {
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
