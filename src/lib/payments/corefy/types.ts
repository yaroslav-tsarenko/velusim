export type CorefyStatus =
  | "pending"
  | "processing"
  | "processed"
  | "process_failed"
  | "authorize_failed"
  | "expired"
  | "terminated"
  | "refunded"
  | "chargeback"
  | "reversed"
  | string;

export interface CorefyCustomerPayload {
  reference_id: string;
  email: string;
  name: string;
  first_name: string;
  surname: string;
  phone: string;
  address: {
    full_address: string;
    country: string; // 2-letter ISO code: NO, SE, GB, etc.
    city: string;
    street: string;
    post_code: string;
  };
}

export interface CorefyCreateInvoiceRequest {
  data: {
    type: "payment-invoices";
    attributes: {
      reference_id: string;
      amount: number;
      currency: string;
      service: string;
      flow: "charge";
      test_mode: boolean;
      description: string;
      customer: CorefyCustomerPayload;
      return_url: string;
      return_urls: {
        success: string;
        pending: string;
        fail: string;
      };
      callback_url: string;
      metadata: {
        transaction_ref: string;
        source: string;
      };
    };
  };
}

export interface CorefyInvoiceAttributes {
  reference_id: string;
  amount: number;
  currency: string;
  service?: string;
  flow?: string;
  status: CorefyStatus;
  resolution?: string;
  test_mode?: boolean;
  processed_amount?: number;
  processed_currency?: string;
  hpp_url?: string;
  flow_data?: {
    action?: string;
    method?: string;
    params?: Record<string, unknown>;
  };
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface CorefyInvoiceResource {
  id: string;
  type: string;
  attributes: CorefyInvoiceAttributes;
}

export interface CorefyApiResponse<T = CorefyInvoiceResource> {
  data: T;
  errors?: Array<{
    code?: string;
    title?: string;
    detail?: string;
    source?: { pointer?: string };
  }>;
}

export interface CorefyWebhookPayload {
  data: CorefyInvoiceResource;
  event?: string;
}
