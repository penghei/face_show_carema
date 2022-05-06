import MainHomePage from "./pages/HomePage/MainHomePage";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App(props) {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        type="text/css"
        href="//at.alicdn.com/t/font_2940949_rb3kyx17rx.css"
      />
        <div id="main-router" key={props.location.key}>
          <Router>
            <Switch>
              <Route path="/main" component={MainHomePage}></Route>
              <Route path="/welcome" component={WelcomePage}></Route>
              <Redirect to="/welcome"></Redirect>
            </Switch>
          </Router>
        </div>
    </div>
  );
}

export default withRouter(App);
