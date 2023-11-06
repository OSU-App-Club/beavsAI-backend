import clerkClient from "@clerk/clerk-sdk-node";

/* 
 * This is the controller for creating a new User.
 * It is called by the route handler in routes/users.js
 */

const deleteUser = async (id) => {
      try {
            return await clerkClient.users.deleteUser(id);
      } catch (error) {
            console.log(error);
      }
}

const getAllUsers = async () => {
      try {
            return await clerkClient.users.getUserList();
      } catch (error) {
            console.log(error);
      }
}

const getSingleUser = async (id) => {
      try {
            return await clerkClient.users.getUser(id);
      } catch (error) {
            console.log(error);
      }
}

const updateUser = async (id, name, major, standing) => {
      const params = {
            first_name: name,
            publicMetadata: {
                  major: major,
                  standing: standing
            },
      };

      try {
            return await clerkClient.users.updateUser(id, params)
      } catch (error) {
            console.log(error)
      }
}

export {
      deleteUser,
      getAllUsers,
      getSingleUser,
      updateUser
};
