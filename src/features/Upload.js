import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";
import { CheckImagesLocation } from "./LocationService";
import ImageConverter from "./ImageConverter";

const checkLocation = (img) => {
  // construct new location object
  if (img.exif.GPSLatitude) {
    const imgLocation = {
      latitude: img.exif.GPSLatitude,
      longitude: img.exif.GPSLongitude
    };
    return {
      status: true,
      value: imgLocation
    };
  }
  return {
    status: false,
    title: "Location issue!",
    value:
      "the images location does not seam to match in range of previus image"
  };
};
// check next image is in range of previus image
const checkDistance = (images, currentImage) => {
  const previusImage = images[images.length - 2];
  const imgStatus = previusImage !== undefined ? previusImage : false;

  if (images.length === 1) {
    return {
      status: true
    };
  }
  return {
    status: CheckImagesLocation(previusImage, currentImage),
    title: "Image location is out of range",
    value: "The selected image seams to be taken further away than the others"
  };
};

// resize image size and quality
const resizeImage = async (img) => {
  const resizedPhoto = await ImageManipulator.manipulateAsync(
    img.uri,
    [{ resize: { width: 600 } }],
    { compress: 0.5, format: "jpeg" }
  );
  return resizedPhoto;
};

// add image to existing images array
const addImage = (imgUri, getImages, location) => {
  const imagesCopy = Object.assign([getImages], getImages);
  const lastImgId = imagesCopy.length - 1;

  imagesCopy[lastImgId].url = imgUri;
  imagesCopy[lastImgId].set = true;
  imagesCopy[lastImgId].location = location;

  const nextImage = { url: "", set: false, location: {} };
  imagesCopy.length !== 4 ? imagesCopy.push(nextImage) : null;
  return imagesCopy;
};

// remove image from images array
const removeImage = (getImages, id) => {
  const imagesCopy = Object.assign([getImages], getImages);

  const newPlaceholder = { url: "", set: false, location: {} };
  const placeholderId = imagesCopy[imagesCopy.length - 1];

  if (placeholderId.set !== false) {
    imagesCopy.push(newPlaceholder);
  }
  imagesCopy.splice(id, 1);
  return imagesCopy;
};

const Upload = () => ({
  checkLocation,
  checkDistance,
  resizeImage,
  addImage,
  removeImage
});

export default Upload;
