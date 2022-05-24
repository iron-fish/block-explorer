import { FC, ReactNode } from 'react'
import { useTranslation } from 'hooks/useTranslation'

import BorderBox from 'components/BorderBox'

interface ChartBoxProps {
  header: string
  average: string | number
  children: ReactNode
}

const ChartBox: FC<ChartBoxProps> = ({ header, average, children }) => {
  const { t } = useTranslation('c-chartbox')
  return (
    <BorderBox>
      <h4>{header}</h4>
      <h5>
        {t('info-average')}
        {average}
      </h5>
      {children}
    </BorderBox>
  )
}

export default ChartBox
