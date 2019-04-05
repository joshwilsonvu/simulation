import {useState, useCallback} from 'react';

/**
 * @return {*[]} The rect of the DOM element being ref'd.
 */
export default () => {
  const [rect, setRect] = useState(new DOMRect());
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}