import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Notify from 'simple-notify'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
    const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');

    useEffect(() => {
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
    }, [firstName, lastName, username, email]);

    function isEmail(emailAdress){
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
      if (emailAdress.match(regex)) 
        return true; 
    
      else 
        return false; 
    }

    function handleRegister() {
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      console.log(username);
      console.log(email);
      console.log(password);
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('username');
      localStorage.removeItem('email');

      if(username === '' || email === '' || password === '') {
        new Notify({
          text:  "Please fill in all fields",
          status: "warning",
          effect: 'slide',
          speed: 300,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          position: 'x-center',
  
        });

        return;
      }

      const validEmail = isEmail(email);

      if(!validEmail) {
        new Notify({
          text:  "Please enter a valid email address",
          status: "error",
          effect: 'slide',
          speed: 300,
          showIcon: true,
          showCloseButton: false,
          autoclose: true,
          position: 'x-center',
  
        });
      }

      const data = fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          role: 'user'
        })
      }).then(response => {
        if(response.status === 201) {
          new Notify({
            text:  "User registered successfully",
            status: "success",
            effect: 'slide',
            speed: 300,
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            position: 'x-center',
            });
            navigate('/login');
        } else if(response.status === 400) {
          new Notify({
            text:  "User already exists",
            status: "error",
            effect: 'slide',
            speed: 300,
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            position: 'x-center',
            });
        }
      }).catch(error => {
        console.error('Error:', error);
      });

    }

    return (
      <Flex
        minH={'0vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>

        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={14}>
            <Stack spacing={6}>
              <HStack> 
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={lastName} onChange={e => setLastName(e.target.value)}  />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="username" isRequired>
                <FormLabel>User Name</FormLabel>
                <Input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  onClick={handleRegister}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} href="http://localhost:3000/login">Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}

export default Register;