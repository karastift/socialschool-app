import React, { useContext } from "react";
import { Path } from "react-native-svg";
import { ColorTheme } from "../contexts/ColorTheme";

export const Line = ({ line }: any) => {
  const { chartTheme: { lineStroke, lineFill } } = useContext(ColorTheme);
  return (
    <Path
      key={'line'}
      d={line}
      stroke={lineStroke}
      fill={lineFill}
    />
  );
};