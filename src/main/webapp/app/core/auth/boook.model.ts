export class Book {
  constructor(
    public id: bigint,
    public title: string,
    public author: string,
    public available: boolean,
    public publication_year: string | null,
    public publisher: string ,
  ) {}
}
