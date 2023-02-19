import { InputField, InputButton } from "../components/input_field";
import { loggedInStatus } from "../utils/app_state_service";
import { onMount, createSignal, Show } from "solid-js";
import { userLogin } from "../utils/user_requests";
import { useNavigate, A } from "@solidjs/router";
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
      <div class="min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 bg-neutral-900" style="font-family:'Lato',sans-serif;">
        <header class="max-w-lg mx-auto">
          <A href="/">
            <h1 class="text-4xl font-bold text-white text-center">Startup</h1>
          </A>
        </header>

        <div class="bg-neutral-800 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 class="font-bold text-2xl text-white">Welcome to Startup</h3>
            <p class="text-white pt-2">Sign in to your account.</p>
          </section>

          <div class="mt-10">
            <form onSubmit={handleSubmit} class="flex flex-col">
              <div class="mb-6 pt-3 rounded bg-neutral-600">
                <div class="block text-white text-sm font-bold mb-2 ml-3">Email</div>
                <input
                  class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
                  ref={email}
                  placeholder="email"
                  type="text"
                />
              </div>
              <div class="mb-6 pt-3 rounded bg-neutral-600">
                <div class="block text-white text-sm font-bold mb-2 ml-3">Password</div>
                <input
                  class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
                  ref={password}
                  placeholder="email"
                  type="password"
                />
              </div>
              <div class="flex justify-end">
                <a href="#" class="text-sm text-white hover:text-sky-400 hover:underline mb-6">Forgot your password?</a>
              </div>
              <input
                class="bg-neutral-600 hover:bg-sky-400 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                ref={submit}
                type="submit"
                value="Sign In"
              />
            </form>
          </div>
        </div>

        <div class="max-w-lg mx-auto text-center mt-12 mb-6">
          <p class="text-white">Don't have an account? <A href="/sign_up" class="hover:text-white font-bold hover:underline">Sign up</A>.</p>
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

        // <div class="flex">
        //   <div class="w-5 h-5" style="background-color: #000000"></div>
        //   <div class="w-5 h-5" style="background-color: #101010"></div>
        //   <div class="w-5 h-5" style="background-color: #202020"></div>
        //   <div class="w-5 h-5" style="background-color: #32302f"></div>
        //   <div class="w-5 h-5" style="background-color: #3c3836"></div>
        //   <div class="w-5 h-5" style="background-color: #504945"></div>
        //   <div class="w-5 h-5" style="background-color: #555555"></div>
        //   <div class="w-5 h-5" style="background-color: #bdae93"></div>
        //   <div class="w-5 h-5" style="background-color: #ebdbb2"></div>
        //   <div class="w-5 h-5" style="background-color: #fbf1c7"></div>
        //   <div class="w-5 h-5" style="background-color: #d3b987"></div>
        //   <div class="w-5 h-5" style="background-color: #ffc24b"></div>
        //   <div class="w-5 h-5" style="background-color: #b3deef"></div>
        //   <div class="w-5 h-5" style="background-color: #73cef4"></div>
        //   <div class="w-5 h-5" style="background-color: #c9d05c"></div>
        //   <div class="w-5 h-5" style="background-color: #8ec07c"></div>
        //   <div class="w-5 h-5" style="background-color: #f43753"></div>
        //   <div class="w-5 h-5" style="background-color: #e1e1e1"></div>
        //   <div class="w-5 h-5" style="background-color: #FC36DB"></div>
        // </div>

