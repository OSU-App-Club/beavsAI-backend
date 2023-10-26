import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from '../lib/user.js';

const router = Router();

router.get('/', async (req, res) => {
      const users = await getAllUsers();
      return res.status(200).json(users);
});

/*
 * /:id is a route parameter. We can access the value of the route parameter
 * by using req.params.id!
*/

router.get('/:id', async (req, res) => {
      const { id } = req.params;
      const user = await getSingleUser(id);
      return res.status(200).json(user);
});

router.post('/', async (req, res) => {
      const { name, major, standing } = req.body;
      const newUser = await createUser(name, major, standing);
      return res.status(201).json(newUser);
});

router.put('/:id', async (req, res) => {
      const { id } = req.params;
      const { name, major, standing } = req.body;
      const updatedUser = await updateUser(id, name, major, standing);
      return res.status(200).json(updatedUser);
});

router.delete('/:id', async (req, res) => {
      const { id } = req.params;
      const deletedUser = await deleteUser(id);
      return res.status(200).send(`User ${deletedUser.name} was deleted`);
});

export default router;