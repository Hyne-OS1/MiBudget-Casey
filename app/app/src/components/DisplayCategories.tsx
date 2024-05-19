import { useContext, useMemo } from "react";
import { SimpleGrid, Skeleton } from "@mantine/core";
import DisplayCard from "./DisplayCard";
import CategoriesContext from "../store/CategoriesContext";
import { useQuery } from "@apollo/client";
import { GET_SUMMARY_QUERY } from "../utils/queries";

const DisplayCategories = () => {
  const { categories } = useContext(CategoriesContext);
  let date = useMemo(() => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    let end = new Date();

    return { from: date.toISOString(), to: end.toISOString() };
  }, []);

  const { loading, data } = useQuery(GET_SUMMARY_QUERY, {
    variables: {
      from: date.from,
      to: date.to,
    },
  })

  return (
    <SimpleGrid cols={4} style={{ justifyContent: "center" }}>
      {loading ?
        Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} height={100} width={300} />
        ))
        : data?.summary?.categoryStats?.
          map((category: any, index: number) => (
            <DisplayCard
              key={index}
              label={category.category}
              amount={category.totalAmount}
              color="gray.6"
            />
          ))}
    </SimpleGrid>
  );
};

export default DisplayCategories;
