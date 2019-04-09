import React, {useState} from 'react';

const AudioParamViewInput = ({onChange, defaultValue, maxValue, minValue, slider = false}) => {
  const [value, setValue] = useState(null);
  return (
    <input type={slider ? 'range' : 'number'} value={value !== null ? value : defaultValue} step="any" max={maxValue} min={minValue}
           onChange={e => {
             const v = e.target.value;
             setValue(v);
             onChange(v);
           }}/>
  );
};

const AudioParamView = ({name, map, onChange, ...rest}) => {
  return (
    <div>
      <h6>{name}</h6>
      <AudioParamViewInput {...map} {...rest} onChange={onChange}/>
    </div>
  );
};

export default AudioParamView;