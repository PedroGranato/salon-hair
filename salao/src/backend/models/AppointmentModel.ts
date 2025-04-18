import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
    user: mongoose.Types.ObjectId;
    date: string;
    time: string;
    professional: string;
    createdAt: Date;
}

const appointmentSchema = new Schema<IAppointment>({
    user:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date:        { type: String, required: true },
    time:        { type: String, required: true },
    professional:{ type: String, required: true },
    createdAt:   { type: Date,   default: Date.now },
});

const AppointmentModel = mongoose.model<IAppointment>(
    'Appointment',
    appointmentSchema
);

export default AppointmentModel;