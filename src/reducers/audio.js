/**
 * Add an audio context to the redux store
 *
 * @param state
 */
export default (state = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 })) => {}