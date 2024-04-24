'use client'

import { Button, Title, Flex, Text } from '@mantine/core';
import { IconChevronDown, IconArrowRight, IconPencil, IconTrash, IconSettings } from '@tabler/icons-react';
import Image from "next/image";
// import hero_image from '../../public/hero-image.png';
import heroImage from '@/public/banner-image.png';
import '../styles/globals.css'


export default function Home() {
  return (
    <>
      <Flex
        className='main-flex'
      >
        <Flex direction='column' gap={20}  ml='4vw' w='100%' mt='24vh'>
          {/* <Text fz={48} mr='auto' fw={800} c='#383838' lh='56px'>The Only Tool You Need To Manage All Your AI Prompts</Text> */}
          <Title order={1} fz={48} fw={800} mr='auto' c='#383838' lh='56px'>The Only Tool You Need To Manage All Your<br /><span className='gradientText'>AI Prompts</span></Title>
            <Text fz={18}>Storing, Managing and Sharing Prompts was never been easier!</Text>
            <Button
              component='a'
              href='/sign-in'
              variant="gradient"
              gradient={{ from: 'red', to: 'blue', deg: 90 }}
              // w='auto'
              mr='auto'
              rightSection={<IconArrowRight size={14} />}
            >
              Get Started for Free
            </Button>
        </Flex>
        <Image
          width={750}
          height={650}
          src={heroImage}
          alt='This is banner image'
        />
        {/* <div className="rings-container">
          <div className="ring ring-1">
            <div className="ring ring-2">
              <div className="ring ring-3">
                <Image
                  width={1400}
                  height={700}
                  src={heroImage}
                  alt='This is banner image'
                />
              </div>
            </div>
          </div>
        </div> */}

      </Flex>
    </>
  );
}
