import { useRef } from "react";
import {
  Box,
  Flex,
  useBreakpointValue,
  List,
  ListItem,
  NAMED_COLORS,
  chakra,
  Text,
  useDimensions,
} from "@ironfish/ui-kit";
import { Card } from "components";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import useTransactionByHash from "hooks/useTransactionByHash";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  DifficultyIcon,
  SecondsToBlockIcon,
  InOutPutsIcon,
  LargeArrowLeftDown,
  LargeArrowRightUp,
  SizeIcon,
  CompassIcon,
} from "svgx";
import { truncateHash } from "utils/hash";
import size from "byte-size";
import CopyIcon from "icons/CopyIcon";
import { getIRFAmountWithCurrency } from "utils/currency";
import { TransactionType } from "types";

const ActionCopy = (value) => (
  <CopyIcon
    ml="17px"
    w="12px"
    h="12px"
    onClick={() => navigator.clipboard.writeText(value)}
    justifySelf="flex-end"
    cursor="pointer"
  />
);

const TransactionDataBlock = ({ label, value, icon }) => (
  <Flex
    padding="30px 32px"
    border="1px solid"
    borderColor={NAMED_COLORS.LIGHT_GREY}
    borderRadius="4px"
    boxShadow="0px 4px 11px rgba(0, 0, 0, 0.04)"
    direction="column"
  >
    <Text
      color={NAMED_COLORS.GREY}
      fontSize="12px"
      fontFamily="ABC Favorit Trial"
      display={{ base: "block", md: "none" }}
      mb="16px"
    >
      {label}
    </Text>
    <Flex align="center">
      {icon}
      <chakra.h4 ml="16px" color={NAMED_COLORS.LIGHT_BLUE} overflow="hidden">
        {value}
      </chakra.h4>
      <ActionCopy justifySelf="flex-end" value={value} />
    </Flex>
  </Flex>
);

const TransactionsDataList = ({ data = [], isInput = true }) => {
  const label = isInput ? "INPUTS" : "OUTPUTS";
  return (
    <>
      <Text
        color={NAMED_COLORS.GREY}
        fontSize="12px"
        fontFamily="ABC Favorit Trial"
        pl="32px"
        mb="16px"
        display={{ base: "none", md: "block" }}
      >
        {label}
      </Text>
      <List w="100%" spacing={"16px"}>
        {data.map((item, index) => (
          <ListItem key={`list-item-${index}`}>
            <TransactionDataBlock
              label={label}
              value={truncateHash(
                item[isInput ? "nullifier" : "commitment"],
                2,
                16
              )}
              icon={isInput ? <LargeArrowLeftDown /> : <LargeArrowRightUp />}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

const TRANSACTION_INFO_CARDS = [
  {
    key: "block-hash-card",
    label: "Block Hash",
    value: (transaction: TransactionType | null) => (
      <Flex align="center">
        {truncateHash(transaction?.blocks[0]?.hash || "", 2)}
        <ActionCopy value={transaction?.blocks[0]?.hash} />
      </Flex>
    ),
    icon: <DifficultyIcon />,
  },
  {
    key: "transaction-hash-card",
    label: "Transaction Hash",
    value: (transaction: TransactionType | null) => (
      <Flex align="center">
        {truncateHash(transaction?.hash || "", 2)}
        <ActionCopy value={transaction?.hash} />
      </Flex>
    ),
    icon: <DifficultyIcon />,
  },
  {
    key: "size-card",
    label: "Size",
    value: (transaction: TransactionType | null) =>
      size(transaction?.size).toString(),
    icon: <SizeIcon />,
  },
  {
    key: "fee-card",
    label: "Fee",
    value: (transaction: TransactionType | null) =>
      getIRFAmountWithCurrency(transaction?.fee),
    icon: <CompassIcon />,
  },
  {
    key: "timestamp-card",
    label: "Timestamp",
    value: (transaction: TransactionType | null) => {
      const date = new Date(transaction?.blocks[0]?.timestamp);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    icon: <SecondsToBlockIcon />,
  },
  {
    key: "inputs-outputs-card",
    label: "Inputs / Outputs",
    value: (transaction: TransactionType) =>
      `${transaction?.spends.length} / ${transaction?.notes.length}`,
    icon: <InOutPutsIcon />,
  },
];

const TransactionInfo = ({ hash }) => {
  const width = useBreakpointValue({
    base: { cardWidth: "100%", listWidth: "100%" },
    sm: { cardWidth: "calc(50% - 1rem)", listWidth: "100%" },
    md: { cardWidth: "calc(33% - 1rem)", listWidth: "calc(50% - 2rem)" },
  });
  const { data, loaded } = useTransactionByHash(hash);
  const block = data?.blocks[0] || {};

  const getValue = (field, transform = (value) => value) => {
    return loaded ? transform(data[field]) : <span>&nbsp;</span>;
  };

  return (
    <>
      <Box mt="0.5rem" mb="2rem">
        <h3>Transaction Information</h3>
      </Box>
      <Flex w="100%" wrap="wrap" mb="3.5rem" mx="-0.5rem">
        {TRANSACTION_INFO_CARDS.map((card) => (
          <Card
            key={card.key}
            m="0.5rem"
            w={width.cardWidth}
            label={card.label}
            value={card.value(data)}
            icon={card.icon}
            isLoading={!loaded}
          />
        ))}
      </Flex>
      <Box my="2rem">
        <h3>Transactions</h3>
      </Box>
      <Flex w="100%" wrap="wrap" mb="3.5rem">
        <Box w={width.listWidth} mr={{ base: 0, md: "16px" }} mb="16px">
          <TransactionsDataList data={data?.spends} />
        </Box>
        <Box w={width.listWidth} ml={{ base: 0, md: "16px" }} mb="16px">
          <TransactionsDataList data={data?.notes} isInput={false} />
        </Box>
      </Flex>
    </>
  );
};

export default function TransactionInformationPage() {
  const router = useRouter();
  const { id, hash } = router.query;

  return (
    <main style={{ width: "100%", height: "100%" }}>
      <Head>
        <title>Iron Fish: Transaction {hash}</title>
      </Head>
      <Box mx={{ base: "2rem", lg: "15%" }} mb="6rem" zIndex={1}>
        <Box mt="2.5rem">
          <Breadcrumbs />
        </Box>
        <TransactionInfo hash={hash} />
      </Box>
    </main>
  );
}
