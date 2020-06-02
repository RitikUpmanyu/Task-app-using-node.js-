const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			trim: true,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

// const T1 = new Task({
// 	description: "do work",
// });

// T1.save()
// 	.then(() => {
// 		console.log(T1);
// 	})
// 	.catch((error) => {
// 		console.log("error", error);
// 	});
