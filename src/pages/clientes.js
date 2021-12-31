
import React, { useState } from 'react'
import { 
    Flex,
    Box,
    Text,
    Button,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    FormErrorMessage
} from '@chakra-ui/react'
import { InputForm } from '../components/input'

export default function Clientes() {

    const [clients, setClients] = useState([])

    const [isFormOpen, setIsFormOpen] = useState(false)

    const [id, setId] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    //console.log({name})

    const [errors, setErrors] = useState({name: null, email: null})

    console.log({errors})

    const isValidFormData = () => {
        if(!name) {
            setErrors({name: 'Name is required'})
            return false
        }
    
        if(!email) {
            setErrors({email: 'Email is required'})
            return false
        }

        if(clients.some(client => client.email === email && client._id !== id)) {
            setErrors({email: "Email already in use"})
            return
        }

        setErrors({})
        return true
    }

    const handleSubmitCreateClient = (e) => {
        e.preventDefault()
       // console.log({name, email})
       
       if(!isValidFormData()) return

       setClients(clients.concat({_id: new Date().getMilliseconds().toString(), name, email}))

       setName('')
       setEmail('')
       toggleFormState()
    }

    const handleSubmitUpdateClient = (e) => {
        e.preventDefault()
       // console.log({name, email})
       
       if(!isValidFormData()) return

       setClients(clients.map(client => client._id === id ? {name, email, _id: id} : client))

       setName('')
       setEmail('')
       setId(null)
       toggleFormState()
    }

    const handleDeleteClient = (_id) => {
        setClients(clients.filter(client => client._id !== _id))
    }

    const handleChangeName = (text) => {
        // console.log({text})
        setName(text)
    }

    const handleChangeEmail = (text) => {
        // console.log({text})
        setEmail(text)
    }

    const handleShowUpdateClientForm = (client) => {
       setId(client._id)
       setName(client.name)
       setEmail(client.email)
       setIsFormOpen(true)
    }

    const toggleFormState = () => {
        setIsFormOpen(!isFormOpen)
    }

    return(
        <Box margin="5">
            <Flex color="white" justifyContent="space-between" >
            <Text color="black" fontSize="2xl">Lista de Clientes</Text>
            <Button colorScheme='pink' size='lg' onClick={toggleFormState} >{isFormOpen ? '-' : '+'}</Button>
        </Flex>
        
        { isFormOpen && (
            <VStack marginY="1rem" as="form" onSubmit={id ? handleSubmitUpdateClient : handleSubmitCreateClient}>

            <InputForm 
            label="Nome" 
            name="name" 
            type="text" 
            value={name} 
            onChange={e => handleChangeName(e.target.value)}
            error={errors.name}
            />
    
            <InputForm 
            label="E-mail" 
            name="email" 
            type="email" 
            value={email} 
            onChange={e => handleChangeEmail(e.target.value)}
            error={errors.email}
            />
    
                <Button colorScheme='gray' size='md' alignSelf="flex-end" type="submit">{id? 'Atualizar' : 'Cadastrar' }</Button>
            </VStack>
        )}

    <Table variant='simple' my='10'>

    <Thead bgColor="blue.500">
        <Tr>
        <Th textColor="white">Nome</Th>
        <Th textColor="white">E-mail</Th>
        <Th textColor="white">Actions</Th>
        </Tr>
    </Thead>
    
    <Tbody>
        {clients.map(client => 
            <Tr key={client.email}>
            <Td>{client.name}</Td>
            <Td>{client.email}</Td>
            <Td>
                <Flex justifyContent="space-between">
                <Button colorScheme='yellow' size='sm' fontSize="smaller" alignSelf="flex-end" mr="2" onClick={() => handleShowUpdateClientForm(client)}>Editar</Button>
                <Button colorScheme='pink' size='sm' fontSize="smaller" alignSelf="flex-end" onClick={() => handleDeleteClient(client._id)}>Remover</Button>
                </Flex>
            </Td>
            </Tr>
        )}
    </Tbody>
    
    </Table>

    </Box>
    )
}