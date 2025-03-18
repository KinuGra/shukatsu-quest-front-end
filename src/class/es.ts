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
    topic: string,
    content: string,
    charLimit: number,
  ) {
    this.questId = questId;
    this.userId = userId;
    this.theme = topic;
    this.answer = content;
    this.length = charLimit;
  }
}
