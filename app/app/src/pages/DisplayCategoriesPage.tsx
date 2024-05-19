import { Text } from "@mantine/core";
import DisplayCategories from "../components/DisplayCategories";
import PageContainer from "../layout/PageContainer";
import DashboardLayout from "../layout/DashboardLayout";

const DisplayCategoriesPage = () => {
  return (
    <DashboardLayout>
      <PageContainer>
        <Text
          size={35}
          weight={700}
          mb={20}
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[8],
          })}
        >
          Spending Categories
        </Text>
        <DisplayCategories />
      </PageContainer>
    </DashboardLayout>
  );
};

export default DisplayCategoriesPage;
