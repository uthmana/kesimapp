import KesimView from "./kesimView.js";
import Setupslip from "./setupslip.js";
import smsBasket from "./smsBasket.js";
import kesimAPI from "./kesimAPI.js";

import "./slip.js";



const root = document.getElementById("root");
const Basket =  new smsBasket();


const _kesimView = new KesimView(root, {
  onSelectAllKesim: function () {
        const  listViewTtems = document.querySelectorAll(".listView-items");
            listViewTtems.forEach( el =>{
            let _Obj  =  this.createKesimSMSObj(el.dataset.item);
            this.toggleKesimItemSelect(el, _Obj);
        })
  },
  onSendKesim: function () {
    console.log("Kesim Sending ... ");
  },
  onHumburgerToggle: function () {
    this.sidebarWrapper.classList.toggle("showsidebar-overlay");
    this.sidebarList.classList.toggle("show-sidebar");
  },
  onWrapperToggle: function () {
    this.sidebarWrapper.classList.remove("showsidebar-overlay");
    this.sidebarList.classList.remove("show-sidebar");
  },
  onListItemClick: function (el) {
    this.renderKesimData(el.dataset.type);
    this.listitemLink.forEach((el) => {
      el.classList.remove("activeLink");
    });
    el.classList.add("activeLink");
    this.categoryName.innerHTML = el.textContent;
  },

  onSendMultiSMS: function(_data){
    if(_data.length > 0){
        if(confirm(`${_data.length} Kişiye Kesim SMS göndermek istediğini Emin misiniz !`)){
         this.showLoader(true);
          document.getElementById('smsWaiting').style.display = 'block';
            kesimAPI.sendKesimSMS({ kesimData: _data}).then((data)=>{
            if(data.Message == 'OK'){
               location.reload();
            }
            else if(data.Message == 'KESIMINACTIVE'){
                alert("Kesim SMS can not be sent now,  Time is not yet!");
            }else{
              alert("Error:  Kesim SMS failed  Please try again");
            }
           this.showLoader(false);
          });
        }
    }else{
       alert("Lütfen Kesim seçmenizi gerekir !");
    }
  }
 

});

Setupslip(document.getElementById("action-list"));
