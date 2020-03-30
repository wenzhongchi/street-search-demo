import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { TClose } from 'react-native-modalize/lib/options';
import { screenHeight } from '../../utils/screenUtils';
import { TreeType } from '../../storage/models/tree';
import TreeList from '../TreeList/TreeList';
import Colors from '../../styles/colors';

interface Props {
    trees: TreeType[];
    onLoadMore: () => void;
    onPress: (tree: TreeType) => void;
}

interface State {
    scrolled: boolean;
}

class TreeListModal extends React.Component<Props, State> {
    modal = React.createRef<Modalize>();

    constructor(props: Props) {
        super(props);
        this.state = { scrolled: false };
    }

    closeModal = (dest: TClose) => {
        if (this.modal.current) {
            this.modal.current.close(dest);
        }
    };

    handleLoadMore = () => {
        const { onLoadMore } = this.props;
        const { scrolled } = this.state;
        // only loading more if there is scroll event
        if (scrolled) {
            this.setState({ scrolled: false });
            onLoadMore();
        }
    };

    renderHeader = () => {
        const { trees } = this.props;
        return (
            <View style={styles.header}>
                <Text style={{ fontSize: 28 }}>{`${trees.length} trees`}</Text>
            </View>
        );
    };

    renderItem = ({ item }: { item: TreeType }) => {
        const { onPress } = this.props;
        return <TreeList tree={item} onPress={tree => onPress(tree)} />;
    };

    renderFooter = () => {
        return (
            <View style={{ height: 50, justifyContent: 'center' }}>
                <ActivityIndicator color={Colors.lightGray} />
            </View>
        );
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
                    ListFooterComponent: this.renderFooter,
                    onEndReachedThreshold: 0.1,
                    onEndReached: this.handleLoadMore,
                    onMomentumScrollBegin: () => {
                        console.log('scrolled');
                        this.setState({ scrolled: true });
                    },
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 10,
    },
    modal: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
    },
});

export default TreeListModal;
