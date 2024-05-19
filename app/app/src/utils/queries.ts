import { gql } from "@apollo/client";


const GET_ALL_CATEGORIES_QUERY = gql`
query GetAllCategories {
    getAllCategories {
        name
        icon
        type
    }
}
`;


const GET_SUMMARY_QUERY = gql`
query Summary($from: String!, $to: String!) {
    summary(from: $from, to: $to) {
        balanceStats {
            expense
            income
            budget
        }
        categoryStats {
            category
            totalAmount
        }
    }
}
`;


const GET_TRANSACTIONS_QUERY = gql`
query TransactionHistory($from: String!, $to: String!) {
    transactionHistory(from: $from, to: $to) {
        id
        amount
        description
        date
        type
        category
    }
}
`;
export {
    GET_ALL_CATEGORIES_QUERY,
    GET_SUMMARY_QUERY,
    GET_TRANSACTIONS_QUERY,
}