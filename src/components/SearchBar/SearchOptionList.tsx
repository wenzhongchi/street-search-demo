import React from 'react';
import { Text, StyleSheet } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    name: string;
    imageName: string;
    size?: number;
    hasBorder?: boolean;
    onPress: () => void;
}

const SearchOptionList = (props: Props) => {
    const { onPress, name, imageName, size = 20, hasBorder } = props;

    return (
        <TouchableOpacity style={[styles.selection, { borderBottomWidth: hasBorder ? 1 : 0 }]} onPress={onPress}>
            <FontIcon name={imageName} color={Colors.lightGray} size={size} style={{ marginRight: 20 }} />
            <Text style={styles.selectionText}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    selection: {
        width: '100%',
        height: 40,
        borderColor: Colors.lightGray,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20,
    },
    selectionText: {
        color: Colors.lightGray,
        fontSize: 13,
    },
});

export default SearchOptionList;
