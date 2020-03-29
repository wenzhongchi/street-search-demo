import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { Product, TreeData } from '../../types/types';
import { AppRoute } from '../../navigator/AppRoute';
import { AppNavigatorParams } from '../../navigator/AppNavigator';
import { addToCart } from '../../store/cart';
import { AppDispatch } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import { treeActions } from '../../storage/realm';
import treeData from '../../data/tree.json';
import MapStyles from '../../styles/map.json';
import { convertRawArrayToTree } from '../../utils/dataUtils';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../constants/constant';
import SearchBar from '../../components/SearchBar/SearchBar';
import TreeListModal from '../../components/Modal/TreeListModal';

interface Props {
    navigation: StackNavigationProp<AppNavigatorParams, AppRoute.HOME>;
    route: RouteProp<AppNavigatorParams, AppRoute.HOME>;
    count: number;
    addToCart: (product: Product) => void;
}

class HomeScreen extends Component<Props> {
    componentDidMount() {
        const { navigation } = this.props;

        navigation.setOptions({ headerShown: false });

        const { data } = treeData as TreeData;
        console.log(Realm.defaultPath);
        // data.forEach(eachTree => {
        //     const tree = convertRawArrayToTree(eachTree);
        //     treeActions.saveTree(tree);
        // });
    }

    navigateToDetail = () => {
        const { navigation } = this.props;
        navigation.push(AppRoute.DETAIL);
    };

    render() {
        const {} = this.props;

        return (
            <SafeAreaView style={styles.safeArea}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    customMapStyle={MapStyles}
                    zoomEnabled={true}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                ></MapView>
                <SearchBar />
                <TreeListModal />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const mapStateToProps = ({ cart }: RootState) => ({
    count: cart.count,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    addToCart: (product: Product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
