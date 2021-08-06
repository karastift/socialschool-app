import React, { useContext } from "react";
import { Circle } from "react-native-svg";
import { ColorTheme } from "../contexts/ColorTheme";

export const Decorator: React.FC = ({ x, y, data }: any) => {

  const { chartTheme: { decoratorStroke, decoratorFill } } = useContext(ColorTheme);

  return data.map((value: any, index: number) => (
    <Circle
      key={ index }
      cx={ x(index) }
      cy={ y(value.grade) }
      r={4}
      stroke={decoratorStroke}
      fill={decoratorFill}
    />
  ));
};