export function InputField(props) {
  return (
    <>
      <div class="mb-6 pt-3 rounded bg-gray-200">
        <div class="block text-gray-700 text-sm font-bold mb-2 ml-3">{props.label}</div>
          <input
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            ref={props.ref}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
          />
        </div>
    </>
  );
}

export function InputButton(props) {
  return (
    <input
      class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
      ref={props.ref}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
    />
  );
}
