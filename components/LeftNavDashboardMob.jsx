'use client'

import React from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { sx, Modal, Grid, Container, TextInput, Flex, Menu, Button, UnstyledButton, Badge, Text, Group, ActionIcon, Tooltip, rem, Anchor } from '@mantine/core';
import { IconDots, IconExclamationCircle, IconBulb, IconUser, IconCheckbox, IconSearch, IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import classes from '@/components/LeftNavDashboard/LeftNavDashboard.module.css';

const links = [
    { icon: IconBulb, label: 'Activity', notifications: 3 },
    { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
    { icon: IconUser, label: 'Contacts' },
];

function CreateCollectionModal({ handleCreateCollection, closeCreateCollectionModal, modalCreateCollectionOpened }) {
    // const [opened, { open, close }] = useDisclosure(false);
    const [inputValue, setInputValue] = useState('');

    const handleCreateClick = () => {
        handleCreateCollection(inputValue);
        closeCreateCollectionModal();
    };

    return (
        <>
            <Modal opened={modalCreateCollectionOpened} onClose={closeCreateCollectionModal} yOffset="15vh" size="100%" title="Create a Collection" zIndex='2000'>
                <Flex direction='column' align='center' gap='16px'>
                    <Flex align='center' gap={8}>
                        {/* <ActionIcon variant="default" radius="xl" size="xl" color="red"> */}
                        {/* <IconExclamationCircle size={48} stroke={1} color='red' /> */}
                        {/* </ActionIcon> */}
                        {/* <Text size="lg" fw={500}>Caution</Text> */}
                    </Flex>
                    <Text fz={14} fs='italic'>A collection can be a project, vertical, domain, etc. inside your company</Text>
                    <Flex w='100%' gap={8}>
                        <form style={{ width: '100%' }}>
                            <Flex gap={16} direction='column'>
                                <TextInput
                                    label="Collection Name"
                                    // onChange={(e) => setFolderName(e.target.value)}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Flex direction='row' gap={16} justify='flex-end' w='100%'>
                                    {/* <Text ta="center">Do you really want to delete this prompt? This can't be undone.</Text> */}
                                    <Button variant='outline' onClick={closeCreateCollectionModal}>Cancel</Button>
                                    {/* <Button variant='filled' onClick={handleUpdateCollection}>Create</Button> */}
                                    <Button variant='filled' onClick={handleCreateClick}>Create</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </Flex>
                </Flex>
            </Modal>

            {/* <Button onClick={open}>Open First Modal</Button> */}
        </>
    );
}

function DeleteCollectionModal({ modalDeleteCollectionOpened, closeDeleteCollectionModal, handleDeleteCollection }) {

    const handleDeleteClick = () => {
        handleDeleteCollection();
        closeDeleteCollectionModal();
    };


    return (
        <>
            <Modal opened={modalDeleteCollectionOpened} onClose={closeDeleteCollectionModal} yOffset="15vh" size="100%" withCloseButton={false} zIndex='2000'>
                <Flex direction='column' align='center' gap='16px' mt={16} mx={6}>
                    <Flex align='center' gap={8}>
                        {/* <ActionIcon variant="default" radius="xl" size="xl" color="red"> */}
                        <IconExclamationCircle size={48} stroke={1} color='red' />
                        {/* </ActionIcon> */}
                        {/* <Text size="lg" fw={500}>Caution</Text> */}
                    </Flex>
                    <Flex direction='column' gap={32} mb={6}>
                        <Text ta="center">Do you really want to delete this prompt? This can't be undone.</Text>
                        {/* <Button color="red" variant='outline' onClick={handleDeleteCollection}>Delete</Button> */}
                        <Button color="red" variant='outline' onClick={handleDeleteClick}>Delete</Button>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
}

function EditCollectionModal({ handleUpdateCollection, modalEditCollectionOpened, closeEditCollectionModal, foldersState, editingFolderId, editModalOpen }) {

    // console.log(editingFolderId.itemId)
    // const editingFolder = workspace[workspaceLastIndex]?.folders.find(folder => folder._id === editingFolderId.itemId)
    const editingFolder = foldersState?.find(folder => folder._id === editingFolderId.itemId)
    // console.log(editingFolder)
    const [inputValue, setInputValue] = useState('');

    // if (editingFolder) {
    //     const editingFolderName = editingFolder.folder; // Extract the folder name
    //     setFolderName(editingFolderName)
    //     // console.log('Folder Name:', folderName);
    //     // Now you can use the folderName variable as needed
    // } else {
    //     console.log('Folder not found in the workspace');
    // }


    React.useEffect(() => {
        if (editingFolder) {
            setInputValue(editingFolder.folder);
        }
    }, [editingFolder, editModalOpen]);

    const handleInputChange = (e) => {
        // e.preventDefault();
        console.log('Input value:', e.target.value); // Check if the input value is received
        // setFolderName(e.target.value); // Update folderName state
        // setFolderNewName(e.target.value)
        setInputValue(e.target.value)
    };

    const handleInputSave = () => {
        handleUpdateCollection(inputValue);
        closeEditCollectionModal();
    };

    return (
        <>
            <Modal opened={modalEditCollectionOpened} onClose={closeEditCollectionModal} yOffset="15vh" size="100%" title="Edit Collection" zIndex='2000'>
                <Flex direction='column' align='center' gap='16px'>
                    <Flex align='center' gap={8}>
                        {/* <ActionIcon variant="default" radius="xl" size="xl" color="red"> */}
                        {/* <IconExclamationCircle size={48} stroke={1} color='red' /> */}
                        {/* </ActionIcon> */}
                        {/* <Text size="lg" fw={500}>Caution</Text> */}
                    </Flex>
                    {/* <Text fz={14} fs='italic'>A collection can be a project, vertical, domain, etc. inside your company</Text> */}
                    <Flex w='100%' gap={8}>
                        <form style={{ width: '100%' }}>
                            <Flex gap={16} direction='column'>
                                <TextInput
                                    label="Collection Name"
                                    // value={folderName}
                                    value={inputValue}
                                    // value={folderNewName}
                                    // onChange={(e) => setFolderName(e.target.value)}
                                    // onChange={(e) => setFolderNewName(e.target.value)}
                                    onChange={handleInputChange}
                                />
                                <Flex direction='row' gap={16} justify='flex-end' w='100%'>
                                    {/* <Text ta="center">Do you really want to delete this prompt? This can't be undone.</Text> */}
                                    <Button variant='outline' onClick={closeEditCollectionModal}>Cancel</Button>
                                    {/* <Button variant='filled' onClick={handleUpdateCollection}>Save</Button> */}
                                    <Button variant='filled' onClick={handleInputSave}>Save</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
}

export function LeftNavDashboardMob({ workspace, folderId, foldersState, setFoldersState }) {

    const router = useRouter();
    const [activeCollection, setActiveCollection] = useState(folderId);
    const [folderName, setFolderName] = useState('')
    const [folderNewName, setFolderNewName] = useState('')
    const [editingFolderId, setEditingFolderId] = useState('')
    const [editModalOpen, setEditModalOpen] = useState(true)
    const [createModalOpen, setCreateModalOpen] = useState(true)

    const workspaceLastIndex = workspace.length - 1

    const [modalCreateCollectionOpened, setModalCreateCollectionOpened] = useState(false);

    const openCreateCollectionModal = () => {
        setModalCreateCollectionOpened(true);
    };

    const closeCreateCollectionModal = () => {
        setModalCreateCollectionOpened(false);
        setCreateModalOpen(!createModalOpen)
    };

    const [modalEditCollectionOpened, setModalEditCollectionOpened] = useState(false);

    const openEditCollectionModal = (itemId) => {
        setModalEditCollectionOpened(true);
        setEditingFolderId(itemId)
    };

    const closeEditCollectionModal = () => {
        setModalEditCollectionOpened(false);
        setEditModalOpen(!editModalOpen)
    };

    const [modalDeleteCollectionOpened, setModalDeleteCollectionOpened] = useState(false);

    const openDeleteCollectionModal = (itemId) => {
        setModalDeleteCollectionOpened(true);
        setEditingFolderId(itemId)
    };

    const closeDeleteCollectionModal = () => {
        setModalDeleteCollectionOpened(false);
        setEditModalOpen(!editModalOpen)
    };

    const mainLinks = links.map((link) => (
        // <UnstyledButton key={link.label} className={classes.mainLink}>
        //     <div className={classes.mainLinkInner}>
        //         <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        //         <span>{link.label}</span>
        //     </div>
        //     {link.notifications && (
        //         <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
        //             {link.notifications}
        //         </Badge>
        //     )}
        // </UnstyledButton>

        //     <UnstyledButton key={link.label} className={classes.mainLink}>
        //     <div className={classes.mainLinkInner}>
        //         <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        //         <span>{link.label}</span>
        //     </div>
        //     {link.notifications && (
        //         <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
        //             {link.notifications}
        //         </Badge>
        //     )}
        // </UnstyledButton>

        <Menu className={classes.mainLink} width="target">
            <Menu.Target>
                {/* <Button>Toggle menu</Button> */}

                <UnstyledButton>
                    <Flex gap={8} w='100%'>
                        <Badge radius="sm" variant="light">S</Badge>
                        <Text size="sm">User's Workspace</Text>
                    </Flex>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown w='auto'>
                {/* <Menu.Label>Application</Menu.Label> */}
                <Menu.Item leftSection={<IconBulb style={{ width: rem(14), height: rem(14) }} />}>
                    <Text size='sm' >Settings</Text>
                </Menu.Item>
                <Menu.Item leftSection={<IconBulb style={{ width: rem(14), height: rem(14) }} />}>
                    <Text size='sm' >Settings</Text>
                </Menu.Item>
                <Menu.Item leftSection={<IconBulb style={{ width: rem(14), height: rem(14) }} />}>
                    <Text size='sm' >Settings</Text>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    ));

    const handleCreateCollection = async (inputValue) => {

        const routerPush = (newFolder) => {
            setActiveCollection(newFolder?._id)
            router.push(`/dashboard?f=${newFolder?._id}`);
        }

        try {
            const response = await fetch(`/api/workspace/${workspace[workspaceLastIndex]?._id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    // folderId: editingFolderId,
                    folderName: inputValue,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            if (response.ok) {
                const updatedWorkspace = await response.json();
                const newFolder = updatedWorkspace?.folders?.pop();
                setFoldersState(prevState => {
                    return [...prevState, newFolder];
                });
                routerPush(newFolder)
            }

        } catch (error) {
            console.log(error);
        } finally {
            // setSubmitting(false);
        }
    }

    const handleUpdateCollection = async (inputValue) => {

        const routerPush = () => {
            // setActiveCollection("660cf8dc54fd774c2acab14c")
            setActiveCollection(`${foldersState[0]._id}`)
            // router.push('/dashboard?f=660cf8dc54fd774c2acab14c');
            router.push(`/dashboard?f=${foldersState[0]._id}`);
        }

        try {
            const response = await fetch(`/api/workspace/${workspace[workspaceLastIndex]?._id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    folderId: editingFolderId,
                    folderName: inputValue,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // if (response.ok) {
            //     const updatedWorkspace = await response.json();
            //     // const updatedFolder = updatedWorkspace?.folders.pop()
            //     const updatedFolder = updatedWorkspace?.folders?.find(folder => folder._id === editingFolderId);
            //     setFoldersState(prevState => {
            //         const index = prevState.findIndex(folder => folder._id === updatedFolder?._id);
            //         // const index = prevState.findIndex(folder => folder._id === editingFolderId);
            //         if (index !== -1) {
            //             // Update the existing folder
            //             prevState[index] = updatedFolder;
            //             return [...prevState];
            //         } else {
            //             // Add the new folder
            //             return [...prevState, updatedFolder];
            //         }
            //     });
            //     router.push('/dashboard?f=660cf8dc54fd774c2acab14c');
            // }


            if (response.ok) {
                const updatedWorkspace = await response.json();

                let updatedFolder;

                // Check if a folder exists with editingFolderId
                const existingFolderIndex = updatedWorkspace?.folders?.findIndex(folder => folder._id === editingFolderId.itemId);
                if (existingFolderIndex !== -1) {
                    // Folder exists, get the updated folder using find
                    updatedFolder = updatedWorkspace.folders.find(folder => folder._id === editingFolderId.itemId);
                } else {
                    // No folder found with editingFolderId, get the last index folder using pop
                    updatedFolder = updatedWorkspace.folders.pop();
                }

                setFoldersState(prevState => {
                    const index = prevState.findIndex(folder => folder._id === updatedFolder._id);
                    if (index !== -1) {
                        // Update the existing folder
                        prevState[index] = updatedFolder;
                        return [...prevState];
                    } else {
                        // Add the new folder if it doesn't exist
                        return [...prevState, updatedFolder];
                    }
                });
                // routerPush();
                // const prevToEditingFolderIndex = existingFolderIndex - 1
                // const prevToExistingFolder = updatedWorkspace?.folders?.find(folder => folder._id === (prevToEditingFolderIndex));
                // // setActiveCollection(`${foldersState[0]._id}`)
                // setActiveCollection(`${prevToExistingFolder?._id}`)
                // router.push(`/dashboard?f=${prevToExistingFolder?._id}`);
            }

            // if (response.ok) {
            //     const updatedWorkspace = await response.json();
            //     console.log('Editing fodler id:', editingFolderId); 
            //     console.log('Updated Workspace:', updatedWorkspace); 

            //     // Check if editingFolderId matches any folder ID in updatedWorkspace
            //     const updatedFolder = updatedWorkspace?.folders?.find(folder => folder._id === editingFolderId.itemId);
            //     // const updatedFolder = updatedWorkspace?.folders?.find(folder => folder._id === "6614112d61b8353e3928efa2");
            //     console.log('Updated Folder:', updatedFolder);


            //     setFoldersState(prevState => {
            //         const index = prevState.findIndex(folder => folder._id === editingFolderId.itemId);
            //         if (index !== -1 && updatedFolder) {
            //             // Update the existing folder
            //             prevState[index] = updatedFolder;
            //         } else {
            //             // Add the new folder
            //             prevState.push(updatedWorkspace.folders[updatedWorkspace.folders.length - 1]);
            //         }
            //         return [...prevState];
            //     });

            //     router.push('/dashboard?f=660cf8dc54fd774c2acab14c');
            // }


        } catch (error) {
            console.log(error);
        } finally {
            // setSubmitting(false);
        }
    }

    const handleDeleteCollection = async () => {

        const routerPush = () => {
            if (activeCollection === editingFolderId.itemId) {
                setActiveCollection(`${foldersState[0]._id}`)
                router.push(`/dashboard?f=${foldersState[0]._id}`);
            }
        }

        try {
            const response = await fetch(`/api/workspace/${workspace[workspaceLastIndex]?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    folderId: editingFolderId,
                })
            })

            if (response.ok) {
                const filteredFolders = foldersState.filter((f) => f?._id !== editingFolderId.itemId)
                setFoldersState(filteredFolders);
                routerPush()
                // router.push('/dashboard?f=660cf8dc54fd774c2acab14c');
            } else {
                throw new Error('Failed to create prompt sequence');
            }

            // if (response.ok) {
            //     setFoldersState(prevFoldersState => {
            //         const filteredFolders = prevFoldersState.filter(f => f.folder._id !== editingFolderId);
            //         return filteredFolders;
            //     });
            //     router.push('/dashboard?f=660cf8dc54fd774c2acab14c');
            // } else {
            //     throw new Error('Failed to create prompt sequence');
            // }

        } catch (error) {
            console.log(error)
        }
    }

    // console.log(foldersState)

    // <div
    //     className={`${classes.collectionLink} ${activeCollection === item?._id ? classes.activeCollection : ''}`}
    // >
    //     <Grid justify="space-between" align="center">
    //         <Grid.Col span={10}>
    //             <Anchor
    //                 underline="never"
    //                 fz={14}
    //                 c='#000000'
    //                 href={`http://localhost:3000/dashboard?f=${item?._id}`}
    //                 // key={collection.label}
    //                 onClick={() => setActiveCollection(item._id)}
    //             >
    //                 <Flex align='center' justify='space-between'>
    //                     <Flex align='center'>
    //                         <Badge radius="sm" variant="light" px={6} mr={rem(9)} w={24}>{item?.folder[0]}</Badge>
    //                         {item?.folder}
    //                     </Flex>
    //                 </Flex>
    //             </Anchor>
    //         </Grid.Col>
    //         <Grid.Col span={2}>
    //             <Menu shadow="sm" position="right-start" offset={12}>
    //                 <Menu.Target>
    //                     <ActionIcon variant="transparent" size={18}>
    //                         <IconDots size={14} stroke={1.5} />
    //                     </ActionIcon>
    //                 </Menu.Target>
    //                 <Menu.Dropdown>
    //                     <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={() => openEditCollectionModal({ itemId: item._id })}>
    //                         Edit Collection
    //                     </Menu.Item>
    //                     <Menu.Item color="red" leftSection={<IconTrash size={14} />} py={4} px={8} fz={14} onClick={() => openDeleteCollectionModal({ itemId: item._id })}>
    //                         Delete Collection
    //                     </Menu.Item>
    //                 </Menu.Dropdown>
    //             </Menu>
    //         </Grid.Col>
    //     </Grid>
    // </div>

    // const collectionLinks = workspace[workspaceLastIndex]?.folders?.map((item) => (
    const collectionLinks = foldersState?.map((item) => (
        <div
            className={`${classes.collectionLink} ${activeCollection === item?._id ? classes.activeCollection : ''}`}
        >
            <Grid>
                <Grid.Col span='11'>
                    <Anchor
                        underline="never"
                        fz={14}
                        c='#000000'
                        href={`http://localhost:3000/dashboard?f=${item?._id}`}
                        // key={collection.label}
                        onClick={() => setActiveCollection(item._id)}
                    // className={`${classes.collectionLink} ${activeCollection === item?._id ? classes.activeCollection : ''}`}
                    >
                        {/* <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{collection.emoji}</span>{' '} */}
                        <Flex align='center' justify='space-between'>
                            <Flex align='center'>
                                <Badge radius="sm" variant="light" px={6} mr={rem(9)} w={24}>{item?.folder[0]}</Badge>
                                {item?.folder}
                            </Flex>
                        </Flex>
                    </Anchor>
                </Grid.Col>
                <Grid.Col span='1'>
                    <Menu shadow="sm" position="right-start" offset={12} zIndex='2000'>
                        <Menu.Target>
                            <ActionIcon variant="transparent" size={18}>
                                <IconDots size={14} stroke={1.5} />
                                {/* <IconDots size={18} stroke={1.5} /> */}
                                {/* <IconDirection size={18} stroke={1.5} /> */}
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            {/* <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={() => setOpenedDrawerEditSeq(true)}> */}
                            {/* <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={() => openEditCollectionModal({itemId: item._id})}> */}
                            <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={() => openEditCollectionModal({ itemId: item._id })}>
                                Edit Collection
                            </Menu.Item>
                            {/* <Menu.Item leftSection={<IconPencil size={14} />} py={4} px={8} fz={14} onClick={handleEditCollectionClick({itemId: item._id})}>
                            Edit Collection
                        </Menu.Item> */}
                            <Menu.Item color="red" leftSection={<IconTrash size={14} />} py={4} px={8} fz={14} onClick={() => openDeleteCollectionModal({ itemId: item._id })}>
                                Delete Collection
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
            </Grid>
        </div>
    ));


    return (
        <>
            <Flex justify='space-between' align='center' mx={0} px={0}>

                <Text fw={500} c="dimmed">
                    Collections
                </Text>
                <Tooltip label="Create Collection" withArrow position="right">
                    {/* <ActionIcon variant="default" size={18} onClick={open}> */}
                    <ActionIcon variant="default" size={18} onClick={openCreateCollectionModal}>
                        <IconPlus style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Flex>
            <Flex my={8} direction='column' styles={{ border: '1px solid #dddddd' }}>{collectionLinks}</Flex>
            {/* <div>{collectionLinks}</div> */}
            <CreateCollectionModal
                setModalCreateCollectionOpened={setModalCreateCollectionOpened}
                modalCreateCollectionOpened={modalCreateCollectionOpened}
                closeCreateCollectionModal={closeCreateCollectionModal}
                setFolderName={setFolderName}
                handleCreateCollection={handleCreateCollection}
            />
            <DeleteCollectionModal
                handleDeleteCollection={handleDeleteCollection}
                modalDeleteCollectionOpened={modalDeleteCollectionOpened}
                closeDeleteCollectionModal={closeDeleteCollectionModal}
            />
            <EditCollectionModal
                modalEditCollectionOpened={modalEditCollectionOpened}
                closeEditCollectionModal={closeEditCollectionModal}
                editingFolderId={editingFolderId}
                handleUpdateCollection={handleUpdateCollection}
                folderName={folderName}
                setFolderName={setFolderName}
                workspace={workspace}
                workspaceLastIndex={workspaceLastIndex}
                setFolderNewName={setFolderNewName}
                folderNewName={folderNewName}
                editModalOpen={editModalOpen}
                setEditModalOpen={setEditModalOpen}
                foldersState={foldersState}
            />
        </>
    );
}