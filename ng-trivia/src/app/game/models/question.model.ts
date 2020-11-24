export interface QuestionModel {
  _id?: string;
  question: string;
  correct_answer?: string;
  answers?: string[];
}
