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
