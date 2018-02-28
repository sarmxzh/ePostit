class MemoDB {
    async store(emailId, data) {
        const db = await this.openDB();
        const objStore = db.transaction(["items"], "readwrite").objectStore("items");
        return objStore.put({emailId, data});
    }

    async retrieve(emailId) {
        const db = await this.openDB();
        const objStore = db.transaction(["items"], "readwrite").objectStore("items");

        return new Promise((res, rej) => {
            let request = objStore.get(emailId);
            request.onerror = function(event) {
              // Handle errors!
            };
            request.onsuccess = function(event) {
                return res(request.result);
            };
        });
    }

    async searchNotes(phrase){
      const db = await this.openDB();
      const objStore = db.transaction(["items"], "readwrite").objectStore("items");
      var emailIdArray = [];

      var request = objStore.openCursor();
      request.onsuccess = function(event) {
        var emailNote = event.target.result;
        // console.log(emailNote)
        if (typeof emailNote != 'undefined') {
          // console.log(emailNote.value.data)
          if (emailNote.value.data.indexOf(phrase) !== -1) {
            // emailIdArray.push(emailNote.value.emailId)
            console.log("We found a row with value: " + JSON.stringify(emailNote.value.emailId));
          }
          emailNote.continue();
        }
        return emailIdArray;
      };
    }

    openDB() {
        return new Promise((res, rej) => {
            const request = indexedDB.open(MemoDB.DB_NAME, MemoDB.VERSION);
            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                db.createObjectStore("items", { keyPath: "emailId" });
            };
            request.onerror = function(event) {
                return rej("Please allow indexedDB");
            };
            request.onsuccess = function(event) {
                return res(event.target.result);
            };
        });
    }
}
MemoDB.DB_NAME = "ePostitDB"; //formally ePostit
MemoDB.VERSION = 1;
