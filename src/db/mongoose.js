//to initialize the database --> /Users/ritik/mongodb/bin/mongod.exe --dbpath=/Users/ritik/mongodb-data
const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// });

//mongodb atlas!!!!!
mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
