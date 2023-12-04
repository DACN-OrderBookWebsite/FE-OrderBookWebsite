export default {
    getURL(){
        return "http://localhost:8000/images/";
    },
    getSachPicture(data){
        return this.getURL() + "Sach/" + data;
    },
    getNguoiDungPicture(data){
        return this.getURL() + "NguoiDung/" + data;
    }
  };
  