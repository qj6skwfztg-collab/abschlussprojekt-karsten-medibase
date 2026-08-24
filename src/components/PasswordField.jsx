import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";

function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  showText,
  hideText,
  autoComplete = "current-password",
  required = true,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box>
      <Text as="label" htmlFor={id} display="block" mb="2">
        {label}
      </Text>

      <Flex gap="2" align="center">
        <Input
          id={id}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />

        <Button
          type="button"
          variant="outline"
          flexShrink={0}
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? hideText : showText}
          aria-pressed={isVisible}
        >
          {isVisible ? hideText : showText}
        </Button>
      </Flex>
    </Box>
  );
}

export default PasswordField;
