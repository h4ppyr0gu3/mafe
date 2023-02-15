import { InputField, InputButton } from "../components/input_field";
import { loggedInStatus } from "../utils/app_state_service";
import { onMount, createSignal, Show } from "solid-js";
import { userLogin } from "../utils/user_requests";
import { useNavigate } from "@solidjs/router";
import Header from "../components/header";
import Footer from "../components/footer";
import { confirmToken } from "../utils/miscellaneous_requests";

export default function SignIn() {
  let email, password, submit;

  const [loggedIn] = loggedInStatus();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    toggleDisableButton();
    await userLogin(email.value, password.value).then((logIn) => {
      console.log(logIn);
      if (!logIn.success) {
        toggleDisableButton();
      }
      if (localStorage.getItem("auth") != "") {
        navigate("/search", { replace: true });
      }
    });
  }

  function toggleDisableButton() {
    submit.disabled = !submit.disabled;
  }

  onMount(() => {
    if (loggedIn()) {
      navigate("/search", { replace: true });
    }
    sendConfirmationRequest();
  });

  function sendConfirmationRequest() {
    const urlParams = new URL(window.location.href).searchParams;
    const token = urlParams.get('confirmation_token');
    if (token !== null) {
      confirmToken(token);
    }
  }

  return (
    <>
      <div class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
        <header class="max-w-lg mx-auto">
          <a href="#">
            <h1 class="text-4xl font-bold text-white text-center">Startup</h1>
          </a>
        </header>

        <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 class="font-bold text-2xl text-black">Welcome to Startup</h3>
            <p class="text-gray-600 pt-2">Sign in to your account.</p>
          </section>

          <div class="mt-10">
            <form onSubmit={handleSubmit} class="flex flex-col">
              <InputField ref={email} label="email" type="text" value="" />
              <InputField
                ref={password}
                label="password"
                type="password"
                value=""
              />
              <div class="flex justify-end">
                <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
              </div>
              <InputButton type="submit" value="Sign In" ref={submit} />
            </form>
          </div>
        </main>

        <div class="max-w-lg mx-auto text-center mt-12 mb-6">
          <p class="text-white">Don't have an account? <a href="/sign_up" class="hover:text-white font-bold hover:underline">Sign up</a>.</p>
        </div>

        <footer class="max-w-lg mx-auto flex justify-center text-white">
          <a href="#" class="hover:underline">Contact</a>
          <span class="mx-3">•</span>
          <a href="#" class="hover:underline">Privacy</a>
        </footer>
      </div>
      <Footer />
    </>
  );
}
