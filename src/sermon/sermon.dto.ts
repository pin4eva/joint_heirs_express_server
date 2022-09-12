export interface CreateSermonInput {
  videoLink: string;
  audioLink: string;
  text: string;
  imageTumbnail: string;
  date: string;
  time: string;
  title: string;
  sermonBy: string;
}

export interface UpdateSermonInput extends Partial<CreateSermonInput> {
  id: string;
}
