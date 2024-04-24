import { Title, Box, TextInput, Button, Menu, Group, Center, Burger, Container, Flex, Text, Drawer, Stack, NavLink, Avatar, Textarea, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
// import Link from 'next/link';

const CreatepromptForm = ({ type, post, setPost, submitting, handleSubmit }) => {

  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <>
      <Flex
        maw='50%'
        direction='column'
        justify="center"
        my='md'
      >
        <form onSubmit={handleSubmit}>
          <Flex
            direction='column'
            gap='sm'
          >
            {/* <Checkbox
              mt="md"
              label="I agree to sell my privacy"
              {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            /> */}

            <Textarea
              placeholder="Enter Your Prompt Here"
              label="Prompt"
              autosize
              minRows={4}
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              required
            />

            <TextInput
              withAsterisk
              label="Add Prompt Tags"
              placeholder="#tagname"
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              required
              // {...form.getInputProps('prompt')}
            />


            <Group justify="flex-end" mt="md">
              {/* <Link href="/" className="text-gray-500 text-sm">
                Cancel
              </Link> */}
              <Anchor href="/">
                Cancel
              </Anchor>
            

              <Button
                type="submit"
                href='/'
                disabled={submitting}
              >
                {submitting ? `${type}...` : type}
              </Button>

            </Group>
          </Flex>
        </form>
      </Flex>
    </>
  )
}

export default CreatepromptForm
