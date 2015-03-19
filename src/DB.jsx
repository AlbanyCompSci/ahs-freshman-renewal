var Firebase = require('firebase');

exports.putTable = function(tableRef, key, item) {
    tableRef.child('values').child(key).update(item, function(error) {
        if (error) {
            console.log("Failed to PUT " + JSON.stringify(item) + " at " + key + " in " + tableRef.key());
        } else {
            console.log("Successfully PUT " + JSON.stringify(item) + " at " + key + " in " + tableRef.key());
        }
    });
};

exports.postTable = function(tableRef, item) {
    itemRef = tableRef.child('values').push(item, function(error) {
        if (error) {
            console.log("Failed to POST " + JSON.stringify(item) + " to " + tableRef.key());
        } else {
            console.log("Successful POST of " + JSON.stringify(item) + " to " + tableRef.key());
        }
    });
    if (!itemRef) return;
    var key = itemRef.key();
    tableRef.child('keys').push(key, function(error) {
        if (error) {
            console.log("Failed to POST key (" + key + ") for " + JSON.stringify(item) + " to " + tableRef.key());
        } else {
            console.log("Successful POST of key (" + key + ") for " + JSON.stringify(item) + " to + " + tableRef.key());
        }
    });
};

exports.deleteTable = function(tableRef, key) {
    tableRef.child('keys').equalTo(key).once("value", function(snap) {
        snap.forEach(function (childSnap) {
            childSnap.ref().remove(function(error) {
                if (error) {
                    console.log("Failed to DELETE key " + key + " in " + tableRef.key());
                } else {
                    console.log("Successful DELETE of key " + key + " in " + tableRef.key());
                }
            });
        });
    });
    tableRef.child('values').child(key).remove(function(error) {
        if (error) {
            console.log("Failed to DELETE item at key " + key + " in " + tableRef.key());
        } else {
            console.log("Successful DELETE of item at key " + key + " in " + tableRef.key());
        }
    });
};
