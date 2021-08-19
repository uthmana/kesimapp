import request from "./request.js";

export default class kesimAPI {
  static SetBaseUrl(type) {
    return `https://mectest.ngcloudmedia.com/handler/GetKesimPageWise.ashx?type=${type}&pagesize=20&itemcount=20`;
  }
  static KesimSmsURL() {
    return "https://mectest.ngcloudmedia.com/handler/kesimgonder.ashx";

    //return "https://localhost:7366/handler/kesimgonder.ashx";
  }
  static getKesimByType(type) {
    return request
      .Post(this.SetBaseUrl(type))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static sendKesimSMS(obj) {
    return request
      .Post(this.KesimSmsURL(), obj)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static removeKesim() {
    console.log("remove Kesim");
  }
}
