export type Lang = 'zh' | 'en';

export interface Node {
  id: string;
  type: 'user' | 'llm' | 'db' | 'tool' | 'agent' | 'manager';
  label: string;
  x: number;
  y: number;
}

export interface Flow {
  id: string;
  from: string;
  to: string;
  label: string;
  sequence: number;
  dotted?: boolean;
}

export interface Stage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  nodes: Node[];
  flows: Flow[];
}
