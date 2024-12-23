export interface ISocialHref {
  id: string;
  href: string;
  name: string;
  sortOrder: number;
}

export interface SocialHrefsProps {
  socialHrefs: ISocialHref[];
}
