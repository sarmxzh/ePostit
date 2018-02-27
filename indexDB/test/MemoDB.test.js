describe('indexeddb test', function() {
    it('add 1 data and test it saves', async function() {
        let newMemo = "" + Math.floor(Math.random() * 10);
        let newItem = {memos: [newMemo]}
        let emailId = "TESTID";
        DB.store(emailId, newItem);

        let retrievedItem = await DB.retrieve(emailId);
        console.log("retrieve", retrievedItem);
        expect(retrievedItem).toExist();
        expect(retrievedItem.memos).toExist();
        expect(retrievedItem.memos.length).toBe(1);
        expect(parseInt(retrievedItem.memos[0]))
            .toBeA('number')
            .toBeGreaterThan(-1)
            .toBeLessThan(10)
    })
})
