import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";

const ImageConverter = async uri => {
  const resizedPhoto = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 600 } }],
    { compress: 0.5, format: "jpeg" }
  );
  return resizedPhoto;
};

export default ImageConverter;
