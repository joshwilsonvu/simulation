import React, {useState, useEffect, useMemo} from 'react';



export default props => {
  // prefixed on Safari
  const AC = useMemo(() => window.AudioContext || window.webkitAudioContext, []);
  const [context] = useState(new AC());

  useEffect(() => async () => (
    await context.close() // close the context object when cleaned up
  ), []);



}