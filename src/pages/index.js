import Head from 'next/head'
import Image from 'next/image'
import { Link, Box } from '@chakra-ui/react'
//import { ExternalLinkIcon } from '@chakra-ui/icons'
//import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Box margin="5"> 
      <h1>Hello World!</h1>
      <Link href="/clients" marginY="5">Clients</Link>
    </Box>
  )
}
