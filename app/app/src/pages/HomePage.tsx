import { useContext, useMemo } from "react";
import { SimpleGrid, Skeleton, Text } from "@mantine/core";
import DisplayCard from "../components/DisplayCard";
import HistoryStack from "../components/HistoryStack";
import PageContainer from "../layout/PageContainer";
import PieChart from "../components/PieChart";
import CategoriesContext from "../store/CategoriesContext";
import DashboardLayout from "../layout/DashboardLayout";
import { useQuery } from "@apollo/client";
import { GET_SUMMARY_QUERY } from "../utils/queries";
import NotificationBar from "../components/Notification";

const HomePage = () => {
  const { getTotalAmount } = useContext(CategoriesContext);
  const budget = getTotalAmount("Budget");
  const expenses = getTotalAmount("Expenses");

  // memoze date to get the summary of the last year
  let date = useMemo(() => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    let end = new Date();

    return { from: date.toISOString(), to: end.toISOString() };
  }, []);

  const { loading, error, data } = useQuery(GET_SUMMARY_QUERY, {
    variables: {
      // one year ago
      from: date.from,
      to: date.to,
    }
  })

  return (
    <DashboardLayout>
      <PageContainer>
        {/* Displays the net balance of the user */}
        <Text
          size={35}
          weight={700}
          mb={20}
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[9],
          })}
        >
          {
            loading ?
            <Skeleton height={50} width={800} />
             : error ? "Error loading data" :
              "YOUR BALANCE IS: " + (data.summary?.balanceStats?.budget - data.summary?.balanceStats?.expense)
          }
        </Text>
        {!loading && (Number(data.summary?.balanceStats?.budget - data.summary?.balanceStats?.expense) <= 0) && <NotificationBar message="You Have exceeded your budget!" type="warning" />}
        {loading
          ?
          <div className="w-full flex" style={{ display: "flex" }}>
            <Skeleton height={200} width={800} mr={10} />
            <Skeleton height={200} width={800} />
          </div>
          : data &&
          <SimpleGrid cols={2} style={{ justifyContent: "center" }}>
            <DisplayCard label="Income / Budget" amount={data.summary?.balanceStats?.budget} color="green.4" />
            <DisplayCard label="Expenses" amount={data.summary?.balanceStats?.expense} color="red.4" />
            <HistoryStack />
            {/* Only show the pie chart when either expenses or budget is greater than 0 */}
            {<PieChart expenses={data.summary?.balanceStats?.expense} budget={data.summary?.balanceStats?.budget} />}
          </SimpleGrid>
        }

      </PageContainer>
    </DashboardLayout>
  );
};

export default HomePage;
