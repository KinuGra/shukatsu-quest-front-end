export default class Achievement {
  public id: string;
  public questId: string;
  public stageId: string;
  public clearedAt: Date;
  constructor(id: string, questId: string, stageId: string, clearedAt: Date) {
    this.id = id;
    this.questId = questId;
    this.stageId = stageId;
    this.clearedAt = clearedAt;
  }
}
