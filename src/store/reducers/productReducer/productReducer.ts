// ********** IMPORTS ************* */
import { ProductType, Price } from '../../types';
import { actionTypes } from './../../actions/actionTypes';

// ******************************** */

interface Actions {
    type: string;
    payload: {
        responseData: any;
        error: any;
        category: string;
        currency: string;
        symbol: string;
        id: string | any;
        selectedAttrs: string[];
        count: number;
        price: number;
        totalPrice: number;
        categoryName: string;
        index: number;
    };
}
// *** INITIAL STATE ***
const initialState = {
    // *** PRODUCTS ***
    products: [],
    loading: true,
    error: null,
    categories: null,
    productName: null,
    currency: null,
    currencyValue: 'USD',
    currencySymbol: '$',
    selectedCurr: 'USD',
    selectedCategory: 'all',
    notificationCount: 0,
    totalPrice: 0,
    categoryName: 'all',
    cartItems: 0,
    redirect: false,

    // *** CART ***
    cart: [],
    selectedAttrs: [],
};

const productReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        // ----------------------------------------------------------------
        // *** FETCHING PRODUCTS ***
        case actionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                loading: true,
                error: null,
            };

        // ----------------------------------------------------------------
        // *** FETCHING PRODUCTS SUCCESSFUL ***
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            const cur = action.payload.responseData.category.products[0].prices;
            const currency: string[] = [];
            for (const p of cur) {
                currency.push(p.currency);
            }

            return {
                ...state,
                loading: false,

                products: action.payload.responseData.category.products,

                productName: action.payload.responseData.category.name,
                currency: action.payload.responseData.currencies,
                categories: action.payload.responseData.categories.map((category: any) => {
                    return Object.keys(category).filter(
                        (category: any) => category.name === action.payload.categoryName
                    );
                }),
            };

        // ----------------------------------------------------------------
        // *** FETCHING PRODUCTS FAILED ***
        case actionTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        // ----------------------------------------------------------------
        // *** CURRENCY CHANGE ***
        case actionTypes.CHANGE_CURRENCY:
            return {
                ...state,
                currencyValue: action.payload.currency,
                currencySymbol: action.payload.symbol,
                selectedCurr: state.products.map((item: ProductType) => {
                    item.prices.filter(
                        (item: Price) => item.currency.label === action.payload.currency
                    );
                    return {
                        ...item,
                        prices: item.prices.filter(
                            (item: Price) => item.currency.label === action.payload.currency
                        ),
                    };
                }),

                cart: state.cart.map((item: ProductType) => {
                    const selectedCurrency = item.prices.find(
                        (prices: Price) => prices.currency.label === action.payload.currency
                    ) as Price;
                    return {
                        ...item,
                        total: selectedCurrency.amount * item.quantity,
                    };
                }),
            };
        // ----------------------------------------------------------------
        // - Select Category
        case actionTypes.CATEGORY_SELECTED:
            return {
                ...state,
                categoryName: action.payload.categoryName,
            };
        // ----------------------------------------------------
        // ********** CART ************* */
        case actionTypes.ADD_TO_CART:
            // -- CHECK IF PRODUCT ALREADY IN CART ***
            const inCart = state.cart.find((item: ProductType) => {
                return item.id === action.payload.id &&
                    item.selectedAttrs === action.payload.selectedAttrs
                    ? true
                    : false;
            });

            // --- GET THE ITEM FROM THE PRODUCT ARRAY ***
            const addedItem: any = state.products?.find(
                (item: ProductType) => item.id === action.payload.id
            );

            const selectedCur = addedItem.prices.find((price: Price) =>
                price.currency.label === state.currencyValue ? price.amount : 0
            );
            return {
                ...state,

                // -- Old way, if no duplicate wanted in cart
                // cart: inCart
                //     ? state.cart.map((item: ProductType) => {
                //           const selectedCurrency: any = item.prices.find((price: Price) =>
                //               price.currency.label === state.currencyValue ? price.amount : 0
                //           );

                //           return item.id === action.payload.id
                //               ? {
                //                     ...item,
                //                     quantity: (item.quantity as number) + 1,
                //                     total:
                //                         ((item.quantity as number) + 1) *
                //                         // addedItem.prices.find(
                //                         //     (price: Price) =>
                //                         //         price.currency.label === state.currencyValue
                //                         // )?.amount,
                //                         selectedCurrency.amount,
                //                     selectedAttrs: action.payload.selectedAttrs,
                //                 }
                //               : item;
                //       })
                //     : [
                //           ...state.cart,
                //           {
                //               ...addedItem,
                //               quantity: 1,
                //               selectedAttrs: action.payload.selectedAttrs,
                //               total: selectedCur.amount,
                //           },
                //       ],

                cart: inCart
                    ? state.cart.map((item: ProductType) => {
                          const selectedCurrency: any = item.prices.find((price: Price) =>
                              price.currency.label === state.currencyValue ? price.amount : 0
                          );

                          return item.id === action.payload.id &&
                              item.selectedAttrs === action.payload.selectedAttrs
                              ? {
                                    ...item,
                                    quantity: (item.quantity as number) + 1,
                                    total:
                                        ((item.quantity as number) + 1) *
                                        // addedItem.prices.find(
                                        //     (price: Price) =>
                                        //         price.currency.label === state.currencyValue
                                        // )?.amount,
                                        selectedCurrency.amount,
                                    selectedAttrs: action.payload.selectedAttrs,
                                }
                              : item;
                      })
                    : [
                          ...state.cart,
                          {
                              ...addedItem,
                              quantity: 1,
                              selectedAttrs: action.payload.selectedAttrs,
                              total: selectedCur.amount,
                          },
                      ],
                // : [
                //       ...state.cart,
                //       {
                //           ...addedItem,
                //           quantity: 1,
                //           selectedAttrs: action.payload.selectedAttrs,
                //           total: selectedCur.amount,
                //       },
                //   ],
                selectedAttrs: action.payload.selectedAttrs,
            };

        // ----------------------------------------------------------------
        // *** REMOVE FROM CART ***
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item: ProductType) => item.id !== action.payload.id),
            };

        // ----------------------------------------------------------------
        // *** TOTAL PRICE ***
        case actionTypes.TOTAL_PRICE_AND_CART_ITEM_COUNT:
            let items = 0;
            let price = 0;
            let currentCount = 0;
            state.cart.forEach((item: ProductType) => {
                const selectedCurr = item.prices.find((price: Price) =>
                    price.currency.label === state.currencyValue ? price.amount : 0
                ) as Price;

                items += item.quantity;
                price += item.quantity * selectedCurr.amount;
                currentCount += item?.quantity;
            });
            return {
                ...state,
                totalPrice: price,
                cartItems: items,
                notificationCount: currentCount,
            };

        // ----------------------------------------------------------------
        // *** INCREASE ITEM QUANTITY ***
        case actionTypes.INCREASE_ITEM_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((item: ProductType, index: number) => {
                    const selectedCurrency: any = item.prices.find((price: Price) =>
                        price.currency.label === state.currencyValue ? price.amount : 0
                    );

                    return index === action.payload.index
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                              total: (item.quantity + 1) * selectedCurrency.amount,
                          }
                        : item;
                }),
            };

        // ----------------------------------------------------------------
        // *** DECREASE ITEM QUANTITY ***
        case actionTypes.DECREASE_ITEM_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((item: ProductType, index: number) => {
                    const selectedCurrency = item.prices.find((price: Price) =>
                        price.currency.label === state.currencyValue ? price.amount : 0
                    ) as Price;
                    return index === action.payload.index
                        ? {
                              ...item,
                              quantity: item.quantity - 1,
                              total: (item.quantity - 1) * selectedCurrency.amount,
                          }
                        : item;
                }),
            };
        // ----------------------------------------------------------------
        // ** Redirect to PLP **

        case actionTypes.REDIRECT_WARNINGS:
            return {
                ...state,
                redirect: true,
            };

        default:
            return state;
    }
};

export { productReducer };
