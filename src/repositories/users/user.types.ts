import { Document } from 'mongoose';
import { IUser } from '../../interfaces/user.interface';

export interface UserDocument extends IUser, Document {}
