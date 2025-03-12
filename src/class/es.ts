export default class Es {
  id?: string;
  questId: string;
  userId: string;
  theme: string;
  answer: string;
  length: number;
  constructor(
    questId: string,
    userId: string,
    theme: string,
    answer: string,
    length: number,
  ) {
    this.questId = questId;
    this.userId = userId;
    this.theme = theme;
    this.answer = answer;
    this.length = length;
  }
}
