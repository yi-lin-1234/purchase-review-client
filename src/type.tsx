export type Purchase = {
  ID: string;
  Name: string;
  Price: number;
  Amount: number;
  Category: string;
  ImageUrl: string;
  Evaluation: string;
  Link: string;
  Note: string;
  CreatedAt: string;
  DeletedAt: string | null;
  UpdatedAt: string;
};

export type Body = {
  Name: string;
  Price: number;
  Amount: number;
  Category: string;
  Evaluation: string;
  Note: string;
  ImageUrl: string;
  Link: string;
};

export type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
  }>;
};

export type GroupedDataCategory = {
  category: string;
  count: number;
};

export type GroupedDataEvaluation = {
  evaluation: string;
  count: number;
};

export type GroupedAttribute = {
  [key: string]: number;
};

export type CustomRadioGroupProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};
