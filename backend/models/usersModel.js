import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 32,
			unique: true,
			index: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		profile: {
			type: String,
			required: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		salt: String,
		about: String,
		role: {
			type: Number,
			trim: true,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		resetPasswordLink: {
			data: String,
			default: '',
		},
	},
	{
		timestamp: true,
	}
);

userSchema.methods = {
	authenticate: function (plainPassword) {
		return this.encryptPassword(plainPassword) === this.hashedPassword;
	},
	encryptPassword: function (password) {
		if (!password) {
			return '';
		}
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
		} catch (error) {
			return '';
		}
	},
	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + '';
	},
};

userSchema
	.virtual('password')
	.set(function (password) {
		// Create temporary '_password' variable
		this._password = password;
		// Generate salt
		this.salt = this.makeSalt();
		// Encrypt password
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

const User = mongoose.model('User', userSchema);

export default User;
