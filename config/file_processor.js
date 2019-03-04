/*
 * file_processor
 */
var path = require("path");
module.exports = {
  /*************************************************************************/
  /* enable: {bool} is this service active?                                */
  /*************************************************************************/
  enable: false,

  /*************************************************************************/
  /* basePath: {string} the root directory for where to store files        */
  /*************************************************************************/
  basePath: path.sep + path.join("data", "file_processor")
};
