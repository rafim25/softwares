export type OperationType =
  | "SUBMISSION"
  | "OTP"
  | "DOCUMENT"
  | "PAYMENT"
  | "MEDICAL"
  | "FINANCIAL"
  | "BASIC_DETAILS"
  | "SYNC"
  | "OTHER";

export interface OperationEvent {
  _operation: string;
  _ts: string;
  type: string;
  status?: "success" | "failure" | "pending";
  attributes: string;
}

export interface GroupedOperations {
  [key: string]: OperationEvent[];
}

export const getOperationType = (operation: string): OperationType => {
  if (
    operation.toLowerCase().includes("submit") ||
    operation.toLowerCase().includes("proposal")
  ) {
    return "SUBMISSION";
  }
  if (operation.toLowerCase().includes("otp")) {
    return "OTP";
  }
  if (
    operation.toLowerCase().includes("document") ||
    operation.toLowerCase().includes("upload")
  ) {
    return "DOCUMENT";
  }
  if (operation.toLowerCase().includes("payment")) {
    return "PAYMENT";
  }
  if (
    operation.toLowerCase().includes("medical") ||
    operation.toLowerCase().includes("dogh")
  ) {
    return "MEDICAL";
  }
  if (operation.toLowerCase().includes("financial")) {
    return "FINANCIAL";
  }
  if (
    operation.toLowerCase().includes("bd") ||
    operation.toLowerCase().includes("basic")
  ) {
    return "BASIC_DETAILS";
  }
  if (operation.toLowerCase().includes("sync")) {
    return "SYNC";
  }
  return "OTHER";
};
