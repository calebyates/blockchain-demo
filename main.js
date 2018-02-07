$(document).ready(function(){
  
  let i = 0;
  let num = 0;
  let genesis = false;
    
  class Block{
    constructor(Index, Timestamp, Data, Previous){
      this.Index = "<span1>" + Index + "</span1>";
      this.Timestamp = `<span2>` + Timestamp + `</span2>`;
      this.Data =`<span3>`+ Data + `</span3>` ;
      this.Previous = `<span4>`+ Previous + `</span4>`;
      this.Hash = "<span5>" + this.calculateHash() + "</span5>";
    }
    
    calculateHash(){
      return  sha256(this.Index + this.Timestamp + JSON.stringify(this.Data)).toString();
    }
  }
    
    class BlockChain{
      constructor(){
        this.chain = [this.genesisBlock()];  
      }
      genesisBlock(){
        return new Block(i, new Date().toLocaleString(), "Genesis Block");
      }
      
      getLast(){
        return this.chain[this.chain.length - 1];
      }
      
      addBlock(newBlock){
        newBlock.Previous ="<span5>" + this.getLast().Hash + "</span5>";
        newBlock.Hash = newBlock.calculateHash() ;
        this.chain.push(newBlock);
        console.log(this.chain);
      }
    }
    
    let coin = new BlockChain();
    
    function addNew(){
      const inputData = $("inputField").val();
      let time = new Date();
      i++;
      coin.addBlock(new Block(i, time.toLocaleString(), inputData));
      console.log(JSON.stringify(coin.chain, null, 4));
    }
    
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
      $("#outputField").append("<div id='" + num + "' class='col-md-12'></div>");
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
      $("inputField").val('');
    });
    
    
    $("#Restart").click(function(){
      genesis = false;
      i = 0;
      coin.chain = [coin.genesisBlock()];
      $("inputField").val('');
      $("#outputField").html('');
      num = 0;
    });
    
  });