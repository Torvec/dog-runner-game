// Checks collision between two rectangles x and y positions and their width and height to determine if they are overlapping
export const checkCollision = (entity1, entity2) => {
  return (
    entity1.x < entity2.x + entity2.width &&
    entity1.x + entity1.width > entity2.x &&
    entity1.y < entity2.y + entity2.height &&
    entity1.y + entity1.height > entity2.y
  );
};

// Loads JSON data from a file path and returns the parsed JSON data
export const loadJsonData = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(
        `Failed to load JSON data from ${filePath}: ${response.statusText}`
      );
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
