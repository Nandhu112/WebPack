import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack } from "@chakra-ui/react";
function SampleTable() {
  return (
    <Stack spacing="20px" direction={{ base: "column", md: "row" }}>
    <Box overflowX={{ base: "auto", md: "unset" }} flex="1" p="20px">
    <Table variant="simple" borderRadius="1g">

        <Thead>
        <Tr>
          <Th bg="teal.200">Column 1</Th>
          <Th bg="purple.200">Column 2</Th>
          <Th bg="blue.200">Column 3</Th>
          <Th bg="green.200">Column 4</Th>
          <Th bg="pink.200">Column 5</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Data 1</Td>
          <Td>Data 2</Td>
          <Td>Data 3</Td>
          <Td>Data 4</Td>
          <Td>Data 5</Td>
        </Tr>
        <Tr>
          <Td>Data 6</Td>
          <Td>Data 7</Td>
          <Td>Data 8</Td>
          <Td>Data 9</Td>
          <Td>Data 10</Td>
        </Tr>
        <Tr>
          <Td>Data 11</Td>
          <Td>Data 12</Td>
          <Td>Data 13</Td>
          <Td>Data 14</Td>
          <Td>Data 15</Td>
        </Tr>
        <Tr>
          <Td>Data 16</Td>
          <Td>Data 17</Td>
          <Td>Data 18</Td>
          <Td>Data 19</Td>
          <Td>Data 20</Td>
        </Tr>
        <Tr>
          <Td>Data 21</Td>
          <Td>Data 22</Td>
          <Td>Data 23</Td>
          <Td>Data 24</Td>
          <Td>Data 25</Td>
        </Tr>
        <Tr>
          <Td>Data 26</Td>
          <Td>Data 27</Td>
          <Td>Data 28</Td>
          <Td>Data 29</Td>
          <Td>Data 30</Td>
        </Tr>
      </Tbody>
    </Table>
    </Box>

    </Stack>
  )
}

export default SampleTable
