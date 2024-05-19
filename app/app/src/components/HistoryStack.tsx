import { Divider, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import HistoryItem from "./HistoryItem";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS_QUERY } from "../utils/queries";

// generate display of user expense history on screen for user viewing
const HistoryStack = () => {
  let date = useMemo(() => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    let end = new Date();

    return { from: date.toISOString(), to: end.toISOString() };
  }, []);

  const { loading, data } = useQuery(GET_TRANSACTIONS_QUERY, {
    variables: {
      from: date.from,
      to: date.to,
    },
  })
  return (
    <div style={{ width: "500px" }}>
      <Text
        size="xl"
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
        })}
      >
        Transaction History
      </Text>
      <Divider my="sm" />
      <ScrollArea
        type="always"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: 500,
          width: 500,
          paddingRight: 15,
        })}
      >
        <Stack>
          {loading
            ?
            <Skeleton height={500} width={500} />
            : data?.transactionHistory
              ?.map((item: any) => {
                return (
                  <HistoryItem
                    key={item.id}
                    id={item.id}
                    label={item.description}
                    amount={item.amount}
                    type={item.type}
                    dateCreated={item.date}
                    category={item.category}
                  />
                );
              })}
        </Stack>
      </ScrollArea>
    </div>
  );
};

export default HistoryStack;
