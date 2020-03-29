import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product, Note } from '../../types/types';
import { AppRoute } from '../../navigator/AppRoute';
import { AppNavigatorParams } from '../../navigator/AppNavigator';
import { addToCart } from '../../store/cart';
import { AppDispatch } from '../../store/store';
import { RootState } from '../../store/rootReducer';

interface Props {
    navigation: StackNavigationProp<AppNavigatorParams, AppRoute.DETAIL>;
    route: RouteProp<AppNavigatorParams, AppRoute.DETAIL>;
    notes: Note[];
    addToCart: (product: Product) => void;
}

class NoteScreen extends Component<Props> {
    componentDidMount() {
        const { navigation } = this.props;

        navigation.setOptions({
            headerRight: () => <Button onPress={() => {}} title="Add" color="black" />,
        });
    }

    navigateToCart = () => {
        const { navigation } = this.props;
        navigation.push(AppRoute.DETAIL);
    };

    render() {
        const { navigation, notes } = this.props;

        return <SafeAreaView style={styles.safeArea}></SafeAreaView>;
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    row: { flex: 1, justifyContent: 'space-around' },
});

const mapStateToProps = ({ note }: RootState) => {
    return {
        notes: note.notes,
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addToCart: (product: Product) => dispatch(addToCart(product)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteScreen);
