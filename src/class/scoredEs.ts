import Es from "./es";

export class Category {
  name: string;
  score: number;
  fullScore: number;
  comment: string;
  constructor(name: string, score: number, fullScore: number, comment: string) {
    this.name = name;
    this.score = score;
    this.fullScore = fullScore;
    this.comment = comment;
  }
}

export default class scoredEs extends Es {
  public categories: Category[];
  public allScore: number;
  public correction: string;
  public correctionComment: string;

  constructor(
    es: Es,
    categories: Category[],
    allScore: number,
    correction: string,
    correctionComment: string,
  ) {
    super(es.questId, es.userId, es.content, es.topic, es.charLimit);
    this.categories = categories;
    this.allScore = allScore;
    this.correction = correction;
    this.correctionComment = correctionComment;
  }
}
