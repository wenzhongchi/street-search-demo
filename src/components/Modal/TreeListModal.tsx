import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { TClose } from 'react-native-modalize/lib/options';
import { screenHeight } from '../../utils/screenUtils';
import { TreeType } from '../../storage/models/tree';
import TreeList from '../TreeList/TreeList';

interface Props {
    trees: TreeType[];
}

class TreeListModal extends React.Component<Props> {
    modal = React.createRef<Modalize>();

    closeModal = (dest: TClose) => {
        if (this.modal.current) {
            this.modal.current.close(dest);
        }
    };

    renderHeader = () => (
        <View style={styles.header}>
            <Text style={{}}>{'Introduction'.toUpperCase()}</Text>
        </View>
    );

    renderItem = ({ item }: { item: TreeType }) => {
        return <TreeList></TreeList>;
    };

    render() {
        const { trees } = this.props;
        return (
            <Modalize
                ref={this.modal}
                modalStyle={styles.modal}
                alwaysOpen={185}
                handlePosition="inside"
                modalHeight={0.7 * screenHeight}
                HeaderComponent={this.renderHeader}
                flatListProps={{
                    data: trees,
                    renderItem: this.renderItem,
                    keyExtractor: (item: TreeType) => item.id,
                    showsVerticalScrollIndicator: false,
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
    },
    modal: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
    },
});

export default TreeListModal;
