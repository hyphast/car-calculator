import React, {
  FC,
  KeyboardEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { NumberFormatValues, NumericFormat } from 'react-number-format'
import './Input.scss'

interface IInput {
  title: string
  value: number
  min: number
  max: number
  changeValue: (value: number) => void
  valueCurrency?: boolean
  addonAfterBorder?: boolean
  addonAfter?: string
}
export const Input: FC<IInput> = ({
  title,
  value,
  min,
  max,
  changeValue,
  valueCurrency,
  addonAfterBorder,
  addonAfter,
}) => {
  const inputId = useId()
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useLayoutEffect(() => {
    setInputValue(value)
  }, [value])

  const updateValue = () => {
    const newValue =
      inputValue > max ? max : inputValue < min ? min : inputValue

    changeValue(newValue)
    setInputValue(newValue)
  }

  const onBlurInput = () => {
    updateValue()
  }

  const onPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateValue()
      inputRef?.current?.blur()
    }
  }

  const onRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)

    changeValue(newValue)
  }

  const onInputValueChange = (values: NumberFormatValues) => {
    const { floatValue } = values

    if (!floatValue) return

    setInputValue(floatValue)
  }

  return (
    <div className="custom-input">
      <label className="custom-input__label" htmlFor={inputId}>
        {title}
      </label>
      <div className="custom-input__number">
        <NumericFormat
          getInputRef={inputRef}
          value={inputValue}
          onValueChange={onInputValueChange}
          onBlur={onBlurInput}
          onKeyDown={onPressEnter}
          thousandSeparator=" "
          allowNegative={false}
          decimalScale={0}
          suffix={valueCurrency ? ' ₽' : ''}
        />
        <span
          className={`input__addon ${
            addonAfterBorder && 'input__addon--percent'
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
          value={value}
          onChange={onRangeChange}
          min={min}
          max={max}
        />
      </div>
    </div>
  )
}

Input.defaultProps = {
  valueCurrency: false,
  addonAfterBorder: false,
  addonAfter: '₽',
}
