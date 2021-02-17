import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";

import Cookies from "./helpers/Cookies";
import { CircularProgress } from "@material-ui/core";

class Operations {
  constructor() {
    // Add a request interceptor to add the token at each call
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        const token = Cookies.getCookie("TOKEN");
        // console.log(token);

        if (token != null) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        console.log("SHIT!");
        return Promise.reject(error);
      }
    );

    //gotta do this after the interceptor is setup
    this.API = "http://localhost:1337";
    this.copyright = "My Website";
    this.website = "https://www.mywebsite.com";

    //Theming
    const themeColor = "dark";
    const themeOptions = {
      palette: {
        type: themeColor,
        primary: {
          main: "#3f51b5",
        },
        secondary: {
          main: "#f50057",
        },
      },
    };
    this.theme = createMuiTheme(themeOptions);
  }

  //Users ---------------------------------------------------------
  login = async (username, password) => {
    try {
      let res = await axios.post(
        this.API + "/auth/local",
        {
          identifier: username,
          password: password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        Cookies.setCookie("TOKEN", res.data.jwt);
        return {
          state: "auth",
        };
      } else return { state: "no-auth" };
    } catch (error) {
      return { state: "no-auth" };
    }
  };

  logout = () => {
    Cookies.deleteCookie("TOKEN");
  };

  //CRUD --------------------------------------------------------
  createStuff = async (json) => {
    try {
      let res = await axios.post(this.API + "/route/", json);
      return res.data;
    } catch (error) {
      console.log("CREATE STUFF", error);
      return null;
    }
  };

  getStuff = async () => {
    try {
      let res = await axios.get(this.API + "/route");
      return res.data;
    } catch (error) {
      console.log("GET STUFF", error);
      return null;
    }
  };

  updateStuffID = async (ID, update) => {
    try {
      let res = await axios.put(this.API + "/route/" + ID, update);
      return res.data;
    } catch (error) {
      console.log("PUT STUFF", error);
      return null;
    }
  };

  deleteStuffID = async (ID) => {
    try {
      let res = await axios.delete(this.API + "/route/" + ID);
      return res.status; //expecting 204
    } catch (error) {
      console.log("DELETE STUFF", error);
      return null;
    }
  };

  //Utils ---------------------------------------------------------
  shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  difference = (a1, a2) => {
    var a2Set = new Set(a2);
    return a1.filter(function (x) {
      return !a2Set.has(x);
    });
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  cleanString(text, maxChar) {
    if (text && text.length > 0)
      return text.replace(/(<([^>]+)>)/gi, "").length > maxChar
        ? text.replace(/(<([^>]+)>)/gi, "").substring(0, maxChar - 3) + "..."
        : text.replace(/(<([^>]+)>)/gi, "");
    else return "";
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
}

const ops = new Operations();
export default ops;
