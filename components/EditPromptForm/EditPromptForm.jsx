'use client'

import { useRef, useState, useEffect } from 'react';
import { Modal, ActionIcon, Button, Menu, Flex, Text, Anchor } from '@mantine/core';
import { IconTrash, IconPencil, IconCopy, IconCheck, IconDotsVertical, IconExclamationCircle } from '@tabler/icons-react';
// import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import classes from './EditPromptForm.module.css';

const EditPromptForm = ({ postPromptsState, setPostPromptsState, promptId, promptIndex, getPromptSequenceDetails, editPromptInPromptSequence, deletePromptInPromptSequence, prompt, setIsCardVisible, addPromptToPromptSequence }) => {

    const [copied, setCopied] = useState("");
    const [isSaveVisible, setIsSaveVisible] = useState(false);
    const [editToggle, setEditToggle] = useState(true);
    // const [textareaValue, setTextareaValue] = useState("");
    const [textareaValue, setTextareaValue] = useState(prompt);
    const [isEditable, setIsEditable] = useState(false);
    const textareaRef = useRef(null);
    const [opened, { open, close }] = useDisclosure(false);


    useEffect(() => {
        setTextareaValue(prompt)
      }, [prompt]);
    

    const handleCopy = () => {
        setCopied(prompt);
        navigator.clipboard.writeText(prompt);
        setTimeout(() => setCopied(""), 3000);
    }

    const handleEditTextarea = () => {
        setEditToggle(false)
        setIsEditable(true)
        if (!isEditable && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(textareaValue.length, textareaValue.length);
        }
    }


    const handleEditPromptClick = (e) => {
        e.preventDefault();
        console.log(textareaValue)
        if (textareaValue.trim() !== "") {
            editPromptInPromptSequence(textareaValue)
            setTextareaValue("");
        }

        setIsEditable(false)
        setEditToggle(!editToggle)
    };



    const handleDeletePromptClick = (e) => {
        e.preventDefault();
        deletePromptInPromptSequence(promptId)
        close();
        getPromptSequenceDetails()
    };


    return (
        <>

            {/* <form onSubmit={handleEditPromptClick}> */}
            <form>

                <Flex direction='column' gap={8}>

                    <Flex justify="space-between" align='flex-start' gap={8}>
                        <Text size="lg" fw={600}>
                            {/* Prompt #{promptNumber} */}
                            Prompt #{promptIndex + 1}
                        </Text>

                        {/* <Anchor underline='never' c='black'>
                            <ClippedText text={post.prompt} maxLength={45} />
                        </Anchor>
                        <Badge color="pink">On Sale</Badge>


                        <ActionIcon variant="default" size='32px'>
                            <IconPencil size={22} stroke={1.5} />
                        </ActionIcon> */}
                        <Menu shadow="sm" position='bottom-end' offset={4}>
                            <Menu.Target>
                                <ActionIcon variant="default">
                                    <IconDotsVertical size={18} stroke={1.5} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconPencil size={14} />} onClick={handleEditTextarea}>
                                    Edit Prompt
                                </Menu.Item>
                                {/* <Menu.Item color="red" leftSection={<IconTrash size={14} />} onClick={handleDeletePromptClick}> */}
                                <Menu.Item color="red" leftSection={<IconTrash size={14} />} onClick={open}>
                                    Delete Prompt
                                </Menu.Item>
                                {/* <Menu.Item leftSection={<IconPencil size={14} />}>
                                    Duplicate
                                </Menu.Item> */}
                            </Menu.Dropdown>
                        </Menu>
                        <Modal opened={opened} onClose={close} yOffset="15vh" size="28%" withCloseButton={false}>
                            {/* <Flex justify='space-between' align='center'>
                                <Text>Do you really want to delete this prompt. This can't be undone.</Text>
                                <Button color="red" variant='outline' onClick={handleDeletePromptClick}>Delete</Button>
                            </Flex> */}
                            <Flex direction='column' align='center' gap='16px' mt={16} mx={6}>
                                <Flex align='center' gap={8}>
                                    {/* <ActionIcon variant="default" radius="xl" size="xl" color="red"> */}
                                    <IconExclamationCircle size={48} stroke={1} color='red' />
                                    {/* </ActionIcon> */}
                                    {/* <Text size="lg" fw={500}>Caution</Text> */}
                                </Flex>
                                <Flex direction='column' gap={32} mb={6}>
                                    <Text ta="center">Do you really want to delete this prompt? This can't be undone.</Text>
                                    <Button color="red" variant='outline' onClick={handleDeletePromptClick}>Delete</Button>
                                </Flex>
                            </Flex>
                        </Modal>


                    </Flex>

                    <textarea
                        ref={textareaRef}
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                        placeholder="Write your prompt here..."
                        required
                        className={classes.form_textarea}
                        rows={6}
                        readOnly={!isEditable}
                    />

                    <Flex direction='row' gap={16} align='center' justify='space-between'>
                        <Flex gap={12}>
                            {/* <Button color={copied ? 'teal' : 'blue'} rightSection={<IconCopy size={14} />} onClick={handleCopy}>Copy</Button> */}
                            <Button color={copied ? 'teal' : 'blue'}
                                rightSection={copied ? (
                                    <IconCheck size={14} />
                                ) : (
                                    <IconCopy size={14} />
                                )} onClick={handleCopy}>
                                {copied ? "Copied" : "Copy"}
                            </Button>

                            {/* {editToggle && (
                                <ActionIcon variant="default" size='36px' onClick={handleEditTextarea}>
                                    <IconPencil size={22} stroke={1.5} />
                                </ActionIcon>
                            )} */}

                        </Flex>
                        {isEditable && (
                            <Flex direction='row' gap={16} align='center' justify='flex-end'>
                                <Anchor onClick={() => {
                                    setIsEditable(false)
                                    setEditToggle(true)
                                }}>Cancel</Anchor>
                                <Button variant='outline' type='submit' onClick={handleEditPromptClick}>Save</Button>
                            </Flex>
                        )}

                        {/* <Button variant='outline' type='submit' style={{ pointerEvents: isEditable ? 'auto' : 'none', opacity: isEditable ? 1 : 0.5 }}>Save</Button> */}

                    </Flex>

                </Flex>

            </form>
        </>
    )
}

export default EditPromptForm
