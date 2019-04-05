/**
 * On disconnection, post 'stop' so that the AudioProcessorNode can
 * release any resources it is using (like calling return() on a generator)
 */
export default class AudioWorkletNodeGC extends AudioWorkletNode {
  disconnect() {
    super.disconnect(arguments);
    this.port.postMessage('stop');
  }
}