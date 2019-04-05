import React, {useState} from 'react';

const AudioParamViewInput = ({onChange, defaultValue, maxValue, minValue}) => {
  const [value, setValue] = useState(null);
  return (
    <input type="number" value={value !== null ? value : defaultValue} step="any" max={maxValue} min={minValue}
           onChange={e => {
             setValue(e.target.value);
             onChange(e.target.value);
           }}/>
  );
};

const AudioParamView = ({name, map, onChange}) => {
  return (
    <div>
      <h6>{name}</h6>
      <AudioParamViewInput key={name} {...map} onChange={onChange}/>
    </div>
  );
};

export default AudioParamView;