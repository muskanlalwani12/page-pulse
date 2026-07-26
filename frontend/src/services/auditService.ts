import axios from "axios";
import type { AuditResponse } from "../types/audit";

const API_URL = "https://page-pulse-tn56.onrender.com/api/audit";

export const auditWebsite = async (
  url: string
): Promise<AuditResponse> => {
  const response = await axios.post(API_URL, {
    url,
  });

  return response.data;
};