import { CheckImagesLocation } from "./LocationService";
import ImageConverter from "./ImageConverter";
import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";

const checkLocation = img => {
  // construct new location object
  if (img.exif.GPSLatitude) {
    let imgLocation = {
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
  let previusImage = images[images.length - 2];
  let imgStatus = previusImage !== undefined ? previusImage : false;

  if (images.length === 1) {
    return {
      status: true
    };
  } else {
    return {
      status: CheckImagesLocation(previusImage, currentImage),
      title: "Image location is out of range",
      value: "The selected image seams to be taken further away than the others"
    };
  }
};

// resize image size and quality
const resizeImage = async img => {
  const resizedPhoto = await ImageManipulator.manipulateAsync(
    img.uri,
    [{ resize: { width: 600 } }],
    { compress: 0.5, format: "jpeg" }
  );
  return resizedPhoto;
};

// add image to existing images array
const addImage = (imgUri, getImages, location) => {
  let imagesCopy = Object.assign([getImages], getImages);
  let lastImgId = imagesCopy.length - 1;

  imagesCopy[lastImgId].url = imgUri;
  imagesCopy[lastImgId].set = true;
  imagesCopy[lastImgId].location = location;

  let nextImage = { url: "", set: false, location: {} };
  imagesCopy.length !== 4 ? imagesCopy.push(nextImage) : null;
  return imagesCopy;
};

// remove image from images array
const removeImage = (getImages, id) => {
  let imagesCopy = Object.assign([getImages], getImages);

  let newPlaceholder = { url: "", set: false, location: {} };
  let placeholderId = imagesCopy[imagesCopy.length - 1];

  if (placeholderId.set !== false) {
    imagesCopy.push(newPlaceholder);
  }
  imagesCopy.splice(id, 1);
  return imagesCopy;
};

const Upload = () => {
  return {
    checkLocation,
    checkDistance,
    resizeImage,
    addImage,
    removeImage
  };
};

export default Upload;
