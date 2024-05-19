import { AppShell, Burger, ColorScheme, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core'
import React, { useState } from 'react'
import { CgCalculator } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsBarChartLine, BsPlusCircle } from "react-icons/bs";
import NavigationLink from '../components/NavigationLink';
import DarkLightThemeButton from '../components/DarkLightThemeButton';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = (
    { children }: { children: React.ReactNode }
) => {
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "theme",
        defaultValue: "dark",
    });
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    let token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
    }
    return (
        <AppShell
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar
                    p="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 250, lg: 350 }}
                >
                    <NavigationLink
                        label="Home"
                        icon={<AiOutlineHome />}
                        link="/"
                    />
                    <NavigationLink
                        label="Add an Expense"
                        icon={<BsPlusCircle />}
                        link="/newExpense"
                    />
                    <NavigationLink
                        label="Add / Update Your Budget"
                        icon={<MdAttachMoney />}
                        link="/newBudget"
                    />
                    <NavigationLink
                        label="View Spending in Categories"
                        icon={<BsBarChartLine />}
                        link="/categories"
                    />
                </Navbar>
            }

            header={
                <Header
                    height={{ base: 50, md: 70 }}
                    p="md"
                    sx={(theme) => ({
                        color:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[1]
                                : theme.colors.gray[9],
                        fontSize: "25px",
                    })}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "100%",
                        }}
                    >
                        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            
                            <Text ml={10}>MiBudget</Text>
                        </div>
                        <DarkLightThemeButton />
                    </div>
                </Header>
            }
        >
            <div className='main'>
                {children}
            </div>
        </AppShell>
    )
}

export default DashboardLayout