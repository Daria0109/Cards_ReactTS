import React from 'react';
import s from './Sort.module.css'

type SortPropsType = {
  up: string
  down: string
  upSort: () => void
  downSort: () => void
  sortSetValue: string
}

export const Sort: React.FC<SortPropsType> = React.memo(
  ({up, down, upSort, downSort, sortSetValue}) => {
  const upStyle = sortSetValue === up ? `${s.button} ${s.up} ${s.active}` : `${s.button} ${s.up}`
  const downStyle = sortSetValue === down ? `${s.button} ${s.down} ${s.active}` : `${s.button} ${s.down}`

  return <div className={s.sort}>
    <button className={upStyle} onClick={upSort}>&#10095;</button>
    <button className={downStyle} onClick={downSort}>&#10095;</button>
  </div>
})