import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [pic, setPic] = useState();

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
  const handlePic = (e) => {
    setPic(e.target.files[0]);
  };
  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {};
  const submitHandler = (submitHandler) => {};

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
          onChange={(e) => postDetails(handlePic)}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Зарегистрироваться
      </Button>
    </VStack>
  );
}

export default SignUp;
