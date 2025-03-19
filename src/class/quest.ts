type QuestType = "es" | "normal";

export default class Quest {
  public id: string;
  public name: string;
  public num: number;
  public type: QuestType;
  public baseExp: number;
  public isDone?: boolean = false;
  constructor(
    id: string,
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
