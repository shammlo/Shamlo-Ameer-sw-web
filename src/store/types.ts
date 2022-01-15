type Attribute = {
    displayValue: string;
    value: string;
    id: string;
};
type Currency = {
    label: string;
    symbol: string;
};
export type Price = {
    currency: Currency;
    amount: number;
};
type Attributes = {
    id: string;
    name: string;
    type: string;
    items: [Attribute];
};

export type ProductType = {
    id: string;
    name: string;
    inStock: boolean;
    gallery: [string];
    description: string;
    category: string;
    attributes: [Attributes];
    prices: [Price];
    brand: string;
    quantity: number | undefined;
};
