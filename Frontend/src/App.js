import Welcome from "./Components/Welcome";
import "./App.css";
import Main from "./Components/Main";
import NotFound from "./Components/NotFound";
import { Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<Main />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}