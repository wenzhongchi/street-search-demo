import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import { AppRoute } from '../../navigator/AppRoute';
import { AppNavigatorParams } from '../../navigator/AppNavigator';
import { addBookmark, removeBookmark } from '../../store/bookmark';
import { AppDispatch } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import MapStyles from '../../styles/map.json';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../constants/constant';
import TreeMarker from '../../components/TreeMarker/TreeMarker';
import Colors from '../../styles/colors';
import TreeImage from '../../components/TreeImage/TreeImage';
import { capitalizeTreeName } from '../../utils/dataUtils';
import { Bookmark } from '../../types/types';

Icon.loadFont();

interface Props {
    navigation: StackNavigationProp<AppNavigatorParams, AppRoute.DETAIL>;
    route: RouteProp<AppNavigatorParams, AppRoute.DETAIL>;
    bookmarks: Bookmark[];
    addBookmark: (bookmark: Bookmark) => void;
    removeBookmark: (bookmark: Bookmark) => void;
}

class DetailScreen extends Component<Props> {
    componentDidMount() {
        const { navigation } = this.props;
        navigation.setOptions({ headerShown: false });
    }

    isBookmarked = (): boolean => {
        const { bookmarks, route } = this.props;
        const { tree } = route.params;
        const bookmark = _.find(bookmarks, { treeId: tree.id });
        if (bookmark) {
            return true;
        }
        return false;
    };

    handleBookmark = () => {
        const { removeBookmark, addBookmark, route } = this.props;
        const { tree } = route.params;
        const bookmark = { treeId: tree.id, name: tree.spcLatin, address: tree.address, image: tree.spcCommon };
        if (this.isBookmarked()) {
            removeBookmark(bookmark);
        } else {
            addBookmark(bookmark);
        }
    };

    render() {
        const { navigation, route } = this.props;
        const { tree } = route.params;
        const isBookmarked = this.isBookmarked();

        return (
            <SafeAreaView style={styles.safeArea}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    customMapStyle={MapStyles}
                    initialRegion={{
                        latitude: tree.latitude,
                        longitude: tree.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker
                        key={tree.id}
                        coordinate={{
                            longitude: tree.longitude,
                            latitude: tree.latitude,
                        }}
                    >
                        <TreeMarker treeName={tree.spcCommon} />
                    </Marker>
                </MapView>
                <TouchableOpacity
                    style={styles.arrow}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="ios-arrow-round-back" size={40} />
                </TouchableOpacity>
                <View style={{ flex: 1, marginTop: 225 }}>
                    <View style={styles.row}>
                        <View style={styles.imageContainer}>
                            <TreeImage name={capitalizeTreeName(tree.spcCommon)} size={40} color={Colors.green} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.nameText}>{tree.spcLatin}</Text>
                            <Text style={styles.addressText}>{tree.spcCommon}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <FontIcon name="map" size={25} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.nameText}>{tree.address}</Text>
                            <Text style={styles.addressText}>{`${tree.zipCity} ${tree.state} ${tree.zipcode}`}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={[
                        styles.bookmark,
                        { backgroundColor: isBookmarked ? Colors.buttonRemove : Colors.buttonAdd },
                    ]}
                    onPress={this.handleBookmark}
                >
                    <Text style={{ fontSize: 20, color: Colors.white }}>
                        {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
    },
    map: {
        top: 0,
        left: 0,
        right: 0,
        height: 250,
        position: 'absolute',
    },
    arrow: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    imageContainer: {
        height: 50,
        width: 50,
        marginLeft: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: Colors.imageBorder,
        borderWidth: 1,
    },
    iconContainer: {
        height: 50,
        width: 50,
        marginLeft: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 20,
    },
    nameText: {
        color: Colors.black,
        fontSize: 14,
        marginBottom: 5,
    },
    addressText: {
        color: Colors.lightGray,
        fontSize: 13,
    },
    bookmark: {
        marginHorizontal: 30,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = ({ bookmark: { bookmarks } }: RootState) => ({
    bookmarks,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    addBookmark: (bookmark: Bookmark) => dispatch(addBookmark(bookmark)),
    removeBookmark: (bookmark: Bookmark) => dispatch(removeBookmark(bookmark)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
