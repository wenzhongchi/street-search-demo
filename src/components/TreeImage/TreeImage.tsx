import _ from 'lodash';
import * as React from 'react';
import { View, Image } from 'react-native';

// svg
import TreeSvg from '../../assets/svg/Tree';

// png

import LondonPlaneTree from '../../assets/png/LondonPlaneTree';

export const SVG_IMAGES = {
    TreeSvg,
};

export const PNG_IMAGES = {
    LondonPlaneTree,
};

interface Props {
    color?: string;
    name: string;
    size?: number;
}

const TreeImage = ({ name, size = 30, color }: Props) => {
    const SvgComponent = _.get(SVG_IMAGES, name);
    const ImageSource = _.get(PNG_IMAGES, name);

    if (!SvgComponent && !ImageSource) return null;

    return (
        <View style={{ justifyContent: 'center', height: size, width: size }}>
            {SvgComponent ? (
                <SvgComponent fill={color} style={{ alignSelf: 'center' }} />
            ) : (
                <Image
                    source={ImageSource}
                    style={{
                        alignSelf: 'center',
                    }}
                    resizeMode="contain"
                />
            )}
        </View>
    );
};

export default TreeImage;
