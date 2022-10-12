import axios, { AxiosInstance } from "axios";

export class Service {
  private baseUrl;
  private withToken;
  public instance: AxiosInstance;

  constructor(baseUrl?: string, withToken: boolean = true) {
    this.baseUrl = baseUrl;
    this.withToken = withToken;

    this.instance = axios.create({
      timeout: 1000,
      timeoutErrorMessage: "Request Timeout",
      baseURL: this.baseUrl,
    });

    const isProd = "development";

    this.instance.interceptors.request.use(
      (config: any) => {
        let authState = JSON.parse(localStorage.getItem("auth")!)    // !
        let token = authState.token ?? ''
        if (token && this.withToken) {
          config.headers["x-access-token"] = `${token}`;
        }
        //console.log(localStorage.getItem("auth"));
        
        return config;
      },
      (error) => {
        if (!isProd) {
          console.log(32, error);
        }
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        if (!isProd) {
          console.log("SUC Resp: ", response.data);
        }
        return response;
      },
      (error) => {
        if (error.response) {
          if (error.response?.status === 401) {
            // Logout
          }

          if (!isProd) {
            console.log("ERR Resp: ", error.response);
          }
          return Promise.reject(error.response);
        }

        if (!isProd) {
          console.log("Err: ", error);
        }

        return Promise.reject(error);
      }
    );
  }
}