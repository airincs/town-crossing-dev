import React, { FC, useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Weather: FC = () => {
  const [lat, setLat] = useState<number>(36);
  const [lon, setLon] = useState<number>(138);
  const [weatherData, setWeatherData] = useState<any>();
  const axios = require("axios").default;

  const getData = async () => {
    try {
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}`
      );
      console.log(resp);
      setWeatherData(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  /*
  useEffect(() => {
    console.log(weatherData.data.name);
  }, [weatherData]);
*/
  const formik = useFormik({
    initialValues: {
      zip: 10001,
    },
    validationSchema: Yup.object().shape({
      zip: Yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, "Must be exactly 5 digits")
        .max(5, "Must be exactly 5 digits"),
    }),
    onSubmit: (values) => {},
  });

  return (
    <Flex justify={"center"} align={"center"} h={{ base: "93vh", md: "95vh" }}>
      {weatherData.data.name}
    </Flex>
  );
};

export default Weather;
