export const SHOW_BANNER = "SHOW_BANNER";
export const HIDE_BANNER = "HIDE_BANNER";

export const showBanner = (banner) => ({
  type: SHOW_BANNER,
  payload: banner
});

export const hideBanner = () => ({
  type: HIDE_BANNER
});
