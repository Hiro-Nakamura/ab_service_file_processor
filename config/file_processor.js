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
  basePath: path.sep + path.join("data", "file_processor"),

  /*************************************************************************/
  /* uploadPath: {string} the directory (under basePath) where uploaded    */
  /*             files are stored.                                         */
  /*************************************************************************/
  uploadPath: "tmp",

  /*************************************************************************/
  /* maxBytes: {Number} max size of uploaded file                              */
  /*************************************************************************/
  maxBytes: 10000000
};
