import { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

import { onMIDISuccess, onMIDIFailure } from "./midi";
import {
  KEY_MAP,
  NOTES,
  SCALES,
  WAVEFORM,
  AudioHandler,
  generateScaleForNote,
} from "./utils";

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#FCBBFD",
    "&$checked": {
      color: "#770087",
    },
    "&$checked + $track": {
      backgroundColor: "#FCBBFD",
    },
  },
  checked: {},
  track: {},
})(Switch);

function Piano() {
  const [selectedNote, setSelectedNote] = useState("F1");
  const [selectedScale, setSelectedScale] = useState("major");
  const [lessonState, setLessonState] = useState({
    note: selectedNote,
    scale: selectedScale,
    scaleValues: generateScaleForNote(selectedNote, selectedScale),
  });
  const [shouldHighlightScale, setShouldHighlightScalse] = useState(true);
  const [midiInput, setMidiResponse] = useState({});

  const onNotePress = (note) => {
    const [nextNote, ...rest] = lessonState.scaleValues;
    if (note !== nextNote) return;
    setLessonState({ ...lessonState, scaleValues: [...rest, nextNote] });
  };

  function getMIDIMessage(midiMessage) {
    const [state, value, intensity] = midiMessage.data;
    /**
     * IMPROVE: state >= 144 is an assumption, and varies based on midi device.
     * create some way of have users map their midi keys, and save their configuration
     * to localStorage. would also be good to anonomously measure to understand the
     * full range of midi setups
     */
    const isActive = state >= 144;
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

  const handleNoteSelection = (event) => {
    const note = event.target.value;
    setSelectedNote(note);
    setLessonState({
      ...lessonState,
      note: note,
      scaleValues: generateScaleForNote(note, selectedScale),
    });
  };

  const handleScaleSelection = (event) => {
    const scale = event.target.value;
    setSelectedScale(scale);
    setLessonState({
      ...lessonState,
      scale: scale,
      scaleValues: generateScaleForNote(selectedNote, scale),
    });
  };

  const handleHighlightToggleChange = (_event) => {
    setShouldHighlightScalse(!shouldHighlightScale);
  };

  return (
    <div>
      <Paper elevation={3} className="filters">
        <div className="filter note-filter">
          <InputLabel id="note-select-label">Note:</InputLabel>
          <Select
            labelId="note-select-label"
            id="note-select"
            value={selectedNote}
            onChange={handleNoteSelection}
            autoWidth
          >
            {NOTES.map((note) => (
              <MenuItem key={note} id={note} value={note}>
                {note}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="filter scale-filter">
          <InputLabel id="scale-select-label">Scale:</InputLabel>
          <Select
            labelId="scale-select-label"
            id="scale-select"
            value={selectedScale}
            onChange={handleScaleSelection}
            autoWidth
          >
            {SCALES.map((scale) => (
              <MenuItem key={scale} id={scale} value={scale}>
                {scale}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="filter scale-highlighting-toggle">
          <InputLabel id="hightlight-toggle-label">
            Scale Highlighting:
          </InputLabel>
          <PurpleSwitch
            labelId="hightlight-toggle-label"
            id="hightlight-toggle"
            checked={shouldHighlightScale}
            onChange={handleHighlightToggleChange}
          />
        </div>
      </Paper>
      <div className="piano">
        <ul className="set">
          <PianoKey
            keyType="white"
            note="C3"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="B2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="AS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="A2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="GS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="G2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="FS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="F2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="E2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="DS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="D2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="CS2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="C2"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="B1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="AS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="A1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="GS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="G1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="FS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="F1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="E1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="DS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="D1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="black"
            note="CS1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
          <PianoKey
            keyType="white"
            note="C1"
            onNotePress={onNotePress}
            midiInput={midiInput}
            lessonState={lessonState}
            shouldHighlightScale={shouldHighlightScale}
          />
        </ul>
      </div>
    </div>
  );
}

function PianoKey({
  keyType,
  note,
  midiInput,
  onNotePress,
  lessonState,
  shouldHighlightScale,
}) {
  const [audioHandler] = useState(new AudioHandler());
  const [lowerKey] = useState(note.replace(/[0-9]/g, "").toLowerCase());
  const [keyValue] = useState(KEY_MAP[note]);
  const { isActive, intensity } = midiInput[keyValue] || {};
  const frequency = audioHandler.midiToFrequency(keyValue);
  const nextNote = lessonState.scaleValues[0];
  audioHandler.setWaveform(WAVEFORM.TRIANGLE);
  if (isActive) {
    audioHandler.playSound(frequency, intensity);
    // IMPROVE: onNotePress should happen on midi event, not during render
    nextNote !== keyValue || onNotePress(keyValue);
  } else {
    audioHandler.stopSound();
  }
  return (
    <li className={`${keyType} ${lowerKey} ${isActive && " active"}`}>
      {shouldHighlightScale && (
        <div
          className="key-overlay potential-hit-target"
          style={{
            opacity: lessonState.scaleValues.includes(keyValue) ? 0.4 : 0,
          }}
        />
      )}
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
