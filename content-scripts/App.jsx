import React from "react";
import {Provider} from 'react-redux';
import {Store} from 'webext-redux';
import ReactDOM from "react-dom";
import { MainWrapper } from "./containers";
import 'antd/dist/antd.less';
import 'font-awesome/css/font-awesome.min.css'; 
import './global-style';
import './style.scss';



const store = new Store({
  state: {},
  portName:'WHATSAPPEXT'
});



store.ready().then(() => {
  const readyStateCheckInterval = setInterval(() => {
    if(document.readyState === "complete" && !!document.querySelector(".app")) {
      clearInterval(readyStateCheckInterval);

      const Element = document.createElement("div");
      Element.setAttribute("id", "dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf");
      const rootContainer = document.querySelector(".app-wrapper-web");

      rootContainer.insertAdjacentElement("afterbegin", Element);

      ReactDOM.render(
        <Provider store={store}>
            <MainWrapper />
        </Provider>,
        document.getElementById("dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf")
      );
    }
  }, 10);
});
