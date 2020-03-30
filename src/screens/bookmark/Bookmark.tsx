import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
import { FlatList } from 'react-native-gesture-handler';
import BookmarkList from '../../components/BookmarkList/BookmarkList';
import Colors from '../../styles/colors';

interface Props {
    navigation: StackNavigationProp<AppNavigatorParams, AppRoute.BOOKMARK>;
    route: RouteProp<AppNavigatorParams, AppRoute.BOOKMARK>;
    bookmarks: Bookmark[];
    addBookmark: (bookmark: Bookmark) => void;
    removeBookmark: (bookmark: Bookmark) => void;
}

class BookmarkScreen extends Component<Props> {
    navigateToDetail = () => {
        const { navigation } = this.props;
        navigation.push(AppRoute.DETAIL);
    };

    renderItem = ({ item }: { item: Bookmark }) => {
        const { removeBookmark } = this.props;
        return (
            <BookmarkList
                bookmark={item}
                isBookmarked
                onPress={bookmark => {
                    removeBookmark(bookmark);
                }}
            />
        );
    };

    render() {
        const { bookmarks } = this.props;

        return (
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    data={bookmarks}
                    renderItem={this.renderItem}
                    keyExtractor={(item: Bookmark) => item.treeId}
                    style={{ ...StyleSheet.absoluteFillObject, backgroundColor: Colors.white }}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkScreen);
