import { Button, Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "../../components/ui/field"
import { PasswordInput } from "../../components/ui/password-input"
// TODO: API call to login
// TODO: fix styling 
const Login = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Login</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your login details below.
        </Fieldset.HelperText>
      </Stack>
      <Fieldset.Content>
        <Field label="Username">
          <Input name="username" />
        </Field>
        <Field label="Password">
            <PasswordInput />
        </Field>
      </Fieldset.Content>
      <Button type="submit" alignSelf="flex-start">
        Login
      </Button>
    </Fieldset.Root>
  )
}

export default Login;
