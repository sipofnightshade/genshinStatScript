const fs = require("fs");
const path = require("path");

// Function to add 'id' property as the first property of charName object
function addIdProperty(filePath) {
  try {
    const fileContent = require(filePath);
    const charName = fileContent.default || fileContent; // handle ES6 module exports

    // Add 'id' property as the first property
    charName.id = charName.name;
    const updatedContent = JSON.stringify(
      { id: charName.id, ...charName },
      null,
      2
    );

    // Write updated content back to the file
    fs.writeFileSync(filePath, `export default ${updatedContent};\n`, "utf8");

    console.log(
      `'id' property added to ${path.basename(filePath)} successfully.`
    );
  } catch (error) {
    console.error(
      `Error processing ${path.basename(filePath)}: ${error.message}`
    );
  }
}

// Directory containing the character TypeScript files
const charactersFolderPath = "./characters";

// Read files in the characters folder and add 'id' property
fs.readdir(charactersFolderPath, (err, files) => {
  if (err) {
    console.error(`Error reading folder: ${err.message}`);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith(".ts")) {
      const filePath = path.join(charactersFolderPath, file);
      addIdProperty(filePath);
    }
  });
});
