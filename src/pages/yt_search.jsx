import { InputField, YTSearchBar } from "../components/input_field";
import { createSignal } from "solidjs";

export default function YTSearch() {
  const [signal, setSignal] = createSignal();
  return (
    <>
      <YTSearchBar onChange={setSignal()} />
      <MBResults results={signal()} />
    </>
  );
}
