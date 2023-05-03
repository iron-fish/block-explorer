import { BoxProps } from '@ironfish/ui-kit'
import { FC, ReactNode } from 'react'
import Card from '../Card/Card'
import CardContainer from '../CardContainer'

interface CardsType<T> {
  key?: string
  label: ReactNode | ((data: T) => ReactNode)
  value?: (data: T) => ReactNode
  icon: ReactNode
  isLoading?: boolean
  cardProps?: BoxProps
}

interface CardsViewProps<T> {
  cards: CardsType<T>[]
  data: {
    data?: T
    loaded: boolean
  }
  hideCardsWithoutValue?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardsView: FC<CardsViewProps<any>> = ({
  cards,
  data: { data, loaded },
  hideCardsWithoutValue = true,
}) => {
  return (
    <CardContainer>
      {cards?.map((card, index) => {
        const value = card.value(data)
        if (!value && hideCardsWithoutValue) {
          return null
        }
        return (
          <Card
            key={card.key || index}
            label={
              typeof card.label === 'function' ? card.label(data) : card.label
            }
            value={value}
            icon={card.icon}
            isLoading={!loaded || false}
            {...card.cardProps}
          />
        )
      })}
    </CardContainer>
  )
}

export default CardsView
