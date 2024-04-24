'use client'

import { useState, useRef, useEffect } from 'react';
import { CreateMultiSelectCreatable } from '@/components/CreateMultiSelectCreatable';
import { EditMultiSelectCreatable } from '@/components/EditMultiSelectCreatable';
import { Card, Grid, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
// import Link from 'next/link';

const EditPromptSeqForm = ({ session, tagsInputValue, type, post, setPost, postsState, setPostsState, promptSequenceTitle, promptSequenceId, submitting, setOpenedDrawerEditSeq, setTagsInputValue, originalPostsState, setOriginalPostsState }) => {

    const [promptSequenceTitleTextareaValue, setPromptSequenceTitleTextareaValue] = useState(promptSequenceTitle);

    const allTags = postsState.reduce((tags, sequence) => {
        // Concatenate tags array from each prompt sequence
        return tags.concat(sequence.tags);
    }, []);

    // Step 5: Remove duplicate tags to get unique tags
    const uniqueTags = [...new Set(allTags)];

    useEffect(() => {
        // Update the state when the promptSequenceTitle prop changes
        setPromptSequenceTitleTextareaValue(promptSequenceTitle);
    }, [promptSequenceTitle]);


    const handleEditPromptSequenceClick = (e) => {
        e.preventDefault();
        if (promptSequenceTitleTextareaValue.trim() !== "") {
            editPromptSequence(promptSequenceTitleTextareaValue)
            setPromptSequenceTitleTextareaValue("");
        }
        setOpenedDrawerEditSeq(false)
    };


    const editPromptSequence = async (promptSequenceTitleTextareaValue) => {

        try {
            const response = await fetch(`/api/prompt-sequence/${promptSequenceId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    promptSequenceTitle: promptSequenceTitleTextareaValue,
                    tags: tagsInputValue,
                })
            });

            const editedPost = await response.json();
            // console.log(editedPost);

            // Find the index of the edited post in the postsState array
            const index = postsState.findIndex((p) => p._id === promptSequenceId);

            if (index !== -1) {
                // Create a new array with the edited post replacing the old post
                const updatedPosts = [...postsState];
                updatedPosts[index] = editedPost;

                setPostsState(updatedPosts);
                setOriginalPostsState(updatedPosts);
            }

        } catch (error) {
            console.error(error);
            return null;
        }
    };




    return (
        <>

            <form onSubmit={handleEditPromptSequenceClick}>
                <Flex direction='column' gap={16}>
                    <Grid align="center">
                        <Grid.Col span={4}>
                            <Text>Prompt Sequence Title</Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <TextInput
                                // style={{ width: '280px' }}
                                // withAsterisk
                                // label="Add Prompt Tags"
                                value={promptSequenceTitleTextareaValue}
                                onChange={(e) => setPromptSequenceTitleTextareaValue(e.target.value)}
                                placeholder="Prompt Sequence Title"
                                // onChange={(e) => setPost({ ...post, promptSequenceTitle: e.target.value })}
                                required
                            />
                        </Grid.Col>

                        {/* <Grid.Col span={4}>
                            <Text>Prompt</Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <TextInput
                                // style={{ width: '280px' }}
                                // withAsterisk
                                // label="Add Prompt Tags"
                                placeholder="Add Prompt"
                                // value={post.prompts[0]}
                                // onChange={(e) => setPost({ ...post, prompts: e.target.value })}
                                // onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                                onChange={handlePromptChange}
                                // onChange={(e) => setTagCategory(e.target.value)}
                                required
                            />
                        </Grid.Col> */}


                        <Grid.Col span={4}>
                            <Text>Tags</Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            {/* <CreateMultiSelectCreatable
                                postTag={post.tag}
                                uniqueTags={uniqueTags}
                                postTags={post.tags}
                                placeholder="Assign Tags"
                                setTagsInputValue={setTagsInputValue}
                                tagsInputValue={tagsInputValue}
                            /> */}
                            <EditMultiSelectCreatable
                                postTag={post.tag}
                                uniqueTags={uniqueTags}
                                postTags={post.tags}
                                placeholder="Assign Tags"
                                setTagsInputValue={setTagsInputValue}
                                tagsInputValue={tagsInputValue}
                            />

                            {/* <Grid>
                                <Grid.Col span={6}>
                                    <Flex direction='column' gap={4}>
                                        <Text size="sm">Tag Category</Text>
                                        <CreatableSelect2
                                            posts={posts}
                                            postTag={post.tag}
                                            uniqueTags={uniqueTags}
                                            whenChanged={(newValue) => setSelectedTagCategory(newValue)}
                                        />
                                    </Flex>
                                </Grid.Col>

                                <Grid.Col span={6}>
                                    <Flex direction='column' gap={4}>
                                        <TextInput
                                            withAsterisk
                                            label="Tags"
                                            placeholder="#tagname"
                                            value={post.tag}
                                            onChange={(e) => setEnteredTags(e.target.value)}
                                            required
                                        />
                                    </Flex>
                                </Grid.Col>
                            </Grid> */}
                        </Grid.Col>


                    </Grid>
                    {/* <Flex justify='flex-end'>
                        <Button
                            type="submit"
                            // href='/'
                            disabled={submitting}
                            onClick={() => setOpened(false)}
                        >
                            {submitting ? `${type}...` : type}
                        </Button>


                        <Button variant='outline' type='submit' style={{ pointerEvents: isEditable ? 'auto' : 'none', opacity: isEditable ? 1 : 0.5 }}>Save</Button>
                    </Flex> */}
                    <Flex justify='flex-end' gap={16}>

                        {/* <Button variant='outline' type='submit' style={{ pointerEvents: isEditable ? 'auto' : 'none', opacity: isEditable ? 1 : 0.5 }}>Save</Button> */}

                        <Button variant='default' onClick={() => setOpenedDrawerEditSeq(false)}>Cancel</Button>
                        <Button type='submit'>Save</Button>

                        {/* <Button onClick={handleEditTextarea}>{isEditable ? 'Cancel' : 'Edit'}</Button> */}
                    </Flex>
                </Flex>
            </form>
        </>
    )
}

export default EditPromptSeqForm
