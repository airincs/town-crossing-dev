import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Select,
  Button,
  Input,
  Radio,
  RadioGroup,
  Box,
  Image,
} from "@chakra-ui/react";
import dotenv from "dotenv";
import path from "path";
import nycImg from "../assets/images/nyc.jpg";
import londonImg from "../assets/images/london.jpg";
import tokyoImg from "../assets/images/tokyo.jpg";
import { url } from "inspector";

const Weather: FC = () => {
  const [lat, setLat] = useState<number>(35.6897);
  const [lon, setLon] = useState<number>(139.6922);
  const [wallpaper, setWallpaper] = useState<any>(tokyoImg);
  const [renderFlag, setRenderFlag] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any>("");
  const axios = require("axios").default;

  const getData = async () => {
    try {
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}`
      );
      console.log(resp);
      setWeatherData(resp);
      setRenderFlag(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [lon]);

  const formik = useFormik({
    initialValues: {
      city: "tokyo",
    },
    onSubmit: (values) => {
      if (values.city == "tokyo") {
        setLat(35.6897);
        setLon(139.6922);
        setWallpaper(tokyoImg);
      }
      if (values.city == "nyc") {
        setLat(40.7128);
        setLon(-74.006);
        setWallpaper(nycImg);
      }
      if (values.city == "london") {
        setLat(51.5072);
        setLon(-0.1276);
        setWallpaper(londonImg);
      }
    },
  });

  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      h={{ base: "93vh", md: "95vh" }}
    >
      {renderFlag ? (
        <Flex
          direction={{ base: "column", lg: "column" }}
          align={"center"}
          justify={"center"}
        >
          <Box maxH={{ lg: "70vh" }} maxW={{ lg: "50vw" }}>
            <Image src={wallpaper} rounded={"25px"} fit={"contain"} />
          </Box>
          <Flex direction={"column"}>
            <Text fontWeight={"extrabold"} fontSize={"2xl"}>
              {weatherData.data.name}, {weatherData.data.sys.country}
            </Text>
            <Flex>
              {Math.round(
                ((weatherData.data.main.temp - 273.15) * 1.8 + 32) * 100
              ) / 100}
              ° Fahrenheit
            </Flex>
            <Text>{weatherData.data.weather[0].main}</Text>
            <Flex>
              <form onSubmit={formik.handleSubmit}>
                <RadioGroup>
                  <Flex direction={"column"}>
                    <Radio
                      id="city"
                      name="city"
                      value={"tokyo"}
                      onChange={formik.handleChange}
                    >
                      Tokyo
                    </Radio>
                    <Radio
                      id="city"
                      name="city"
                      value={"nyc"}
                      onChange={formik.handleChange}
                    >
                      New York City
                    </Radio>
                    <Radio
                      id="city"
                      name="city"
                      value={"london"}
                      onChange={formik.handleChange}
                    >
                      London
                    </Radio>
                  </Flex>
                </RadioGroup>
                <Button type="submit">Submit</Button>
              </form>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Text>Loading</Text>
      )}
    </Flex>
  );
};

export default Weather;
