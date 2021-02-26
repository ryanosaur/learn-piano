import "./App.css";
import { useEffect, useState } from "react";
import { onMIDISuccess, onMIDIFailure } from "./midi";
import Piano from "./piano";

function App() {
  const [midiValues, setMidiResponse] = useState();

  function getMIDIMessage(midiMessage) {
    const [state, value, intensity] = midiMessage.data;
    const isActive = state === 144;
    setMidiResponse((prevState) => ({
      ...prevState,
      [value]: { isActive, value, intensity },
    }));
  }

  const handleMidiResponse = (midiInput) =>
    onMIDISuccess(midiInput, getMIDIMessage);

  useEffect(
    () => navigator.requestMIDIAccess().then(handleMidiResponse, onMIDIFailure),
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <Piano midiInput={midiValues} />
      </header>
    </div>
  );
}

export default App;
