import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from '../../navigator/AppRoute';
import { AppNavigatorParams } from '../../navigator/AppNavigator';
import { AppDispatch } from '../../store/store.js';
import { RootState } from '../../store/rootReducer.js';
import { addBookmark, removeBookmark } from '../../store/bookmark';
import { Bookmark } from '../../types/types';

interface Props {
    navigation: StackNavigationProp<AppNavigatorParams, AppRoute.BOOKMARK>;
    route: RouteProp<AppNavigatorParams, AppRoute.BOOKMARK>;
    bookmarks: Bookmark[];
    addBookmark: (bookmark: Bookmark) => void;
    removeBookmark: (bookmark: Bookmark) => void;
}

class FilterScreen extends Component<Props> {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Text
                        style={{ alignSelf: 'center' }}
                    >{`Will Implement Filters if have more time, such as \ntree health, sidewalk or not, etc`}</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});

const mapStateToProps = ({ bookmark: { bookmarks } }: RootState) => ({
    bookmarks,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    addBookmark: (bookmark: Bookmark) => dispatch(addBookmark(bookmark)),
    removeBookmark: (bookmark: Bookmark) => dispatch(removeBookmark(bookmark)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);
