// 'use client'

import { Card, Grid, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import CreatePromptSeqForm from '@/components/CreatePromptSeqForm'

const DrawerComponent = ({ post, setPost, posts, submitting, setEnteredTags, setSelectedTagCategory, formSubmit, handlePromptChange, setTagsInputValue, opened, setOpened, closeDrawer }) => {
    return (
        <>
            <Drawer opened={opened} size="lg" onClose={closeDrawer} zIndex='1000' offset={8} radius="md" position="right">

                <CreatePromptSeqForm
                    type='Create'
                    post={post}
                    posts={posts}
                    setPost={setPost}
                    submitting={submitting}
                    setSelectedTagCategory={setSelectedTagCategory}
                    setEnteredTags={setEnteredTags}
                    handleSubmit={formSubmit}
                    handlePromptChange={handlePromptChange}
                    setTagsInputValue={setTagsInputValue}
                    setOpened={setOpened}
                // session={session}
                />

            </Drawer>
        </>
    )
}

export default DrawerComponent
