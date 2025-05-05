import { Extra } from './../models/extra.model';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getAllExtras = async (req: Request, res: Response) => {
  try {
    const extras = await Extra.find({});
    res.status(200).send(extras);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const getExtraById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const extra = await Extra.findById(id);

    if (!extra) {
      res.status(404).send(`Failed to find an extra: ID ${id}`);
    } else {
      res.status(200).send(extra);
    }
  } catch (error) {
    res.status(500).send('Failed to find an extra ' + error);
  }
};

export const createExtra = async (req: Request, res: Response) => {
  try {
    const { name, description, dailyPrice } = req.body;
    const newExtra = new Extra({ name, description, dailyPrice });

    await newExtra.save();

    res.status(201).send('Extra created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create a new extra');
  }
};

export const updateExtra = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid id');
      return;
    }

    const { name, description, dailyPrice } = req.body;

    const updatedExtra = await Extra.findByIdAndUpdate(
      id,
      { name, description, dailyPrice },
      { new: true }
    );

    if (!updatedExtra) {
      res.status(404).send(`Failed to find an extra: ID ${id}`);
    } else {
      res.status(200).send(`Updated an extra: ID ${id}.`);
    }
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const deleteExtra = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid id');
      return;
    }

    const deletedExtra = await Extra.findByIdAndDelete(id);

    if (!deletedExtra) {
      res.status(404).send(`Extra not found: ID ${id}`);
    } else {
      res.status(200).send(`Removed an extra: ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};
