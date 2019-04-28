import {useState, useCallback, useLayoutEffect} from 'react';

/**
 * @return {*[]} The rect of the DOM element being ref'd.
 */
export default () => {
  const [node, setNode] = useState();
  const [rect, setRect] = useState(new DOMRect());
  const ref = useCallback(node => {
    if (node) {
      setNode(node);
      setRect(node.getBoundingClientRect());
    }
  }, []);
  useLayoutEffect(() => {
    if (node) {
      let listener = () => {
        setRect(node.getBoundingClientRect());
      };
      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
    }
  }, [node]);
  return [rect, ref];
}