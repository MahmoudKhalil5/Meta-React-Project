import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    onSubmit: async (values) => {
      try {
        await submit("/submit-url", values);

        // If the submission is successful, show the success alert
        if (response && response.type === "success") {
          onOpen("success", `Thanks for your submission ${values.firstName}, we will get back to you shortly!`);
          // Reset the form
          formik.resetForm();
        } else if (response && response.type === "error") {
          // If there's an error, show the error alert
          onOpen("error", "Something went wrong, please try again later!");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Email required"),
      type: Yup.string().required("Type is required"),
      comment: Yup.string().required("Comment is required"),
    }),
  });

  const firstNameFieldProps = { ...formik.getFieldProps("firstName"), isInvalid: formik.touched.firstName && formik.errors.firstName };
  const emailFieldProps = { ...formik.getFieldProps("email"), isInvalid: formik.touched.email && formik.errors.email };
  const commentFieldProps = { ...formik.getFieldProps("comment"), isInvalid: formik.touched.comment && formik.errors.comment };

  return (
    <FullScreenSection isDarkBackground backgroundColor="#512DA8" py={16} spacing={8}>
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>

        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName" error={formik.touched.firstName && formik.errors.firstName}>
                  Name
                </FormLabel>
                <Input id="firstName" name="firstName" type="string" {...firstNameFieldProps} />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email" error={formik.touched.email && formik.errors.email}>
                  Email Address
                </FormLabel>
                <Input id="email" name="email" type="email" {...emailFieldProps} />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" color="black" {...formik.getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

               <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment" error={formik.touched.comment && formik.errors.comment}>
                  Your message
                </FormLabel>
                <Textarea id="comment" name="comment" height={250} {...commentFieldProps} />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" className="button" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
