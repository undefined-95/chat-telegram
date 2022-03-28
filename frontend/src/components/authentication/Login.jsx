import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  toast,
  useToast,
  VStack,
} from '@chakra-ui/react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);


  const toast = useToast();
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleGuest = (e) => {
    setEmail('guest@mail.ru');
    setPassword('12345678');
  };

  const handleClick = () => setShow(!show);
  const submitHandler = async (submitHandler) => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Пожалуйста заполните все поля',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
    try{
        const config = {
            headers:{
                "Content-type": "application/json"
            },
        };
        const {data} = await axios.post(
            "http://localhost:5000/user/login",
            {email, password},
            config
        );
        console.log(data)
        toast({
            title: "Авторизация выполнена",
            status: "success",
            duration:5000,
            isClosable:true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
    }catch (e) {
        toast({
            title:"Произошла ошибка",
            description: e.response.data.message,
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom"
        })
        setLoading(false)
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Почта</FormLabel>
        <Input
          value={email}
          placeholder="Введите эл. адрес"
          onChange={handleEmail}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Пароль</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? 'text' : 'password'}
            placeholder="Введите пароль"
            onChange={handlePassword}
          />
          <InputRightElement width="4.5rem">
            <Button border="5rem" h="1.rem" size="sm" onClick={handleClick}>
              {show ? 'скрыть' : 'показать'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Войти
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleGuest}
      >
        Получить учетные данные гостевого пользователя
      </Button>
    </VStack>
  );
}

export default Login;
