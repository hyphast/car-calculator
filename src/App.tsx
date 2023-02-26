import { shallow } from 'zustand/shallow'
import { Input } from './components/Input'
import { selectAppData, useCarCalcStore } from './store'
import './App.scss'

function App() {
  const inputsData = useCarCalcStore(selectAppData, shallow)

  const dealAmount = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(inputsData.dealAmount)
  const monthlyPayment = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(inputsData.monthlyPayment)

  const percent = `${inputsData.initialFee.percent}%`

  const onButtonClick = () => {
    alert(
      `Сумма договора лизинга: ${dealAmount}\nЕжемесячный платеж от: ${monthlyPayment}`
    )
  }

  return (
    <div className="app__container">
      <div className="car-calculator">
        <h2 className="car-calculator__title">
          Рассчитайте стоимость автомобиля в&nbsp;лизинг
        </h2>
        <div className="car-calculator__main">
          <Input
            title="Стоимость автомобиля"
            value={inputsData.price.value}
            changeValue={inputsData.changePrice}
            min={inputsData.price.min}
            max={inputsData.price.max}
            addonAfter="₽"
          />
          <Input
            title="Первоначальный взнос"
            value={inputsData.initialFee.value}
            changeValue={inputsData.changeInitialFee}
            min={inputsData.initialFee.min}
            max={inputsData.initialFee.max}
            addonAfter={percent}
            addonAfterBorder
            valueCurrency
          />
          <Input
            title="Срок лизинга"
            value={inputsData.leaseTerm.value}
            changeValue={inputsData.changeLeaseTerm}
            min={inputsData.leaseTerm.min}
            max={inputsData.leaseTerm.max}
            addonAfter="мес."
          />
        </div>
        <div className="car-calculator__footer">
          <div className="car-calculator__footer-container">
            <div className="footer-summary">
              <p className="footer-summary__title">Сумма договора лизинга</p>
              <span className="footer-summary__value">{dealAmount}</span>
            </div>
            <div className="footer-summary">
              <p className="footer-summary__title">Ежемесячный платеж от</p>
              <span className="footer-summary__value">{monthlyPayment}</span>
            </div>
          </div>
          <button onClick={onButtonClick} className="footer-button">
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
