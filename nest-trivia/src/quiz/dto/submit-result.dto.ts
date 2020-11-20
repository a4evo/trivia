export interface SubmitResultDto {
  name?: string;
  score?: number;
  answers?: {
    question?: string;
    correct?: boolean;
  }[];
}
