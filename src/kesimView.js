import kesimAPI from "./kesimAPI.js";
import smsBasket from "./smsBasket.js";

export default class kesimView {
  constructor(
    root,
    {
      onSelectAllKesim,
      onSendKesim,
      onHumburgerToggle,
      onWrapperToggle,
      onListItemClick,
      onSendMultiSMS,
    } = {}
  ) {
    this.root = root;
    this.onSelectAllKesim = onSelectAllKesim;
    this.onSendKesim = onSendKesim;
    this.onHumburgerToggle = onHumburgerToggle;
    this.onWrapperToggle = onWrapperToggle;
    this.onListItemClick = onListItemClick;
    this.onSendMultiSMS = onSendMultiSMS;

    this.isSelectAll = false;
    this.menuItems = [
      { type: 2, name: "Küçükbaş (WORLD VACIP)" },
      { type: 3, name: "Küçükbaş (WORLD DİĞER)" },
      { type: 4, name: "Küçükbaş (TR VACIP)" },
      { type: 5, name: "Küçükbaş (TR DİĞER)" },
      { type: 7, name: "Büyükbaş (WORLD VACIP)" },
      { type: 8, name: "Büyükbaş  (WORLD DİĞER)" },
      { type: 9, name: "Büyükbaş (TR VACIP)" },
      { type: 10, name: "Büyükbaş (TR DİĞER)" },
    ];

    this.root.innerHTML = `
    <section class="main">
             <div class="loader" id="myLoader">
                 <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                 <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
                  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
                      <animateTransform 
                         attributeName="transform" 
                         attributeType="XML" 
                         type="rotate"
                         dur="2s" 
                         from="0 50 50"
                         to="360 50 50" 
                         repeatCount="indefinite" />
                  </path>
                 <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
                  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
                      <animateTransform 
                         attributeName="transform" 
                         attributeType="XML" 
                         type="rotate"
                         dur="1s" 
                         from="0 50 50"
                         to="-360 50 50" 
                         repeatCount="indefinite" />
                  </path>
                 <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
                  L82,35.7z">
                      <animateTransform 
                         attributeName="transform" 
                         attributeType="XML" 
                         type="rotate"
                         dur="2s" 
                         from="0 50 50"
                         to="360 50 50" 
                         repeatCount="indefinite" />
                  </path>
                </svg>

                <div id="smsWaiting" class="sms-waiting" style="display: none;"> Please Wait SMS in proccess......  </div>
             </div>

         <header>
             <nav class="menu-nav">
                 <button id="btnHumburger" class="btn menu-humburger">
                     <span class="bar bar-one"></span>
                     <span class="bar bar-two"></span>
                     <span class="bar bar-three"></span>
                 </button>

                 <div class="nav-center">
             
                 <button class="btn btn-outline-primary btn-selectall" id="btnSelectAll"> <img id="passivecheck" src="/static/image/checkpassive.png" /> <img id="activecheck" src="/static/image/checkactive.png" style="display:none;" /> All</button>
                     <div class="category-box">
                         <div class="category-name" id="categoryName">Küçükbaş (WORLD VACIP)</div>
                     <!--     <button class="btn btn-outline-primary"><i class="fa fa-download" aria-hidden="true"></i></button>-->
                     </div>
                   
                      <button class="btn btn-primary btn-multiple" id="btnMultiplte"> <span class="sm-hide"> GÖNDER</span> (<span id="smsCount">0</span>) <img src="/static/image/send.png" /></button>
                 </div>

                 <div id="sidebarWrapper" class="sidebar">
                     <div class="sidebar-list" id="sidebarList">
                         <ul class="sidebar-list--items" id="sidebarListItems">
                             <li><a class="listitem--link" href="#" onclick="GetPageData(this, 2)" class="btn-primary pagelink activeLink">Küçükbaş (WORLD VACIP)</a>  </li>
                             <li><a class="listitem--link" href="#"  onclick="GetPageData(this,3)" class="btn-primary pagelink">Küçükbaş (WORLD DİĞER)</a>  </li>
                             <li><a class="listitem--link" href="#"  onclick="GetPageData(this,4)" class="btn-primary pagelink">Küçükbaş (TR VACIP)</a>  </li>
                             <li><a class="listitem--link" href="#"  onclick="GetPageData(this,5)" class="btn-primary pagelink">Küçükbaş (TR DİĞER)</a>  </li>
                         </ul>

                     </div>
                 </div>
             </nav>

        </header>

        <div class="container-fluid">
            <div class="list-header" id= "listHeader">
                <span class="space-item-header" id="backUnSelects"><i class="fa fa-chevron-left"></i></span>
                <span class="font-bold sm-text">kurban Sahibi</span>
                <span class="font-bold sm-text">Qurban Type</span>
                <span class="font-bold sm-hide sm-text">Contact No</span>
                <span class="font-bold sm-text">Country</span>
            </div>

            <div class="list-body">

             <ul id="action-list" class="list-action-Items">

               <li class="listView-items"  onclick="createSMS(this,120,1230,'+905456432420')">
                    <div class="list-header">
                        <span class="space-item"><span class="icon-check5"></span></span>
                        <span>kurban Sahibi</span>
                        <span>Qurban Type</span>
                        <span class="sm-hide">Contact No</span>
                        <span>Country</span>
                    </div>
               </li>

            </ul>

     </div>
   </div>
    </section>
    `;

    this.sidebarListItems = document.getElementById("sidebarListItems");
    this.sidebarListItems.innerHTML = this.createListItem(this.menuItems);

    this.humburgerMenu = document.getElementById("btnHumburger");
    this.sidebarWrapper = document.getElementById("sidebarWrapper");
    this.sidebarList = document.getElementById("sidebarList");
    this.listitemLink = document.querySelectorAll(".listitem--link");
    this.actionList = document.getElementById("action-list");
    this.myLoader = document.getElementById("myLoader");
    this.categoryName = document.getElementById("categoryName");
    this.btnSelectAll = document.getElementById("btnSelectAll");

    this.passivecheck = document.getElementById("passivecheck");
    this.activecheck = document.getElementById("activecheck");
    this.btnMultiplte = document.getElementById("btnMultiplte");
    this.smsCount = document.getElementById("smsCount");

    this.Basket = new smsBasket();
    this.pageHistory = this.getKesimPageHistory();
    this.renderKesimData(this.pageHistory);
    this.listitemLink[
      this.getActiveLinkIndex(parseInt(this.pageHistory))
    ].classList.add("activeLink");

    this.humburgerMenu.addEventListener("click", () => {
      this.onHumburgerToggle();
    });

    this.sidebarWrapper.addEventListener("click", () => {
      this.onWrapperToggle();
    });

    this.btnMultiplte.addEventListener("click", () => {
      this.onSendMultiSMS(this.Basket.getAllItems());
    });

    this.btnSelectAll.addEventListener("click", () => {
      this.isSelectAll = this.isSelectAll == true ? false : true;

      if (this.isSelectAll) {
        this.activecheck.style.display = "inline-block";
        this.passivecheck.style.display = "none";
      } else {
        this.activecheck.style.display = "none";
        this.passivecheck.style.display = "inline-block";
      }

      this.onSelectAllKesim();
    });

    this.listitemLink.forEach((el) => {
      el.addEventListener("click", () => {
        this.onListItemClick(el);
      });
    });
  }

  getActiveLinkIndex(idx) {
    let link = 0;
    switch (idx) {
      case 10:
        link = 7;
        break;
      case 9:
        link = 6;
        break;
      case 8:
        link = 5;
        break;
      case 7:
        link = 4;
        break;
      case 5:
        link = 3;
        break;
      case 4:
        link = 2;
        break;
      case 3:
        link = 1;
        break;
      default:
        link = 0;
    }
    return link;
  }

  createListItem(data) {
    let elem = "";
    for (let i = 0; i < data.length; i++) {
      elem += `<li><a class="listitem--link" href="#" data-type="${data[i].type}" class="btn-primary pagelink">${data[i].name}</a></li>`;
    }
    return elem;
  }

  createKesimSMSObj(str) {
    let _data = str.split(",");
    return {
      qurbanId: _data[0],
      DetailId: _data[1],
      dMobile: _data[2],
    };
  }

  createKesimItem(data) {
    let elem = "";
    for (let i = 0; i < data.length; i++) {
      elem += `
               <li class="listView-items"  data-item="${data[i].dId},${
        data[i].qId
      },${data[i].contact}">
                    <div class="list-header">
                        <span class="space-item"><span class="icon-check5 icon-medium "></span></span>
                        <span>${data[i].name}</span>
                        <span> ${data[i].qurbanType}</span>
                        <span class="sm-hide"> ${
                          data[i].contact.substr(0, 3) +
                          "*****" +
                          data[i].contact.substr(data[i].contact.length - 3)
                        }</span>
                        <span>${data[i].country}</span>
                    </div>
               </li>`;
    }
    return elem;
  }

  bindClickEventToKesimItem() {
    const _listViewItems = document.querySelectorAll(".listView-items");
    _listViewItems.forEach((el) => {
      el.addEventListener("click", () => {
        let _Obj = this.createKesimSMSObj(el.dataset.item);
        this.toggleKesimItemSelect(el, _Obj);
      });
    });
  }

  toggleKesimItemSelect(el, _Obj) {
    // console.log(this.isSelectAll);

    if (this.isSelectAll && !el.classList.contains("spacetoggle")) {
      el.classList.add("spacetoggle");
      this.Basket.add(_Obj);
      this.smsCount.textContent = this.Basket.getTotalItem();
    } else if (!this.isSelectAll && el.classList.contains("spacetoggle")) {
      el.classList.remove("spacetoggle");
      this.Basket.remove(_Obj.DetailId);
      this.smsCount.textContent = this.Basket.getTotalItem();
    } else if (this.isSelectAll && el.classList.contains("spacetoggle")) {
      el.classList.remove("spacetoggle");
      this.Basket.remove(_Obj.DetailId);
      this.smsCount.textContent = this.Basket.getTotalItem();
    } else if (!this.isSelectAll && !el.classList.contains("spacetoggle")) {
      el.classList.add("spacetoggle");
      this.Basket.add(_Obj);
      this.smsCount.textContent = this.Basket.getTotalItem();
    }
  }

  showLoader(bool) {
    bool === true
      ? this.myLoader.classList.remove("close")
      : this.myLoader.classList.add("close");
  }

  getKesimPageHistory() {
    let _lastPage = localStorage.getItem("_GKPH");
    if (_lastPage) {
      return _lastPage;
    } else {
      localStorage.setItem("_GKPH", "2");
      return "2";
    }
  }

  renderKesimData(type) {
    this.showLoader(true);
    kesimAPI.getKesimByType(type).then((obj) => {
      if (obj.status == "OK") {
        if (obj.data.length > 0) {
          this.actionList.innerHTML = this.createKesimItem(obj.data);
          this.bindClickEventToKesimItem();
        } else {
          this.actionList.innerHTML =
            "<span class='empty-item'> There no Kesim for this Category </span>";
        }
        this.Basket.reset();
        this.smsCount.textContent = this.Basket.getTotalItem();
        localStorage.setItem("_GKPH", type);
      }
      this.showLoader(false);
    });
  }
}
