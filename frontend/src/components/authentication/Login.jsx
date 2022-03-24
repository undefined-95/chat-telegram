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

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

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
  const submitHandler = (submitHandler) => {};

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
