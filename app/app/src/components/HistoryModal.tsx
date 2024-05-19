import { Button, Modal, Text } from "@mantine/core";
import { useContext, useEffect } from "react";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION_MUTATION } from "../utils/mutations";
import { GET_SUMMARY_QUERY, GET_TRANSACTIONS_QUERY } from "../utils/queries";

type HistoryModalProps = {
  opened: boolean;
  setOpened: (state: boolean) => void;
  label: string;
  amount: number;
  dateCreated: string;
  id: string;
  type: string;
  category: string;
};

const HistoryModal = ({
  opened,
  setOpened,
  label,
  amount,
  dateCreated,
  type,
  id,
  category,
}: HistoryModalProps) => {
  const [deleteTransaction, { loading, data }] = useMutation(DELETE_TRANSACTION_MUTATION, {
    refetchQueries: [GET_TRANSACTIONS_QUERY, GET_SUMMARY_QUERY]
  });

  const handleDelete = () => {
    deleteTransaction({ variables: { id: id } });
  }

  useEffect(() => {
    if (data) {
      setOpened(false);
    }
  },
  [data, setOpened]);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Transaction Details"
      styles={{
        title: {
          fontSize: 20,
        },
      }}
    >
      <Text>
        <span style={{ fontWeight: "bold" }}>Label:</span> {label}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Type:</span> {type}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Amount:</span> $
        {amount.toLocaleString()}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Category:</span> {category}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Date Created:</span> {new Date(Number(dateCreated)).toLocaleDateString()}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>ID:</span> {id}
      </Text>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Button
          onClick={() => {
            setOpened(false);
          }}
        >
          Exit
        </Button>
        <Button
          color="red"
          onClick={handleDelete}
          loading={loading}
        >
          Delete Item
        </Button>
      </div>
    </Modal>
  );
};

export default HistoryModal;
