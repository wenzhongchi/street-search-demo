import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Cart } from '../../types/types';
import { AppRoute } from '../../navigator/AppRoute';
import { AppNavigatorParams } from '../../navigator/AppNavigator';
import { AppDispatch } from '../../store/store.js';
import { RootState } from '../../store/rootReducer.js';
import { removeFromCart } from '../../store/cart';
import CartItem from '../../components/CartItem';

interface Props {
    navigation: StackNavigationProp<AppNavigatorParams, AppRoute.BOOKMARK>;
    route: RouteProp<AppNavigatorParams, AppRoute.BOOKMARK>;
    carts: Cart[];
    removeFromCart: (cart: Cart) => void;
}

class CartScreen extends Component<Props> {
    navigateToCart = () => {
        const { navigation } = this.props;
        navigation.push(AppRoute.DETAIL);
    };

    render() {
        const { carts, removeFromCart } = this.props;

        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {carts.map(cart => {
                        return <CartItem cartItem={cart} key={cart.id} onPress={() => removeFromCart(cart)} />;
                    })}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 },
});

const mapStateToProps = ({ cart }: RootState) => {
    return {
        carts: cart.carts,
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        removeFromCart: (cart: Cart) => dispatch(removeFromCart(cart)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
