/*!
 * vue-chunk-upload v1.0.0
 * (c) 
 * Released under the ISC License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

var api = axios__default["default"].create({
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
});
var chunkSize = 6096 * 6096;

var chunkUploader = function chunkUploader(endpoint, file, options) {
  var start = options.chunkNumber * chunkSize;
  var end = Math.min(file.size, start + chunkSize);
  var currentChunkSize = chunkSize;

  if (options.chunkNumber + 1 === options.blockCount) {
    currentChunkSize = file.size - start;
  }

  var params = new FormData();
  params.append('resumableChunkNumber', options.chunkNumber + 1);
  params.append('resumableChunkSize', currentChunkSize);
  params.append('resumableCurrentChunkSize', currentChunkSize);
  params.append('resumableTotalSize', file.size);
  params.append('resumableType', file.type);
  params.append('resumableIdentifier', options.identifier);
  params.append('resumableFilename', file.name);
  params.append('resumableRelativePath', file.name);
  params.append('resumableTotalChunks', options.blockCount);
  params.append('file', file.slice(start, end), file.name);
  return api.post(endpoint, params).then(function (res) {
    options.onProgress && options.onProgress(parseInt(end / file.size * 100, 10), res);

    if (end === file.size) {
      options.onSuccess && options.onSuccess(res);
    } else {
      options.chunkNumber++;
      return chunkUploader(endpoint, file, options);
    }
  })["catch"](function (err) {
    options.onError && options.onError(err);
  });
};

var uploadService = {
  chunk: function chunk(endpoint, file, onProgress, onError, onSuccess) {
    var blockCount = Math.ceil(file.size / chunkSize);
    var chunkNumber = 0;
    var identifier = "".concat(file.size, "-").concat(file.name.replace('.', ''));
    return chunkUploader(endpoint, file, {
      blockCount: blockCount,
      identifier: identifier,
      chunkNumber: chunkNumber,
      onProgress: onProgress,
      onError: onError,
      onSuccess: onSuccess
    });
  }
};

exports.uploadService = uploadService;
