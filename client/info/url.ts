export const serverImageURL =
  process.env.NODE_ENV === 'production'
    ? 'http://45.119.146.235:4000/static/images/'
    : 'http://localhost:4000/static/images/';
