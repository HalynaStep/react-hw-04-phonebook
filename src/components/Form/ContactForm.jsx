import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box } from 'box';

import { Input, Label, Button, Title } from './contactForm.styled';

const initialValues = {
  name: '',
  number: '',
};

const Schema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: Yup.string()
    .required('Required')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

export const ContactForm = props => (
  <Formik
    initialValues={initialValues}
    onSubmit={props.handleSubmit}
    validationSchema={Schema}
  >
    <Form>
      <Box ml={3} mt={3} width="650px">
        <Title>Phonebook</Title>
        <Box display="flex" mb={3}>
          <Label htmlFor="name">
            <p>Name:</p>
            <Input type="text" name="name" id="name" />
            <ErrorMessage name="name"></ErrorMessage>
          </Label>
          <Label htmlFor="number">
            <p>Number:</p>
            <Input type="tel" name="number" id="number" />
            <ErrorMessage name="number"></ErrorMessage>
          </Label>
        </Box>
        <Button type="submit">Add contact</Button>
      </Box>
    </Form>
  </Formik>
);
