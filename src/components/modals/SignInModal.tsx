'use client'

import { BsDiscord, BsGoogle, BsGithub } from 'react-icons/bs'
import { signIn } from 'next-auth/react'
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function SignInModal({ text }: { text: string }) {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Button variant="filled" size="md" radius="md" onClick={open}>
                {text}
            </Button>
            <Modal
                opened={opened}
                onClose={close}
                title="Sign In"
                size="xl"
                centered
            >
                <div className="flex flex-col">
                    <p className="py-4">
                        Please sign in using an authentication provider below.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            variant="filled"
                            size="md"
                            radius="md"
                            color="gray"
                            onClick={() => signIn('github')}
                        >
                            <BsGithub className="mr-2" /> Sign in with GitHub
                        </Button>
                        <Button
                            variant="filled"
                            size="md"
                            radius="md"
                            color="yellow"
                            onClick={() => signIn('google')}
                        >
                            <BsGoogle className="mr-2" /> Sign in with Google
                        </Button>
                        <Button
                            variant="filled"
                            size="md"
                            radius="md"
                            color="indigo"
                            onClick={() => signIn('discord')}
                        >
                            <BsDiscord className="mr-2" /> Sign in with Discord
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
