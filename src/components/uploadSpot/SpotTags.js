import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NormalText, ThinText } from "../StyledText";

const SpotTags = props => {
  const { getTags } = props;

  const pickTag = tag => {
    let tagsCopy = Object.assign([], getTags);
    // check if tag exists, if true, remove tag, else add tag
    let exists = tagsCopy.find(({ id }) => id === tag.id);
    exists ? unsetTag(tag) : setTag(tag);
  };

  const setTag = tag => {
    let tagsCopy = Object.assign([], getTags);
    // set tag if no more than 5 tags
    if (tagsCopy.length + 1 <= 5) {
      tagsCopy.push(tag);
      props.selectTag(tagsCopy); // send tags to uploadspot
    }
  };

  const unsetTag = tag => {
    let tagsCopy = Object.assign([], getTags);
    // get tag index
    let index = tagsCopy.map(e => e.id).indexOf(tag.id);
    tagsCopy.splice(index, 1); // remove tag
    props.selectTag(tagsCopy); // send tags to uploadspot
  };

  const colorTag = tag => {
    let tagsCopy = Object.assign([], getTags);
    let exists = tagsCopy.find(({ id }) => id === tag.id);
    return exists ? "#7f8c8d" : "#bec1c2";
  };

  return (
    <View style={s.container}>
      <View style={s.headline}>
        <NormalText size={13} color="#2f363d">
          Tags
        </NormalText>
      </View>

      <View style={s.tagCon}>
        {tags.map(tag => {
          return (
            <TouchableOpacity
              onPress={() => pickTag(tag)}
              style={[s.tag, { backgroundColor: colorTag(tag) }]}
              key={tag.id}
            >
              <NormalText color="#FFF">{tag.name}</NormalText>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={s.tagsCounter}>
        <ThinText size={16} color="#2f363d">
          {`${getTags.length} / 5`}
        </ThinText>
      </View>
    </View>
  );
};

export default SpotTags;

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: "#FFF"
  },
  headline: { paddingTop: 15, paddingLeft: 10 },
  tagCon: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  tag: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    marginVertical: 5
  },
  tagsCounter: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    alignItems: "flex-end"
  }
});

const tags = [
  { id: 1, name: "Street" },
  { id: 2, name: "Wallride" },
  { id: 3, name: "Stair" },
  { id: 4, name: "Handrail" },
  { id: 5, name: "Gab" },
  { id: 6, name: "Manual" },
  { id: 7, name: "Ledge" },
  { id: 8, name: "DIY" },
  { id: 9, name: "Flatbar" },
  { id: 10, name: "Skatepark" },
  { id: 11, name: "Vert" },
  { id: 12, name: "Bowl" },
  { id: 13, name: "Miniramp" },
  { id: 14, name: "Transition" }
];
