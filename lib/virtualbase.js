exports.virtualbase = function (options) {
  options = options || {};
  options.virtualbase = options.virtualbase || '/';

  return function (request, response, next) {
    var redirect = function (url, status) {
      response.statusCode = status || 302;
      response.setHeader('Location', url);
      response.end();
    };

    if (options.virtualbase !== '/' && request.url === '/') {
      redirect(options.virtualbase);
    } else {
      request.url = request.url.replace(options.virtualbase, '/');
      request.originalUrl = request.originalUrl.replace(options.virtualbase, '/');

      next();
    }
  }
}
