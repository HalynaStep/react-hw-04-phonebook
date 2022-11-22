import { Item, Text, Button } from './listItem.styled';

export const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <Item>
      <Text>{name}</Text>
      <Text>{number}</Text>
      <Button onClick={() => deleteContact(id)}>Delete</Button>
    </Item>
  );
};
