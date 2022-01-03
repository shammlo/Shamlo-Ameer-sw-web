import axios from 'axios';

const fetchData = async (productId: string = '') => {
    const response = await axios.post(`http://localhost:4000/`, {
        query: `
                query ($productId: String! ="${productId ? productId : 'ps-5'}") {
                categories {
                    name
                }
                currencies {
                    label
                }
                category{
                    name
                    products {
                    id
                    name
                    inStock
                    gallery
                    description
                    category
                    attributes {
                        items {
                        id
                        value
                        displayValue
                        }
                        type
                        name
                        id
                    }
                    prices {
                        amount
                        currency {
                        symbol
                        label
                        }
                    }
                    brand
                    }
                }
                product(id: $productId) {
                    id
                    name
                    gallery
                    description
                    inStock
                    category
                    attributes {
                    name
                    id
                    items {
                        id
                        value
                        displayValue
                    }
                    type
                    }
                    brand
                    prices {
                    amount
                    currency {
                        symbol
                        label
                    }
                    }
                }
                }
                    `,
    });

    return response.data;
};

export { fetchData };
