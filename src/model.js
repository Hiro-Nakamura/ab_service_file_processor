/**
 * model.js
 * define our DB operations.
 */
var dbConnection;

module.exports = {
    init: function(dbConn) {
        dbConnection = dbConn;
    },
    create: function(data) {
        return new Promise((resolve, reject) => {
            // make sure we are properly initialized.
            if (!dbConnection) {
                reject(new Error("No dbConnection defined."));
                return;
            }

            var fieldsInOrder = [
                "uuid",
                "appKey",
                "permission",
                "file",
                "pathFile",
                "size",
                "type",
                "info",
                "uploadedBy"
            ];
            var values = [];
            fieldsInOrder.forEach((f) => {
                if (f != "info") {
                    values.push(data[f]);
                } else {
                    values.push(JSON.stringify(data[f]));
                }
            });

            // add our createdAt, updatedAt fields.
            var now = new Date();
            values.push(now);
            values.push(now);

            dbConnection.query(
                `INSERT 
                 INTO op_fileupload (uuid, appKey, permission, file, pathFile, size, type, info, uploadedBy, createdAt, updatedAt)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                values,
                function(error /* ,results, fields*/) {
                    // error will be an Error if one occurred during the query
                    // results will contain the results of the query
                    // fields will contain information about the returned results fields (if any)

                    if (error) {
                        // TODO: identify specific errors and handle them if we can.
                        reject(error);
                        return;
                    }

                    resolve();
                }
            );
        });
    }
};
