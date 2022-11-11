import { InputField, InputButton } from "../components/input_field";
import { loggedInStatus } from "../utils/app_state_service";
import { onMount, createSignal, Show } from "solid-js";
import { userLogin } from "../utils/user_requests";
import { useNavigate } from "@solidjs/router";
import { Errors } from "../components/errors";

export default function SignIn() {
  let email, password, submit;

  const [errors, setErrors] = createSignal([]);
  const [loggedIn,] = loggedInStatus();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    toggleDisableButton();
    await userLogin(email.value, password.value).then((logIn) => {
      if (!logIn.success) {
        toggleDisableButton();
        setErrors(logIn.errors);
      }
      console.log(logIn);
      if (loggedIn()) {
        navigate("/", {});
      }
    });
  }

  function toggleDisableButton() {
    submit.disabled = !submit.disabled;
  }

  onMount(() => {
    if (loggedIn()) {
      navigate("/", {});
    }
  });

  function errorsPresent() {
    return errors().length > 0;
  }

  return (
    <>
      <div class="container is-centered-middle">
        <div class="box is-flex-column">
          <div class="is-size-2">Sign In</div>
          <Show when={errorsPresent()} fallback={<div/>}>
            <Errors
              {...{
                get errors() {
                  return errors();
                },
                set errors(value) {
                  setErrors(value);
                },
              }}
            />
          </Show>
          <form onSubmit={handleSubmit}>
            <InputField ref={email} label="email" 
              type="text" value="" />
            <InputField
              ref={password}
              label="password"
              type="password"
              value=""
            />
            <InputButton type="submit" value="Sign In" 
              ref={submit} />
          </form>
        </div>
      </div>
    </>
  );
}
