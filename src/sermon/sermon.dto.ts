export interface CreateSermonInput {
  videoLink: string;
  audioLink: string;
  body: string;
  image: string;
  date: string;
  title: string;
  sermonBy: string;
}

export interface UpdateSermonInput extends Partial<CreateSermonInput> {
  id: string;
}
