import { InputField, InputButton } from "../components/input_field";
import { loggedInStatus } from "../utils/app_state_service";
import { userSignUp } from "../utils/user_requests";
import { useNavigate, A } from "@solidjs/router";
import { onMount } from "solid-js";
import { createNotification } from "../utils/notifications";

import Footer from "../components/footer";
import Header from "../components/header";

export default function SignUp() {
  let email, password, passwordConfirmation, submit;

  const navigate = useNavigate();
  const [loggedIn] = loggedInStatus();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.value === passwordConfirmation.value) {
      disableButton();
      await userSignUp(email.value, password.value).then(() => {
        if (loggedIn()) {
          navigate("/", {});
        }
      });
    } else {
      createNotification("Passwords do not match", "error");
    }
  }

  function disableButton() {
    submit.disabled = true;
  }

  onMount(() => {
    if (loggedIn()) {
      navigate("/", {});
    }
  });

  return (
    <>
      <div class="bg-neutral-900 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
        <header class="max-w-lg mx-auto">
          <A href="/">
            <h1 class="text-4xl font-bold text-white text-center">GhostBrain</h1>
          </A>
        </header>

        <main class="bg-neutral-800 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 class="font-bold text-2xl text-white">Welcome to GhostBrain</h3>
            <p class="text-white pt-2">Create your account.</p>
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
                  placeholder="password"
                  type="password"
                />
              </div>
              <div class="mb-6 pt-3 rounded bg-neutral-600">
                <div class="block text-white text-sm font-bold mb-2 ml-3">
                  Password Confirmation
                </div>
                <input
                  class="bg-neutral-600 rounded w-full text-white focus:outline-none border-b-4 border-gray-400 focus:border-gray-200 px-3 pb-3"
                  ref={passwordConfirmation}
                  placeholder="password confirmation"
                  type="password"
                />
              </div>
              <input
                class="bg-neutral-600 hover:bg-sky-400 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                ref={submit}
                type="submit"
                value="Sign Up"
              />
            </form>
          </div>
        </main>
        <div class="max-w-lg mx-auto text-center mt-12 mb-6">
          <p class="text-white">Already have an account? <A href="/sign_in" class="font-bold hover:text-white hover:underline">Sign in</A>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
