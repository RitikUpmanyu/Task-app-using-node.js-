const express = require("express");
require("./db/mongoose");
const mongoose = require("mongoose");

const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

const app = express();
const port = process.env.PORT || 3000;

//maintanance mode
// app.use((req, res, next) => {
// 	res.status(503).send("Site is under Maintanance. Check back later");
// });

// const multer = require("multer");
// const upload = multer({
// 	dest: "Images",
// });
// app.post("/upload", upload.single("upload"), (req, res) => {
// 	res.send();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// const router = new express.Router()
// router.get("/test", (req, res)=>{
// 	res.send("This is from my other router")
// })
// app.use(router)

app.listen(port, () => {
	console.log("server up on PORT " + port);
});
