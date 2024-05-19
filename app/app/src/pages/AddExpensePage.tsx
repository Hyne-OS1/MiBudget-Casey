import { Divider, Text } from "@mantine/core";
import AddToExpenses from "../components/AddToExpenses";
import PageContainer from "../layout/PageContainer";
import { useContext } from "react";
import ResetValueModal from "../components/ResetValueModal";
import CategoriesContext from "../store/CategoriesContext";
import DashboardLayout from "../layout/DashboardLayout";

const AddExpensePage = () => {
  const { getTotalAmount } = useContext(CategoriesContext);
  const expenses = getTotalAmount("Expenses");

  return (
    <DashboardLayout>
      <PageContainer>
        <Text
          size="xl"
          weight={700}
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          })}
        >
          Add an Expense
        </Text>
        <Text
          size="xs"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[9],
          })}
        >
          Adds on to your current expense amount.
        </Text>
        <AddToExpenses />
        <Divider mt={30} mb={20} />
        <ResetValueModal prevAmount={expenses} type="Expenses" />
      </PageContainer>
    </DashboardLayout>
  );
};

export default AddExpensePage;
