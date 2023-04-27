import { FC, useMemo } from 'react'
import { Box } from '@ironfish/ui-kit'
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
}

const EmptyCard = () => (
  <Box
    width={{
      base: 'max(20rem, 100% - 0.5rem)',
      md: 'max(20rem, 50% - 1rem)',
      '2xl': 'max(20rem, 33.333333% - 1rem)',
    }}
  />
)

const CardsView: FC<CardsViewProps> = ({
  cards,
  data: { data, loaded },
  hideCardsWithoutValue = true,
}) => {
  const cardsList = useMemo(() => {
    const overAmount = cards.length % 3
    if (overAmount < 2) {
      return cards
    }
    return cards.concat(null)
  }, [cards])

  return (
    <CardContainer>
      {cardsList?.map(card => {
        if (!card) {
          return <EmptyCard />
        }
        const value = card.value(data)
        if (!value && hideCardsWithoutValue) {
          return null
        }
        return (
          <Card
            key={card.key || card.label}
            mb="1rem"
            width={{
              base: 'max(20rem, 100% - 0.5rem)',
              md: 'max(20rem, 50% - 1rem)',
              '2xl': 'max(20rem, 33.333333% - 1rem)',
            }}
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
