//
// file_processor
// A service to manage uploaded files.
//
const path = require("path");
const AB = require("ab-utils");

const config = AB.config("file_processor");
const connections = AB.config("datastores");

const cote = require("cote");
const serviceResponder = new cote.Responder({ name: "file_processor" });

//// TODO:  const DB = AB.DBConnection( connections.site );
////        should already setup DB.connect() and DB.on("error")

const Mysql = require("mysql"); // our  {DB Connection}
const DB = Mysql.createConnection(connections.site);
DB.on("error", (err) => {
    console.log("What happened here?", err);

    // {
    //   Error: "read ECONNRESET at TCP.onStreamRead (internal/stream_base_commons.js:162:27)",
    //   errno: 'ECONNRESET',
    //   code: 'ECONNRESET',
    //   syscall: 'read',
    //   fatal: true
    // }
});
DB.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as  id " + DB.threadId);
});

const ABService = AB.service;

const readHandler = require(path.join(__dirname, "src", "read.js"));
readHandler.init({ config, DB });

const Handler = require(path.join(__dirname, "src", "handler.js"));
Handler.init({ config, DB });

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
        serviceResponder.off("file.read", readHandler.fn);
        serviceResponder.off("file.upload", Handler.fn);
        super.shutdown();
    }

    run() {
        console.log("!!!! app.js:run(): initialize services:");
        serviceResponder.on("model.find", (req, cb) => {
            console.log("!!!! model.find got a request!");
            cb(null, { ok: true });
        });
        serviceResponder.on("file.read", readHandler.fn);
        serviceResponder.on("file.upload", Handler.fn);
    }
}

// Make an instance of our Service (which starts the App)
/* eslint-disable no-unused-vars */
var Service = new FileProcessor({ name: "FileProcessor" });
