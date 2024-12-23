export interface ILogAdmin {
  id: string;
  service: string;
  admin: string;
  text: string;
  registred: Date;
  additionalData?: Record<string, any> | Array<Record<string, any>>;
}

export interface ICreateLogAdmin {
  service: string;
  admin: string;
  text: string;
  additionalData?: Record<string, any> | Array<Record<string, any>>;
}
