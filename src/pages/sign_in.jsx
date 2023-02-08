import { InputField, InputButton } from "../components/input_field";
import { loggedInStatus } from "../utils/app_state_service";
import { onMount, createSignal, Show } from "solid-js";
import { userLogin } from "../utils/user_requests";
import { useNavigate } from "@solidjs/router";
import Header from "../components/header";
import { Errors } from "../components/errors";
import Footer from "../components/footer";
import { confirmToken } from "../utils/miscellaneous_requests";

export default function SignIn() {
  let email, password, submit;

  const [errors, setErrors] = createSignal([]);
  const [loggedIn] = loggedInStatus();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    toggleDisableButton();
    await userLogin(email.value, password.value).then((logIn) => {
      console.log(logIn);
      if (!logIn.success) {
        toggleDisableButton();
        setErrors(logIn.errors);
      }
      if (localStorage.getItem("auth") != "") {
        navigate("/", { replace: true });
      }
    });
  }

  function toggleDisableButton() {
    submit.disabled = !submit.disabled;
  }

  onMount(() => {
    console.log("mount");
    if (loggedIn()) {
      navigate("/", { replace: true });
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

  function errorsPresent() {
    return errors().length > 0;
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
