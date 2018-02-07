const SHA256 = require('crypto-js/sha256');


class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }


calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp  + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, new Date().toLocaleString, "Genesis Block", "0");
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        console.log(this.chain);
    }


    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}




// let Z2MCoin = new Blockchain();
// Z2MCoin.addBlock(new Block(1, "02/02/2018", { amount: 4}));
// Z2MCoin.addBlock(new Block(2, "02/03/2018", { amount: 10}));

// console.log('is blockchain valid?' + Z2MCoin.isChainValid());

// Z2MCoin.chain[1].data = { amount: 100};
// Z2MCoin.chain[1].hash = Z2MCoin.chain[1].calculateHash();

// console.log('is blockchain valid?' + Z2MCoin.isChainValid());

// console.log(JSON.stringify(Z2MCoin, null, 4));

// let inputText = document.getElementById('data-input-area');
// let outputText = document.getElementById('data-output-area');

// sha256(inputText.value).then(function (digest) {
//     outputText.value = digest;
// });


// inputText.addEventListener("input", runSHA256);

// function runSHA256() {
//     sha256(inputText.value).then(function (digest) {
//         outputText.value = digest;
//     });
// }

///Keydown ENTER function
$(document).keydown(function(key){
    if(key.keyCode == 13){
      $("#inputData").trigger("click");
    }
  });
/////

$("#inputData").click(function(){
  addNew();
  num++; 
 coin.chain.forEach(function(newChain){
  $("data-output-area").append("<div id='" + num + "' class='col-md-12'></div>");
  if(genesis == false && num == 1){
     $("#" + num).html(JSON.stringify(newChain, null, '<br/>').replace(/[{}"']/g,""));
     num++;
     genesis = true;
     $("#" + num).html(JSON.stringify(newChain, null, '<br/>').replace(/[{}"']/g,""));
  }
  else if( num < 4){
     $("#" + num).html(JSON.stringify(newChain, null, '<br/>').replace(/[{}"']/g,""));
  }
  else if(num > 3){
    num = 0;
    num++;
  }  
});
  $("#data-input-area").val('');
});


$("resetBtn").click(function(){
  genesis = false;
  i = 0;
  coin.chain = [coin.genesisBlock()];
  $("#data-input-area").val('');
  $("data-output-area").html('');
  num = 0;
});

});