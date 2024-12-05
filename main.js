const fs = require('node:fs/promises');
const fsSync = require('node:fs');
const path = require("node:path");

async function foo() {
   const baseFolder = path.join(__dirname, 'baseFolder');

   await fs.mkdir(baseFolder);
   for (let i = 0; i < 5; i++) {
      await fs.mkdir(path.join(baseFolder, `Folder_${i}`));
      for (let j = 0; j < 5; j++) {
         await fs.writeFile(path.join(baseFolder, `Folder_${i}`, `File_${j}.txt`), `text_${j * i}`);
      }
   }

   const structure = await fs.readdir(baseFolder);

   structure.forEach(item => {
      const itemPath = path.join(baseFolder, item);
      const stats = fsSync.statSync(itemPath);

      if (stats.isDirectory()) {
         console.log(`Папка: ${itemPath}`);
         listFilesAndFolders(itemPath);
      } else if (stats.isFile()) {
         console.log(`Файл: ${itemPath}`);
      }
   });
}

async function listFilesAndFolders(directory) {
   const items = await fs.readdir(directory);

   for (const item of items) {
      const itemPath = path.join(directory, item);
      const stats = fsSync.statSync(itemPath);

      if (stats.isDirectory()) {
         console.log(`Папка: ${itemPath}`);
         await listFilesAndFolders(itemPath);
      } else if (stats.isFile()) {
         console.log(`Файл: ${itemPath}`);
      }
   }
}

foo();


