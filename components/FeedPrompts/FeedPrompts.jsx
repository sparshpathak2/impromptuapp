'use client'

import { useState, useEffect } from "react";
import { Grid } from '@mantine/core';
import PromptSeqCard from "../PromptSeqCard";
import { Affix, ActionIcon, Card, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import PromptCard from "@/components/PromptCard"
import PromptCardNew from "@/components/PromptCardNew"
import classes from './FeedPrompts.module.css';
import { IconPlus, IconListDetails } from '@tabler/icons-react';

const PromptCardList = ({ postPromptsState, setPostPromptsState, setPostState, getPromptSequenceDetails, setUpdatedPost, updatedPost, handleTagClick, postState, setIsCardVisible, isCardVisible, promptSequenceId }) => {
  return (
    <>
      <Container my="xl" size="1160px" mx={12} visibleFrom="sm">
        {/* <Flex justify="center"> */}
        <Grid w='540px' gutter={50} m={0}>
          {/* {postState.prompts?.map((item, index) => (
            <Grid.Col
              // key={item._id}
              key={item.promptNumber}
            >
              <PromptCard
                promptNumber={item.promptNumber}
                prompt={item.prompt}
                promptId={item._id}
                handleTagClick={handleTagClick}
                promptSequenceId={promptSequenceId}
                postState={postState}
                getPromptSequenceDetails={getPromptSequenceDetails}
                updatedPost={updatedPost}
                setUpdatedPost={setUpdatedPost}
                setPostState={setPostState}
              />
            </Grid.Col>
          ))} */}

          {postPromptsState?.map((item, index) => (
            <Grid.Col
              // key={item._id}
              key={item.promptNumber}
            >
              <PromptCard
                promptNumber={item.promptNumber}
                prompt={item.prompt}
                promptId={item._id}
                handleTagClick={handleTagClick}
                promptSequenceId={promptSequenceId}
                postState={postState}
                postPromptsState={postPromptsState}
                setPostPromptsState={setPostPromptsState}
                getPromptSequenceDetails={getPromptSequenceDetails}
                updatedPost={updatedPost}
                setUpdatedPost={setUpdatedPost}
                setPostState={setPostState}
              />
            </Grid.Col>
          ))}

          {isCardVisible && (
            <Grid.Col>
              <PromptCardNew
                postState={postState}
                postPromptsState={postPromptsState}
                setPostPromptsState={setPostPromptsState}
                // promptId={item._id}
                setIsCardVisible={setIsCardVisible}
                // promptNumber={item.promptNumber}
                // prompt={item.prompt}
                prompts={postState.prompts}
                promptSequenceId={promptSequenceId}
              // handleTagClick={handleTagClick}
              />
            </Grid.Col>
          )}

        </Grid>
        {/* </Flex> */}
      </Container>

      <Grid my={16} gutter={18} m={0} hiddenFrom="sm">
        {postPromptsState?.map((item, index) => (
          <Grid.Col
            // key={item._id}
            key={item.promptNumber}
          >
            <PromptCard
              promptNumber={item.promptNumber}
              prompt={item.prompt}
              promptId={item._id}
              handleTagClick={handleTagClick}
              promptSequenceId={promptSequenceId}
              postState={postState}
              postPromptsState={postPromptsState}
              setPostPromptsState={setPostPromptsState}
              getPromptSequenceDetails={getPromptSequenceDetails}
              updatedPost={updatedPost}
              setUpdatedPost={setUpdatedPost}
              setPostState={setPostState}
            />
          </Grid.Col>
        ))}

        {isCardVisible && (
          <Grid.Col>
            <PromptCardNew
              postState={postState}
              postPromptsState={postPromptsState}
              setPostPromptsState={setPostPromptsState}
              // promptId={item._id}
              setIsCardVisible={setIsCardVisible}
              // promptNumber={item.promptNumber}
              // prompt={item.prompt}
              prompts={postState.prompts}
              promptSequenceId={promptSequenceId}
            // handleTagClick={handleTagClick}
            />
          </Grid.Col>
        )}

      </Grid>
    </>
  )
}

// const addPromptToPromptSequence = async (promptSequenceId, prompt) => {
//   try {
//       const response = await fetch('/api/prompt-sequence', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//               promptSequenceId: promptSequenceId,
//               prompt: prompt
//           })
//       });

//       if (!response.ok) {
//           throw new Error('Failed to add prompt to prompt sequence');
//       }

//       const data = await response.json();
//       return data;
//   } catch (error) {
//       console.error(error);
//       return null;
//   }
// };


const FeedPrompts = ({ postState, setPostState, postPromptsState, setPostPromptsState, promptSequenceId, updatedPost, promptId, getPromptSequenceDetails, setUpdatedPost }) => {

  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleSearchChange = (e) => {

  }


  useEffect(() => {
    if (isCardVisible) {
      // Scroll to the bottom of the page when the card becomes visible
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isCardVisible]);

  return (
    <Flex direction="column" mb={56}>
      {/* <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a Tag or a Username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form> */}

      <PromptCardList
        postState={postState}
        handleTagClick={() => { }}
        setIsCardVisible={setIsCardVisible}
        isCardVisible={isCardVisible}
        promptSequenceId={promptSequenceId}
        getPromptSequenceDetails={getPromptSequenceDetails}
        setUpdatedPost={setUpdatedPost}
        updatedPost={updatedPost}
        setPostState={setPostState}
        postPromptsState={postPromptsState}
        setPostPromptsState={setPostPromptsState}
      />

      {!isCardVisible && (
        <Flex justify='center' visibleFrom="sm">
          <Button leftSection={<IconPlus size={14} />} onClick={() => setIsCardVisible(true)}>Add Prompt</Button>
        </Flex>
      )}

      {!isCardVisible && (
        <Affix position={{ bottom: 20, right: 16 }} hiddenFrom="sm">
          <Button leftSection={<IconPlus size={14} />} onClick={() => setIsCardVisible(true)}>Add Prompt</Button>
        </Affix>
      )}

      {/* {!isCardVisible && (
        <Affix position={{ bottom: 20, left: 16 }} hiddenFrom="sm">
          <ActionIcon size="lg" variant="filled" aria-label="Settings">
            <IconListDetails style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Affix>
      )} */}

    </Flex>
  )
}

export default FeedPrompts
