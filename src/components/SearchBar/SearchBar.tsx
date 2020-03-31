import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { SearchSelection } from '../../types/types';
import SearchOption from './SearchOption';
import SearchOptionList from './SearchOptionList';

Icon.loadFont();

interface Props {
    onPressSelection: () => void;
    onPressFilter: () => void;
}

const SearchBar = (props: Props) => {
    const { onPressSelection, onPressFilter } = props;
    const [option, setOption] = useState('zipcode');
    const [optionOpen, setOptionOpen] = useState(false);

    const renderOption = (option: SearchSelection) => {
        switch (option) {
            case 'zipcode':
                return (
                    <SearchOption
                        onPress={() => {
                            onPressSelection();
                            setOption(option);
                            setOptionOpen(!optionOpen);
                        }}
                        name="Zipcode"
                        size={15}
                        imageName="map-pin"
                    />
                );
            case 'name':
                return (
                    <SearchOption
                        onPress={() => {
                            onPressSelection();
                            setOption(option);
                            setOptionOpen(!optionOpen);
                        }}
                        name="Name"
                        size={15}
                        imageName="underline"
                    />
                );
            case 'type':
                return (
                    <SearchOption
                        onPress={() => {
                            onPressSelection();
                            setOption(option);
                            setOptionOpen(!optionOpen);
                        }}
                        name="Type"
                        size={15}
                        imageName="tree"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <View style={styles.search}>
                    <Icon
                        name="search"
                        color={Colors.lightGray}
                        size={30}
                        style={{ marginLeft: 10, marginRight: 10 }}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Start typing..."
                        placeholderTextColor={Colors.placeholder}
                    />
                </View>
                <View style={styles.search}>
                    {renderOption(option as SearchSelection)}
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
            {optionOpen && (
                <View style={styles.dropdown}>
                    <Text
                        style={{
                            color: Colors.black,
                            fontSize: 14,
                            marginTop: 10,
                            marginLeft: 20,
                            borderBottomColor: Colors.border,
                            borderBottomWidth: 1,
                        }}
                    >
                        Search Options
                    </Text>
                    <SearchOptionList
                        onPress={() => {
                            onPressSelection();
                            setOption('zipcode');
                            setOptionOpen(!optionOpen);
                        }}
                        name="Zipcode"
                        size={15}
                        imageName="map-pin"
                        hasBorder
                    />
                    <SearchOptionList
                        onPress={() => {
                            onPressSelection();
                            setOption('name');
                            setOptionOpen(!optionOpen);
                        }}
                        name="Name"
                        size={15}
                        imageName="underline"
                        hasBorder
                    />
                    <SearchOptionList
                        onPress={() => {
                            onPressSelection();
                            setOption('type');
                            setOptionOpen(!optionOpen);
                        }}
                        name="Type"
                        size={15}
                        imageName="tree"
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: 60,
        backgroundColor: Colors.clear,
        marginTop: 20,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: Colors.white,
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
    dropdown: {
        flexDirection: 'column',
        height: 150,
        width: '100%',
        backgroundColor: Colors.dropdownBackground,
        justifyContent: 'space-between',
        shadowColor: Colors.gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        elevation: 0.5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
