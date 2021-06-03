import React from "react";
import { Circle } from "react-native-svg";

export const Decorator = ({ x, y, data }: any) => {
        return data.map((value: any, index: number) => (
            <Circle
                key={ index }
                cx={ x(index) }
                cy={ y(value.grade) }
                r={ 4 }
                stroke={'white'}
                fill={'darkred'}
            />
        ))
    };