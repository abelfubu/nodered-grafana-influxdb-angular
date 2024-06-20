export interface GrafanaHttpResponse {
  results: Results;
}

export interface Results {
  A: A;
}

export interface A {
  status: number;
  frames: Frame[];
}

export interface Frame {
  schema: Schema;
  data: Data;
}

export interface Data {
  values: (null | number | number)[][];
}

export interface Schema {
  name: string;
  refId: string;
  meta: Meta;
  fields: Field[];
}

export interface Field {
  name: string;
  type: string;
  typeInfo: TypeInfo;
  config?: Config;
}

export interface Config {
  displayNameFromDS: string;
}

export interface TypeInfo {
  frame: string;
  nullable?: boolean;
}

export interface Meta {
  typeVersion: number[];
  preferredVisualisationType: string;
  executedQueryString: string;
}
