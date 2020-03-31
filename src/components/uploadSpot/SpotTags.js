import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NormalText, ThinText } from "../StyledText";
import Headline from "./Headline";

const SpotTags = props => {
  const { getTags, headline } = props;
  const [status, setStatus] = React.useState(false);

  const pickTag = tag => {
    let tagsCopy = Object.assign([], getTags);
    // check if tag exists, if true, remove tag, else add tag
    let exists = tagsCopy.find(({ id }) => id === tag.id); // use indexof
    exists ? unsetTag(tag) : setTag(tag);
  };

  const setTag = tag => {
    let tagsCopy = Object.assign([], getTags);
    // set tag if no more than 5 tags
    if (tagsCopy.length + 1 <= 5) {
      tagsCopy.push(tag);
      props.selectTag(tagsCopy); // send tags to uploadspot
    }
    setStatus(false);
  };

  const unsetTag = tag => {
    let tagsCopy = Object.assign([], getTags);
    // get tag index
    let index = tagsCopy.map(e => e.id).indexOf(tag.id);
    tagsCopy.splice(index, 1); // remove tag
    props.selectTag(tagsCopy); // send tags to uploadspot
    tagsCopy.length === 0 ? setStatus(true) : setStatus(false);
  };

  const colorTag = tag => {
    let tagsCopy = Object.assign([], getTags);
    let exists = tagsCopy.find(({ id }) => id === tag.id);
    return exists ? "#7f8c8d" : "#bec1c2";
  };

  return (
    <View style={s.container}>
      <Headline
        name={headline.name}
        warning={headline.warning}
        active={status}
      />

      <View style={s.tagCon}>
        {tags.map(tag => {
          return (
            <TouchableOpacity
              activeOpacity={1}
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
  { id: 2, name: "Ledge" },
  { id: 3, name: "Handrail" },
  { id: 4, name: "Flat rail" },
  { id: 5, name: "Stair / Gab" },
  { id: 6, name: "Bank" },
  { id: 7, name: "Wallride" },
  { id: 8, name: "Manual" },
  { id: 9, name: "Plaza" },
  { id: 10, name: "Skatepark" },
  { id: 11, name: "Vert" },
  { id: 12, name: "Bowl" },
  { id: 13, name: "Miniramp" },
  { id: 14, name: "Transition" },
  { id: 15, name: "DIY" }
];
