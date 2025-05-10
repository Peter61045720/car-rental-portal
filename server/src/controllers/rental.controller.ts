import { Rental } from './../models/rental.model';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getAllRentals = async (req: Request, res: Response) => {
  try {
    const rentals = await Rental.find({});
    res.status(200).send(rentals);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const getRentalsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const rentals = await Rental.find({ userId });

    if (rentals.length === 0) {
      res.status(404).send(`No rentals found for user ID ${userId}`);
    }

    res.status(200).send(rentals);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const getRentalById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const rental = await Rental.findById(id);

    if (!rental) {
      res.status(404).send(`Failed to find a rental: ID ${id}`);
    } else {
      res.status(200).send(rental);
    }
  } catch (error) {
    res.status(500).send('Failed to find a rental ' + error);
  }
};

export const createRental = async (req: Request, res: Response) => {
  try {
    const { userId, carId, extras, startDate, endDate, totalPrice } = req.body;
    const newRental = new Rental({ userId, carId, extras, startDate, endDate, totalPrice });

    await newRental.save();

    res.status(201).send('Rental created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create a new rental');
  }
};

export const updateRental = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid id');
      return;
    }

    const { userId, carId, extras, startDate, endDate, totalPrice } = req.body;

    const updatedRental = await Rental.findByIdAndUpdate(
      id,
      { userId, carId, extras, startDate, endDate, totalPrice },
      { new: true }
    );

    if (!updatedRental) {
      res.status(404).send(`Failed to find a rental: ID ${id}`);
    } else {
      res.status(200).send(`Updated a rental: ID ${id}.`);
    }
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const deleteRental = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid id');
      return;
    }

    const deletedRental = await Rental.findByIdAndDelete(id);

    if (!deletedRental) {
      res.status(404).send(`Rental not found: ID ${id}`);
    } else {
      res.status(200).send(`Removed a rental: ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};
