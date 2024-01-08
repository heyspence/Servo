import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import { Provider } from 'react-redux';
import Home from "./components/Home";
import VendorShow from "./components/Vendor/VendorShow";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import ErrorBanner from "./components/ErrorBanner";
import ProviderShow from "./components/ProviderShow"
import Footer from "./components/Footer";
import UserAccount from "./components/UserAccount";
import RecurringOrders from "./components/RecurringOrders";

function App({ store }) {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavigationBar />
          <ErrorBanner />
          <Switch>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/vendors/:id" component={ProviderShow} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/account" component={UserAccount} />
            <Route exact path="/recurring-orders" component={RecurringOrders} />
            <Route path="/" component={SplashPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
