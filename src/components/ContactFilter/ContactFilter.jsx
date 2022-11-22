import { FilterStyled, Title, Text } from './filter.styled';
import { Box } from 'box';

export function Filter({ filter, setFilterValue }) {
  return (
    <Box ml={3} mt={3} width="650px">
      <Title>Contacts</Title>
      <Text>Please enter a name to search</Text>
      <FilterStyled
        id="filter"
        type="text"
        name="filter"
        value={filter}
        onChange={setFilterValue}
      />
    </Box>
  );
}
