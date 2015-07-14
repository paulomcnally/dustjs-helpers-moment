var moment = require('moment');

module.exports = function (dust) {
  // format
  dust.helpers.moment = function(chunk, context, bodies, params) {
    var type = context.resolve(params.type, chunk, context) || 'format';
    var date = context.resolve(params.date, chunk, context) || new Date();
    var format = context.resolve(params.format, chunk, context) || 'MMM Do YYYY';
    var input = context.resolve(params.input, chunk, context) || 1;
    var value = context.resolve(params.value, chunk, context) || 'days';
    var locale = context.resolve(params.locale, chunk, context) || 'en';

    moment.lang(locale);

    switch (type) {
      case 'format':
        return chunk.write(moment(date).format(format));
        break;
      case 'fromNow':
        return chunk.write(moment(date).fromNow());
        break;
      case 'subtract':
        return chunk.write(moment(date).subtract(input, value).calendar());
        break;
      case 'add':
        return chunk.write(moment(date).add(input, value).calendar());
        break;
    }
  };
};

module.exports.registerWith = module.exports;
