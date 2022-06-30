import { useRouter } from "next/router";
import { Box, Button, Gtid, Heading, VStack } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub, BsGoogle } from "react-icons/bs";

const providers = [
  {
    name: "github",
    Icon: BsGithub,
  },
  {
    name: "google",
    Icon: BsGoogle,
  },
];

const SignIn = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === "loading") {
    return <Heading>Checking Authentication...</Heading>;
  }
  if (session) {
    setTimeout(() => {
      push("/");
    }, 2000);
    return <Heading>You are already signed in</Heading>;
  }
  const handleOAuthSignIn = (provider) => () => signIn(provider);

  return (
    <Box>
      <VStack>
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            leftIcon={<Icon />}
            onClick={handleOAuthSignIn(name)}
            textTransform="uppercase"
            w="100%"
          >
            Sign in with {name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default SignIn;
