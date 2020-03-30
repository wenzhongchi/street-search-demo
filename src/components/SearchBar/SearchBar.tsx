import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { SearchSelection } from '../../types/types';

Icon.loadFont();

interface Props {
    selectOption: SearchSelection;
    onPressSelection: () => void;
    onPressFilter: () => void;
}

const SearchBar = (props: Props) => {
    const { onPressSelection, onPressFilter } = props;

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Icon name="search" color={Colors.lightGray} size={30} style={{ marginLeft: 10, marginRight: 10 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Start typing..."
                    placeholderTextColor={Colors.placeholder}
                />
            </View>
            <View style={styles.search}>
                <TouchableOpacity style={styles.selection} onPress={onPressSelection}>
                    <FontIcon name="home" color={Colors.lightGray} size={20} style={{ marginRight: 5 }} />
                    <Text style={styles.selectionText}>Zipcode</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter} onPress={onPressFilter}>
                    <FontIcon
                        name="sliders"
                        color={Colors.lightGray}
                        size={20}
                        style={{ marginLeft: 10, marginRight: 10 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: Colors.white,
        marginTop: 20,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: Colors.gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10,
    },
    searchInput: {
        color: Colors.black,
        fontSize: 15,
    },
    search: {
        flexDirection: 'row',
    },
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
    filter: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchBar;
