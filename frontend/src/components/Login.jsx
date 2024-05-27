import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';

import Notify from 'simple-notify'
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import BlogContext from '../store/blog-context';

function Login() {

    const navigate = useNavigate();
    const {isLoggedIn,setIsLoggedIn} = useContext(BlogContext);

    useEffect(() => {
      if (isLoggedIn) {
          navigate('/');
      }
    }, [isLoggedIn, navigate]);

    async function handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email);

        if(email === '' || password === '') {
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

        await fetch("http://localhost:8000/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials: "include",
          body:JSON.stringify({
            email,
            password
          })
        }).then(response=>{
          if(response.status === 404){
            new Notify({
              text:  "User not exists",
              status: "error",
              effect: 'slide',
              speed: 300,
              showIcon: true,
              showCloseButton: true,
              autoclose: true,
              position: 'x-center',
            });  
          }
          else if(response.status === 400){
            new Notify({
              text:  "Invalid credentials",
              status: "error",
              effect: 'slide',
              speed: 300,
              showIcon: true,
              showCloseButton: true,
              autoclose: true,
              position: 'x-center',
            });
          }
          else if(response.status === 200){
            new Notify({
              text:  "Logged in successfully",
              status: "success",
              effect: 'slide',
              speed: 300,
              showIcon: true,
              showCloseButton: true,
              autoclose: true,
              position: 'x-center',
            });
            setIsLoggedIn(true);
            response.json().then(data => {
              console.log(data.token);
              navigate("/");
          });
          }
        });
        
        return;
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  onClick={handleLogin}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}

export default Login;

