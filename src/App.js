import MainHomePage from "./pages/HomePage/MainHomePage";
import ErrorEdge from "./errorEdge/ErrorEdge";

function App() {
  return (
    <div className="App">
      <ErrorEdge>
        <MainHomePage></MainHomePage>
      </ErrorEdge>
    </div>
  );
}

export default App;
