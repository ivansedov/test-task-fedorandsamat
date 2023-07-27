export interface Page {
  key: string;
  level: number;
  name: string;
  link: string;
  parentKey?: string;
  childPageKeys?: string[];
}