'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import CreatePromptForm from '@/components/CreatePromptForm'

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const repsonse = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userID: session?.user.id,
                    tag: post.tag,
                })
            })

            if (Response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    

    return (
        <>
            {/* // <Form 
    //   type= 'Create'
    //   post= {post}
    //   setPost= {setPost}
    //   submitting= {submitting}
    //   handleSubmit= {createPrompt}
    // /> */}
            <Container
                my='xl'
            >
                <Title order={2}>Create Your Prompt</Title>

                {/* <Flex
                    direction='column'
                    // style={{ width: '50%' }}
                    maw='50%'
                    gap='md'
                    mt='md'
                    mb='md'
                >
                    <TextInput
                        // label="Input label"
                        // description="Input description"
                        placeholder="Input placeholder"
                    />
                    <TextInput
                        // label="Input label"
                        // description="Input description"
                        placeholder="Input placeholder"
                    />
                </Flex> */}


                <CreatePromptForm
                    type='Create'
                    post={post}
                    setPost={setPost}
                    submitting={submitting}
                    handleSubmit={createPrompt}
                />

            </Container>
        </>
    )
}

export default CreatePrompt
