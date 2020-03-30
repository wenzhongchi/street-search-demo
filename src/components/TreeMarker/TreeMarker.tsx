import React from 'react';
import { View } from 'react-native';
import Colors from '../../styles/colors';
import MarkerIcon from '../../assets/svg/Marker';
import TreeImage from '../TreeImage/TreeImage';
import { capitalizeTreeName } from '../../utils/dataUtils';

interface Props {
    treeName: string;
}

const TreeMarker = (props: Props) => {
    const { treeName } = props;

    return (
        <View
            style={{
                width: 50,
                height: 50,
                alignItems: 'center',
            }}
        >
            <MarkerIcon />
            <View
                style={{
                    top: 4,
                    left: 7,
                    width: 36,
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.imageBackground,
                    borderRadius: 18,
                    position: 'absolute',
                }}
            >
                <TreeImage name={capitalizeTreeName(treeName)} size={25} color={Colors.green} />
            </View>
        </View>
    );
};

export default TreeMarker;
