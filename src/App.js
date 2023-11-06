import { lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const SignIn = lazy(() => import('./Pages/SignIn'))
const AddQuestion = lazy(() => import('./Pages/AddQuestion'))
const AnswerPage = lazy(() => import('./Pages/AnswerPage'))


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<SignIn />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/answer" element={<AnswerPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
