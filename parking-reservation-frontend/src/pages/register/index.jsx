import { Button, Fieldset, Input, Stack, Flex } from "@chakra-ui/react"
import { Field } from "../../components/ui/field"
import { PasswordInput } from "../../components/ui/password-input"
// TODO: API call to register
// TODO: fix styling 
const Register = () => {
  return (
    <Flex justify="center">
      <Fieldset.Root size="md" maxW="md">
        <Stack>
          <Fieldset.Legend>Register</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your details below.
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
          <Field label="First Name">
            <Input name="firstName" />
          </Field>
          <Field label="Last Name">
            <Input name="lastname" />
          </Field>
          <Field label="Email address">
            <Input name="email" type="email" />
          </Field>
          <Field label="Username">
            <Input name="userName" />
          </Field>
          <Field label="Password">
              <PasswordInput />
          </Field>
        </Fieldset.Content>
        <Button type="submit" alignSelf="flex-end">
          Register
        </Button>
      </Fieldset.Root>
    </Flex>
  )
}

export default Register;
