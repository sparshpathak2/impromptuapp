"use client"

import { ThemeIcon, ActionIcon, Card, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import { useState } from "react";
import { useSession } from "next-auth/react";
import CreatePromptForm from './CreatepromptForm';
// import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IconPencil, IconCopy, IconDotsVertical, IconArrowUpRight, IconCalendar, IconCalendarEvent, IconCircleCheck, IconCircleDashed, IconCreditCard, IconDots, IconDownload, IconHeart, IconMapPin, IconPoint, IconPointFilled, IconRoad, IconStarFilled, IconUserHeart, IconUsers } from '@tabler/icons-react';

const PromptCardNew = ({ postState, promptId, postPromptsState, setPostPromptsState, promptSequenceId, setIsCardVisible, handleTagClick, handleEdit, handleDelete, prompt, prompts, promptNumber }) => {
  const [copied, setCopied] = useState("");

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();


  const handleCopy = () => {
    setCopied(postState.prompt);
    navigator.clipboard.writeText(postState.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  const ClippedText = ({ text, maxLength }) => {
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.slice(0, maxLength) + '...';
      }
    };

    return <Text fw={500}>{truncateText(text, maxLength)}</Text>;
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

//   console.log(textareaValue)


  const addPromptToPromptSequence = async (textareaValue) => {
    try {
        const response = await fetch(`/api/prompt-sequence/${promptSequenceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promptSequenceId: promptSequenceId,
                prompt: textareaValue,
            })
        });
  
        if(response.ok) {
          const modifiedPromptSequence = await response.json()
          const newPrompt = modifiedPromptSequence.prompts.pop()
          setPostPromptsState((prevPrompts) => [...prevPrompts, newPrompt])
        } 
        else {
          throw new Error('Failed to add prompt to prompt sequence');
        }
        
    } catch (error) {
        console.error(error);
        return null;
    }
  };


  const promptIndex = postState.prompts.findIndex(item => item._id === promptId);

  console.log(promptIndex)


  return (
    <>

        <Card shadow={false} padding="md" radius="md" withBorder w='100%' p={12}>

          {/* <Flex direction='column' gap={8}>

            <Flex justify="space-between" align='flex-start' gap={8}>
              <Text size="lg" fw={600}>
                Prompt #{post.prompts.length + 1}
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
             
              <Button variant='outline' onClick={handleAddPromptClick}>Add</Button>
            </Flex>

          </Flex> */}

          <CreatePromptForm 
          postState={postState}
          postPromptsState={postPromptsState}
          setPostPromptsState={setPostPromptsState}
          promptId={promptId}
          promptIndex={promptIndex}
          addPromptToPromptSequence={addPromptToPromptSequence}
          setIsCardVisible={setIsCardVisible}
        //   handleAddPromptClick={handleAddPromptClick}
          />
        </Card>
    </>
  )
}

export default PromptCardNew
