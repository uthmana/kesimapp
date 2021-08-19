export default class smsBasket {
    
  constructor(){
      this.Items= [];
   }
   add (obj){
      this.Items.push(obj)
   }
   remove(id){
    this.Items = this.Items.filter(item => item.DetailId != id);
   }
   reset(){
     this.Items = [];
   }
  getTotalItem(){
     return this.Items.length;
  }
  getAllItems(){
      return this.Items;
  }

}


