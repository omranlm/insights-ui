import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";
 import { MATOMO_ID } from './config';
import { TrackingBanner } from "./components/banner";
import { ProtectedRoute } from './components/protectedRoute';
import Header from "./components/nav/header";
import { LoginCallback } from "./components/auth";
import { About } from "./views/About";
import { Home } from "./views/Home";
import { Reports } from "./views/Reports";
import { MapathonSummaryReport, MapathonDetailedReport } from "./views/MapathonReports";
import { UserGroupReport } from "./views/UserGroupReport";


function App(){
  return (
    <>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/authorised" component={LoginCallback} />
            <Route path="/about" component={About} />
            <Route path="/explore" component={Reports}/>
            <Route path="/mapathon-report/summary" component={MapathonSummaryReport}/>
            <Route path="/mapathon-report/detailed" component={MapathonDetailedReport} />
            <ProtectedRoute path={"/user-report"}>
              <UserGroupReport />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    {MATOMO_ID && <TrackingBanner />}
    </>
  )
}

export default App;
