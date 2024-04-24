'use client'

import { useState, useEffect } from "react";
import { Modal, Loader, Grid, ThemeIcon, ActionIcon, Card, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image, Select } from '@mantine/core';
import { LeftNavDashboard } from "../../components/LeftNavDashboard/LeftNavDashboard"
import { LeftNavDashboardMob } from "@/components/LeftNavDashboardMob"
import FeedSeq from "@/components/FeedSeq"
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation';
import { useRouter, redirect } from 'next/navigation';

const Dashboard = () => {
  const { data: session, loading, status } = useSession();
  const [postsState, setPostsState] = useState([]);
  const [originalPostsState, setOriginalPostsState] = useState([]);
  const [workspaceState, setWorkspaceState] = useState([]);
  const [foldersState, setFoldersState] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const folderId = searchParams.get('f');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [leftNavBarActive, setLeftNavBarActive] = useState(false);
  const [openDrawerLeftNav, setOpenDrawerLeftNav] = useState(false);

  // console.log(folderId)
  // console.log(session?.user.id)

  const [postState, setPostState] = useState({
    promptSequenceId: '',
    promptSequenceTitle: '',
    prompts: [],
    tags: [],
  });


  // console.log(session?.user.id)
  // console.log(workspaceState[0]?._id)
  // console.log(workspaceState[0]?.folders)

  const fetchPosts = async (workspaceState) => {
    const workspaceLastIndex = workspaceState.length - 1
    // const response = await fetch(`/api/users/${session?.user.id}/promptsequences`);
    const response = await fetch(`/api/users/${session?.user.id}/promptsequences?workspace=${workspaceState[0]?._id}`);
    // const response = await fetch(`/api/users/${session?.user.id}/promptsequences?workspace=${workspaceState[workspaceLastIndex]?._id}`);
    // const response = await fetch(`/api/users/${session?.user.id}/promptsequences?workspace=66056f5502fec460b5a4aeeb`);
    const data = await response.json();
    // setPosts(data);
    setPostsState(data);
  };

  const fetchWorkspaces = async () => {
    if (workspaceState.length === 0) {
      const response = await fetch(`/api/users/${session?.user.id}/workspaces`);
      const data = await response.json();
      setWorkspaceState(data);
      setFoldersState(data[data.length - 1]?.folders)
    }
  };

  const fetchPostsByFolderId = async (folderId) => {
    if (!postsState.length || postsState[0].folderId !== folderId) {
      const response = await fetch(`/api/users/${session?.user.id}/promptsequences?f=${folderId}`);
      const data = await response.json();
      // setPosts(data);
      setPostsState(data);
      setOriginalPostsState(data)
    }
  };

  const closeLeftNavBar = () => {
    // setLeftNavBarActive(false);
    setOpenDrawerLeftNav(false)
    // setTagsInputValue([])
  };



  // const getWorkspaceDetails = async () => {
  //   const response = await fetch(`/api/workspace/${folderId}`)
  //   const data = await response.json();
  //   setWorkspaceState(data)
  // }


  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/sign-in');
  //   }
  // }, [status]);


  // useEffect(() => {
  //   if (session?.user.id) {
  //     try {
  //       fetchWorkspaces()
  //         // getWorkspaceDetails()
  //         .then(() => {
  //           // fetchPosts(workspaceState);
  //           fetchPostsByFolderId(folderId);
  //           setIsLoading(false);
  //         });
  //     } catch (error) {
  //       console.error('Error fetching prompts sequences:', error);
  //     }
  //   }
  // }, [session?.user.id, folderId]);


  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/sign-in');
  //     if (session?.user.id) {
  //       try {
  //         fetchWorkspaces()
  //           // getWorkspaceDetails()
  //           .then(() => {
  //             // fetchPosts(workspaceState);
  //             fetchPostsByFolderId(folderId);
  //             setIsLoading(false);
  //           });
  //         if (workspaceState?.length === 0) {
  //           router.push('/onboarding')
  //         }
  //       } catch (error) {
  //         console.error('Error fetching prompts sequences:', error);
  //       }
  //     }
  //   }
  // // }, [session?.user.id, folderId]);
  // }, []);

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/sign-in');
  //     return;
  //   }
  //   if (session?.user.id) {
  //     try {
  //       fetchWorkspaces()
  //         .then(() => {
  //           fetchPostsByFolderId(folderId);
  //           setIsLoading(false);
  //         });
  //       // if (workspaceState?.length === 0) {
  //       //   router.push('/onboarding')
  //       // }
  //     } catch (error) {
  //       console.error('Error fetching prompts sequences:', error);
  //     }
  //   }
  // }, [session?.user.id, folderId, status]);


  useEffect(() => {
    const handleAuthAndData = async () => {
      if (status === 'unauthenticated') {
        router.push('/sign-in');
        return; // Exit the function if unauthenticated
      }

      try {
        const response = await fetch(`/api/users/${session?.user.id}/workspaces`);
        const data = await response.json();
        setWorkspaceState(data);
        setFoldersState(data[data.length - 1]?.folders); // Assuming folders from last workspace

        // Fetch posts after setting workspace and folder data
        if (data.length !== 0) {
          fetchPostsByFolderId(folderId);
          // ... handle posts data (set state or perform actions)
        } else {
          router.push('/onboarding')
        }
        setIsLoading(false); // Set loading state to false after data processing
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    handleAuthAndData();

  }, [session?.user.id, folderId, status]);





  const workspaceLastIndex = workspaceState.length - 1

  // console.log(workspaceLastIndex)
  // console.log(foldersState)
  // console.log(workspaceState)

  return (
    <>
      {isLoading &&
        <Flex justify='center' mt={36}>
          <Loader color="blue" type="bars" size='sm' />
        </Flex>
      }
        <Drawer hiddenFrom="sm" opened={openDrawerLeftNav} size="lg" onClose={closeLeftNavBar} zIndex='1000' radius="md" position="left">
          <LeftNavDashboardMob
            // postsState={postsState}
            workspace={workspaceState}
            folderId={folderId}
            foldersState={foldersState}
            setFoldersState={setFoldersState}
            leftNavBarActive={leftNavBarActive}
            setLeftNavBarActive={setLeftNavBarActive}
          />
        </Drawer>
      {!isLoading && session && (
        <Container fluid style={{ height: 'auto' }}>
          <Grid>
            <Grid.Col span={2} py={0} mx={0} visibleFrom="sm">
              {/* <Grid.Col span={2.5}> */}
              <LeftNavDashboard
                // postsState={postsState}
                workspace={workspaceState}
                folderId={folderId}
                foldersState={foldersState}
                setFoldersState={setFoldersState}
                leftNavBarActive={leftNavBarActive}
                setLeftNavBarActive={setLeftNavBarActive}
              />
            </Grid.Col>


            {/* <Grid.Col span={9.5} p={0} mb={20} mt={10}> */}
            <Grid.Col span={{ base: 12, sm: 12, md: 10, lg: 10 }}>
              <FeedSeq
                type='Create'
                postState={postState}
                setPostState={setPostState}
                postsState={postsState}
                setPostsState={setPostsState}
                // setTagsInputValue={setTagsInputValue}
                submitting={submitting}
                workspace={workspaceState}
                folderId={folderId}
                originalPostsState={originalPostsState}
                setOriginalPostsState={setOriginalPostsState}
                leftNavBarActive={leftNavBarActive}
                setLeftNavBarActive={setLeftNavBarActive}
                openDrawerLeftNav={openDrawerLeftNav}
                setOpenDrawerLeftNav={setOpenDrawerLeftNav}
              />
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default Dashboard
