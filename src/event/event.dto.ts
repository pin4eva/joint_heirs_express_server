export interface CreateEventInput {
  title: string;
  description: string;
  category: string;
  venue: string;
  startDate: string;
  endDate: string;
  image: string;
  isSingleDate: string;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: string;
}
