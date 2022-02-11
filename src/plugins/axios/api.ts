import axios from "axios";
import { keys, isNil, set } from "lodash-es";
import { PersonalizedOptions } from "./type";
export default class api {
  axiosParams: object;

  thenHandle: Function | any;

  catchHandle: Function | any;

  finallyHandle: Function | any;

  axiosInstance: any;

  personalizedOptions: any;

  constructor(axiosParams: object, personalizedOptions: PersonalizedOptions) {
    this.axiosParams = axiosParams;
    this.personalizedOptions = personalizedOptions;
    this.init();
  }

  init() {
    // 绑定apiInstance
    set(this.axiosParams, "apiInstance", this.apiInstance);

    keys(this.personalizedOptions).forEach((key) => {
      const personaOption = this.personalizedOptions[key];

      if (!isNil(personaOption)) {
        set(this.axiosParams, key, personaOption);
      }
    });

    this.axiosInstance = axios(this.axiosParams);

    this.axiosInstance
      .then((resData: any) => {
        const data = resData?.data ?? resData;
        // eslint-disable-next-line promise/always-return
        this.thenHandle !== null && this.thenHandle(data);
      })
      .catch((error: unknown) => {
        if (!this.catchHandle) return;

        this.catchHandle !== null && this.catchHandle(error);
      })
      .finally(() => {
        if (!this.finallyHandle) return;

        this.finallyHandle();
      });
  }

  then(thenCallBack: Function) {
    this.thenHandle = thenCallBack;
  }

  catch(catchCallBack: Function) {
    this.catchHandle = catchCallBack;
  }

  finally(finallyCallBack: Function) {
    if (!finallyCallBack) return;

    this.finallyHandle = finallyCallBack;
  }

  apiInstance() {
    return {
      thenHandle: this.thenHandle,
      catchHandle: this.catchHandle,
      finallyHandle: this.finallyHandle,
    };
  }
}
