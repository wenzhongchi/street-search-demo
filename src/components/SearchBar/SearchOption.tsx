import React from 'react';
import { Text, StyleSheet } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    name: string;
    imageName: string;
    size?: number;
    onPress: () => void;
}

const SearchOption = (props: Props) => {
    const { onPress, name, imageName, size = 20 } = props;

    return (
        <TouchableOpacity style={styles.selection} onPress={onPress}>
            <FontIcon name={imageName} color={Colors.lightGray} size={size} style={{ marginRight: 5 }} />
            <Text style={styles.selectionText}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    selection: {
        width: 100,
        height: '100%',
        borderColor: Colors.border,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    selectionText: {
        color: Colors.black,
        fontSize: 13,
    },
});

export default SearchOption;
