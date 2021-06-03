import React from "react";
import { Path } from "react-native-svg";

export const Line = ({ line }: any) => (
        <Path
            key={'line'}
            d={line}
            stroke={'red'}
            fill={'none'}
        />
    );