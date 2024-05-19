import { gql } from "@apollo/client";

const LOG_IN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;


const CREATE_CATEGORY_MUTATION = gql`
    mutation CreateCategory($name: String!, $icon: String!, $type: String!) {
        createCategory(input: { name: $name, icon: $icon, type: $type }) {
            name
            type
            icon
        }
    }
`;


const CREATE_TRANSACTION_MUTATION = gql`
    mutation CreateTransaction($amount: Float!, $description: String!, $date: String!, $category: String!, $type: String!) {
        createTransaction(input: { amount: $amount, description: $description, date: $date, category: $category, type: $type }) {
            id
            amount
            description
            date
            type
            category
        }
    }
`;

const CREATE_BUDGET_MUTATION = gql`
    mutation AddBudget($amount: Float!, $startDate: String!, $endDate: String!) {
        addBudget(input: { amount: $amount, startDate: $startDate, endDate: $endDate }) {
            id
            amount
        }
    }
`;

const DELETE_TRANSACTION_MUTATION = gql`
    mutation DeleteTransaction($id: ID!) {
        deleteTransaction(id: $id)
    }
`;

const UPDATE_BUDGET_MUTATION = gql`
    mutation UpdateBudget($id: ID!, $amount: Float!, $startDate: String!, $endDate: String!) {
        updateBudget(id: $id, amount: $amount, startDate: $startDate, endDate: $endDate) {
            id
            amount
        }
    }
`;


export {
    LOG_IN_MUTATION,
    CREATE_CATEGORY_MUTATION,
    CREATE_TRANSACTION_MUTATION,
    CREATE_BUDGET_MUTATION,
    DELETE_TRANSACTION_MUTATION
}