const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "app", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("app", "index.html"));
});

// port 생성 서버 실행
app.listen(process.env.PORT || 3000, () => console.log("Server running ...."));