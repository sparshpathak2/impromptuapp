'use client'

import { useState, useEffect } from "react";
import { StepperComponent } from "@/components/StepperComponent"
import { Container, TextInput, Flex, Menu, Code, UnstyledButton, Badge, Text, Group, ActionIcon, Tooltip, rem } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'

export default function Onboarding() {

  const { data: session, loading, status } = useSession();
  const router = useRouter();
  const [workspaceState, setWorkspaceState] = useState([]);

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/sign-in');
  //   }
  // }, [status]);


  // useEffect(() => {
  //   const fetchWorkspaces = async () => {
  //     const response = await fetch(`/api/users/${session?.user.id}/workspaces`);
  //     const data = await response.json();
  //     setWorkspaceState(data);
  //   };

  //   if (session) {
  //     fetchWorkspaces();
  //   }
  // }, [session]);


  useEffect(() => {
    const handleAuthAndWorkspaces = async () => {
      if (status === 'unauthenticated') {
        router.push('/sign-in');
        return; // Exit the function if unauthenticated
      }
  
      if(session?.user.id) {

      
      const response = await fetch(`/api/users/${session?.user.id}/workspaces`);
      const data = await response.json();
      setWorkspaceState(data);

      if (data.length !== 0) {
        const folderId = data[0]?.folders[0]?._id; // Extract folder ID (assuming first workspace and folder)
        if (folderId) {
          // const posts = await fetchPostsByFolderId(folderId);
          // ... handle posts data (set state or perform actions)
          router.push(`/dashboard?f=${folderId}`);
        } else {
          console.log("No default folder found in workspace");
        }
        // setIsLoading(false); // Set loading state to false after data processing
      } else {
        router.push('/onboarding'); // Redirect to onboarding if no workspaces
      }
    }
    };
  
    handleAuthAndWorkspaces();
  
  }, [session, status]);

  // console.log(workspaceState[0]?.folders[0]?._id)
  // console.log(workspaceState)

  return (
    <>
      <Container my={56} size='xs'>
        <StepperComponent />
      </Container>
    </>
  )
}
