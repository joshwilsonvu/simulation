import React, {useState, useEffect, useMemo} from 'react';
import StringNode from '../nodes/string-node';


export default ({module}) => {
  // prefixed on Safari
  const AC = useMemo(() => window.AudioContext || window.webkitAudioContext, []);
  const [context] = useState(new AC());

  useEffect(() => async () => (
    await context.close() // close the context object when cleaned up
  ), []);

  useEffect(async () => {
    await context.audioWorklet.addModule(module);
    let node = new StringNode();
    node.connect(context.destination);

    return () => {
      node.disconnect()
    }
  }, [module]);

}