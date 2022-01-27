// ********** IMPORTS ************* */
import { actionTypes } from '../../actions/actionTypes';
// ******************************** */

const productData = {
    fetchProducts: (productId: string | undefined, categoryName: string | undefined) => ({
        type: actionTypes.FETCH_PRODUCTS,
        payload: {
            productId,
            categoryName,
        },
    }),
    fetchProductsSuccess: (data: any, categoryName: string | undefined) => ({
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: {
            responseData: data,
            categoryName: categoryName,
        },
    }),
    fetchProductsFailure: (error: any) => ({
        type: actionTypes.FETCH_PRODUCTS_FAILURE,
        payload: {
            error: error,
        },
    }),

    categoryChange: (category: string) => ({
        type: actionTypes.CATEGORY_SELECTED,
        payload: {
            categoryName: category,
        },
    }),

    changeCurrency: (currency: string, symbol: string) => ({
        type: actionTypes.CHANGE_CURRENCY,
        payload: {
            currency: currency,
            symbol: symbol,
        },
    }),

    addToCart: (id: string, attributes: string[] | undefined) => ({
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: id,
            selectedAttrs: attributes,
        },
    }),

    removeFromCart: (id: string) => ({
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: id,
        },
    }),

    // notificationCounter: (counter: number) => ({
    //     type: actionTypes.NOTIFICATION_COUNTER,
    //     payload: {
    //         count: counter,
    //     },
    // }),

    totalPriceAndCartItemCount: () => ({
        type: actionTypes.TOTAL_PRICE_AND_CART_ITEM_COUNT,
    }),
    increaseItemQuantity: (id: string, index: number) => ({
        type: actionTypes.INCREASE_ITEM_QUANTITY,
        payload: {
            id: id,
            index: index,
        },
    }),
    decreaseItemQuantity: (id: string, index: number) => ({
        type: actionTypes.DECREASE_ITEM_QUANTITY,
        payload: {
            id: id,
            index: index,
        },
    }),

    redirectWarning: () => ({
        type: actionTypes.REDIRECT_WARNINGS,
    }),
};

export { productData };
