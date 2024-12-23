import { IUserWithoutPass } from '@erist-opt/shared';

export interface IFeedBack {
  id: string;
  user: IUserWithoutPass;
  text: string;
  status: boolean;
}

export interface ICreateFeedBack {
  userId: string;
  text: string;
}

export interface IFeedBackId {
  id: string;
}
