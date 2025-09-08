export type LoggerTypes = {
  IP: string | null | undefined;
  status: "SUCCESS" | "WARNING" | "ERROR" | "FATAL";
  service: "NOTE" | "USER" | "AUTH" | "GENERAL";
  detail: string;
};
