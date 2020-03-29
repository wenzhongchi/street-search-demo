import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Product, Cart } from '../types/types';
import { AppThunk } from './store';

interface CartState {
    count: number;
    carts: Cart[];
    error: string | null;
}

export interface ProductPayload {
    product: Product;
}

export interface CartPayload {
    cart: Cart;
}

interface CartErrorState {
    error: string | null;
}

const INITIAL_STATE: CartState = {
    count: 0,
    carts: [],
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        add: (state, action: PayloadAction<ProductPayload>) => {
            const { product } = action.payload;

            // find existing product
            let cartItem = _.find(state.carts, { id: product.id });

            if (cartItem) {
                _.remove(state.carts, { id: product.id });
                cartItem.total += 1;
                state.carts.push(cartItem);
            } else {
                cartItem = { ...product, total: 1 };
                state.carts.push(cartItem);
            }

            state.count += 1;
        },
        cartSuccess: state => {
            state.error = null;
        },
        cartFailure: (state, action: PayloadAction<CartErrorState>) => {
            const { error } = action.payload;
            state.error = error;
        },
        remove: (state, action: PayloadAction<CartPayload>) => {
            const { cart } = action.payload;
            let cartItem = _.find(state.carts, { id: cart.id });
            state.carts = state.carts.filter(eachCart => eachCart.id !== cart.id);

            if (cartItem) {
                state.count -= cartItem.total;
            }
        },
    },
});

export const { add, cartSuccess, cartFailure, remove } = cartSlice.actions;
export default cartSlice.reducer;

export const addToCart = (product: Product): AppThunk => async dispatch => {
    try {
        dispatch(add({ product }));
        cartSuccess();
    } catch (err) {
        dispatch(cartFailure(err.toString()));
    }
};

export const removeFromCart = (cart: Cart): AppThunk => async dispatch => {
    try {
        dispatch(remove({ cart }));
        cartSuccess();
    } catch (err) {
        dispatch(cartFailure(err.toString()));
    }
};
