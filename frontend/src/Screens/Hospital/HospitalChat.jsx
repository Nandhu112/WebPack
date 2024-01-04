import { useState } from 'react';
import { Box, Input, Button, List, ListItem } from '@chakra-ui/react';

const HositalChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <Box as="main" minHeight="100vh" display="flex" flexDirection="column">
      <List id="messages" flexGrow={1} p={0}>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            p="0.5rem 1rem"
            bg={index % 2 !== 0 ? '#efefef' : 'transparent'}
          >
            {message}
          </ListItem>
        ))}
      </List>
      <form id="form" onSubmit={handleMessageSubmit}>
        <Input
          id="input"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          borderRadius="2rem"
          margin="0.25rem"
          flex="1"
          _focus={{ outline: 'none' }}
        />
        <Button type="submit" bg="#333" color="#fff" borderRadius="3px" margin="0.25rem">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default HositalChat;
