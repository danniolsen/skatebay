import * as React from "react";
import { Text } from "react-native";

export function ThinText(props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: "Roboto-Thin",
          fontSize: props.size,
          color: props.color
        }
      ]}
    />
  );
}

export function NormalText(props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: "Roboto-Regular",
          fontSize: props.size,
          color: props.color
        }
      ]}
    />
  );
}
