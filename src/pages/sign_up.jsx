import { InputField, InputButton } from "../components/input_field";
import { loggedInStatus } from "../utils/app_state_service";
import { userSignUp } from "../utils/user_requests";
import { useNavigate } from "@solidjs/router";
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
      <div class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
        <header class="max-w-lg mx-auto">
          <a href="#">
            <h1 class="text-4xl font-bold text-white text-center">GhostBrain</h1>
          </a>
        </header>

        <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 class="font-bold text-2xl text-black">Welcome to GhostBrain</h3>
            <p class="text-gray-600 pt-2">Create your account.</p>
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
              <InputField
                ref={passwordConfirmation}
                label="password"
                type="password"
                value=""
              />
              <InputButton type="submit" value="Sign Up" ref={submit} />
            </form>
          </div>
        </main>
        <div class="max-w-lg mx-auto text-center mt-12 mb-6">
          <p class="text-white">Already have an account? <a href="/sign_in" class="font-bold hover:text-white hover:underline">Sign in</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
