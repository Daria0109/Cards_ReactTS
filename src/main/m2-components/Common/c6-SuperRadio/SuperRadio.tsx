import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
  {
    type, name,
    options, value,
    onChange, onChangeOption,
    ...restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeOption && onChangeOption(e.currentTarget.value)
  }


  const mappedOptions: any[] = options ? options.map((o, i) => (
      <label key={name + '-' + i} className={s.radio_item}>
      <input className={s.radio}
                type={'radio'}
                name={name}
                checked={value === o}
                value={o}
                onChange={onChangeCallback}/>
        <span className={s.radio_style}></span>
      {o}
    </label>
  )) : [];

  return (
    <>
      {mappedOptions}
    </>
  );
}

export default SuperRadio;
