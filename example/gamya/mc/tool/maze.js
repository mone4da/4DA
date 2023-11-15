// Define the dimensions of the maze
const mazeWidth = 20;
const mazeHeight = 20;

// Create a 2D array filled with walls (1s)
const maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(1));

// Define a function to generate the maze using a random walk algorithm
function generateMaze(x, y) {
  const directions = [
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
  ];
  directions.sort(() => Math.random() - 0.5);

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (
      newX >= 0 &&
      newY >= 0 &&
      newX < mazeWidth &&
      newY < mazeHeight &&
      maze[newY][newX] === 1
    ) {
      maze[newY][newX] = 0;
      maze[y + dy / 2][x + dx / 2] = 0;
      generateMaze(newX, newY);
    }
  }
}

// Start generating the maze from a random cell (must have odd coordinates)
const startX = Math.floor(Math.random() * (mazeWidth / 2)) * 2 + 1;
const startY = Math.floor(Math.random() * (mazeHeight / 2)) * 2 + 1;

generateMaze(startX, startY);

// Print the generated maze
for (const row of maze) {
  console.log(row.join(' '));
}

