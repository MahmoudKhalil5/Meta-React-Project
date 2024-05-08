import { Heading, HStack, Image, Text, VStack, Box, Button} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack align="start" >
      <HStack >
        <Box maxW='xl' background="white" borderRadius='lg' p='1'>
          <Image src={imageSrc} alt="Card Image" borderRadius='lg'/>
            <Box p='6'>
              <Heading size="md" color="black">
                {title}
              </Heading>
              <Text color="black">
                {description}
              </Text>
              <br/>
              <Button color="black" rightIcon={<FontAwesomeIcon icon={faArrowRight}  />}>
        View here
      </Button>
            </Box>
        </Box>
      </HStack>
    </VStack>
);
};


export default Card;
