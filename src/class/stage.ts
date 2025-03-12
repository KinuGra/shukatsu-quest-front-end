import Quest from "./quest";

export default class Stage {
  public id: number;
  public name: string;
  public num: number;
  public quests: Quest[];
  constructor(id: number, name: string, num: number, quests: Quest[]) {
    this.id = id;
    this.name = name;
    this.num = num;
    this.quests = quests;
  }
}
