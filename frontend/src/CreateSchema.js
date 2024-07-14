import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast
} from "@chakra-ui/react";

const CreateSchema = () => {
  const [entries, setEntries] = useState([{ field: "", type: "" }]);
  const [description, setDescription] = useState(""); // Single description field
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();

  const typeOptions = [
    "Bool",
    "Symbol (32 char)",
    "32-bit Integers (signed)",
    "32-bit Integers (unsigned)",
    "64-bit Integers (signed)",
    "64-bit Integers (unsigned)",
    "128-bit Integers (signed)",
    "128-bit Integers (unsigned)"
  ];

  const handleChange = (index, event) => {
    const values = [...entries];
    values[index][event.target.name] = event.target.value;
    setEntries(values);
  };

  const handleAdd = () => {
    setEntries([...entries, { field: "", type: "" }]);
  };

  const handleRemove = (index) => {
    if (entries.length > 1) {
      const values = [...entries];
      values.splice(index, 1);
      setEntries(values);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("https://atte-stellar-hv1fgowwyh-programmer-shivanshs-projects.vercel.app/data/new", {
        fields: entries,
        description // Include description in the payload
      });
      setResponse(result.data);
      setError(null);

      toast({
        title: "Schema created.",
        description: "You've successfully created a new schema.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset the form fields
      setEntries([{ field: "", type: "" }]);
      setDescription("");

      // Clear the response message after 3 seconds
      setTimeout(() => {
        setResponse(null);
      }, 3000);

    } catch (err) {
      setResponse(null);
      setError(err.response ? err.response.data : "Error connecting to server");

      toast({
        title: "An error occurred.",
        description: "Unable to create schema.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" mt={8} p={4} boxShadow="lg" borderRadius="md" bg="gray.800" color="white">
      <Heading as="h1" mb={6} textAlign="center" color="teal.200">
        Create Schema
      </Heading>
      <form onSubmit={handleSubmit}>
        {entries.map((entry, index) => (
          <Box key={index} mb={4}>
            <FormControl isRequired>
              <FormLabel htmlFor={`field-${index}`} color="teal.100">Field:</FormLabel>
              <Input
                id={`field-${index}`}
                name="field"
                value={entry.field}
                onChange={(e) => handleChange(index, e)}
                bg="gray.700"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel htmlFor={`type-${index}`} color="teal.100">Type:</FormLabel>
              <Select
                id={`type-${index}`}
                name="type"
                value={entry.type}
                onChange={(e) => handleChange(index, e)}
                bg="gray.700"
                color="white"
              >
                <option value="" disabled>Select a type</option>
                {typeOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>
            {entries.length > 1 && (
              <Button mt={2} colorScheme="red" onClick={() => handleRemove(index)}>
                Remove
              </Button>
            )}
          </Box>
        ))}
        <FormControl mt={4}>
          <FormLabel htmlFor="description" color="teal.100">Description:</FormLabel>
          <Textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description for the schema"
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>
        <Stack direction="row" spacing={4} mt={4}>
          <Button colorScheme="teal" onClick={handleAdd}>
            Add Another
          </Button>
          <Button type="submit" colorScheme="blue">
            Submit 
          </Button>
        </Stack>
      </form>

      {response && (
        <Alert status="success" mt={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Response:</AlertTitle>
            <AlertDescription>{JSON.stringify(response, null, 2)}</AlertDescription>
          </Box>
        </Alert>
      )}

      {error && (
        <Alert status="error" mt={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Error:</AlertTitle>
            <AlertDescription>{typeof error === 'object' ? JSON.stringify(error, null, 2) : error}</AlertDescription>
          </Box>
        </Alert>
      )}
    </Container>
  );
};

export default CreateSchema;


// // CreateSchema.js
// import React, { useState } from "react";
// import axios from "axios";
// import './CreateSchema.css'; // Optional: for additional styling

// const CreateSchema = () => {
//   const [entries, setEntries] = useState([{ field: "", type: "" }]);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);

//   const typeOptions = [
//     "Bool",
//     // "symbol_short (9 char)",
//     "Symbol (32 char)",
//     "32-bit Integers (signed)",
//     "32-bit Integers (unsigned)",
//     "64-bit Integers (signed)",
//     "64-bit Integers (unsigned)",
//     "128-bit Integers (signed)",
//     "128-bit Integers (unsigned)"
//   ];

//   const handleChange = (index, event) => {
//     const values = [...entries];
//     values[index][event.target.name] = event.target.value;
//     setEntries(values);
//   };

//   const handleAdd = () => {
//     setEntries([...entries, { field: "", type: "" }]);
//   };

//   const handleRemove = (index) => {
//     if (entries.length > 1) {
//       const values = [...entries];
//       values.splice(index, 1);
//       setEntries(values);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const result = await axios.post("https://attestellar-backend-yzl9.onrender.com/data/new", {
//         fields: entries
//       });
//       setResponse(result.data);
//       setError(null);
//     } catch (err) {
//       setResponse(null);
//       setError(err.response ? err.response.data : "Error connecting to server");
//     }
//   };

//   return (
//     <div className="CreateSchema">
//       <h1>Create Schema</h1>
//       <form onSubmit={handleSubmit}>
//         {entries.map((entry, index) => (
//           <div key={index} className="form-group">
//             <label htmlFor={`field-${index}`}>Field:</label>
//             <input
//               type="text"
//               id={`field-${index}`}
//               name="field"
//               value={entry.field}
//               onChange={(e) => handleChange(index, e)}
//               required
//             />
//             <label htmlFor={`type-${index}`}>Type:</label>
//             <select
//               id={`type-${index}`}
//               name="type"
//               value={entry.type}
//               onChange={(e) => handleChange(index, e)}
//               required
//             >
//               <option value="" disabled>Select a type</option>
//               {typeOptions.map((option, idx) => (
//                 <option key={idx} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button type="button" onClick={() => handleRemove(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAdd}>
//           Add Another
//         </button>
//         <button type="submit">Submit</button>
//       </form>

//       {response && (
//         <div className="response">
//           <h2>Response:</h2>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}

//       {error && (
//         <div className="error">
//           <h2>Error:</h2>
//           <pre>{typeof error === 'object' ? JSON.stringify(error, null, 2) : error}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateSchema;
