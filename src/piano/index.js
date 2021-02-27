import { useEffect, useState } from "react";
import { onMIDISuccess, onMIDIFailure } from "./midi";
import { KEY_MAP, WAVEFORM, AudioHandler, generateScaleForNote } from "./utils";

function Piano() {
  const [selectedNote] = useState("F1");
  const [selectedScale] = useState("major");
  const [lessonState, setLessonState] = useState({
    note: selectedNote,
    scale: selectedScale,
    scaleValues: generateScaleForNote(selectedNote, selectedScale),
  });
  const [midiInput, setMidiResponse] = useState({});

  const onNotePress = (note) => {
    const [nextNote, ...rest] = lessonState.scaleValues;
    if (note !== nextNote) return;
    setLessonState({ ...lessonState, scaleValues: [...rest, nextNote] });
  };

  function getMIDIMessage(midiMessage) {
    const [state, value, intensity] = midiMessage.data;
    const isActive = state >= 144; // IMPROVE: this is an assumption, and varies based on midi device
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
    <div>
      <div>
        <ul className="set">
          <PianoKey
            keyType="white"
            note="C3"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="B2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="AS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="A2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="GS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="G2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="FS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="F2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="E2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="DS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="D2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="CS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="C2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="B1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="AS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="A1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="GS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="G1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="FS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="F1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="E1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="DS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="D1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="black"
            note="CS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
          <PianoKey
            keyType="white"
            note="C1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
          />
        </ul>
      </div>
    </div>
  );
}

function PianoKey({ keyType, note, midiInput, onNotePress, lessonState }) {
  const [audioHandler] = useState(new AudioHandler());
  const [lowerKey] = useState(note.replace(/[0-9]/g, "").toLowerCase());
  const [keyValue] = useState(KEY_MAP[note]);
  const { isActive, intensity } = midiInput[keyValue] || {};
  const frequency = audioHandler.midiToFrequency(keyValue);
  const nextNote = lessonState.scaleValues[0];
  audioHandler.setWaveform(WAVEFORM.TRIANGLE);
  if (isActive) {
    audioHandler.playSound(frequency, intensity);
    nextNote !== keyValue || onNotePress(keyValue);
  } else {
    audioHandler.stopSound();
  }
  return (
    <li className={`${keyType} ${lowerKey} ${isActive && " active"}`}>
      <div
        className="key-overlay potential-hit-target"
        style={{
          opacity: lessonState.scaleValues.includes(keyValue) ? 0.4 : 0,
        }}
      />
      <div
        className="key-overlay hit-target"
        style={{
          opacity: nextNote === keyValue ? 0.4 : 0,
        }}
      />
      <div
        className="key-overlay key-press"
        style={{
          opacity: !!intensity ? intensity * 0.0078 : 0,
        }}
      />
    </li>
  );
}

export default Piano;
