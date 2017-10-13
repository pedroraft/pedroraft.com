export class Post {
  public title: string;
  public date: string;
  public tags: string[];
  public slug: string;
  public path: string;

  constructor (title: string,
               date: string,
               tags: string[],
               slug: string,
               path: string) {
    this.title = title;
    this.date = date;
    this.tags = tags;
    this.slug = slug;
    this.path = path;
  }
}
