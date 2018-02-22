class MemoDB {
    async store(emailId, data) {
        const db = await this.openDB();
        const objStore = db.transaction("items", "readwrite").objectStore("items");
        return objStore.put({emailId, ...data});
    }

    async retrieve(emailId) {
        const db = await this.openDB();
        const objStore = db.transaction("items", "readwrite").objectStore("items");

        return new Promise((res, rej) => {
            let request = objStore.get(emailId);
            request.onerror = function(event) {
              // Handle errors!
            };
            request.onsuccess = function(event) {
                res(request.result);
            };
        });
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
MemoDB.DB_NAME = "PostItTag";
MemoDB.VERSION = 1;
