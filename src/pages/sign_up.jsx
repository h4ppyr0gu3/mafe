import { InputField, InputButton } from "../components/input_field";
import {
  loggedInStatus,
} from "../utils/app_state_service";
import { userSignUp } from "../utils/user_requests";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import Footer from "../components/footer";
import Header from "../components/header";
import { Errors } from "../components/errors";

export default function SignUp() {
  let email, password, passwordConfirmation, submit;

  const navigate = useNavigate();
  const [loggedIn,] = loggedInStatus();

  async function handleSubmit(e) {
    e.preventDefault();
    disableButton();
    await userSignUp(email.value, password.value).then(() => {
      if (loggedIn()) {
        navigate("/", {});
      }
    });
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
  <Header />
      <div class="container is-centered-middle">
        <div class="box is-flex-column">
          <div class="is-size-2">Sign up</div>
          <div class="columns mt-3">
            <div class="column is-centered-middle">
              <p class="is-size-5">Sign up with: some oauth app haha</p>
            </div>
          </div>
          <div class="is-divider" data-content="OR">
            <form onSubmit={handleSubmit}>
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
        </div>
      </div>
      <Footer />
    </>
  );
}
