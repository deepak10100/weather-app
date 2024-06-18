import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Container, HStack, Heading, Input, InputGroup, Stack, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
function App() {
  let [search, setSearch] = useState("")
  let [data, setData] = useState(null)
  const onchageHandler = (e) => {
    setSearch(e.target.value)
  }
  let clickonhandlers = async () => {
    
    if (search) {
      let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=965085c1ddf2df2b4bc7cb302b9f7e61&units=metric`)
    console.log(data)
    setData(data)
     
    }else{
      alert("Please Enter City Name")
    }
    setSearch('')
  }
  return (
    <>
      <Container maxW={'container.lg'} my={'5'} >
        <Heading as={'h1'} textAlign={'center'} mb={7} >Weather App</Heading>
        <VStack>
          <HStack>
            <Input type="text" value={search} onChange={onchageHandler} id="" placeholder='Enter the city' />
            <Button onClick={clickonhandlers} >Search</Button>
          </HStack>
        </VStack>

        {
          data?.weather ?
            <VStack>
              <Card p={7} my={7} justifyContent={'center'} textAlign={'center'}>


                <VStack mt={0} justifyContent={'center'} >
                  <Heading as={'h1'} >{data.name}</Heading>
                </VStack>


                <CardBody>
                  <Avatar size={'2xl'} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
                  <VStack >
                    <Heading as={'h2'} >{Math.round(data.main.temp)}<sup>°C</sup></Heading>
                    <Text as={'p'} fontWeight={'600'} fontSize={'md'}>{data.weather[0].main}</Text>
                  </VStack>
                </CardBody>
                <CardFooter textAlign={'center'} justify={'space-around'}>
                  <HStack spacing={['4rem', '7rem']} textAlign={'center'} justifyContent={'space-between'} >
                    <Stack >
                      <Text as={'p'} fontSize={'lg'}>{data.main.humidity}%</Text>
                      <Text as={'p'} fontSize={'sm'} >Humidity</Text>
                    </Stack>
                    <Stack>
                      <Text as={'p'} fontSize={'lg'}>{Math.round(data.main.temp_min)}- {Math.round(data.main.temp_max)}</Text>
                      <Text as={'p'} fontSize={'sm'}>Min-Max</Text>
                    </Stack>
                  </HStack>
                </CardFooter>
              </Card>
            </VStack> // Use optional chaining to check if 'data' and 'data.weather' exist
            : ""
        }

      </Container>


    </>
  )
}

export default App
