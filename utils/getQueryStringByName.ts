export const getQueryStringValue = (key: string) => {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        `^(?:.*[&\\?]${encodeURIComponent(key).replace(
          // eslint-disable-next-line no-useless-escape
          /[\.\+\*]/g,
          '\\$&',
        )}(?:\\=([^&]*))?)?.*$`,
        'i',
      ),
      '$1',
    ),
  );
};
