import {useRef, useEffect, useLayoutEffect, useCallback} from 'react';

export default callback => {
  let callbackRef = useRef(callback);
  let frameRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  let loop = useCallback(() => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  }, []);

  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () =>
      cancelAnimationFrame(frameRef.current);
  }, [loop]);
};