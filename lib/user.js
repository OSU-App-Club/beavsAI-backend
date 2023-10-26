import User from "../models/User.js";

/* 
 * This is the controller for creating a new User.
 * It is called by the route handler in routes/users.js
 */

const createUser = async (req, res) => {
      const { name, major, standing } = req.body;
      const newUser = new User({ name, major, standing });
      try {
            await newUser.save();
            return res.status(201).json(newUser);
      } catch (error) {
            return res.status(500).json({ error: error.message })
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

const getAllUsers = async (req, res) => {
      try {
            const users = await User.find();
            return res.status(200).json(users);
      } catch (error) {
            return res.status(500).send(error.message);
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

const editFieldForUser = async (id, field, value) => {
      try {
            const user = await User.findById(id);
            user[field] = value;
            await user.save();
            return user;
      } catch (error) {
            console.log(error);
      }
}

const updateUser = async (req, res) => {
      const { id } = req.params;
      const { name, major, standing } = req.body;
      try {
            Promise.all([
                  editFieldForUser(id, "name", name),
                  editFieldForUser(id, "major", major),
                  editFieldForUser(id, "standing", standing)
            ]);
            return res.status(200).json(updated);
      } catch (error) {
            return res.status(500).send(error.message);
      }
}

export {
      createUser,
      deleteUser,
      getAllUsers,
      getSingleUser,
      updateUser
};
