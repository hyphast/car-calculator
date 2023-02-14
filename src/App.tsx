import { AddonsAfter, Input } from './components/Input'
import './App.scss'

function App() {
  return (
    <div className="app__container">
      <div className="car-calculator">
        <h2 className="car-calculator__title">
          Рассчитайте стоимость автомобиля в&nbsp;лизинг
        </h2>
        <div className="car-calculator__main">
          <Input title="Стоимость автомобиля" />
          <Input
            title="Первоначальный взнос"
            type="currency"
            addonAfter={AddonsAfter.percent}
          />
          <Input title="Срок лизинга" addonAfter={AddonsAfter.month} />
        </div>
        <div className="car-calculator__footer">
          <div className="car-calculator__footer-container">
            <div className="footer-summary">
              <p className="footer-summary__title">Сумма договора лизинга</p>
              <span className="footer-summary__value">4 467 313 ₽</span>
            </div>
            <div className="footer-summary">
              <p className="footer-summary__title">Ежемесячный платеж от</p>
              <span className="footer-summary__value">114 455 ₽</span>
            </div>
          </div>
          <button className="footer-button">Оставить заявку</button>
        </div>
      </div>
    </div>
  )
}

export default App
