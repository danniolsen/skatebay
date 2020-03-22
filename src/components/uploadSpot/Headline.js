import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NormalText } from "../StyledText";
const Headline = props => {
  const { name, warning, active } = props;

  return (
    <View style={s.headline}>
      <NormalText style={s.headlineName} size={13} color="#2f363d">
        {name}
      </NormalText>
      <View style={s.headlineError}>
        {active && (
          <NormalText size={10} color="#e74c3c">
            {warning}
          </NormalText>
        )}
      </View>
    </View>
  );
};

export default Headline;

const s = StyleSheet.create({
  headline: {
    paddingTop: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  headlineName: { flex: 1 },
  headlineError: { flex: 1, alignItems: "flex-end" }
});
