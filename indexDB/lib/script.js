console.clear()

const DB = new MemoDB();

async function addRandom(emailId) {

    let newMemo = "" + Math.floor(Math.random() * 10);

    let item = await DB.retrieve(emailId);
    if (typeof item === 'undefined') {
        item = {emailId: emailId, memos: []};
    }
    console.log(item); // {emailId: 'ABC', memos: ['sdfds','sdfsd','sdfsdf']}

    item.memos.push(newMemo);
    DB.store(emailId, item);

    updatePage(item.memos);
}

function updatePage(memos) {
    let list = document.querySelector("#list");
    list.innerHTML = "";

    memos.forEach(memo => {
        let div = document.createElement("div");
        div.innerText = memo;
        list.appendChild(div);
    })
}
