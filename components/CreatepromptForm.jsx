'use client'

import { useState } from 'react';
import { Card, ActionIcon, Grid, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import { IconPencil, IconCopy, IconDotsVertical, IconArrowUpRight, IconCalendar, IconCalendarEvent, IconCircleCheck, IconCircleDashed, IconCreditCard, IconDots, IconDownload, IconHeart, IconMapPin, IconPoint, IconPointFilled, IconRoad, IconStarFilled, IconUserHeart, IconUsers } from '@tabler/icons-react';
// import Link from 'next/link';

const CreatePromptForm = ({ postPromptsState, setPostPromptsState, postState, setIsCardVisible, addPromptToPromptSequence, setPost, posts, submitting, setOpened, setSelectedTagCategory, setEnteredTags, handleSubmit, handlePromptChange, setTagsInputValue }) => {

    const [textareaValue, setTextareaValue] = useState("");


    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    

    const handleAddPromptClick = (e) => {
        e.preventDefault();
        setIsCardVisible(false)
        console.log(textareaValue)
        if (textareaValue.trim() !== "") {
            // Call the addPromptToPromptSequence function with the textarea value and promptSequenceTitle
            addPromptToPromptSequence(textareaValue);
            // Clear the textarea after adding the prompt
            setTextareaValue("");
        }
    };


    return (
        <>

            <form onSubmit={handleAddPromptClick}>

                <Flex direction='column' gap={8}>

                    <Flex justify="space-between" align='flex-start' gap={8}>
                        <Text size="lg" fw={600}>
                            Prompt #{postState.prompts.length + 1}
                        </Text>

                        <ActionIcon variant="default">
                            <IconDotsVertical size={18} stroke={1.5} />
                        </ActionIcon>
                    </Flex>

                    <Textarea
                        placeholder="Enter Your Prompt Here"
                        // label="Prompt"
                        autosize
                        minRows={4}
                        onChange={handleTextareaChange}
                    //   value={prompt}
                    // required
                    />


                    <Flex direction='row' gap={16} align='center' justify='flex-end'>
                        <Anchor onClick={() => setIsCardVisible(false)}>Cancel</Anchor>
                        <Button variant='outline' type='submit'>Add</Button>
                    </Flex>

                </Flex>

            </form>
        </>
    )
}

export default CreatePromptForm
