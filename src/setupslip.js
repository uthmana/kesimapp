import kesimAPI from "./kesimAPI";

export default function setupslip(list) {
  {
    list.addEventListener(
      "slip:beforereorder",
      function (e) {
        if (e.target.classList.contains("demo-no-reorder")) {
          e.preventDefault();
        }
      },
      false
    );

    list.addEventListener(
      "slip:beforeswipe",
      function (e) {
        if (e.target.parentElement.parentElement.classList.contains("spacetoggle")) {
          e.preventDefault();
        }
      },
      false
    );

    list.addEventListener(
      "slip:beforewait",
      function (e) {
        if (e.target.classList.contains("instant")) e.preventDefault();
      },
      false
    );

    list.addEventListener(
      "slip:afterswipe",
      function (e) {
        let elemDataText = e.target.dataset.item.split(",");
        let _obj = {"qurbanId" :elemDataText[0],"DetailId":elemDataText[1], "dMobile": elemDataText[2] }
        e.target.remove();
        kesimAPI.sendKesimSMS({ kesimData: [_obj]}).then((data)=>{
        if(data.Message == 'KESIMINACTIVE'){
            alert("Kesim SMS can not be sent now,  Time is not yet!");
        }else if(data.Message != 'OK'){
          alert("Error:  Kesim SMS failed  Please try again");
        }
        });

      },
      false
    );
    return new Slip(list);
  }
}
