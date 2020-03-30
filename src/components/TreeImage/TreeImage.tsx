import _ from 'lodash';
import * as React from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// svg
import TreeSvg from '../../assets/svg/Tree';

// png
import LondonPlanetree from '../../assets/png/LondonPlaneTree.png';
import Honeylocust from '../../assets/png/Honeylocust.png';

export const SVG_IMAGES = {
    TreeSvg,
};

export const PNG_IMAGES = {
    LondonPlanetree,
    Honeylocust,
};

interface Props {
    color?: string;
    name: string;
    size?: number;
}

const TreeImage = ({ name, size = 30, color }: Props) => {
    const SvgComponent = _.get(SVG_IMAGES, name);
    const ImageSource = _.get(PNG_IMAGES, name);

    if (!SvgComponent && !ImageSource)
        return <Icon name="tree" size={size} color={color} style={{ alignSelf: 'center' }} />;

    return (
        <View style={{ justifyContent: 'center', height: size, width: size }}>
            {SvgComponent ? (
                <SvgComponent fill={color} style={{ alignSelf: 'center' }} />
            ) : (
                <Image
                    source={ImageSource}
                    style={{
                        height: size * 1.5,
                        width: size * 1.5,
                        borderRadius: (size * 1.5) / 2,
                        alignSelf: 'center',
                    }}
                    resizeMode="contain"
                />
            )}
        </View>
    );
};

export default TreeImage;
