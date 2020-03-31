import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import Colors from '../../styles/colors';

const LoadingView = () => (
    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
        <ActivityIndicator size="large" color={Colors.green} animating={true} />
        <Text style={{ fontSize: 14 }}>Loading data..</Text>
    </View>
);

export default LoadingView;
