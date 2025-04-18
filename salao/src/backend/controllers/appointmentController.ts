import { Request, Response, NextFunction } from 'express';
import AppointmentModel from '../models/AppointmentModel'; 

export const finalizeAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { date, time, professional } = req.body;

    const appointment = await AppointmentModel.create({
      user: userId,
      date,
      time,
      professional,
    });

    res.status(201).json({ appointment });
  } catch (error) {
    next(error); // repassa o erro pro Express lidar
  }
};