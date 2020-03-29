import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AppRoute } from './AppRoute';
import HomeStack from './HomeStack';
import BookmarkStack from './BookmarkStack';
import Colors from '../styles/colors';

// required to load fonts
Icon.loadFont();

export type AppNavigatorParams = {
    [AppRoute.HOME]: undefined;
    [AppRoute.BOOKMARK]: undefined;
    [AppRoute.DETAIL]: undefined;
};

export const AppNavigator = (): React.ReactElement => {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={AppRoute.HOME_TAB}
                tabBarOptions={{
                    activeTintColor: Colors.tabActive,
                }}
            >
                <Tab.Screen
                    name={AppRoute.HOME_TAB}
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => <Icon name="tree" color={color} size={size} />,
                    }}
                />
                <Tab.Screen
                    name={AppRoute.BOOKMARK_TAB}
                    component={BookmarkStack}
                    options={{
                        tabBarLabel: 'Bookmark',
                        tabBarIcon: ({ color, size }) => <Icon name="bookmark" color={color} size={size} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
