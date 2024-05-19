import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Container,
} from '@mantine/core';

import { useQuery, useMutation, gql } from "@apollo/client";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOG_IN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export default function LoginPage(props: PaperProps) {
    return (
        <Paper {...props} style={{
            // backgroundColor: "transprent"
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Container size={'lg'}>
                <LoginForm />
            </Container>
        </Paper>
    );
}

export const LoginForm = () => {
    const navigate = useNavigate();
    const [type, toggle] = useToggle(['login', 'register']);
    const [login, { data, error, loading }] = useMutation(LOG_IN);

    useEffect(() => {
        if (!loading && data) {
            localStorage.setItem('token', data.login);
            navigate('/')
        }
    }, [data, loading, navigate]);


    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleSubmit = () => {
        const { email, password } = form.values;
        console.log(email, password);

        login({ variables: { email, password } });
    }


    return (
        <Paper radius="md" p="xl" withBorder w={500}>
            <Text size="lg" fw={500}>
                Sign into your MiBudget
            </Text>
            <Divider label="" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit(() => { handleSubmit() })}>
                {!loading && error && (
                    <Text color="red" align="center" mb="md">
                        {error.message}
                    </Text>
                )}
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="Your email"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>
                <Group mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl" disabled={loading}>
                        {loading ? upperFirst("Loading") : upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}