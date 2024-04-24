'use client'

import { useState, useEffect } from "react";
import PromptSeqCard from "./PromptSeqCard";
import { Card, Affix, Grid, Divider, ActionIcon, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import { IconArrowsSort, IconFilter, IconDots, IconSearch, IconPencil, IconTrash, IconBaselineDensityMedium } from "@tabler/icons-react";
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
// import CreatepromptForm from '@/components/CreatepromptForm'
import CreatePromptSeqForm from '@/components/CreatePromptSeqForm'
import CreatePromptSeqFormMobile from '@/components/CreatePromptSeqFormMobile'
import DrawerComponent from '@/components/DrawerComponent'
import { FiltersMultiSelect } from '@/components/FiltersMultiSelect'
import "@/styles/globals.css"
import classes from '@/styles/globals.css';



const PromptSeqCardList = ({ data, search, handleTagClick, openDrawer, tagsInputValue, setOpened, setPostState, setPostsState, setTagsInputValue, originalPostsState, setOriginalPostsState }) => {
  return (
    <>
      <Grid w='auto'>
        {data?.filter((post) => {
          return search.toLowerCase() === ''
            ? post
            : post.promptSequenceTitle.toLowerCase().includes(search);
        }).map((post) => (
          <Grid.Col
            key={post._id}
            span={{ base: 12, md: 4, lg: 3 }}
          >
            <PromptSeqCard
              key={post._id}
              promptSequenceId={post._id}
              post={post}
              setPostState={setPostState}
              setPostsState={setPostsState}
              handleTagClick={handleTagClick}
              openDrawer={openDrawer}
              setOpened={setOpened}
              postsState={data}
              setTagsInputValue={setTagsInputValue}
              tagsInputValue={tagsInputValue}
              originalPostsState={originalPostsState}
              setOriginalPostsState={setOriginalPostsState}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}

const FeedSeq = ({ postsState, workspace, setPostState, postState, setPostsState, setEnteredTags, folderId, originalPostsState, setOriginalPostsState, leftNavBarActive, setLeftNavBarActive, openDrawerLeftNav, setOpenDrawerLeftNav }) => {

  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [promptInputValue, setPromptInputValue] = useState('');
  const [tagsInputValue, setTagsInputValue] = useState('');
  const [filterTags, setFilterTags] = useState('');
  const [uniqueTagsState, setUniqueTagsState] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Manage drawer state with useState hook
  const [openedDrawerCreateSeq, setOpenedDrawerCreateSeq] = useState(false);

  // const allTags = originalPostsState.reduce((tags, sequence) => {
  //   return tags.concat(sequence.tags);
  // }, []);

  const allTags = postsState.reduce((tags, sequence) => {
    return tags.concat(sequence.tags);
  }, []);

  // Step 5: Remove duplicate tags to get unique tags
  const uniqueTags = [...new Set(allTags)];

  const filterPostsByTags = () => {

    // console.log('Filtering posts by tags:', filterTags);
    if (filterTags.length === 0) {
      setPostsState(originalPostsState); // If no tags selected, show all posts
      // setPostsState(postsState); // If no tags selected, show all posts
    } else {
      const filtered = originalPostsState.filter((post) =>
        filterTags.every((tag) => post.tags.includes(tag))
      );
      setPostsState(filtered);
    }
  };

  // Update filtered posts when selected tags change
  useEffect(() => {
    filterPostsByTags();
  }, [filterTags]);


  // useEffect(() => {
  //   const allTags = new Set(originalPostsState.reduce((acc, sequence) => [...acc, ...sequence.tags], []));
  //   setUniqueTagsState(Array.from(allTags));
  // }, [postsState]);

  const fetchTags = async () => {
    // if (!postsState.length || postsState[0].folderId !== folderId) {
    const response = await fetch(`/api/users/${session?.user.id}/tags?f=${folderId}`);
    const tagsData = await response.json();
    setUniqueTagsState(tagsData)
    // }
  };


  useEffect(() => {
    fetchTags();
  }, [postsState]);


  // console.log('UnitagsState:', uniqueTagsState)
  // console.log('Filtertags:', filterTags)
  // console.log('PostsState:', postsState)

  // Function to open the drawer
  const openDrawer = () => {
    setOpenedDrawerCreateSeq(true);
    setTagsInputValue([])
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setOpenedDrawerCreateSeq(false);
    setTagsInputValue([])
  };


  const handlePromptChange = (e) => {
    // e.preventDefault();
    setPromptInputValue(e.target.value);
  };


  const handleCreatePromptSequence = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // console.log(tagsInputValue)
    try {
      const response = await fetch('/api/prompt-sequence/new', {
        method: 'POST',
        body: JSON.stringify({
          // promptSequenceTitle: updatedPost.promptSequenceTitle,
          promptSequenceTitle: postState.promptSequenceTitle,
          // prompts: newPrompts,
          prompts: [{ prompt: promptInputValue }],
          createdBy: session?.user.id,
          tags: tagsInputValue,
          workspace: workspace[0]?._id,
          folder: folderId,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const newPost = await response.json();
        // console.log(newPost)
        setPostsState([...postsState, newPost]);
        setOriginalPostsState([...postsState, newPost])
        // setFilterTags([...filterTags, ...newPost.tags]);
        // setUniqueTagsState([...uniqueTagsState, ...newPost.tags]);
        // router.push('/');
      } else {
        throw new Error('Failed to create prompt sequence');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setTagsInputValue([])
    }
  }

  // console.log(session?.user.id)
  // console.log(search)

  return (
    <>
      <Flex direction='column' gap={16} my={16}>
        <Flex direction='column' gap={16} visibleFrom="sm">
          <Flex justify='space-between'>
            <Flex gap={8}>
              <Button visibleFrom="sm" variant="outline" radius='xl' size="xs" leftSection={<IconFilter size={14} />} onClick={() => setIsFiltersVisible(!isFiltersVisible)}>Filter</Button>
              {/* <Button hiddenFrom="sm" variant="outline" radius='xl' size="xs" leftSection={<IconArrowsSort size={14} />} onClick={() => setIsFiltersVisible(!isFiltersVisible)}></Button> */}
              {/* <ActionIcon hiddenFrom="sm" variant="outline" onClick={() => setOpenDrawerLeftNav(!openDrawerLeftNav)}> */}
              <ActionIcon hiddenFrom="sm" variant="outline" onClick={() => setOpenDrawerLeftNav(true)}>
                <IconBaselineDensityMedium style={{ width: '55%', height: '55%' }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon hiddenFrom="sm" variant="outline" radius="xl" onClick={() => setIsFiltersVisible(!isFiltersVisible)}>
                <IconFilter style={{ width: '55%', height: '55%' }} stroke={1.5} />
              </ActionIcon>
              {/* <Button variant="outline" radius='xl' size="xs" leftSection={<IconFilter size={14} />}>Sort</Button> */}
              <TextInput
                leftSectionPointerEvents="none"
                leftSection={<IconSearch style={{ width: '16px', height: '16px' }} />}
                // w='60%'
                size="xs"
                radius='xl'
                placeholder="Search by title"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Flex>

            <Button visibleFrom="sm" onClick={openDrawer} size="xs">Add Sequence</Button>
            <Button hiddenFrom="sm" onClick={openDrawer} size="xs">Add</Button>

            <Drawer visibleFrom="sm" opened={openedDrawerCreateSeq} size="lg" onClose={closeDrawer} zIndex='1000' offset={8} radius="md" position="right">
              <CreatePromptSeqForm
                type='Create'
                postState={postState}
                postsState={postsState}
                setPostState={setPostState}
                submitting={submitting}
                handleCreatePromptSequence={handleCreatePromptSequence}
                handlePromptChange={handlePromptChange}
                setTagsInputValue={setTagsInputValue}
                tagsInputValue={tagsInputValue}
                setOpenedDrawerCreateSeq={setOpenedDrawerCreateSeq}
                uniqueTags={uniqueTags}
              />
            </Drawer>

            <Drawer hiddenFrom="sm" opened={openedDrawerCreateSeq} onClose={closeDrawer} zIndex='1000' radius="md" position="right">
              <CreatePromptSeqFormMobile
                type='Create'
                postState={postState}
                postsState={postsState}
                setPostState={setPostState}
                submitting={submitting}
                handleCreatePromptSequence={handleCreatePromptSequence}
                handlePromptChange={handlePromptChange}
                setTagsInputValue={setTagsInputValue}
                tagsInputValue={tagsInputValue}
                setOpenedDrawerCreateSeq={setOpenedDrawerCreateSeq}
                uniqueTags={uniqueTags}
              />
            </Drawer>
          </Flex>
          <Divider />
        </Flex>


        <Flex direction='column' hiddenFrom="sm" gap={12} styles={{ position: 'fixed', top: '120px' }}>

          <Flex justify='space-between'>

            <Flex gap={8}>
              <Button visibleFrom="sm" variant="outline" radius='xl' size="xs" leftSection={<IconFilter size={14} />} onClick={() => setIsFiltersVisible(!isFiltersVisible)}>Filter</Button>
              {/* <Button hiddenFrom="sm" variant="outline" radius='xl' size="xs" leftSection={<IconArrowsSort size={14} />} onClick={() => setIsFiltersVisible(!isFiltersVisible)}></Button> */}
              {/* <ActionIcon hiddenFrom="sm" variant="outline" onClick={() => setOpenDrawerLeftNav(!openDrawerLeftNav)}> */}
              <ActionIcon hiddenFrom="sm" variant="outline" onClick={() => setOpenDrawerLeftNav(true)}>
                <IconBaselineDensityMedium style={{ width: '55%', height: '55%' }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon hiddenFrom="sm" variant="outline" radius="xl" onClick={() => setIsFiltersVisible(!isFiltersVisible)}>
                <IconFilter style={{ width: '55%', height: '55%' }} stroke={1.5} />
              </ActionIcon>
              {/* <Button variant="outline" radius='xl' size="xs" leftSection={<IconFilter size={14} />}>Sort</Button> */}
              <TextInput
                leftSectionPointerEvents="none"
                leftSection={<IconSearch style={{ width: '16px', height: '16px' }} />}
                // w='60%'
                size="xs"
                radius='xl'
                placeholder="Search by title"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Flex>



            <Button visibleFrom="sm" onClick={openDrawer} size="xs">Add Sequence</Button>
            <Button hiddenFrom="sm" onClick={openDrawer} size="xs">Add</Button>

            <Drawer visibleFrom="sm" opened={openedDrawerCreateSeq} size="lg" onClose={closeDrawer} zIndex='1000' offset={8} radius="md" position="right">
              <CreatePromptSeqForm
                type='Create'
                postState={postState}
                postsState={postsState}
                setPostState={setPostState}
                submitting={submitting}
                handleCreatePromptSequence={handleCreatePromptSequence}
                handlePromptChange={handlePromptChange}
                setTagsInputValue={setTagsInputValue}
                tagsInputValue={tagsInputValue}
                setOpenedDrawerCreateSeq={setOpenedDrawerCreateSeq}
                uniqueTags={uniqueTags}
              />
            </Drawer>

            <Drawer hiddenFrom="sm" opened={openedDrawerCreateSeq} onClose={closeDrawer} zIndex='1000' radius="md" position="right">
              <CreatePromptSeqFormMobile
                type='Create'
                postState={postState}
                postsState={postsState}
                setPostState={setPostState}
                submitting={submitting}
                handleCreatePromptSequence={handleCreatePromptSequence}
                handlePromptChange={handlePromptChange}
                setTagsInputValue={setTagsInputValue}
                tagsInputValue={tagsInputValue}
                setOpenedDrawerCreateSeq={setOpenedDrawerCreateSeq}
                uniqueTags={uniqueTags}
              />
            </Drawer>


          </Flex>

          <Divider />
        </Flex>

        {isFiltersVisible && (
          <Flex align='center' gap={16}>
            <Text fz={14}>Filter by Tags</Text>
            <Menu shadow="sm" position="right-start" offset={12}>
              {/* <Menu.Target>
                <ActionIcon variant="transparent" size={18}>
                    <IconDots size={14} stroke={1.5} />
                </ActionIcon>
            </Menu.Target> */}
              <FiltersMultiSelect
                uniqueTags={uniqueTags}
                filterTags={filterTags}
                setFilterTags={setFilterTags}
                uniqueTagsState={uniqueTagsState}
              />
              <Menu.Dropdown>
                {/* <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={() => setOpenedDrawerEditSeq(true)}> */}
                {/* <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={() => openEditCollectionModal({itemId: item._id})}> */}
                <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14}>
                  Edit Collection
                </Menu.Item>
                {/* <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={handleEditCollectionClick({itemId: item._id})}>
                                Edit Collection
                            </Menu.Item> */}
                <Menu.Item color="red" leftSection={<IconTrash size={14} />} py={4} px={8} fz={14}>
                  Delete Collection
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        )}

        <PromptSeqCardList
          data={postsState}
          handleTagClick={() => { }}
          openDrawer={openDrawer}
          setOpenedDrawerCreateSeq={setOpenedDrawerCreateSeq}
          setPostState={setPostState}
          setPostsState={setPostsState}
          submitting={submitting}
          // setSelectedTagCategory={setSelectedTagCategory}
          setEnteredTags={setEnteredTags}
          handleCreatePromptSequence={handleCreatePromptSequence}
          handlePromptChange={handlePromptChange}
          setTagsInputValue={setTagsInputValue}
          closeDrawer={closeDrawer}
          openedDrawerCreateSeq={openedDrawerCreateSeq}
          tagsInputValue={tagsInputValue}
          search={search}
          originalPostsState={originalPostsState}
          setOriginalPostsState={setOriginalPostsState}
        />
      </Flex>
    </>
  )
}


export default FeedSeq
