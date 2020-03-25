import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";

const ImageConverter = async uri => {
  const resizedPhoto = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 600 } }], // resize to width of 300 and preserve aspect ratio
    { compress: 0.0, format: "jpeg" }
  );
  return resizedPhoto;
};

export default ImageConverter;
