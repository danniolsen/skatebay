import {
  showBanner,
  hideBanner,
  showBannerAlert,
  hideBannerAlert
} from "../types/bannerTypes";

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

const bannerShowAlert = banner => {
  const doShowBannerAlert = (dispatch, err) => {
    dispatch(showBannerAlert(banner));
  };
  return doShowBannerAlert;
};

const bannerHideAlert = () => {
  const doHideBannerAlert = (dispatch, err) => {
    dispatch(hideBannerAlert());
  };
  return doHideBannerAlert;
};

export { bannerShow, bannerHide, bannerShowAlert, bannerHideAlert };
