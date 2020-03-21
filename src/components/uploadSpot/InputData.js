import * as React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { NormalText, ThinText } from "../StyledText";

const InputData = props => {
  const { title, getTitle } = props;

  return (
    <View style={s.container}>
      <View style={s.headline}>
        <NormalText size={13} color="#2f363d">
          Spot title
        </NormalText>
      </View>

      <TextInput
        style={s.inputField}
        allowFontScaling
        autoCapitalize={"sentences"}
        autoCorrect={false}
        maxLength={20}
        onChange={txt => props.title(txt.nativeEvent.text)}
        placeholder="Spot title"
      >
        <ThinText size={20}>{getTitle}</ThinText>
      </TextInput>

      <View style={s.inputCounter}>
        <ThinText size={14}>{`${getTitle.length} / 20`}</ThinText>
      </View>
    </View>
  );
};

export default InputData;

const s = StyleSheet.create({
  container: { flex: 1, marginVertical: 5, backgroundColor: "#FFF" },
  headline: { paddingTop: 15, paddingLeft: 10 },
  inputCon: { flexDirection: "row" },
  inputField: {
    flex: 8,
    margin: 10,
    fontSize: 20,
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#AAA"
  },
  inputCounter: {
    flex: 2,
    marginRight: 10,
    paddingBottom: 10,
    alignItems: "flex-end"
  }
});
