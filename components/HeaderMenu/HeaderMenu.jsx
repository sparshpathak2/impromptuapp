'use client'
import { Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Anchor, NavLink, Avatar, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconArrowUpRight, IconPencil, IconTrash, IconSettings } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';
// import logo from '../../public/impromptu-logo.png';
import logo from '../../public/impromptu-icon-logo.png';
// import logo from '../../public/impromptu-icon-logo-without-bg.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';


const links = [
    // { link: '/about-kevin-cotter', label: 'About Kevin Cotter' },
    // { link: '/about-setmytrip', label: 'About SetMyTrip' },
    {
        link: '',
        label: 'About',
        links: [
            // { link: '/about-kevin-cotter', label: 'About Kevin Cotter' },
            { link: '/about-setmytrip', label: 'About Setmytrip' },
        ],
    },
    // {
    //   link: '#2',
    //   label: 'Support',
    //   links: [
    //     { link: '/faq', label: 'FAQ' },
    //     { link: '/demo', label: 'Book a demo' },
    //     { link: '/forums', label: 'Forums' },
    //   ],
    // },
];

export function HeaderMenu() {

    const pathname = usePathname()

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const { data: session, status } = useSession();
    const [workspaceState, setWorkspaceState] = useState([])
    const router = useRouter();

    const fetchWorkspaces = async () => {
        try {
            const response = await fetch(`/api/users/${session?.user.id}/workspaces`);
            if (response.ok) {
                const data = await response.json();
                setWorkspaceState(data);
            } else {
                throw new Error('Failed to fetch workspaces');
            }
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user.id) {
                fetchWorkspaces();
                // console.log(workspaceState)
            }
        }
    }, [status, session?.user.id]);


    // useEffect(() => {
    //     if (status === 'authenticated') {
    //         if (session?.user.id) {
    //             fetchWorkspaces();
    //             console.log(workspaceState)
    //         }
    //     }
    // }, [workspaceState]);

    // useEffect(() => {
    //     const setUpProviders = async () => {
    //         const response = await getProviders();

    //         setProviders(response);
    //     }

    //     setUpProviders();
    // }, [])

    console.log('header workspace details', workspaceState)


    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item component="a" key={item.link} href={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <Link className={classes.link} href={link.link} passHref>
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown size="0.9rem" stroke={1.5} />
                            </Center>
                        </Link>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                passHref
                className={classes.link}
            >
                {link.label}
            </Link>
        );
    });

    return (
        <>
            <header className={classes.header}>
                {/* <Container size="lg"> */}
                <div className={classes.inner}>

                    <Anchor href={session ? `/dashboard?f=${workspaceState[0]?.folders[0]?._id}` : '/'} m={0} p={0}>
                    {/* <Anchor href={workspaceState ? `/dashboard?f=${workspaceState[0]?.folders[0]?._id}` : '/'} m={0} p={0}> */}
                    {/* <Anchor href='/' m={0} p={0}> */}
                    <Flex align='center'>
                        <Image
                            src={logo}
                            // width={150}
                            width={42}
                            // width={26}
                            // height={100}
                            alt="SetMyTrip Logo"
                        // onClick={handleLogoClick}
                        />
                    </Flex>
                    </Anchor>



                    <Flex
                        gap='32px'
                    >
                        <Container p={4}>
                            {session?.user ? (

                                <Flex
                                    gap='16px'
                                >
                                    <Menu shadow="sm" position='bottom-end' offset={14}>
                                        <Menu.Target>
                                            <Avatar color="cyan" component='a' href='javascript:void(0)' radius="xl">{session?.user?.email ? session.user.email[0].toUpperCase() : ''}</Avatar>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Label>{session?.user.email}</Menu.Label>
                                            {/* <Menu.Item rightSection={<IconSettings size={14} />} py={6} px={12}>
                                                Settings
                                            </Menu.Item> */}
                                            <Menu.Item onClick={signOut} py={6} px={12}>
                                                Sign Out
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Flex>

                            ) : (
                                <>
                                    {pathname !== '/sign-in' && (
                                        <Button
                                            component='a'
                                            href='/sign-in'
                                        >
                                            Sign In
                                        </Button>
                                    )}
                                </>
                            )}
                        </Container>





                        {/* Desktop Nav */}
                        {/* <Container visibleFrom="sm" p={4}>
                            {session?.user ? (

                                <Flex
                                    gap='16px'
                                >
                                    <Menu shadow="sm" position='bottom-end' offset={14}>
                                        <Menu.Target>
                                            <Avatar color="cyan" component='a' href='javascript:void(0)' radius="xl">{session?.user?.email ? session.user.email[0].toUpperCase() : ''}</Avatar>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Label>{session?.user.email}</Menu.Label>
                                            <Menu.Item rightSection={<IconSettings size={14} />} py={6} px={12}>
                                                Settings
                                            </Menu.Item>
                                            <Menu.Item onClick={signOut} py={6} px={12}>
                                                Sign Out
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Flex>

                            ) : (
                                <>
                                    {providers &&
                                        Object.values(providers).map((providers) =>
                                        (
                                            <Button
                                                key={providers.name}
                                                onClick={() => signIn(providers.id)}
                                            >
                                                Sign In
                                            </Button>
                                        ))

                                    }
                                    <Button
                                        // key={providers.name}
                                        onClick={() => signIn('google')}
                                    >
                                        Sign In
                                    </Button>
                                </>
                            )}
                        </Container> */}

                    </Flex>



                    {/* Mobile Nav */}
                    {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                    <Drawer
                        opened={opened}
                        position='top'
                        onClose={toggle}
                    >
                        <NavLink
                            href="/about-kevin-cotter"
                            label="About Kevin Cotter"
                            childrenOffset={28}
                        >
                        </NavLink>

                        <NavLink
                            href="/about-setmytrip"
                            label="About SetMyTrip"
                            childrenOffset={12}
                            defaultOpened
                        >
                        </NavLink>
                    </Drawer> */}
                </div>
            </header>
        </>
    );
}