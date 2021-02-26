function onMIDISuccess(midiAccess, midiMessageHandler) {
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = midiMessageHandler;
  }
}

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}

export { onMIDISuccess, onMIDIFailure };
