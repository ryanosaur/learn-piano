import { curry } from "ramda";
import { useEffect, useState } from "react";
import { onMIDISuccess, onMIDIFailure } from "./midi";
import { KEY_MAP, AudioHandler } from "./utils";

function Piano() {
  const [midiInput, setMidiResponse] = useState({});

  function getMIDIMessage(midiMessage) {
    const [state, value, intensity] = midiMessage.data;
    const isActive = state >= 144;
    setMidiResponse((prevState) => {
      return {
        ...prevState,
        [value]: { isActive, value, intensity },
      };
    });
  }

  const handleMidiResponse = (midiInput) =>
    onMIDISuccess(midiInput, getMIDIMessage);

  useEffect(
    () => navigator.requestMIDIAccess().then(handleMidiResponse, onMIDIFailure),
    []
  );

  return (
    <div>
      <div>
        <ul className="set">
          <PianoKey keyType="white" note="C3" midiInput={midiInput} />
          <PianoKey keyType="white" note="B2" midiInput={midiInput} />
          <PianoKey keyType="black" note="AS2" midiInput={midiInput} />
          <PianoKey keyType="white" note="A2" midiInput={midiInput} />
          <PianoKey keyType="black" note="GS2" midiInput={midiInput} />
          <PianoKey keyType="white" note="G2" midiInput={midiInput} />
          <PianoKey keyType="black" note="FS2" midiInput={midiInput} />
          <PianoKey keyType="white" note="F2" midiInput={midiInput} />
          <PianoKey keyType="white" note="E2" midiInput={midiInput} />
          <PianoKey keyType="black" note="DS2" midiInput={midiInput} />
          <PianoKey keyType="white" note="D2" midiInput={midiInput} />
          <PianoKey keyType="black" note="CS2" midiInput={midiInput} />
          <PianoKey keyType="white" note="C2" midiInput={midiInput} />
          <PianoKey keyType="white" note="B1" midiInput={midiInput} />
          <PianoKey keyType="black" note="AS1" midiInput={midiInput} />
          <PianoKey keyType="white" note="A1" midiInput={midiInput} />
          <PianoKey keyType="black" note="GS1" midiInput={midiInput} />
          <PianoKey keyType="white" note="G1" midiInput={midiInput} />
          <PianoKey keyType="black" note="FS1" midiInput={midiInput} />
          <PianoKey keyType="white" note="F1" midiInput={midiInput} />
          <PianoKey keyType="white" note="E1" midiInput={midiInput} />
          <PianoKey keyType="black" note="DS1" midiInput={midiInput} />
          <PianoKey keyType="white" note="D1" midiInput={midiInput} />
          <PianoKey keyType="black" note="CS1" midiInput={midiInput} />
          <PianoKey keyType="white" note="C1" midiInput={midiInput} />
        </ul>
      </div>
    </div>
  );
}

function PianoKey({ keyType, note, midiInput }) {
  const keyValue = KEY_MAP[note];
  const { value: midiValue, isActive } = midiInput[keyValue] || {};
  const isKeyActive = () => isActive && midiValue === keyValue;
  const lowerKey = note.replace(/[0-9]/g, "").toLowerCase();
  const frequency = AudioHandler.midiToFrequency(midiValue);
  if (isKeyActive()) {
    AudioHandler.playSound(frequency);
  } else {
    AudioHandler.stopSound();
  }
  return (
    <li className={`${keyType} ${lowerKey} ${isKeyActive() && " active"}`} />
  );
}

export default Piano;
