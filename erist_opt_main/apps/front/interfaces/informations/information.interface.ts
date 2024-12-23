export interface IInformation {
  id: string;
  name: string;
  title: string;
  content: string;
  status: boolean;
}

export interface InformationPageProps {
  information: IInformation;
}

export interface InformationLinksProps {
  informations: IInformation[];
}
