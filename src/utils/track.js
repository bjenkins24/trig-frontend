import Analytics from 'analytics';
import segmentPlugin from '@analytics/segment';

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    segmentPlugin({
      writeKey: process.env.SEGMENT_WRITE_KEY,
    }),
  ],
});

export const identify = user => {
  analytics.identify(user.id, {
    email: user.email,
  });
};

export const track = (name, properties) => {
  analytics.track(name, properties);
};

export const trackPage = () => {
  analytics.page();
};
