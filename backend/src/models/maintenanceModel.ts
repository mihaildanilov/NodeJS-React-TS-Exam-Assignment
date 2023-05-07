import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintenance extends Document {
	maintenanceStatus: boolean;
	maintenanceEnd: Date;
}

const MaintenanceSchema: Schema = new Schema({
	maintenanceStatus: { type: Boolean, required: true },
	maintenanceEnd: { type: Date, required: true },
});

export default mongoose.model<IMaintenance>('Maintenance', MaintenanceSchema);
