export const saveHighestScore = (level, score) => {
  const highestScoreKey = `level_${level}_highest_score`;
  const highestScore = parseInt(localStorage.getItem(highestScoreKey), 10);

  if (isNaN(highestScore) || score > highestScore) {
    localStorage.setItem(highestScoreKey, score);
    console.log(`New highest score for level ${level}: ${score}`);
  }
};

export const saveHighestFinalScore = () => {
  const finalScore = calculateFinalScore();
  const highestFinalScoreKey = "highest_final_score";
  const highestFinalScore = parseInt(
    localStorage.getItem(highestFinalScoreKey),
    10
  );

  if (isNaN(highestFinalScore) || finalScore > highestFinalScore) {
    localStorage.setItem(highestFinalScoreKey, finalScore);
    console.log(`New highest final score: ${finalScore}`);
  }
};

export const calculateFinalScore = () => {
  let finalScore = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("level_") && key.endsWith("_highest_score")) {
      finalScore += parseInt(localStorage.getItem(key), 10) || 0;
    }
  }
  return finalScore;
};

export const getHighestScore = (level) => {
  const highestScoreKey = `level_${level}_highest_score`;
  return parseInt(localStorage.getItem(highestScoreKey), 10) || 0;
};

export const getHighestFinalScore = () => {
  const highestFinalScoreKey = "highest_final_score";
  return parseInt(localStorage.getItem(highestFinalScoreKey), 10) || 0;
};