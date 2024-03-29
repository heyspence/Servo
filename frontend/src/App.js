import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import { Provider } from 'react-redux';
import Home from "./components/Home";
// import Checkout from "./components/checkout/Checkout";
import Orders from "./components/Orders";
import ErrorBanner from "./components/ErrorBanner";
import ProviderShow from "./components/ProviderShow"
import Footer from "./components/Footer";
import UserAccount from "./components/UserAccount";
import RecurringOrders from "./components/RecurringOrders";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProviderDashboard from "./components/ProviderDashboard";
import PrivacyPolicy from "./components/staticPages/PrivacyPolicy";
import TermsOfService from "./components/staticPages/TermsOfService";
import AboutUs from "./components/staticPages/AboutUs";
import ContactUs from "./components/staticPages/ContactUs";
import VendorOnboarding from "./components/staticPages/VendorOnboarding";
import Modal from "./components/Modal";

function App({ store }) {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="206898763167-10uqs4cqvsmf3sosakbmr9pncd2l83gt.apps.googleusercontent.com">
          <Modal />
          <BrowserRouter>
            <NavigationBar />
            <ErrorBanner />
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/vendors/:id" component={ProviderShow} />
              {/* <Route exact path="/checkout" component={Checkout} /> */}
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/account" component={UserAccount} />
              <Route
                exact
                path="/recurring-orders"
                component={RecurringOrders}
              />
              <Route
                exact
                path="/vendors/:id/dashboard"
                component={ProviderDashboard}
              />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route
                exact
                path="/terms-of-service"
                component={TermsOfService}
              />
              <Route exact path="/about-us" component={AboutUs} />
              <Route exact path="/contact-us" component={ContactUs} />
              <Route
                exact
                path="/vendor-onboarding"
                component={VendorOnboarding}
              />
              <Route path="/" component={SplashPage} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
