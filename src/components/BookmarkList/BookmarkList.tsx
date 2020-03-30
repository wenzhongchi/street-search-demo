import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';
import TreeImage from '../TreeImage/TreeImage';
import { capitalizeTreeName } from '../../utils/dataUtils';
import { Bookmark } from '../../types/types';

interface Props {
    bookmark: Bookmark;
    isBookmarked: boolean;
    onPress: (bookmark: Bookmark) => void;
}

const BookmarkList = (props: Props) => {
    const { bookmark, onPress, isBookmarked } = props;

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.imageContainer}>
                    <TreeImage name={capitalizeTreeName(bookmark.image)} size={30} color={Colors.green} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{bookmark.name}</Text>
                    <Text style={styles.addressText}>{bookmark.address}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.bookmark, { backgroundColor: isBookmarked ? Colors.buttonRemove : Colors.buttonAdd }]}
                onPress={() => onPress(bookmark)}
            >
                <Icon name="bookmark" size={22} color={Colors.white} />
            </TouchableOpacity>
        </View>
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
        height: 80,
    },
    imageContainer: {
        height: 50,
        width: 50,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: Colors.imageBorder,
        borderWidth: 1,
    },
    textContainer: {
        marginLeft: 20,
    },
    nameText: {
        color: Colors.black,
        fontSize: 16,
        marginBottom: 5,
    },
    addressText: {
        color: Colors.lightGray,
        fontSize: 14,
    },
    bookmark: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 20,
    },
});

export default BookmarkList;
