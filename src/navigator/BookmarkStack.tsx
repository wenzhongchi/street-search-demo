import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BookmarkScreen from '../screens/bookmark/Bookmark';
import DetailScreen from '../screens/detail/Detail';
import { AppRoute } from './AppRoute';

const BookmarkStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName={AppRoute.BOOKMARK}>
            <Stack.Screen name={AppRoute.BOOKMARK} component={BookmarkScreen} />
            <Stack.Screen name={AppRoute.DETAIL} component={DetailScreen} />
        </Stack.Navigator>
    );
};

export default BookmarkStack;
