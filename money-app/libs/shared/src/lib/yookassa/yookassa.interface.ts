export interface YooKassaPayment {
  id: string;
  status: string;
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  authorization_details: {
    rrn: string;
    auth_code: string;
    three_d_secure: {
      applied: boolean;
    };
  };
  created_at: string;
  description: string;
  expires_at: string;
  metadata: Record<string, any>;
  payment_method: {
    type: string;
    id: string;
    saved: boolean;
    card: {
      first6: string;
      last4: string;
      expiry_month: string;
      expiry_year: string;
      card_type: string;
      issuer_country: string;
      issuer_name: string;
    };
    title: string;
  };
  recipient: {
    account_id: string;
    gateway_id: string;
  };
  refundable: boolean;
  test: boolean;
  income_amount: {
    value: string;
    currency: string;
  };
}

interface Amount {
  value: string;
  currency: string;
}

interface Confirmation {
  type: string;
  confirmation_url: string;
}

interface Metadata {
  order_id: string;
}

interface Recipient {
  account_id: string;
  gateway_id: string;
}

export interface YooKassaRespose {
  id: string;
  status: string;
  paid: boolean;
  amount: Amount;
  confirmation: Confirmation;
  created_at: string;
  description: string;
  metadata: Metadata;
  recipient: Recipient;
  refundable: boolean;
  test: boolean;
}
