import React, { useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import { Provider } from 'react-redux';
import Home from "./components/Home";
import RestaurantShow from "./components/Restaurant/RestaurantShow";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import ErrorBanner from "./components/ErrorBanner";
import ProviderShow from "./components/ProviderShow"
import Footer from "./components/Footer";

function App({ store }) {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavigationBar />
          <ErrorBanner />
          <Switch>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/restaurants/:id" component={RestaurantShow} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/under-construction/vendor/:id" component={ProviderShow} />
            <Route path="/" component={SplashPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
