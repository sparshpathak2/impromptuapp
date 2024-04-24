"use client"

import { Modal, ThemeIcon, ActionIcon, Card, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import { useState } from "react";
import { useSession } from "next-auth/react";
// import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import EditPromptForm from '@/components/EditPromptForm/EditPromptForm'
import { IconPencil, IconCopy, IconCheck, IconDotsVertical, IconArrowUpRight, IconCalendar, IconCalendarEvent, IconCircleCheck, IconCircleDashed, IconCreditCard, IconDots, IconDownload, IconHeart, IconMapPin, IconPoint, IconPointFilled, IconRoad, IconStarFilled, IconUserHeart, IconUsers } from '@tabler/icons-react';

const PromptCard = ({ postState, setPostState, postPromptsState, setPostPromptsState, promptId, getPromptSequenceDetails, updatedPost, setUpdatedPost, handleTagClick, handleEdit, handleDelete, prompt, promptNumber, promptSequenceId }) => {
  const [copied, setCopied] = useState("");
  const [isSaveVisible, setIsSaveVisible] = useState("");

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const promptIndex = postPromptsState.findIndex(item => item._id === promptId);

  const handleSaveToggle = () => {
    setIsSaveVisible(true);
  }

  // console.log(postState)
  // console.log(postPromptsState)

  const editPromptInPromptSequence = async (textareaValue) => {

    setUpdatedPost(textareaValue)
    console.log(updatedPost)

    try {
      const response = await fetch(`/api/prompt-sequence/${promptSequenceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          promptSequenceId: promptSequenceId,
          prompt: textareaValue,
          promptId: promptId
        })
      });

      if (response.ok) {
        const editedPromptSequence = await response.json();
        console.log('editedPromptSequence: ' , editedPromptSequence);
        setPostPromptsState(editedPromptSequence.prompts)
      } else {
        throw new Error('Failed to create prompt sequence');
      }

      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error(error);
      return null;
    }

  };


  const deletePromptInPromptSequence = async (promptId) => {

    // setUpdatedPost("changed")

    try {

      const response = await fetch(`/api/prompt-sequence/${promptSequenceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'deletePrompt',
          promptId: promptId
        })
      })

      if (response.ok) {
        const modifiedPromptSequence = await response.json();
        if (modifiedPromptSequence.prompts) {
          setPostPromptsState(modifiedPromptSequence.prompts);
        }
      } else {
        throw new Error('Failed to delete prompt from prompt sequence');
      }
    }


    catch (error) {
      console.log(error)
    }
  };

  return (
    <>

      <Card shadow={false} padding="md" radius="md" withBorder w='100%' p={12}>
        {/* <Card.Section>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
              width={240}
            />
          </Card.Section> */}

        {/* <Group justify="space-between" align='flex-start' mt="md" mb="xs" style={{ height: '56px', overflow: 'hidden' }}>
            <ClippedText text={post.prompt} maxLength={56} />
            <Badge color="pink">On Sale</Badge>
            <ActionIcon variant="outline">
              <IconPencil size={18} stroke={1.5} />
            </ActionIcon>
          </Group> */}


        <EditPromptForm
          prompt={prompt}
          postPromptsState={postPromptsState}
          setPostPromptsState={setPostPromptsState}
          promptNumber={promptNumber}
          promptId={promptId}
          promptIndex={promptIndex}
          editPromptInPromptSequence={editPromptInPromptSequence}
          deletePromptInPromptSequence={deletePromptInPromptSequence}
          getPromptSequenceDetails={getPromptSequenceDetails}
        />

        {/* <Button color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button> */}
      </Card>
    </>
  )
}

export default PromptCard
