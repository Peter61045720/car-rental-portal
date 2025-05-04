import { Request, Response } from 'express';
import { Car } from '../models/car.model';
import mongoose from 'mongoose';

export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find({});
    res.status(200).send(cars);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);

    if (!car) {
      res.status(404).send(`Failed to find a car: ID ${id}`);
    } else {
      res.status(200).send(car);
    }
  } catch (error) {
    res.status(500).send('Failed to find a car ' + error);
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    const { imageUrl, brand, modelName, dailyPrice, availableFrom, availableTo } = req.body;
    const newCar = new Car({ imageUrl, brand, modelName, dailyPrice, availableFrom, availableTo });

    await newCar.save();

    res.status(201).send('Car created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create a new car');
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid id');
      return;
    }

    const { imageUrl, brand, modelName, dailyPrice, availableFrom, availableTo } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
        imageUrl,
        brand,
        modelName,
        dailyPrice,
        availableFrom,
        availableTo,
      },
      { new: true }
    );

    if (!updatedCar) {
      res.status(404).send(`Failed to find a car: ID ${id}`);
    } else {
      res.status(200).send(`Updated a car: ID ${id}.`);
    }
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid id');
      return;
    }

    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      res.status(404).send(`Car not found: ID ${id}`);
    } else {
      res.status(200).send(`Removed a car: ID ${id}`);
    }
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
};
