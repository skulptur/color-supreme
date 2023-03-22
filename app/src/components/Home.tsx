import { Box, Text } from '@mantine/core'

export type HomeProps = {}

export const Home = (props: HomeProps): JSX.Element => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        width: '100vw',
        height: '100vh',
      })}
    >
      <Text color='gray'>Home</Text>
    </Box>
  )
}
