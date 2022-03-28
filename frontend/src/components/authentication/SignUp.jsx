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
  VStack,
  useToast,
} from '@chakra-ui/react';

function SignUp() {
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleConfirm = (e) => {
    setConfirmpassword(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  // const handlePic = (e) => {
  //   setPic(e.target.files[0]);
  // };
  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Пожалуйста выберите изображение',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'shiyshaniy');
      fetch('https://api.cloudinary.com/v1_1/shiyshaniy/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: 'Пожалуйста выберите изображение',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Пожалуйста заполните все поля',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
    if (password !== confirmpassword) {
      toast({
        title: 'Пароль не совпадает',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/user',
        { name, email, password, pic },
        config
      );
      toast({
        title: 'Регистрация успешно завершена',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');
    } catch (e) {
      toast({
        title: 'Произошла ошибка',
        description: e.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Имя</FormLabel>
        <Input value={name} placeholder="Введите имя" onChange={handleName} />
      </FormControl>
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
      <FormControl id="password" isRequired>
        <FormLabel>Повторный ввод пароля</FormLabel>
        <InputGroup>
          <Input
            value={confirmpassword}
            type={show ? 'text' : 'password'}
            placeholder="Повторный ввод пароля"
            onChange={handleConfirm}
          />
          <InputRightElement width="4.5rem">
            <Button border="5rem" h="1.rem" size="sm" onClick={handleClick}>
              {show ? 'скрыть' : 'показать'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Загрузите свою фотографию</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Зарегистрироваться
      </Button>
    </VStack>
  );
}

export default SignUp;
