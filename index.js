const { conn } = require('./src/db');
const server = require("./src/server");
const PORT = 3001;


conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  }).catch(error => console.error(error))
