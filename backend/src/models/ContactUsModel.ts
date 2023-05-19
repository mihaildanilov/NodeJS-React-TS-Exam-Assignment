import { modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { User } from './UserModel';

@modelOptions({ schemaOptions: { timestamps: true } })
export class ContactUs {
	public _id!: string;
	@prop({ ref: User })
	public user?: Ref<User>;
	@prop({ required: true })
	public subject!: string;
	@prop({ required: true })
	public customersMessage!: string;
	@prop({ required: true, default: false })
	public isAnswered!: boolean;
	@prop()
	public replyMessage!: string;
	@prop()
	public sentAt!: Date;
	@prop()
	public answeredAt!: Date;
}

export const ContactUsModel = getModelForClass(ContactUs);
