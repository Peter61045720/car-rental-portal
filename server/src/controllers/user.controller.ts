import { Request, Response } from 'express';
import { User } from '../models/user.model';
import mongoose from 'mongoose';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).send(`Failed to find a user: ID ${id}`);
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send('Failed to find a user ' + error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid id');
      return;
    }

    const { username, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).send(`Failed to find a user: ID ${id}`);
    } else {
      res.status(200).send(`Updated a user: ID ${id}.`);
    }
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid id');
      return;
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).send(`User not found: ID ${id}`);
    } else {
      res.status(200).send(`Removed a user: ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};
