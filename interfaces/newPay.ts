export interface NewPay {
    amount_in_cents: number;
    currency: string;
    customer_email: any;
    payment_method: {
        installments: number;
    };
    reference: string;
    payment_source_id: any;
    recurrent: boolean;
}