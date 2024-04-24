'use client'

import { TextInput, Flex, Grid, CreatableSelect, Button, Code, UnstyledButton, Badge, Text, Group, ActionIcon, Tooltip, rem } from '@mantine/core';
import { IconBulb, IconUser, IconCheckbox, IconSearch, IconPlus } from '@tabler/icons-react';
//   import { UserButton } from '../UserButton/UserButton';
import classes from './LeftNavPromptSeq.module.css';
import { useState, useEffect } from 'react';
import EditableText from '@/components/EditableText'
import { useRouter, useSearchParams } from 'next/navigation';
import EditPromptSequenceForm from '@/components/EditPromptSequenceForm/EditPromptSequenceForm'

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
];

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
];



const LeftNavPromptSeq = ({ postState, postsState, tagsInputValue, setTagsInputValue }) => {


  const searchParams = useSearchParams();
  const promptSequenceId = searchParams.get('id');


  const [isEditing, setIsEditing] = useState('')


  const [editText, setEditText] = useState('');

  //   console.log(posts)

  // const [post, setPost] = useState({
  //     promptSequenceTitle: '',
  //     prompts: [],
  //     tags: [],
  // });

  // useEffect(() => {
  //     const getPromptSequenceDetails = async () => {
  //         const response = await fetch(`/api/prompt-sequence/${promptSequenceId}`)
  //         const data = await response.json();

  //         setPost({
  //             promptSequenceTitle: data.promptSequenceTitle,
  //             tags: data.tags,
  //             prompts: data.prompts
  //         })
  //     }

  //     if (promptSequenceId) getPromptSequenceDetails();

  //     setEditText(post.promptSequenceTitle)

  // }, [post.promptSequenceTitle])

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{collection.emoji}</span>{' '}
      {collection.label}
    </a>
  ));


  // console.log(editText)
  // console.log(post.promptSequenceTitle)
  // console.log(post.tags)

  const handleDoubleClick = () => {
    setIsEditing(true);
  };


  const editPromptSequence = async (promptSequenceTitleTextareaValue) => {
    console.log(promptSequenceTitleTextareaValue)
    try {
      const response = await fetch(`/api/prompt-sequence/${promptSequenceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //   promptSequenceId: promptSequenceId,
          promptSequenceTitle: promptSequenceTitleTextareaValue,
          tags: tagsInputValue,
          //   prompt: textareaValue,
          //   promptNumber: promptNumber
          // promptSequenceTitle: post.promptSequenceTitle,
          // tags: post.tags
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add prompt to prompt sequence');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  return (
    <nav className={classes.navbar}>


      <EditPromptSequenceForm
        postState={postState}
        promptSequenceId={promptSequenceId}
        editPromptSequence={editPromptSequence}
        promptSequenceTitle={postState.promptSequenceTitle}
        promptSequenceTags={postState.tags}
        postsState={postsState}
        tagsInputValue={tagsInputValue}
        setTagsInputValue={setTagsInputValue}
      />
    </nav>
  );
}

export default LeftNavPromptSeq