import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Toolbar from "./components/Toolbar";
import Login from "./components/Login";
import Search from "./components/Search";

function App() {

  return (
    <div className="App">
      <Router>
      <Toolbar />
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/search" element={<Search/>} />
          <Route path="/" element={<></>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
