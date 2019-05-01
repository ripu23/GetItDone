export interface Request {
    toAddress: string;
    fromAddress: string;
    description: string;
    zip: string;
    phone: string;
    city: string;
    rate: string;
    negotiable: boolean;
    lat: string;
    lng: string;
    createdAt: number;
    status: string;
}
