export interface productsType  {
    id: number;
    title?: string;
    description?: string;
    category?: string;
    price?: number | undefined;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    tags?: string[];
    sku?: string;
    weight?: number;
    dimensions?: {
        width?: number;
        height?: number;
        depth?: number;
    },
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: [
        {
            rating?: number;
            comment?: string,
            date?: Date;
            reviewerName?: string;
            reviewerEmail?: string;
        }
    ],
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: {
        createdAt?: Date;
        updatedAt?: Date;
        barcode?: number;
        qrCode?: string;
    },
    images?: string[];
    thumbnail?: string
}