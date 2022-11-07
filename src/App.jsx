import { Routes, Route } from "@solidjs/router";
import Header from "./components/header";
import Footer from "./components/footer";
import SignIn from "./pages/sign_in";
import SignUp from "./pages/sign_up";
import Landing from "./pages/landing";
import YTSearch from "./pages/yt_search";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" component={Landing} />
        <Route path="/search" component={YTSearch} />
        <Route path="/sign_up" component={SignUp} />
        <Route path="/sign_in" component={SignIn} />
      </Routes>
      <Footer />
    </>
  );
}
