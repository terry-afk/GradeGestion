import 'antd/dist/antd.css';
import {Create, Homepage, Navbar, Session, SessionDetails} from "./component";
import {Layout} from "antd";
import {Route, Switch} from "react-router-dom";

import './App.css'

const App = () => {
  return (
    <div className={"app"}>
      <div className={"navbar"}>
        <Navbar />
      </div>
      <div className={"main"}>
        <Layout>
          <div className={"routes"}>
            <Switch>
              <Route exact path={"/"}>
                <Homepage />
              </Route>
              <Route exact path={"/session"}>
                <Session />
              </Route>
              <Route exact path={"/session/:id"}>
                <SessionDetails />
              </Route>
              <Route exact path={"/create"}>
                <Create />
              </Route>
            </Switch>
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default App;
