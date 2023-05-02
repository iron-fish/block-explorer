import { BoxProps } from '@ironfish/ui-kit'
import { FC } from 'react'
import Card, { CardProps } from '../Card/Card'
import CardContainer from '../CardContainer'

interface CardsType extends CardProps {
  cardProps?: BoxProps
}

interface CardsViewProps {
  cards: CardsType[]
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    loaded: boolean
  }
  hideCardsWithoutValue?: boolean
}

const CardsView: FC<CardsViewProps> = ({
  cards,
  data: { data, loaded },
  hideCardsWithoutValue = true,
}) => {
  return (
    <CardContainer>
      {cards?.map(card => {
        const value = card.value(data)
        if (!value && hideCardsWithoutValue) {
          return null
        }
        return (
          <Card
            key={card.key || card.label}
            label={
              typeof card.label === 'string' ? card.label : card.label(data)
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
