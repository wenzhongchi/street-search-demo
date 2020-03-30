import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/home/Home';
import DetailScreen from '../screens/detail/Detail';
import FilterScreen from '../screens/filter/Filter';
import { AppRoute } from './AppRoute';

const HomeStackScreen = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName={AppRoute.HOME}>
            <Stack.Screen name={AppRoute.HOME} component={HomeScreen} />
            <Stack.Screen name={AppRoute.DETAIL} component={DetailScreen} />
        </Stack.Navigator>
    );
};

const HomeStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName={AppRoute.HOME_ROOT} mode="modal">
            <Stack.Screen name={AppRoute.HOME_ROOT} component={HomeStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name={AppRoute.FILTER} component={FilterScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
