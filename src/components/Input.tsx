import React, { FC, useId } from 'react'
import './Input.scss'

export enum AddonsAfter {
  'rub' = '₽',
  'percent' = '10%',
  'month' = 'мес.',
}
interface IInput extends React.HTMLProps<HTMLInputElement> {
  title: string
  type?: 'number' | 'currency'
  addonAfter?: AddonsAfter
}
export const Input: FC<IInput> = ({ title, type, addonAfter }) => {
  const inputId = useId()

  // const inputValue = type === 'currency' ? value + '₽' : value

  return (
    <div className="custom-input">
      <label className="custom-input__label" htmlFor={inputId}>
        {title}
      </label>
      <div className="custom-input__number">
        <input id={inputId} type="number" />
        <span
          className={`input__addon ${
            addonAfter === '10%' && 'input__addon--percent'
          }`}
        >
          {addonAfter}
        </span>
      </div>
      <div className="custom-input__range">
        <input
          className="styled-slider slider-progress"
          id={inputId}
          type="range"
        />
      </div>
    </div>
  )
}

Input.defaultProps = {
  type: 'number',
  addonAfter: AddonsAfter.rub,
}
