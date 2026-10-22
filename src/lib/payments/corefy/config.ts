import "server-only";

export interface CorefyConfig {
  appUrl: string;
  apiUrl: string;
  accountId: string;
  apiKey: string;
  webhookSecret: string;
  serviceCode: string;
  signatureAlgorithm: string;
  logEnabled: boolean;
  testMode: boolean;
}

export function getCorefyConfig(): CorefyConfig {
  const appUrl = (process.env.APP_URL || "http://localhost:1022").replace(/\/+$/, "");
  const apiUrl = (process.env.COREFY_API_URL || "https://api.sterling-pay.com").replace(/\/+$/, "");
  const accountId = process.env.COREFY_ACCOUNT_ID || "";
  const apiKey = process.env.COREFY_API_KEY || "";
  const webhookSecret = process.env.COREFY_WEBHOOK_SECRET || "";
  const serviceCode = process.env.COREFY_SERVICE_CODE || "payment_card_eur_hpp";
  const signatureAlgorithm = process.env.COREFY_SIGNATURE_ALGORITHM || "corefy";
  const logEnabled = process.env.COREFY_LOG_ENABLED !== "false";
  const testMode = process.env.COREFY_TEST_MODE === "true";

  return {
    appUrl,
    apiUrl,
    accountId,
    apiKey,
    webhookSecret,
    serviceCode,
    signatureAlgorithm,
    logEnabled,
    testMode,
  };
}
