'use client'

import { useState } from 'react';
import { CreatePromptSeqMultiSelect } from '@/components/CreatePromptSeqMultiSelect';
import { Card, Grid, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';

const CreatePromptSeqForm = ({ uniqueTags, type, postState, setPostState, submitting, setOpenedDrawerCreateSeq, handleCreatePromptSequence, handlePromptChange, tagsInputValue, setTagsInputValue }) => {

    return (
        <>
            <form onSubmit={handleCreatePromptSequence}>
                <Flex direction='column' gap={16}>
                    <Grid align="center">
                        <Grid.Col span={4}>
                            <Text>Prompt Sequence Title</Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <TextInput
                                placeholder="Prompt Sequence Title"
                                onChange={(e) => setPostState({ ...postState, promptSequenceTitle: e.target.value })}
                                required
                            />
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <Text>Prompt</Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <TextInput
                                placeholder="Add Prompt"
                                value={postState.prompts[0]}
                                onChange={handlePromptChange}
                                required
                            />
                        </Grid.Col>


                        <Grid.Col span={4}>
                            <Text>Tags</Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <CreatePromptSeqMultiSelect
                                uniqueTags={uniqueTags}
                                placeholder="Assign Tags"
                                setTagsInputValue={setTagsInputValue}
                                tagsInputValue={tagsInputValue}
                            />
                        </Grid.Col>


                    </Grid>
                    <Flex justify='flex-end'>
                        <Button
                            type="submit"
                            // href='/'
                            disabled={submitting}
                            onClick={() => setOpenedDrawerCreateSeq(false)}
                        >
                            {submitting ? `${type}...` : type}
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </>
    )
}

export default CreatePromptSeqForm
