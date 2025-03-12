export default class User {
  public id: string;
  public name: string;
  public lv: number;
  public exp: number;
  constructor(id: string, name: string, lv: number, exp: number) {
    this.id = id;
    this.name = name;
    this.lv = lv;
    this.exp = exp;
  }
}
