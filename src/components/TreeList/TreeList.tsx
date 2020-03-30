import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';
import { TreeType } from '../../storage/models/tree';
import TreeImage from '../TreeImage/TreeImage';
import { capitalizeTreeName } from '../../utils/dataUtils';

interface Props {
    tree: TreeType;
    onPress: (tree: TreeType) => void;
}

const TreeList = (props: Props) => {
    const { tree, onPress } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(tree)}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.imageContainer}>
                    <TreeImage name={capitalizeTreeName(tree.spcCommon)} size={20} color={Colors.green} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{tree.spcLatin}</Text>
                    <Text style={styles.addressText}>{tree.address}</Text>
                </View>
            </View>
            <Icon
                name="angle-right"
                size={26}
                color={Colors.lightGray}
                style={{ alignSelf: 'center', marginRight: 20 }}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.border,
        borderBottomWidth: 1,
        height: 60,
    },
    imageContainer: {
        height: 34,
        width: 34,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 17,
        borderColor: Colors.imageBorder,
        borderWidth: 1,
    },
    textContainer: {
        marginLeft: 20,
    },
    nameText: {
        color: Colors.black,
        fontSize: 14,
    },
    addressText: {
        color: Colors.lightGray,
        fontSize: 13,
    },
});

export default TreeList;
