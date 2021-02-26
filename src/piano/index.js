import { curry } from "ramda";
import { KEY_MAP } from "./utils";

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
        <ul className="set">
          <li className={`white c ${isKeyActive("C3") && " active"}`}></li>
          <li className={`white b ${isKeyActive("B2") && " active"}`}></li>
          <li className={`black as ${isKeyActive("AS2") && " active"}`}></li>
          <li className={`white a ${isKeyActive("A2") && " active"}`}></li>
          <li className={`black gs ${isKeyActive("GS2") && " active"}`}></li>
          <li className={`white g ${isKeyActive("G2") && " active"}`}></li>
          <li className={`black fs ${isKeyActive("FS2") && " active"}`}></li>
          <li className={`white f ${isKeyActive("F2") && " active"}`}></li>
          <li className={`white e ${isKeyActive("E2") && " active"}`}></li>
          <li className={`black ds ${isKeyActive("DS2") && " active"}`}></li>
          <li className={`white d ${isKeyActive("D2") && " active"}`}></li>
          <li className={`black cs ${isKeyActive("CS2") && " active"}`}></li>
          <li className={`white c ${isKeyActive("C2") && " active"}`}></li>
          <li className={`white b ${isKeyActive("B1") && " active"}`}></li>
          <li className={`black as ${isKeyActive("AS1") && " active"}`}></li>
          <li className={`white a ${isKeyActive("A1") && " active"}`}></li>
          <li className={`black gs ${isKeyActive("GS1") && " active"}`}></li>
          <li className={`white g ${isKeyActive("G1") && " active"}`}></li>
          <li className={`black fs ${isKeyActive("FS1") && " active"}`}></li>
          <li className={`white f ${isKeyActive("F1") && " active"}`}></li>
          <li className={`white e ${isKeyActive("E1") && " active"}`}></li>
          <li className={`black ds ${isKeyActive("DS1") && " active"}`}></li>
          <li className={`white d ${isKeyActive("D1") && " active"}`}></li>
          <li className={`black cs ${isKeyActive("CS1") && " active"}`}></li>
          <li className={`white c ${isKeyActive("C1") && " active"}`}></li>
        </ul>
      </div>
    </div>
  );
}

export default Piano;
