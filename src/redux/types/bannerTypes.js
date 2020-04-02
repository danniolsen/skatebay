export const SHOW_BANNER = "SHOW_BANNER";
export const HIDE_BANNER = "HIDE_BANNER";
export const SHOW_BANNER_ALERT = "SHOW_BANNER_ALERT";
export const HIDE_BANNER_ALERT = "HIDE_BANNER_ALERT";

export const showBanner = banner => ({
  type: SHOW_BANNER,
  payload: banner
});

export const hideBanner = () => ({
  type: HIDE_BANNER
});

export const showBannerAlert = banner => ({
  type: SHOW_BANNER_ALERT,
  payload: banner
});

export const hideBannerAlert = () => ({
  type: HIDE_BANNER_ALERT
});
