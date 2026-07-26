export interface AuditReport {
  status: number;
  responseTime: number;
  title: string;
  metaDescription: string;
  h1Count: number;
  imagesWithoutAlt: number;
  wordCount: number;
}

export interface AuditResponse {
  success: boolean;
  data: AuditReport;
}