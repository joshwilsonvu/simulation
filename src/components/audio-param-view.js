import React, {useState} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const AudioParamViewInput = ({onChange, defaultValue, maxValue, minValue}) => {
  const [value, setValue] = useState(null);
  const order =  Math.floor(Math.log10(maxValue - minValue));
  return (
    <InputRange value={value !== null ? value : defaultValue}
                onChange={value => {
                  setValue(value);
                }}
                onChangeComplete={value => {
                  onChange(value);
                }}
                minValue={minValue}
                maxValue={maxValue}
                step={Math.pow(10, order - 3)}
                formatLabel={value => value.toLocaleString(undefined, { maximumSignificantDigits: 3 })}
    />
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