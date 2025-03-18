export default class Es {
  id?: string;
  questId: string;
  userId: string;
  topic: string;
  content: string;
  charLimit: number;

  constructor(
    questId: string,
    userId: string,
    topic: string,
    content: string,
    charLimit: number 
  ) {
    this.questId = questId;
    this.userId = userId;
    this.topic = topic;
    this.content = content;
    this.charLimit = charLimit;
  }
}