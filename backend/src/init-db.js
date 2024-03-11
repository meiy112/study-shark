const { initDB } = require("./util/db-util.js");

(async () => {
  try {
    await initDB();
    console.log("finished initializing database");
  } catch (error) {
    console.error('Error:', error);
  }
})();