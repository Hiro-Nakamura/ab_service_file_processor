//
// file_processor
// A service to manage uploaded files.
//
const path = require("path");
const AB = require("ab-utils");

const config = AB.config("file_processor");

const cote = require("cote");
const serviceResponder = new cote.Responder({ name: "file_processor" });

const ABService = AB.service;

const Handler = require(path.join(__dirname, "src", "handler.js"));
Handler.init({ config });

//
// FileProcessor Service
// Create an instance of ABService that defines the unique actions:
//  .startup()  : initialize data & communications
//  .shutdown() : shutdown communications & data
//  .run()      : perform your unique actions
class FileProcessor extends ABService {
  // startup() {
  //   super.startup();
  // }

  shutdown() {
    serviceResponder.off("file.upload", Handler.fn);
    super.shutdown();
  }

  run() {
    serviceResponder.on("file.upload", Handler.fn);
  }
}

// Make an instance of our Service (which starts the App)
/* eslint-disable no-unused-vars */
var Service = new FileProcessor({ name: "FileProcessor" });
