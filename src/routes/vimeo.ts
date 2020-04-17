import VimeoController from "../controllers/VimeoController";
const user = [
    {
      method: "get",
      route: "/users/videos",
      middleware: [],
      action: VimeoController.getListVideos
    },
    {
      method: "delete",
      route: "/users/deletes",
      middleware: [],
      action: VimeoController.deleteVideos
    },
    {
      method: "post",
      route: "/users/edits",
      middleware: [],
      action: VimeoController.editVideos
    },
    {
      method: "put",
      route: "/users/uploads",
      middleware: [],
      action: VimeoController.uploadVideos
    },
    {
        method: "put",
        route: "/users/checklivestream",
        middleware: [],
        action: VimeoController.checkLiveStream
      }
    
  ];
  export default user;