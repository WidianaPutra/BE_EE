export type LoggerTypes = {
  IP: string | null | undefined;
  status: "SUCCESS" | "WARNING" | "ERROR" | "FATAL";
  service: "PRODUCT" | "USER" | "AUTH";
  detail: string;
};
