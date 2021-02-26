import { curry } from "ramda";

const KEY_MAP = {
  C1: 48,
  CS1: 49,
  D1: 50,
  DS1: 51,
  E1: 52,
  F1: 53,
  FS1: 54,
  G1: 55,
  GS1: 56,
  A1: 57,
  AS1: 58,
  B1: 59,
  C2: 60,
  CS2: 61,
  D2: 62,
  DS2: 63,
  E2: 64,
  F2: 65,
  FS2: 66,
  G2: 67,
  GS2: 68,
  A2: 69,
  AS2: 70,
  B2: 71,
  C3: 72,
};
const getKeyStateFunction = curry((midiInput, key) => {
  const keyValue = KEY_MAP[key];
  const { value, isActive } = midiInput[keyValue] || {};
  return isActive && value === keyValue;
});

function Piano({ midiInput }) {
  const isKeyActive = getKeyStateFunction(midiInput || {});
  return (
    <div>
      <div>
        <ul class="set">
          <li class={`white c ${isKeyActive("C3") && " active"}`}></li>
          <li class={`white b ${isKeyActive("B2") && " active"}`}></li>
          <li class={`black as ${isKeyActive("AS2") && " active"}`}></li>
          <li class={`white a ${isKeyActive("A2") && " active"}`}></li>
          <li class={`black gs ${isKeyActive("GS2") && " active"}`}></li>
          <li class={`white g ${isKeyActive("G2") && " active"}`}></li>
          <li class={`black fs ${isKeyActive("FS2") && " active"}`}></li>
          <li class={`white f ${isKeyActive("F2") && " active"}`}></li>
          <li class={`white e ${isKeyActive("E2") && " active"}`}></li>
          <li class={`black ds ${isKeyActive("DS2") && " active"}`}></li>
          <li class={`white d ${isKeyActive("D2") && " active"}`}></li>
          <li class={`black cs ${isKeyActive("CS2") && " active"}`}></li>
          <li class={`white c ${isKeyActive("C2") && " active"}`}></li>
          <li class={`white b ${isKeyActive("B1") && " active"}`}></li>
          <li class={`black as ${isKeyActive("AS1") && " active"}`}></li>
          <li class={`white a ${isKeyActive("A1") && " active"}`}></li>
          <li class={`black gs ${isKeyActive("GS1") && " active"}`}></li>
          <li class={`white g ${isKeyActive("G1") && " active"}`}></li>
          <li class={`black fs ${isKeyActive("FS1") && " active"}`}></li>
          <li class={`white f ${isKeyActive("F1") && " active"}`}></li>
          <li class={`white e ${isKeyActive("E1") && " active"}`}></li>
          <li class={`black ds ${isKeyActive("DS1") && " active"}`}></li>
          <li class={`white d ${isKeyActive("D1") && " active"}`}></li>
          <li class={`black cs ${isKeyActive("CS1") && " active"}`}></li>
          <li class={`white c ${isKeyActive("C1") && " active"}`}></li>
        </ul>
      </div>
    </div>
  );
}

export default Piano;
export { KEY_MAP };
