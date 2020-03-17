import { showBanner, hideBanner } from "../types/bannerTypes";

const bannerShow = banner => {
  const doShowBanner = (dispatch, err) => {
    dispatch(showBanner(banner));
  };
  return doShowBanner;
};

const bannerHide = () => {
  const doHideBanner = (dispatch, err) => {
    dispatch(hideBanner());
  };
  return doHideBanner;
};

export { bannerShow, bannerHide };
