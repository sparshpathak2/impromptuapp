"use client"

import { Modal, ActionIcon, Card, Badge, Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor, Image } from '@mantine/core';
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDisclosure } from '@mantine/hooks';
// import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IconExclamationCircle, IconStack2, IconPencil, IconDotsVertical, IconTrash, IconSettings, IconDirection, IconCircleDashed, IconCreditCard, IconDots, IconDownload, IconHeart, IconMapPin, IconPoint, IconPointFilled, IconRoad, IconStarFilled, IconUserHeart, IconUsers } from '@tabler/icons-react';
import DrawerComponent from '@/components/DrawerComponent';
import EditPromptSeqForm from '@/components/EditPromptSeqForm'

const PromptSeqCard = ({ post, postsState, setPostState, setPostsState, formSubmit, handlePromptChange, setTagsInputValue, tagsInputValue, closeDrawer, openedDrawerCreateSeq, submitting, openDrawer, promptSequenceId, originalPostsState, setOriginalPostsState }) => {
  const [copied, setCopied] = useState("");

  const { data: session } = useSession();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  // State to manage visible tags and overflow
  const [visibleTags, setVisibleTags] = useState(post.tags);
  const [overflowCount, setOverflowCount] = useState(0);

  // Ref for the container that holds the tags
  const tagsContainerRef = useRef(null);


  const [openedDrawerEditSeq, setOpenedDrawerEditSeq] = useState(false);

  // Function to open the drawer
  const openDrawer2 = () => {
    setOpenedDrawerEditSeq(true);
  };

  // Function to close the drawer
  const closeDrawer2 = () => {
    setOpenedDrawerEditSeq(false);
  };

  // const handleCopy = () => {
  //   setCopied(post.prompt);
  //   navigator.clipboard.writeText(post.prompt);
  //   setTimeout(() => setCopied(""), 3000);
  // }

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

  // console.log(posts)

  useEffect(() => {
    const calculateVisibleTags = () => {
      const containerWidth = tagsContainerRef.current.offsetWidth;
      let totalWidth = 0;
      let visibleCount = 0;

      // This is a simplified calculation
      // You might need a more dynamic way to calculate each tag width
      // For example, by rendering them offscreen and measuring their sizes
      const averageTagWidth = 120; // Assume an average width for simplicity

      for (let i = 0; i < post.tags.length; i++) {
        totalWidth += averageTagWidth;
        if (totalWidth > containerWidth) break;
        visibleCount++;
      }

      setVisibleTags(post.tags.slice(0, visibleCount));
      setOverflowCount(post.tags.length - visibleCount);
    };

    // Calculate on mount and whenever post.tags changes
    calculateVisibleTags();

    // Optional: Recalculate when the window resizes
    window.addEventListener('resize', calculateVisibleTags);
    return () => window.removeEventListener('resize', calculateVisibleTags);
  }, [post.tags]);

  // console.log(`posts before delete: ${posts}`)

  const deletePromptSequence = async () => {

    try {
      await fetch(`/api/prompt-sequence/${promptSequenceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'deletePromptSequence',
        })
      })

      // const filteredPosts = posts.filter((p) => p._id !== post._id)
      const filteredPosts = postsState.filter((p) => p._id !== promptSequenceId)
      setPostsState(filteredPosts);
      setOriginalPostsState(filteredPosts)

    } catch (error) {
      console.log(error)
    }

    close();
  };




  return (
    <>
      {/* <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex justify-start items-center gap-3 cusrsor-pointer">
            <Image
              src={post.creator?.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator?.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator?.email}
              </p>
            </div>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
              }
              width={12}
              height={12}
            />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {post.prompt}
        </p>
        <p className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>

        {session?.user.id === post.creator?._id && pathName === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div> */}

      <Flex>
        <Card shadow="sm" padding="md" radius="md" withBorder w='100%'>
          <Card.Section>
            {/* <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
              width={240}
            /> */}
          </Card.Section>

          {/* <Group justify="space-between" align='flex-start' mt="md" mb="xs" style={{ height: '56px', overflow: 'hidden' }}>
            <ClippedText text={post.prompt} maxLength={56} />
            <Badge color="pink">On Sale</Badge>
            <ActionIcon variant="outline">
              <IconPencil size={18} stroke={1.5} />
            </ActionIcon>
          </Group> */}

          <Flex direction='column'>

            <Flex justify="space-between" align='flex-start' gap={8} mt="md" mb="xs" style={{ height: '50px', overflow: 'hidden' }}>
              <Anchor underline='never' c='black' href={`http://localhost:3000/prompt-sequence?id=${promptSequenceId}`}>
                <ClippedText text={post.promptSequenceTitle} maxLength={45} />
              </Anchor>
              {/* <Badge color="pink">On Sale</Badge> */}

              {/* <ActionIcon variant="default" onClick={openDrawer}>
                <IconPencil size={18} stroke={1.5} />
              </ActionIcon> */}


              <Menu shadow="sm" position="right-start" offset={4}>
                <Menu.Target>
                  <ActionIcon variant="default">
                    <IconDotsVertical size={18} stroke={1.5} />
                    {/* <IconDots size={18} stroke={1.5} /> */}
                    {/* <IconDirection size={18} stroke={1.5} /> */}
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  {/* <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={() => setOpenedDrawerEditSeq(true)}> */}
                  <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={openDrawer2}>
                    Edit Sequence
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={14} />} py={4} px={8} fz={14} onClick={open}>
                    Delete Sequence
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>


              <Modal opened={opened} onClose={close} yOffset="15vh" size="28%" withCloseButton={false}>
                <Flex direction='column' align='center' gap='16px' mt={16} mx={6}>
                  <Flex align='center' gap={8}>
                    {/* <ActionIcon variant="default" radius="xl" size="xl" color="red"> */}
                    <IconExclamationCircle size={48} stroke={1} color='red' />
                    {/* </ActionIcon> */}
                    {/* <Text size="lg" fw={500}>Caution</Text> */}
                  </Flex>
                  <Flex direction='column' gap={32} mb={6}>
                    <Text ta="center">Do you really want to delete this prompt? This can't be undone.</Text>
                    <Button color="red" variant='outline' onClick={deletePromptSequence}>Delete</Button>
                  </Flex>
                </Flex>
              </Modal>

            </Flex>


            <Drawer opened={openedDrawerEditSeq} size="lg" onClose={closeDrawer2} zIndex='1000' offset={8} radius="md" position="right">
              <EditPromptSeqForm
                // type='Create'
                post={post}
                promptSequenceTitle={post.promptSequenceTitle}
                postsState={postsState}
                // setPostState={setPostState}
                setPostsState={setPostsState}
                submitting={submitting}
                // setSelectedTagCategory={setSelectedTagCategory}
                // setEnteredTags={setEnteredTags}
                handleSubmit={formSubmit}
                handlePromptChange={handlePromptChange}
                // deletePromptSequence={deletePromptSequence}
                setTagsInputValue={setTagsInputValue}
                setOpenedDrawerEditSeq={setOpenedDrawerEditSeq}
                promptSequenceId={promptSequenceId}
                tagsInputValue={tagsInputValue}
                originalPostsState={originalPostsState}
                setOriginalPostsState={setOriginalPostsState}
              />
            </Drawer>

            <Badge leftSection={<IconStack2 size={14} />} mb={10} p={4} variant='light' radius="xs">
              {post.prompts.length}
            </Badge>
            {/* <Text>{promptSequenceId}</Text> */}
            {/* <Text size="sm" c="dimmed" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.prompt}
          </Text> */}

            {/* <Flex direction='row' gap={16} align='center'>
              <Flex gap={8} direction='column'>
                <Text>
                  Tool
                </Text>
                <Text>
                  Vertical
                </Text>
              </Flex>
              <Flex gap={12} direction='column' justify='space-between'>
                <Badge>
                  Chatgpt
                </Badge>
                <Badge>
                  Marketing
                </Badge>
              </Flex>
            </Flex> */}

            {/* <Flex direction='row' gap={8} wrap="wrap">
              {post.tags?.map((tag) => (
                <Badge>
                  {tag}
                </Badge>
              ))}
            </Flex> */}
            <Flex ref={tagsContainerRef} gap={4}>
              {visibleTags.map((tag, index) => (
                <Badge key={index}>
                  <span style={{ textTransform: 'none' }}>{tag}</span>
                </Badge>
              ))}
              {overflowCount > 0 && <Badge>+{overflowCount}</Badge>}
            </Flex>


          </Flex>
          {/* <ClippedText text={post.prompt} maxLength={50} /> */}

          {/* <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button> */}
        </Card>
      </Flex>
    </>
  )
}

export default PromptSeqCard
