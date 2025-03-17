type QuestType = "es" | "normal";

export default class Quest {
  public id: number;
  public name: string;
  public num: number;
  public type: QuestType;
  public baseExp: number;
  constructor(
    id: number,
    name: string,
    num: number,
    type: string,
    baseExp: number,
  ) {
    this.id = id;
    this.name = name;
    this.num = num;
    this.type = type as QuestType;
    this.baseExp = baseExp;
  }
}
