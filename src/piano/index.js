import { curry } from "ramda";

const KEY_MAP = {
  C: 60,
  CS: 61,
  D: 62,
  DS: 63,
  E: 64,
  F: 65,
  FS: 66,
  G: 67,
  GS: 68,
  A: 69,
  AS: 70,
  B: 71,
};
const getKeyStateFunction = curry((midiInput, key) => {
  const { value, isActive } = midiInput;
  return isActive && value === KEY_MAP[key];
});

function Piano({ midiInput }) {
  const isKeyActive = getKeyStateFunction(midiInput || {});
  return (
    <div>
      <ul class="set">
        <li class={`white b ${isKeyActive("B") && " active"}`}></li>
        <li class={`black as ${isKeyActive("AS") && " active"}`}></li>
        <li class={`white a ${isKeyActive("A") && " active"}`}></li>
        <li class={`black gs ${isKeyActive("GS") && " active"}`}></li>
        <li class={`white g ${isKeyActive("G") && " active"}`}></li>
        <li class={`black fs ${isKeyActive("FS") && " active"}`}></li>
        <li class={`white f ${isKeyActive("F") && " active"}`}></li>
        <li class={`white e ${isKeyActive("E") && " active"}`}></li>
        <li class={`black ds ${isKeyActive("DS") && " active"}`}></li>
        <li class={`white d ${isKeyActive("D") && " active"}`}></li>
        <li class={`black cs ${isKeyActive("CS") && " active"}`}></li>
        <li class={`white c ${isKeyActive("C") && " active"}`}></li>
      </ul>
      <pre>{JSON.stringify(midiInput, null, 2)}</pre>
    </div>
  );
}

export default Piano;
