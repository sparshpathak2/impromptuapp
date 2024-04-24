'use client'
import LeftNavPromptSeq from "@/components/LeftNavPromptSeq/LeftNavPromptSeq"
import FeedPrompts from '@/components/FeedPrompts/FeedPrompts'
import { ThemeIcon, ActionIcon, Card, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PromptSequence = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const promptSequenceId = searchParams.get('id');
  const [tagsInputValue, setTagsInputValue] = useState('');

  // console.log(promptSequenceId)

  const [submitting, setSubmitting] = useState(false);
  const [postsState, setPostsState] = useState([])
  const [postState, setPostState] = useState({
    promptSequenceTitle: '',
    prompts: [],
    tags: [],
  });
  const [postPromptsState, setPostPromptsState] = useState([])

  const [updatedPost, setUpdatedPost] = useState();

  const prevPromptSequenceIdRef = useRef(promptSequenceId);
  // const prevPostRef = useRef(post);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt-sequence');
    const data = await response.json();
    setPostsState(data);
  };

  const getPromptSequenceDetails = async () => {
    const response = await fetch(`/api/prompt-sequence/${promptSequenceId}`)
    const data = await response.json();

    setPostState({
      promptSequenceTitle: data.promptSequenceTitle,
      tags: data.tags,
      prompts: data.prompts
    })

    setPostPromptsState(data.prompts)

    // setUpdatedPost(post)
  }

  // useEffect(() => {
  //   if (promptSequenceId) {
  //     getPromptSequenceDetails();

  //     // fetchPosts()
  //   }
  //   // getPromptSequenceDetails();

  //   fetchPosts()
  //     console.log("UE has run")

  // }, [updatedPost])

  useEffect(() => {
    if (promptSequenceId) {
      getPromptSequenceDetails();

      // fetchPosts()
    }
    // getPromptSequenceDetails();

    fetchPosts()
      console.log("UE has run")

  }, [promptSequenceId])


  console.log(postState)
  console.log(postPromptsState)


  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptSequenceId) return alert('Prompt ID not found')

    try {
      const repsonse = await fetch(`/api/prompt/${promptSequenceId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          promptSequenceTitle: post.promptSequenceTitle,
          tags: post.tags,
          prompts: post.prompts
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
      <Flex w='auto' style={{
        background: `
          radial-gradient(
            circle,
            rgba(0, 0, 0, 0.05) 5%,
            transparent 16%
          ),
          radial-gradient(
            circle,
            rgba(0, 0, 0, 0.05) 5%,
            transparent 16%
          )
        `,
        backgroundSize: '12px 12px', // Adjust as needed
      }}>
        {/* <LeftNavPromptSeq
          postState={postState}
          postsState={postsState}
          tagsInputValue={tagsInputValue}
          setTagsInputValue={setTagsInputValue}
        /> */}
        <Container>
          <FeedPrompts
            postState={postState}
            postPromptsState={postPromptsState}
            setPostPromptsState={setPostPromptsState}
            promptSequenceId={promptSequenceId}
            getPromptSequenceDetails={getPromptSequenceDetails}
            setUpdatedPost={setUpdatedPost}
            updatedPost={updatedPost}
            setPostState={setPostState}
          />
        </Container>
      </Flex>
    </>
  )
}

export default PromptSequence
