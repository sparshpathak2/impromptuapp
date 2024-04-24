'use client'

import { useState, useEffect } from "react";
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconBrandGoogle, IconBrandTwitter } from '@tabler/icons-react';
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Checkbox, Anchor, Stack, Container } from '@mantine/core';
import { GoogleButton } from '@/components/Icons/GoogleButton';
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function AuthenticationForm(props) {

    const { data: session, status } = useSession();
    const [workspaceState, setWorkspaceState] = useState([])
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginFailed, setLoginFailed] = useState(false)
    const [formSubmitError, setFormSubmitError] = useState(false)
    const [formSubmitErrorMessage, setFormSubmitErrorMessage] = useState('')
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

    const passwordInput = (e) => {
        form.setFieldValue('password', e.currentTarget.value)
        if (type === 'register') {
            // if (form.values?.password?.length < '6') {
            if (e.currentTarget.value.length < '6') {
                // form.setErrors({ password: 'Choose another password' });
                setPasswordError('Password should have atleast 6 characters')
            } else {
                setPasswordError('')
            }
        }
    }

    const emailInput = (e) => {

        form.setFieldValue('email', e.currentTarget.value)
        if (type === 'register') {
            const emailRegex = /^\S+@\S+\.\S+$/;
            setEmailError(emailRegex.test(form.values?.email) ? '' : 'Enter a valid email');
        }
    }

    const handleCheckbox = (e) => {
        form.setFieldValue('terms', e.currentTarget.checked)
        if (e.currentTarget.checked === true) {
            setFormSubmitErrorMessage('')
        }
    }


    useEffect(() => {
        // console.log('fetch workspace UE run')
        // console.log('session details', session?.user.id)
        if (status === 'authenticated') {
            if (session?.user.id) {
                fetchWorkspaces();
                console.log(workspaceState)
            }
        }
    }, [status, session?.user.id]);

    useEffect(() => {
        // console.log('routing UE run')
        // console.log('workspace details', workspaceState)
        // console.log('session details', session?.user.id)
        if (status === 'authenticated' && workspaceState.length > 0) {
            router.push(`/dashboard?f=${workspaceState[0]?.folders[0]?._id}`);
        } else if (status === 'authenticated' && workspaceState.length === 0) {
            router.push('/onboarding');
        }
    }, [workspaceState]);

    // useEffect(() => {
    //     if (status === 'authenticated' && workspaceState.length > 0) {
    //         router.push(`/dashboard?f=${workspaceState[0]?.folders[0]?._id}`);
    //     } else if (status === 'authenticated' && workspaceState.length === 0) {
    //         router.push('/onboarding');
    //     }
    // }, []);


    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            // name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {

            if (type === "register" && emailError === '' && passwordError === '' && form.values.terms === true) {

                const res = await fetch('/api/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: form.values.email,
                        password: form.values.password
                    })
                })


                // if (!res.ok) {
                //     const data = await res.json();
                //     form.setErrors('email', data.message || 'An error occurred during registration');
                //     console.error("User registration failed:", data);
                //     // if (status === '400') {
                //     //     setFormSubmitError(true)
                //     // }
                //     if (data.message === 'User already exists with this email ID.') {
                //         setFormSubmitError(true)
                //     }
                // } else {
                //     // Handle successful registration (if needed)
                //     console.log("User registered successfully!");
                //     // form.reset();
                // }

                if (!res.ok) {
                    const data = await res.json();
                    form.setErrors('email', data.message || 'An error occurred during registration');
                    console.error("User registration failed:", data);
                    if (data.message === 'User already exists with this email ID.') {
                        setFormSubmitError(true)
                    }
                } else {
                    // Successful registration - attempt automatic login
                    const loginRes = await signIn('credentials', {
                        email: form.values.email,
                        password: form.values.password,
                        redirect: false, // Prevent automatic redirection
                    });

                    if (loginRes.ok) {
                        console.log("User registered and logged in successfully!");
                        // Handle successful login (e.g., redirect to dashboard)
                    } else {
                        console.error("Failed to login automatically after registration:", loginRes.error);
                        // Handle failed login (optional: display error message)
                    }
                }



            } else if (type === "register" && emailError === '' && passwordError === '' && form.values.terms === false) {
                setFormSubmitErrorMessage('*Accept T&C');
            }


            if (type === "login") {
                const res = await signIn('credentials', {
                    email: form.values.email,
                    password: form.values.password,
                    redirect: false,
                })

                // if (res.error) {
                //     setLoginFailed(true)
                //     form.setErrors({ email: 'User does not exists' });
                // } else {
                //     console.log("Login successful:", data);
                // }

                if (!res.ok) {
                    console.log('Auth erorr:', res.error)
                    setLoginFailed(true)
                    form.setErrors({ email: 'User does not exists' });
                    // form.reset();
                } else {
                    // Handle successful login
                    console.log("Login successful");
                }
            }

        } catch (error) {
            console.log("Error submitting request:", error)
        }


    }

    // console.log('formSubmitError:', formSubmitError)
    // console.log(form?.email)
    // console.log(form.values.email)
    // console.log(form.values.password)
    // console.log('workspaceState', workspaceState)
    // console.log(status)

    return (
        <Container size="500px" my={56}>
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Welcome to ImPromtu, {type} with
                </Text>

                <Group grow mb="md" mt="md">
                    <GoogleButton radius="xl" onClick={() => signIn('google')}>Google</GoogleButton>
                    {/* <IconBrandGoogle/> */}
                    {/* <IconBrandTwitter/> */}
                    {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                {/* <form onSubmit={form.onSubmit(handleFormSubmit)}> */}
                <form onSubmit={handleFormSubmit}>
                    <Stack>
                        {/* {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                radius="md"
                            />
                        )} */}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            // onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            onChange={(e) => emailInput(e)}
                            // error={form.errors.email && 'Invalid email'}
                            // error={form.errors.email}
                            // error={form.errors && 'Invalid email'}
                            error={emailError}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            // onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            onChange={(e) => passwordInput(e)}
                            // error={form.errors.password && 'Password should include at least 6 characters'}
                            // error={form.errors.password}
                            error={passwordError}
                            radius="md"
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                // onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                                onChange={(e) => handleCheckbox(e)}
                            />
                        )}

                        {loginFailed === true && type === 'login' && (
                            // <Text>{form.errors}</Text>
                            <Text fz={14} c='red'>*Invalid email or password</Text>
                        )}

                        {formSubmitError === true && type === 'register' && (
                            // <Text>{form.errors}</Text>
                            <Text fz={14} c='red'>*User already exists with this email ID.</Text>
                        )}

                        {formSubmitErrorMessage && type === 'register' && (
                            // <Text>{form.errors}</Text>
                            <Text fz={14} c='red'>{formSubmitErrorMessage}</Text>
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper></Container>
    );
}