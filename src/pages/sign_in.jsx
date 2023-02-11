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
      <Header />
      <div class="container is-centered-middle">
        <div class="box is-flex-column">
          <div class="is-size-2">Sign In</div>
          <form onSubmit={handleSubmit}>
            <InputField ref={email} label="email" type="text" value="" />
            <InputField
              ref={password}
              label="password"
              type="password"
              value=""
            />
            <InputButton type="submit" value="Sign In" ref={submit} />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
