import {useEffect, useRef} from 'react';

/**
 * Grants a component access to its own AudioContext that extends throughout its lifetime.
 * Though multiple AudioContext objects are allowed, there is a small limit on the number;
 * it is generally best practice to use only one for an application. The context will be
 * automatically closed on unmount.
 *
 * @return {ref} a ref to an AudioContext
 */
export default () => {
  const contextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  useEffect(() => async () => {
    await contextRef.current.close();
    contextRef.current = null;
  }, []);
  /*
  useEffect(() => {
    // from https://github.com/captbaritone/winamp2-js/blob/a5a76f554c369637431fe809d16f3f7e06a21969/js/media/index.js#L8-L27
    if (contextRef.current && contextRef.current.state === 'suspended') {
      const resume = async () => {
        await contextRef.current.resume();

        if (contextRef.current.state === 'running') {
          document.body.removeEventListener('touchend', resume, false);
          document.body.removeEventListener('click', resume, false);
          document.body.removeEventListener('keydown', resume, false);
        }
      };

      document.body.addEventListener('touchend', resume, false);
      document.body.addEventListener('click', resume, false);
      document.body.addEventListener('keydown', resume, false);
    }

  });
  */
  return contextRef;
};
