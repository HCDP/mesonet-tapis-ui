export const resolveBasePath = () => {
  let baseUrl = 'https://dev.staging.tapis.io';
  //console.log(window.location.href);
  // let baseUrl = window.location.href.replace('/tapis-ui/', '').split('#')[0];
  // .replace(/^https:\/\/ui\./, 'https://');
  // Direct request from local dev env to dev.develop
  if (/127\.0\.0\.1|localhost|0\.0\.0\.0/.test(baseUrl)) {
    return 'https://dev.staging.tapis.io';
  }

  return baseUrl;
};
