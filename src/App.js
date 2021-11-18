import ErrorEdge from "./errorEdge/ErrorEdge";
import MainHomePage from "./pages/HomePage/MainHomePage";
// import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
    return (
        <div className="App">
            <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_2940949_rb3kyx17rx.css"/>
            <ErrorEdge>
                <MainHomePage></MainHomePage>
                {/*<WelcomePage></WelcomePage>*/}
            </ErrorEdge>
        </div>
    );
}

export default App;
