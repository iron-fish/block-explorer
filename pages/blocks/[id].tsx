import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box } from '@ironfish/ui-kit'

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { useTranslation } from 'hooks/useTranslation'
import BlockInfo from 'components/BlockInfo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function BlockInformationPage() {
  const router = useRouter()
  const { t } = useTranslation('p-block-id')
  const { id } = router.query

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>
          {t('info-title')}
          {id}
        </title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }} mb="6rem" zIndex={1}>
        <Box mt="2.5rem">
          <Breadcrumbs />
        </Box>
        <BlockInfo id={id} />
      </Box>
    </main>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}

// TODO: Revisit this:
// Not certain this is how we want to do things but I wasn't able to support a purely
// client side translation setup
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
