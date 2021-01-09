// standradmodul i vue som används för att manipulera filsökväger och liknane
const path = require("path");
// När devserver körs, används denna proxyn så /api pekas till localhos:5000
module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
};
