import { Button, Divider, MultiSelect, Text, TextInput } from "@mantine/core";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvailableCategoriesContext from "../store/AvailableCategoriesContext";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";
import DeleteCatToolTip from "./DeleteCatToolTip";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CATEGORY_MUTATION, CREATE_TRANSACTION_MUTATION } from "../utils/mutations";
import { GET_ALL_CATEGORIES_QUERY } from "../utils/queries";

type AvailableCategories = {
  label: string;
  value: string;
  isused: string;
};

const AddToExpenses = () => {
  const { addHistoryElement } = useContext(HistoryContext);
  const [availableCategories, setAvailableCategories] = useState<AvailableCategories[]>([]);

  const { addCategory } = useContext(CategoriesContext);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);

  const [category, setCategory] = useState<string[]>([""]);
  const navigate = useNavigate();

  const { loading: loadinCategories, data: categories } = useQuery(GET_ALL_CATEGORIES_QUERY)
  const [createCategory, { loading, error, data }] = useMutation(CREATE_CATEGORY_MUTATION)
  const [createTransaction, {loading: creatingTransaction, data: transaction, error: transactionError}] = useMutation(CREATE_TRANSACTION_MUTATION)
  useEffect(() => {
    if (!loadinCategories && categories) {
      let newCategories = categories.getAllCategories.map((category: any) => {
        return {
          label: category.name,
          value: category.name,
          isused: "false",
        }
      })
      setAvailableCategories(newCategories)
    }
  }, [loadinCategories, categories])

  const handleCreateCategory = (query: string) => {
    createCategory({
      variables: {
        name: query,
        icon: "📦",
        type: "expense"
      }
    })
  };

  const handleAddExpense = () => {
    createTransaction({
      variables: {
        description: label,
        amount: value,
        category: category[0],
        type: "expense",
        date: new Date()
      }
    })

    setLabel("");
    setValue(0);
  }

  return (
    <div>
      <Text mb={5} mt={10} size="md" weight={700} color={transactionError ? 'red' : transaction ? 'green' : ''}>
        {!creatingTransaction ? transactionError ? "Error adding expense" : transaction ? "Expense added successfully" : "" : "Adding Expense..."}
      </Text>
      <TextInput
        onChange={(e) => setLabel(e.currentTarget.value)}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: Car payments"
        label="Label"
        withAsterisk
      />
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: 3000"
        label="Amount"
        withAsterisk
      />
      <Divider mt={30} mb={20} />
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
        Add a Category to Your Expense
      </Text>
      <MultiSelect
        w="40%"
        mt={10}
        data={availableCategories}
        label="Select a Category"
        placeholder="Select a category or create a new one"
        searchable
        creatable
        value={category}
        onChange={setCategory}
        maxSelectedValues={1}
        getCreateLabel={(query) =>
          loading ? "Creating..." : error ? "Error!" : data ? "Created!" :
            `+ Create ${query[0].toUpperCase() + query.substring(1)}`
        }
        onCreate={(query) => {
          handleCreateCategory(query);
          const capQuery = query[0].toUpperCase() + query.substring(1);
          const item = {
            value: capQuery,
            label: capQuery,
            isused: "false",
          };
          // setAvailableCategories of current => item, ....current
          return item;
        }}
      />
      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <Button
          mr={30}
          onClick={() => {
            if (label === "" || value <= 0 || Number.isNaN(value)) {
              alert(
                "Invalid Entries. Make sure the label is not empty and the amount is greater than zero."
              );
            } else {
              handleAddExpense();
            }
          }}
          disabled={creatingTransaction}
          loading={creatingTransaction}
        >
          Add Expense
        </Button>
        <Button
          color="red"
          onClick={() => {
            // Checks if the user has not selected a category
            if (category[0] === "") {
              alert("No category has been selected!");
            } else {
              // if they have selected a category

              // Uncategorized cannot be removed
              if (category[0] === "Uncategorized") {
                alert("Uncategorized cannot be removed!");
                return;
              }
              let removed = false; // used to check if the category has been removed
              setAvailableCategories((prev) => {
                // create a hard copy of the previous category state
                const arr: AvailableCategories[] = JSON.parse(
                  JSON.stringify(prev)
                );
                // if the category selected exists in the available categories array and its match is not being used remove the category
                arr.forEach((c, index) => {
                  if (c.label === category[0] && c.isused === "false") {
                    arr.splice(index, 1);
                    removed = true;
                  }
                });

                return arr;
              });
              // if the category has not been removed then it is being used. Show an alert to notify the user
              removed
                ? null
                : alert("Category cannot be removed since it is being used.");
            }
          }}
        >
          Remove Category
        </Button>
        <DeleteCatToolTip />
      </div>
    </div>
  );
};

export default AddToExpenses;
