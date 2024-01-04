import { useState } from 'react';
import { HStack, Box } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

export default function StarRating({ rating }) {
  const [hover, setHover] = useState(null);

  const integerPart = Math.floor(rating); // Extract integer part of the rating
  const decimalPart = rating - integerPart; // Extract decimal part of the rating

  return (
    <HStack minW="100" spacing={"2px"}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        let starColor = "#e4e5e9"; // Default color for the star
        if (index < integerPart) {
          // If index is less than integer part of rating, show full yellow star
          starColor = "#ffc107";
        } else if (index === integerPart && decimalPart > 0) {
          // If index matches integer part and there's a decimal part, show partially filled star
          starColor = `linear-gradient(to right, #ffc107 ${decimalPart * 100}%, #e4e5e9 ${decimalPart * 100}%)`;
        }

        return (
          <Box
            onClick={() => console.log(`Clicked on star ${ratingValue}`)}
            as="label"
            key={index}
            color={starColor}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <FaStar size={20} transition="color 200ms" />
          </Box>
        );
      })}
    </HStack>
  );
}
