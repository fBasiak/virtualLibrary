export interface IBook {
  id: number ;
  author?: string;
  title?: string | null;
  publisher?: string | null;
  publicationYear?: string;
  available?: boolean;
}

export class Book implements IBook {
  constructor(
    public id: number,
    public author?: string,
    public title?: string | null,
    public publisher?: string | null,
    public publicationYear?: string,
    public available?: boolean,
  ) {}
}
