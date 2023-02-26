import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Field {
  value: number
  min: number
  max: number
}
export interface InitialFee extends Field {
  percent: number
}
export interface ICarCalcState {
  price: Field
  initialFee: InitialFee
  leaseTerm: Field
  dealAmount: number
  monthlyPayment: number
  calcDealAmount: () => void
  changePrice: (price: number) => void
  changeInitialFee: (initialFee: number) => void
  changeLeaseTerm: (leaseTerm: number) => void
}

export const useCarCalcStore = create<ICarCalcState>()(
  devtools((set, get) => ({
    price: {
      value: 3_300_000,
      min: 1_500_000,
      max: 10_000_000,
    },
    initialFee: {
      value: 420_000,
      percent: 10,
      min: 333_000,
      max: 1_980_000,
    },
    leaseTerm: {
      value: 60,
      min: 6,
      max: 120,
    },
    dealAmount: 4_467_313,
    monthlyPayment: 114_455,
    calcDealAmount: () => {
      const newPayment = Math.round(
        (get().price.value - get().initialFee.value) *
          ((0.05 * Math.pow(1 + 0.05, get().leaseTerm.value)) /
            (Math.pow(1 + 0.05, get().leaseTerm.value) - 1))
      )

      set((state) => ({
        monthlyPayment: newPayment,
        dealAmount: state.initialFee.value + state.leaseTerm.value * newPayment,
      }))
    },
    changePrice: (value) => {
      set((state) => ({
        price: { ...state.price, value },
        initialFee: {
          ...state.initialFee,
          value: Math.round(value * (state.initialFee.percent / 100)),
          min: 0.1 * value,
          max: 0.6 * value,
        },
      }))
      get().calcDealAmount()
    },
    changeInitialFee: (value) => {
      set((state) => ({
        initialFee: {
          ...state.initialFee,
          value: Math.round(value),
          percent: Math.round((value * 100) / state.price.value),
        },
      }))
      get().calcDealAmount()
    },
    changeLeaseTerm: (value) => {
      set((state) => ({ leaseTerm: { ...state.leaseTerm, value } }))
      get().calcDealAmount()
    },
  }))
)

export const selectAppData = (state: ICarCalcState) => ({
  price: state.price,
  initialFee: state.initialFee,
  leaseTerm: state.leaseTerm,
  dealAmount: state.dealAmount,
  monthlyPayment: state.monthlyPayment,
  changePrice: state.changePrice,
  changeInitialFee: state.changeInitialFee,
  changeLeaseTerm: state.changeLeaseTerm,
})
