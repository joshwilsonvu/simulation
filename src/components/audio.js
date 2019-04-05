import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react';
import useAudio from '../hooks/use-audio';
import AudioWorkletNodeGC from '../nodes/AudioWorkletNodeGC';
import AudioParamView from './audio-param-view';

const computeFrequency = (note, a4 = 440) => {
  return Math.pow(2, (note - 69) / 12) * a4;
};

const extractAudioNodeParams = node => {
  const data = Array.from(node.parameters.entries())
    .filter(([name]) => name !== 'frequency')
    .map(([name, obj]) => [name, {
      defaultValue: obj.defaultValue,
      value: obj.defaultValue,
      minValue: obj.minValue,
      maxValue: obj.maxValue
    }]);
  return Object.fromEntries(data);
};

const Audio = forwardRef(({module, name}, ref) => {
  // audio context lasts the lifetime of the component
  const contextRef = useAudio();
  const [loaded, setLoaded] = useState(false);
  const [noteNodes, setNoteNodes] = useState({});
  const [params, setParams] = useState({});

  // add a module as soon as it is given, and disallow notes during this time
  useEffect(() => {
      const addModule = async () => {
        setLoaded(false);
        await contextRef.current.audioWorklet.addModule(module);
        const dummyAWN = new AudioWorkletNode(contextRef.current, name);
        setParams(extractAudioNodeParams(dummyAWN));
        dummyAWN.disconnect(); // ensure release of resources
        setLoaded(true);
      };
      addModule();
    },
    [contextRef, module, name]
  );

  // allow methods to be called on this ref
  useImperativeHandle(ref, () => ({
    isLoaded: () => loaded,
    playNote: note => {
      if (loaded) {
        let tmp = {};
        Object.keys(params).map(name => tmp[name] = params[name].value);
        let workletNode = new AudioWorkletNodeGC(contextRef.current, name, {
          numberOfInputs: 0,
          numberOfOutputs: 1,
          outputChannelCount: [2],
          parameterData: {
            ...tmp,
            frequency: computeFrequency(note),
          }
        });
        let gainNode = new GainNode(contextRef.current, {
          gain: 1
        });
        workletNode.connect(gainNode).connect(contextRef.current.destination);
        // store the nodes corresponding to each note
        setNoteNodes({
          ...noteNodes,
          [note]: [workletNode, gainNode]
        });
      }
    },
    stopNote: note => {
      let noteNode = noteNodes[note];
      if (noteNode) {
        let [workletNode, gainNode] = noteNode;
        gainNode.gain.setTargetAtTime(0, contextRef.current.currentTime, 0.02);
        setNoteNodes({
          ...noteNodes,
          [note]: undefined // remove finished nodes from nodes object
        });
        setTimeout(() => {
          // let workerNode and gainNode be GC'd
          workletNode.disconnect();
          gainNode.disconnect();
        }, 50);
      }
    }
  }));

  // render the options with parameters
  return (
    <div>
      {Object.entries(params).map(([name, map]) => (
        <AudioParamView key={name} name={name} map={map}
                        onChange={value => setParams({...params, [name]: {...params[name], value}})}/>
      ))}
    </div>
  );
});

export default Audio;
