const meaUrl = process.env.VUE_APP_MEAS || "";
const taeUrl = process.env.VUE_APP_TAES || "";
export default {
  // 微信分享
  getSignature: meaUrl + "", // 微信sdk接口（最新）

  /** 上传文件 */
  uploadFile: taeUrl + "api/xn_upload",

  /** 提交Form表单 */
  submitForm: taeUrl + "api/xn",
};
