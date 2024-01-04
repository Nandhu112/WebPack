import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
  Heading
} from '@chakra-ui/react';
import UserChat from './UserChat';
import UserCatbox from './UserCatbox';
function ChatAccordion() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Set initial state as closed
  const [messageOpen, setMessageOpen] = useState(false)

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
    setMessageOpen(false)
  };

  return (
    <Box position="relative"  minW={messageOpen?"600":"150"}>
      <Accordion
        allowMultiple
        bg="white"
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton onClick={toggleAccordion}>
              <Box as="span" flex="1" textAlign="left">
              <Heading ml="30" fontSize={"15"}>Messaging</Heading>
              </Box>
              <AccordionIcon
                style={{
                  transform: isAccordionOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel
      
            style={{
              position: 'absolute',
              bottom: isAccordionOpen ? '100%' : 0,
              width: '100%',
              margin: 0,
              padding: 0,
              transition: 'bottom 0.3s ease', // Adding transition for smooth animation
            }}
          >
            <Box>
              <UserChat setMessageOpen={setMessageOpen} messageOpen={messageOpen} />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

    </Box>
  );
}

export default ChatAccordion;
