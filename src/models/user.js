const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			validate(value) {
				if (validator.isEmail(value)) {
					throw new Error("Can't use email as username");
				}
			},
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is Invalid");
				}
			},
		},
		age: {
			type: Number,
			default: 0,
			validate(value) {
				if (value < 0) {
					throw new Error("Age must be a positive number");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 7,
			validate(value) {
				if (value.toLowerCase().includes("password")) {
					throw new Error("password is Invalid");
				}
			},
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		avatar: {
			type: Buffer,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.virtual("userTasks", {
	ref: "Task",
	localField: "_id",
	foreignField: "author",
});

//methods are accsesible on instances of model
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString() },
		process.env.JWT_SECRET
	);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

userSchema.methods.toJSON = function () {
	const user = this;
	const userObj = user.toObject();

	delete userObj.password;
	delete userObj.tokens;
	delete userObj.avatar;

	return userObj;
};

//static method are accsesible on model as a whole
userSchema.statics.findByCredentials = async (input, password) => {
	let user = undefined;
	if (validator.isEmail(input)) {
		user = await User.findOne({ email: input });
	} else {
		user = await User.findOne({ name: input });
	}

	if (user == undefined) {
		throw new Error("unable to login");
	}
	const isMatch = await bycrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Unable to login");
	}
	return user;
};

// binding plays a role so cant use aarow functions
userSchema.pre("save", async function (next) {
	//'this' is the document being saved
	const user = this;

	if (user.isModified("password")) {
		user.password = await bycrypt.hash(user.password, 8);
	}

	next();
});
//delete user taks when user is removed
userSchema.pre("remove", async function (next) {
	//'this' is the document being saved
	const user = this;
	await Task.deleteMany({ author: user._id });

	next();
});

const User = mongoose.model("User", userSchema);

// const me = new User({
// 	name: "    Ritik",
// 	email: "  Rick@gmail.com",
// 	password: "     word",
// });

// me.save()
// 	.then(() => {
// 		console.log(me);
// 	})
// 	.catch((error) => {
// 		console.log("error", error);
// 	});

module.exports = User;
