export interface Request {
    id?: string;
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
    raisedBy: string;
    userId: string;
    createdAt: number;
}
