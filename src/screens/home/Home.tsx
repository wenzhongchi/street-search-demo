import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';

import { TreeData, Search } from '../../types/types';
import { AppRoute } from '../../navigator/AppRoute';
import { AppNavigatorParams } from '../../navigator/AppNavigator';
import { AppDispatch } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import { treeActions } from '../../storage/realm';
import treeData from '../../data/tree.json';
import MapStyles from '../../styles/map.json';
import { convertRawArrayToTree } from '../../utils/dataUtils';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../constants/constant';
import SearchBar from '../../components/SearchBar/SearchBar';
import TreeListModal from '../../components/Modal/TreeListModal';
import { TreeType } from '../../storage/models/tree';
import TreeMarker from '../../components/TreeMarker/TreeMarker';
import { addSearch } from '../../store/search';

const INITIAL_REGION = {
    latitude: 40.72309177,
    longitude: -73.84421522,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

interface Props {
    navigation: StackNavigationProp<AppNavigatorParams, AppRoute.HOME>;
    route: RouteProp<AppNavigatorParams, AppRoute.HOME>;
    searches: Search[];
    addSearch: (search: Search) => void;
}

interface State {
    page: number; // use for pagination to load more
    region: Region;
    trees: TreeType[];
    selectedTree?: TreeType;
}

class HomeScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { page: 1, trees: [], region: INITIAL_REGION };
    }

    // lifeCycle

    componentDidMount() {
        const { navigation } = this.props;

        navigation.setOptions({ headerShown: false });

        const { data } = treeData as TreeData;
        console.log(Realm.defaultPath);

        treeActions
            .isEmpty()
            .then(isEmpty => {
                if (isEmpty) {
                    data.forEach(eachTree => {
                        const tree = convertRawArrayToTree(eachTree);
                        treeActions.saveTree(tree);
                    });
                }
            })
            .catch(() => {
                Alert.alert('Please restart your app.');
            });
    }

    // navigation
    navigateToDetail = (tree: TreeType) => {
        const { navigation } = this.props;
        navigation.push(AppRoute.DETAIL, { tree });
    };

    navigateToFilter = () => {
        const { navigation } = this.props;
        navigation.navigate(AppRoute.FILTER);
    };

    // functions
    getTrees = () => {
        const { page, region } = this.state;
        console.log(page);
        treeActions
            .getTreesWithRegion(region, page)
            .then(trees => {
                this.setState({ trees });
            })
            .catch(error => {
                console.log(error);
            });
    };

    onRegionChangeComplete = (region: Region) => {
        console.log(region);
        this.setState({ region });
        this.getTrees();
    };

    // render
    render() {
        const { trees, page } = this.state;

        return (
            <SafeAreaView style={styles.safeArea}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    customMapStyle={MapStyles}
                    zoomEnabled={true}
                    initialRegion={INITIAL_REGION}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
                    {trees.map(tree => (
                        <Marker
                            tracksViewChanges={false}
                            key={tree.id}
                            coordinate={{
                                longitude: tree.longitude,
                                latitude: tree.latitude,
                            }}
                            onPress={() => {
                                this.navigateToDetail(tree);
                            }}
                        >
                            <TreeMarker treeName={tree.spcCommon} />
                        </Marker>
                    ))}
                </MapView>
                <SearchBar selectOption="zipcode" onPressSelection={() => {}} onPressFilter={this.navigateToFilter} />
                <TreeListModal
                    trees={trees}
                    onPress={tree => {
                        this.navigateToDetail(tree);
                    }}
                    onLoadMore={() => {
                        this.setState({ page: page + 1 }, () => this.getTrees());
                    }}
                />
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

const mapStateToProps = ({ search: { searches } }: RootState) => ({
    searches,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    addSearch: (search: Search) => dispatch(addSearch(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
