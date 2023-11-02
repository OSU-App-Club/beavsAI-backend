import mongoose from "mongoose";

/*
 * To be honest, with our OAuth provider, we don't really need a User model.
 * However, we may want to add some additional fields to our User that isn't 
 * provided by our OAuth provider for Beavs.ai, so we'll create a User model for now.
*/
const UserSchema = new mongoose.Schema({
      /* 
       * required: true means that the field is mandatory to "create" a new User
       * in mongodb, the primary key "_id" is automatically generated
       * mongoose types: https://mongoosejs.com/docs/schematypes.html#what-is-a-schematype
      */
      name: {
            type: String,
            required: true,
      },
      major: {
            type: String,
            required: true,
      },
      standing: {
            type: String,
            required: true,
      }
}, { versionKey: false })

const User = mongoose.model("User", UserSchema)

export default User