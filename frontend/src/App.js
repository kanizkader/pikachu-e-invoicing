import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Create from './pages/create';
import Createup from './pages/createInputUpload';
import Createfor from './pages/createInputForm';
import Render from './pages/render';
import { Send, SendingForm } from './pages/send';
import RenderHTML from './pages/renderHTML';
import RenderJSON from './pages/renderJSON';
import RenderPDF from './pages/renderPDF';
import { RenderHTMLThanks, RenderJSONThanks, RenderPDFThanks, CreateThanks, SendThanks } from './pages/thankyou';
import Login from './pages/login';
import Signup from './pages/signup';
import { Learn } from './pages/learn';
import { Pricing } from './pages/pricing';
import Unavailable from './pages/unavailable';
import Account from './pages/account';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/inputupload" element={<Createup />} />
          <Route path="/create/inputform" element={<Createfor />} />
          <Route path="/create/results" element={<CreateThanks />} />
          <Route path="/render" element={<Render />} />
          <Route path="/render/HTML" element={<RenderHTML />} />
          <Route path="/render/HTML/result" element={<RenderHTMLThanks />} />
          <Route path="/render/JSON" element={<RenderJSON />} />
          <Route path="/render/JSON/result" element={<RenderJSONThanks />} />
          <Route path="/render/PDF" element={<RenderPDF />} />
          <Route path="/render/PDF/result" element={<RenderPDFThanks />} />
          <Route path="/send" element={<Send />} />
          <Route path="/send/form" element={<SendingForm />} />
          <Route path="/send/result" element={<SendThanks />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/unavailable" element={<Unavailable/>} />
          <Route path="/account" element={<Account/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
