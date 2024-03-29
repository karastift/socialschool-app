import React, { useContext } from "react";
import { Path } from "react-native-svg";
import { ColorTheme } from "../contexts/ColorTheme";

export const Line: React.FC<React.PropsWithChildren<any>> = ({ line }) => {
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