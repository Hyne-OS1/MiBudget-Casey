import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, TextInput } from "@mantine/core";
import HistoryContext from "../store/HistoryContext";
import CategoriesContext from "../store/CategoriesContext"
import { useMutation } from "@apollo/client";
import { CREATE_BUDGET_MUTATION } from "../utils/mutations";

const SetBudget = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const [addBudget, { data, loading, error }] = useMutation(CREATE_BUDGET_MUTATION)

  const handleSetBudget = () => {
    addBudget({
      variables: {
        amount: value,
        startDate: new Date(),
        // one month from now
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      }
    })
  }

  return (
    <div>
      {
        !loading && <Text size="xl" mt={10} weight={700} color={data ? 'green' : error ? 'red' : ''}>
          {data ? "Budget set successfully" : error ? "Error setting budget" :
            "Set Your Income / Budget"
          }
        </Text>
      }
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: 5000"
        label="Enter your budget"
        withAsterisk
      />
      <Button
        mt={20}
        disabled={loading}
        onClick={handleSetBudget}
      >
        {loading ? "Loading" : "Set Budget"}
      </Button>
    </div>
  );
};

export default SetBudget;
