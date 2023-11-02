import User from "../models/User.js";

/* 
 * This is the controller for creating a new User.
 * It is called by the route handler in routes/users.js
 */

const createUser = async (name, major, standing) => {
      const newUser = new User({ name, major, standing });
      try {
            await newUser.save();
            return newUser;
      } catch (error) {
            console.log(error)
      }
}

const deleteUser = async (id) => {
      try {
            const deleted = await User.findByIdAndDelete(id);
            return deleted;
      } catch (error) {
            console.log(error);
      }
}

const getAllUsers = async () => {
      try {
            const users = await User.find();
            return users;
      } catch (error) {
            console.log(error);
      }
}

const getSingleUser = async (id) => {
      try {
            const user = await User.findById(id);
            return user;
      } catch (error) {
            console.log(error);
      }
}

const updateUser = async (id, name, major, standing) => {
      try {
            await User.findOneAndUpdate(
                  { _id: id }, 
                  { name, major, standing }
            );
            return User.findById(id);
      } catch (error) {
            console.log(error)
      }
}

export {
      createUser,
      deleteUser,
      getAllUsers,
      getSingleUser,
      updateUser
};
