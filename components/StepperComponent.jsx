'use client'

import { useState } from 'react';
import { IconHelp, IconSelector, IconBulb, IconUser, IconCheckbox, IconSearch, IconPlus, IconInfoCircle, IconArrowRight } from '@tabler/icons-react';
import { Stepper, Button, Group, Flex, Grid, TextInput, Tooltip, ActionIcon, rem } from '@mantine/core';
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export function StepperComponent() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [workspaceTextInputValue, setWorkspaceTextInputValue] = useState('')
  const [spaceTextInputValue, setSpaceTextInputValue] = useState('')
  const { data: session } = useSession();
  const router = useRouter();
  // const [submitting, setSubmitting] = useState(false);

  // console.log(workspaceTextInputValue)
  // console.log(spaceTextInputValue)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspace,
          space,
        }),
      });

      if (response.ok) {
        console.log('Prompt Sequence created successfully!');
        // Redirect or show success message
      } else {
        console.error('Failed to create Prompt Sequence.');
        // Handle error (show error message, retry, etc.)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error or other issues
    }


    try {
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          space,
          space,
        }),
      });

      if (response.ok) {
        console.log('Prompt Sequence created successfully!');
        // Redirect or show success message
      } else {
        console.error('Failed to create Prompt Sequence.');
        // Handle error (show error message, retry, etc.)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error or other issues
    }
  };


  const handleAddWorkspace = async (e) => {
    e.preventDefault();
    console.log(spaceTextInputValue)

    console.log([spaceTextInputValue])

    try {
      const response = await fetch('/api/workspace/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: workspaceTextInputValue,
          createdBy: session?.user.id,
          // spaces: [{ name: spaceTextInputValue }],
          // folders: [spaceTextInputValue],
          // folders: updatedFolders
          folders: [{ folder: spaceTextInputValue }]
        }),
      });

      if (response.ok) {
        console.log('Workspace with space created successfully!');
        const newWorkspace = await response.json();
        // router.push('/dashboard')
        router.push(`/dashboard?f=${newWorkspace?.folders[0]?._id}`)
      } else {
        console.error('Failed to create workspace with space.');
        // Handle error (show error message, retry, etc.)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error or other issues
    }

  }

  return (
    <>
    {/* <form onSubmit={handleAddWorkspace}> */}
    
      <Stepper visibleFrom='sm' active={active} onStepClick={setActive}>
      {/* <form> */}
        {/* STEP 1 */}
        <Stepper.Step label="Create Workspace">
          
            <Flex direction='column' gap={16} my={56} align='center'>

              <Flex justify='center' gap={8} align='center' direction='column'>
                <span style={{ fontSize: '24px', fontWeight: '600' }}>Give Your Workspace a Name</span>
                <span style={{ fontSize: '14px', color: 'f1f1f1', fontStyle: 'italic', textAlign: 'center' }}>This is going to be your company workspace that may have multiple projects</span>
              </Flex>

              <Flex justify='center'>
                <TextInput
                  style={{ width: '360px' }}
                  size='md'
                  value={workspaceTextInputValue}
                  onChange={(e) => setWorkspaceTextInputValue(e.target.value)}
                  // onChange={(e) => setPost({ ...post, promptSequenceTitle: e.target.value })}
                  required
                />
              </Flex>


              {/* <Flex justify='flex-end'>
                <Button
                  type="submit"
                  // href='/'
                  disabled={submitting}
                  onClick={() => setOpened(false)}
                >
                  {submitting ? `${type}...` : type}
                </Button>
              </Flex> */}
            </Flex>
          

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next step</Button>
            {/* <Button onClick={handleWorkspace}>Next step</Button> */}
          </Group>

        </Stepper.Step>

        {/* STEP 2 */}
        <Stepper.Step label="Create Space">

       
            <Flex direction='column' gap={16} my={56}>

              <Flex justify='center' gap={8} align='center' direction='column'>
                <span style={{ fontSize: '24px', fontWeight: '600' }}>Give Your First Space a Name</span>
                <span style={{ fontSize: '14px', color: 'f1f1f1', fontStyle: 'italic', textAlign: 'center' }}>The space can be a project, vertical, domain, etc. inside your company</span>
              </Flex>

              <Flex justify='center'>
                <TextInput
                  style={{ width: '360px' }}
                  size='md'
                  value={spaceTextInputValue}
                  // onChange={(e) => setUpdatedSpaces((prevSpaces) => [...prevSpaces, e.target.value.trim()])}
                  onChange={(e) => setSpaceTextInputValue(e.target.value)}
                  // onChange={handleSpaceChange}
                  required
                />
              </Flex>
            </Flex>
          

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group>

        </Stepper.Step>

        {/* FINAL STEP */}
        <Stepper.Completed>
          <Flex justify='center' gap={16} my={56}>
            <span style={{ fontSize: '24px', fontWeight: '600' }}>Create your 1st Prompt Sequence</span>
          </Flex>
          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            <Button type='submit' onClick={handleAddWorkspace} rightSection={<IconArrowRight size={14} />}>Go to Dashboard</Button>
          </Group>
        </Stepper.Completed>

        {/* </form> */}
      </Stepper>

      <Stepper hiddenFrom='sm' active={active} onStepClick={setActive} orientation="vertical">
      {/* <form> */}
        {/* STEP 1 */}
        <Stepper.Step label="Create Workspace" description="A workspace is your company dashboard">
          
            <Flex direction='column' gap={16} my={56} align='center'>

              <Flex justify='center' gap={8} align='center' direction='column'>
                <span style={{ fontSize: '24px', fontWeight: '600' }}>Give Your Workspace a Name</span>
                {/* <span style={{ fontSize: '14px', color: 'f1f1f1', fontStyle: 'italic', textAlign: 'center' }}>This is going to be your company workspace that may have multiple projects</span> */}
              </Flex>

              <Flex justify='center'>
                <TextInput
                  style={{ width: '360px' }}
                  size='md'
                  value={workspaceTextInputValue}
                  onChange={(e) => setWorkspaceTextInputValue(e.target.value)}
                  // onChange={(e) => setPost({ ...post, promptSequenceTitle: e.target.value })}
                  required
                />
              </Flex>


              {/* <Flex justify='flex-end'>
                <Button
                  type="submit"
                  // href='/'
                  disabled={submitting}
                  onClick={() => setOpened(false)}
                >
                  {submitting ? `${type}...` : type}
                </Button>
              </Flex> */}
            </Flex>
          

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next step</Button>
            {/* <Button onClick={handleWorkspace}>Next step</Button> */}
          </Group>

        </Stepper.Step>

        {/* STEP 2 */}
        <Stepper.Step label="Create Space" description="A space can be a project, vertical, domain, etc.">

       
            <Flex direction='column' gap={16} my={56}>

              <Flex justify='center' gap={8} align='center' direction='column'>
                <span style={{ fontSize: '24px', fontWeight: '600' }}>Give Your First Space a Name</span>
                {/* <span style={{ fontSize: '14px', color: 'f1f1f1', fontStyle: 'italic', textAlign: 'center' }}>The space can be a project, vertical, domain, etc. inside your company</span> */}
              </Flex>

              <Flex justify='center'>
                <TextInput
                  style={{ width: '360px' }}
                  size='md'
                  value={spaceTextInputValue}
                  // onChange={(e) => setUpdatedSpaces((prevSpaces) => [...prevSpaces, e.target.value.trim()])}
                  onChange={(e) => setSpaceTextInputValue(e.target.value)}
                  // onChange={handleSpaceChange}
                  required
                />
              </Flex>
            </Flex>
          

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group>

        </Stepper.Step>

        {/* FINAL STEP */}
        <Stepper.Completed>
          <Flex justify='center' gap={16} my={56}>
            <span style={{ fontSize: '24px', fontWeight: '600' }}>Create your 1st Prompt Sequence</span>
          </Flex>
          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            <Button type='submit' onClick={handleAddWorkspace} rightSection={<IconArrowRight size={14} />}>Go to Dashboard</Button>
          </Group>
        </Stepper.Completed>

        {/* </form> */}
      </Stepper>
      


      {/* <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </>
  );
}