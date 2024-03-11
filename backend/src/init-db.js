const { initDB } = require("./util/db-util.js");

(async () => {
  try {
    await initDB();
    console.log("database initialized");
  } catch (error) {
    console.error('Error:', error);
  }
})();

console.log("hi");