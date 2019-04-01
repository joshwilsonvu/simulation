import React, {useState, useEffect, useMemo} from 'react';
import CustomNode from '../nodes/custom-node';
import {connect} from 'react-redux';
/*
class Audio {
  constructor() {
    this._context = new ()();

    }
  }


}

*/

// from https://github.com/captbaritone/winamp2-js/blob/a5a76f554c369637431fe809d16f3f7e06a21969/js/media/index.js#L8-L27
const resumeContextOnInteraction = context => {
  if (context.state === "suspended") {
    const resume = async () => {
      await context.resume();

      if (context.state === "running") {
        document.body.removeEventListener("touchend", resume, false);
        document.body.removeEventListener("click", resume, false);
        document.body.removeEventListener("keydown", resume, false);
      }
    };

    document.body.addEventListener("touchend", resume, false);
    document.body.addEventListener("click", resume, false);
    document.body.addEventListener("keydown", resume, false);
  }
};

export default connect(

)(({module}) => {
  const [context] = useState(new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 }));

  useEffect(() => {
    return async () => (
      await context.close() // close the context object when cleaned up
    )
  }, [context]);

  useEffect(() => resumeContextOnInteraction(context));

  useEffect(async () => {
    await context.audioWorklet.addModule(module);
    let node = new StringNode();
    node.connect(context.destination);

    return () => {
      node.disconnect()
    }
  }, [module]);


});