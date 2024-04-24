'use client'

import { useRef, useState, useEffect } from 'react';
import { EditMultiSelectCreatable } from '@/components/EditMultiSelectCreatable';
// import { MultiSelectCreatable } from '@/components/MultiSelectCreatableCopy';
import { Card, ActionIcon, Grid, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import { IconPencil, IconCopy, IconCheck, IconDotsVertical, IconArrowUpRight, IconCalendar, IconCalendarEvent, IconCircleCheck, IconCircleDashed, IconCreditCard, IconDots, IconDownload, IconHeart, IconMapPin, IconPoint, IconPointFilled, IconRoad, IconStarFilled, IconUserHeart, IconUsers } from '@tabler/icons-react';
// import Link from 'next/link';
import classes from './EditPromptSequenceForm.module.css';

const EditPromptSequenceForm = ({ postState, postsState, editPromptSequence, promptSequenceTitle, setIsCardVisible, addPromptToPromptSequence, tagsInputValue, setTagsInputValue }) => {

    const [copied, setCopied] = useState("");
    const [isSaveVisible, setIsSaveVisible] = useState("");
    const [promptSequenceTitleTextareaValue, setPromptSequenceTitleTextareaValue] = useState(promptSequenceTitle);
    // const [promptSequenceTags, setpromptSequenceTitleTextareaValue] = useState(promptSequenceTitle);
    const [isEditable, setIsEditable] = useState(false);
    const textareaRef = useRef(null);


    const handleAddPromptClick = (e) => {
        e.preventDefault();
        setIsCardVisible(false)
        if (promptSequenceTitleTextareaValue.trim() !== "") {
            // Call the addPromptToPromptSequence function with the textarea value and promptSequenceTitle
            addPromptToPromptSequence(promptSequenceTitleTextareaValue);
            // Clear the textarea after adding the prompt
            setTextareaValue("");
        }
    };



    // const handleEditToggle = () => {
    //     setIsSaveVisible(false);
    // }



    // console.log(textareaValue)
    // console.log(posts)
    // console.log(post.tags)
    // console.log(post.promptSequenceTitle)
    // console.log(promptSequenceTitle)

    // console.log(promptSequenceTitleTextareaValue)

    const allTags = postsState?.reduce((tags, sequence) => {
        return tags.concat(sequence.tags);
    }, []);

    const uniqueTags = [...new Set(allTags)];
    // console.log(uniqueTags)

    // Function to resize the textarea dynamically
    // const resizeTextarea = () => {
    //     const textarea = textareaRef.current;
    //     textarea.style.height = 'auto'; // Reset height to auto to recalculate
    //     textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    // };

    // useEffect hook to resize textarea on initial render and whenever promptSequenceTitleTextareaValue changes
    // useEffect(() => {
    //     resizeTextarea();
    // }, [promptSequenceTitleTextareaValue]);

    // const handleTextareaChange = (event) => {
    //     setPromptSequenceTitleTextareaValue(event.target.value);
    // };

    const handleEditTextarea = () => {
        // setIsSaveVisible(true);
        // setIsSaveVisible(!isSaveVisible)

        setIsEditable(!isEditable)

        if (!isEditable && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(promptSequenceTitleTextareaValue.length, promptSequenceTitleTextareaValue.length);
        }
        // textareaRef.current.focus();
        // Set cursor to the end of the text
        // textareaRef.current.setSelectionRange(textareaValue.length, textareaValue.length);
    }

    useEffect(() => {
        // Update the state when the promptSequenceTitle prop changes
        setPromptSequenceTitleTextareaValue(promptSequenceTitle);
    }, [promptSequenceTitle]);


    const handleEditPromptSequenceClick = (e) => {
        e.preventDefault();
        console.log(promptSequenceTitleTextareaValue)
        // setIsSaveVisible(false)
        if (promptSequenceTitleTextareaValue.trim() !== "") {
            editPromptSequence(promptSequenceTitleTextareaValue)
            setPromptSequenceTitleTextareaValue("");
        }
        setIsEditable(!isEditable)
    };



    return (
        <>

            <form onSubmit={handleEditPromptSequenceClick}>

                <Flex direction='column' gap={16} m={16}>
                    <Grid>
                        <Grid.Col span={3.5}>
                            <Text fw={600}>Title</Text>
                        </Grid.Col>
                        <Grid.Col span={8.5}>
                            {/* <TextInput
                            // style={{ width: '280px' }}
                            // withAsterisk
                            // label="Add Prompt Tags"
                            placeholder="#tagname"
                            // value={post.tag}
                            // onChange={(e) => setPost({ ...post, tag: e.target.value })}
                            required
                        // {...form.getInputProps('prompt')}
                        /> */}
                            {/* <Text>This is the prompt seq title</Text> */}

                            {/* <div onDoubleClick={handleDoubleClick} style={{ display: 'inline-block', width: '100%' }}>
                                {isEditing ? (
                                    <textarea
                                        type="text"
                                        value={editText}
                                        rows={Math.max(1, Math.ceil(editText.length / 40))}
                                        // onChange={handleChange}
                                        onBlur={() => setIsEditing(false)}
                                        autoFocus
                                        // className={classes.form_textarea}
                                        style={{ width: '100%', resize: 'none' }}
                                    />
                                ) : (
                                    <Text my={6.25}>{post.promptSequenceTitle}</Text>
                                )}
                            </div> */}
                            {/* <textarea
                                ref={textareaRef}
                                value={promptSequenceTitleTextareaValue}
                                onChange={(e) => setTextareaValue(e.target.value)}
                                placeholder="Write your prompt here..."
                                required
                                className={classes.form_textarea}
                                // rows={6}
                                readOnly={!isEditable}
                                onBlur={(e) => setIsSaveVisible(false)}
                            /> */}

                            {/* <Textarea
                                // ref={textareaRef}
                                value={promptSequenceTitleTextareaValue}
                                onChange={(e) => setTextareaValue(e.target.value)}
                                placeholder="Write your prompt here..."
                                required
                                // className={classes.form_textarea}
                                // rows={6}
                                readOnly={!isEditable}
                                onBlur={(e) => setIsSaveVisible(false)}
                                autosize
                            /> */}

                            {isEditable ? (
                                <div className={classes.textareaWrapper}>

                                    <Textarea
                                        value={promptSequenceTitleTextareaValue}
                                        onChange={(e) => setPromptSequenceTitleTextareaValue(e.target.value)}
                                        onBlur={() => setIsEditable(false)}
                                        className={classes.formTextarea}
                                        autosize
                                    />
                                </div>
                            ) : (
                                <Text>{promptSequenceTitleTextareaValue}</Text>

                            )}
                            {/* <textarea
                                ref={textareaRef}
                                value={promptSequenceTitleTextareaValue}
                                onChange={(e) => setPromptSequenceTitleTextareaValue(e.target.value)}
                                onBlur={() => setIsEditable(false)}
                                className={classes.formTextarea}
                                rows={6}
                                readOnly={!isEditable}
                            /> */}

                            {/* <Text>{post.promptSequenceTitle}</Text> */}


                            {/* <EditableText
                            text={post.promptSequenceTitle}
                            postObject={post}
                        /> */}

                        </Grid.Col>
                        {/* <Grid.Col span={3.5}>
                            <Text fw={600}>Description</Text>
                        </Grid.Col>
                        <Grid.Col span={8.5}>
                            <Text>This is the prompt seq description. This is the prompt seq description. This is the prompt seq description</Text>
                        </Grid.Col> */}
                        {/* <Grid.Col span={3.5}>
                        <Text fw={600}>Tag category</Text>
                    </Grid.Col>
                    <Grid.Col span={8.5}>
                        <Grid>
                            <Grid.Col>
                                <Badge>ChatGpt</Badge>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col> */}
                        <Grid.Col span={3.5}>
                            <Text fw={600}>Tags</Text>
                        </Grid.Col>
                        <Grid.Col span={8.5}>

                            {isEditable ? (
                                <EditMultiSelectCreatable
                                    postTag={postState.tag}
                                    uniqueTags={uniqueTags}
                                    postTags={postState.tags}
                                    placeholder=""
                                    // data={post.tags}
                                    // whenChanged={(newValue) => setSelectedTagCategory(newValue)}
                                    // whenChanged={(newValue) => setTagsInputValue(newValue)}
                                    tagsInputValue={tagsInputValue}
                                    setTagsInputValue={setTagsInputValue}
                                />
                            ) : (
                                <>
                                <Flex gap={8} wrap='wrap' align=''>
                                    {postState.tags?.map((tag, index) => (
                                        <Badge key={index}>{tag}</Badge>
                                    ))}
                                    </Flex>
                                </>
                            )}

                        </Grid.Col>
                    </Grid>
                    {/* <Flex justify='flex-end' gap={16}>

                        <Button variant='outline' type='submit' style={{ pointerEvents: isEditable ? 'auto' : 'none', opacity: isEditable ? 1 : 0.5 }}>Save</Button>
                        
                        <Button onClick={handleEditTextarea}>{isEditable ? 'Cancel' : 'Edit'}</Button>
                    </Flex> */}
                </Flex>

            </form>
        </>
    )
}

export default EditPromptSequenceForm
