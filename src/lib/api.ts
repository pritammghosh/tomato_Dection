import { AnalysisReport, ReportSummary } from "../types";

const DEFAULT_API_BASE = "http://127.0.0.1:8000/api";

function getApiBase() {
  return (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || DEFAULT_API_BASE;
}

async function requestJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function analyzeTomatoImage(file: File, confidence: number): Promise<AnalysisReport> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("confidence", String(confidence));

  return requestJson<AnalysisReport>(`${getApiBase()}/analyze`, {
    method: "POST",
    body: formData,
  });
}

export async function getReports(): Promise<ReportSummary[]> {
  const data = await requestJson<{ reports: ReportSummary[] }>(`${getApiBase()}/reports`);
  return data.reports;
}

export async function getReport(reportId: string): Promise<AnalysisReport> {
  return requestJson<AnalysisReport>(`${getApiBase()}/reports/${reportId}`);
}

export async function getModels(): Promise<{
  detector: { path: string; name: string; active: boolean };
  classifier: { path: string | null; name: string | null; active: boolean };
}> {
  return requestJson(`${getApiBase()}/models`);
}
