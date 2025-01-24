const User = require("../model/userModel");
const bcrypt = require("bcrypt"); 

module.exports.register = async (req, res, next) => {
   try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) return res.json({ msg: "Username already used", status: false });

      const emailCheck = await User.findOne({ email });
      if (emailCheck) return res.json({ msg: "Email already used", status: false }); 

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
         email,
         username,
         password: hashedPassword,
      });
      delete user.password; 
      return res.json({ status: true, user });
   } catch (ex) {
      next(ex);
   }
};

module.exports.login = async (req, res, next) => {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.json({ msg: "Incorrect username or password", status: false });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.json({ msg: "Incorrect username or password", status: false });

      delete user.password; // Remove password from the user object before sending it
      return res.json({ status: true, user });
   } catch (ex) {
      next(ex);
   }
};

module.exports.setAvatar = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { avatarImage } = req.body;

      if (!avatarImage) {
         return res.status(400).json({ msg: "Avatar image is required." });
      }

      const userData = await User.findByIdAndUpdate(
         id,
         {
            isAvatarImageSet: true,
            avatarImage,
         },
         { new: true }
      );

      if (!userData) {
         return res.status(404).json({ msg: "User not found." });
      }

      return res.status(200).json({
         isSet: userData.isAvatarImageSet,
         image: userData.avatarImage,
      });
   } catch (ex) {
      next(ex);
   }
};

module.exports.getAllUsers = async (req, res, next) => {
   try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
         "email",
         "username",
         "avatarImage",
         "_id",
      ]);
      return res.json(users);
   } catch (ex) {
      next(ex);
   }
};
