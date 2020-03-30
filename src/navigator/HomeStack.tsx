import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/home/Home';
import DetailScreen from '../screens/detail/Detail';
import { AppRoute } from './AppRoute';

const HomeStack = ({ navigation, route }: any) => {
    const Stack = createStackNavigator();

    if (route.state) {
        navigation.setOptions({ tabBarVisible: route.state.index > 0 ? false : true });
    }

    return (
        <Stack.Navigator initialRouteName={AppRoute.HOME}>
            <Stack.Screen name={AppRoute.HOME} component={HomeScreen} />
            <Stack.Screen name={AppRoute.DETAIL} component={DetailScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
