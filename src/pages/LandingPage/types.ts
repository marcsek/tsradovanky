export interface ListValue {
  value: string;
  id: number;
}

export type ListValues = ListValue[];

export type bClickActions = { type: "add"; value: string } | { type: "remove"; idx?: number };
