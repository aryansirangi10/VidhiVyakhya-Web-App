export interface SourceSpan {
  page: number;
  snippet: string;
  x0?: number;
  top?: number;
  x1?: number;
  bottom?: number;
  page_width?: number;
  page_height?: number;
}

export interface Rule {
  id: number;
  clause_number: string;
  clause_text: string;
  rule_type: string;
  source_span?: SourceSpan;
  confidence: number;
  reviewed: boolean;
  reviewed_by?: string;
  reviewed_at?: string;
  rule_version?: number;
  is_demo_rule?: boolean;
}

export interface TimelineStage {
  stage: string;
  completed: boolean;
  current?: boolean;
  date?: string | null;
}

export interface Bill {
  id: number;
  title: string;
  summary: string;
  source_url?: string;
  pdf_path?: string;
  status: string;
  current_stage: string;
  reading_time: number;
  pages: number;
  ministry: string;
  bill_number?: string;
  category: string;
  pdf_size?: string;
  sponsor?: string;
  created_at?: string;
  rules?: Rule[];
  timeline?: TimelineStage[];
}
