import { FilterStyled, Title, Text } from './filter.styled';
import { Box } from 'box';

export const Filter = ({ handleSetFilterValue }) => {
  return (
    <Box ml={3} mt={3} width="650px">
      <Title>Contacts</Title>
      <Text>Please enter a name to search</Text>
      <FilterStyled type="text" onChange={handleSetFilterValue} />
    </Box>
  );
};
