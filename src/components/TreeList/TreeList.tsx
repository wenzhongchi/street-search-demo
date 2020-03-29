import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TreeType } from '../../storage/models/tree';

interface Props {
    tree: TreeType;
    onPress: (tree: TreeType) => void;
}

const TreeList = (props: Props) => {
    const { tree, onPress } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(tree)}>
            <Text style={styles.addButtonText}>View</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 0.45,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.border,
        borderBottomWidth: 1,
    },
    nameText: {
        color: Colors.black,
        fontSize: 16,
    },
    priceText: {
        color: Colors.black,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: Colors.buttonColor1,
        alignItems: 'center',
        width: 70,
        borderColor: Colors.black,
        borderWidth: 1,
    },
    addButtonText: {
        fontSize: 16,
        color: Colors.black,
    },
});

export default TreeList;
