type QuestType = "es" | "normal";

export default class Quest {
  public id: number;
  public name: string;
  public num: number;
  public type: QuestType;
  constructor(id: number, name: string, num: number, type: string) {
    this.id = id;
    this.name = name;
    this.num = num;
    this.type = type as QuestType;
  }
}
