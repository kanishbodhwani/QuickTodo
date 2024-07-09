export interface Poll {
  startTime: Date;
  endTime: Date;
  options: Options[];
}

export interface Options {
  id: string;
  text: string;
  order: number;
  image?: string;
  voteCount: number;
  isSelected: boolean;
}
