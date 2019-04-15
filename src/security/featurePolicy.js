import featurePolicy from 'feature-policy';

export const setFeaturePolicy = () => featurePolicy({
  features: {
    fullscreen: ['\'self\''],
    payment: [''],
    syncXhr: ['\'none\''],
    geolocation: ['\'none\''],
    midi: ['\'none\''],
    microphone: ['\'none\''],
    camera: ['\'none\''],
    magnetometer: ['\'none\''],
    gyroscope: ['\'none\''],
    speaker: ['\'none\''],
    accelerometer: ['\'none\''],
    usb: ['\'none\''],
    vr: ['\'none\''],
    autoplay: ['\'none\''],
  },
});

export default {
  setFeaturePolicy,
};
