// ********** IMPORTS ************* */
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import * as actions from '../../actions/Actions';
// ******************************** */

// Note: This is the best way i know to query over graphql data, my way was just fetching the data,
// and then filtering it by category name in redux.
interface Params {
    type: string;
    payload: {
        productId?: string | undefined;
        categoryName?: string | undefined;
    };
}
type apiParams = {
    payload: {
        productId?: string | undefined;
        categoryName?: string | undefined;
    };
};

const apiCall = async ({
    payload: { productId = '', categoryName = 'all' },
}: apiParams): Promise<any> => {
    const graphqlQuery = {
        query: `
                query($productId: String!, $input: CategoryInput) {
                    category(input: $input) {
                        name
                        products {
                        id
                        name
                        inStock
                        gallery
                        description
                        category
                        attributes {
                            id
                            name
                            type
                            items {
                            displayValue
                            value
                            id
                            }
                        }
                        prices {
                            currency {
                            label
                            symbol
                            }
                            amount
                        }
                        brand
                        }
                    }
                    categories {
                        name
                        products {
                        name
                        id
                        gallery
                        description
                        inStock
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
                    currencies {
                        symbol
                        label
                    }
                    product(id: $productId) {
                        id
                        gallery
                        name
                        inStock
                        brand
                        prices {
                        amount
                        currency {
                            symbol
                            label
                        }
                        }
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
                        category
                        description
                    }
                    }
        
                    `,

        variables: {
            productId: productId,
            input: {
                title: categoryName,
            },
        },
    };
    const response = await axios.post('http://localhost:4000/graphql', {
        ...graphqlQuery,
    });

    return response;
};

function* getProductsSaga(action: Params): Generator {
    try {
        const {
            data: { data },
        }: any = yield call(apiCall, {
            payload: {
                productId: action.payload.productId,
                categoryName: action.payload.categoryName,
            },
        });
        yield put(actions.productData.fetchProductsSuccess(data, action.payload.categoryName));
    } catch (error) {
        yield put(actions.productData.fetchProductsFailure(error));
    }
}

export { getProductsSaga };
