import React, {useState, useEffect, useCallback, useImperativeHandle, forwardRef, useRef} from 'react';
import useAudio from '../hooks/use-audio';
import AudioWorkletNodeGC from '../nodes/AudioWorkletNodeGC';
import AudioParamView from './audio-param-view';

const computeFrequency = (note, a4 = 440) => {
  return Math.pow(2, (note - 69) / 12) * a4;
};

const extractAudioNodeParams = node => {
  const data = Array.from(node.parameters.entries())
    .sort((a, b) => {
      if (a[0] > b[0]) {
        return 1;
      } else if (a[0] < b[0]) {
        return -1;
      } else {
        return 0;
      }
    })
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
  const {context, master} = useAudio();
  const [loaded, setLoaded] = useState(false);
  const noteNodes = useRef({});
  const [params, setParams] = useState({});

  const setMasterVolume = useCallback(v => {
    master.gain.value = v;
  }, [master]);

  // add a module as soon as it is given, and disallow notes during this time
  useEffect(() => {
      const addModule = async () => {
        setLoaded(false);
        await context.audioWorklet.addModule(module);
        const dummyAWN = new AudioWorkletNode(context, name);
        setParams(extractAudioNodeParams(dummyAWN));
        dummyAWN.disconnect(); // ensure release of resources
        setLoaded(true);
      };
      addModule();
    },
    [context, module, name]
  );

  // allow methods to be called on this ref
  useImperativeHandle(ref, () => {
    const stopNote = note => {
      let noteNode = noteNodes.current[note];
      if (noteNode) {
        let [workletNode, gainNode] = noteNode;
        gainNode.gain.setTargetAtTime(0, context.currentTime, 0.1);
        noteNodes.current[note] = undefined; // remove finished nodes from nodes object
        setTimeout(() => {
          // let workerNode and gainNode be GC'd
          workletNode.disconnect();
          gainNode.disconnect();
        }, 300);
      }
    };
    const playNote = note => {
      stopNote(note);
      if (loaded) {
        let tmp = {};
        Object.keys(params).map(name => tmp[name] = params[name].value);
        let workletNode = new AudioWorkletNodeGC(context, name, {
          numberOfInputs: 0,
          numberOfOutputs: 1,
          outputChannelCount: [2],
          parameterData: {
            ...tmp,
            frequency: computeFrequency(note),
          }
        });
        // workletNode.port.onmessage = ...
        let gainNode = new GainNode(context, {
          gain: 1
        });
        workletNode.connect(gainNode).connect(master);
        // store the nodes corresponding to each note
        noteNodes.current[note] = [workletNode, gainNode]
      }
    };
    return {
      isLoaded: () => loaded,
      playNote,
      stopNote
    };
  });

  // render the options with parameters
  return (
    <div>
      {Object.entries(params).map(([name, map]) => (
        <AudioParamView key={name} name={name} map={map}
                        onChange={value => setParams({...params, [name]: {...params[name], value}})}/>
      ))}
      <AudioParamView key="_master" name="master" slider={true} map={{
        defaultValue: 1,
        minValue: 0,
        maxValue: 2,
      }} onChange={setMasterVolume}/>
      <br/>
    </div>
  );
});

export default Audio;
