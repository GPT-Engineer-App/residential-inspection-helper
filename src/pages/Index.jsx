import React, { useState } from "react";
import { Box, Heading, Text, Image, Button, Input, Stack, Grid, useToast } from "@chakra-ui/react";
import { FaPlus, FaMapMarkerAlt } from "react-icons/fa";

const Index = () => {
  const [photos, setPhotos] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const handlePhotoUpload = (event) => {
    const uploadedPhotos = Array.from(event.target.files);
    // Automatically categorize and select construction photos
    const constructionPhotos = uploadedPhotos.filter((photo) => {
      // TODO: Implement AI categorization logic
      return true;
    });
    setPhotos([...photos, ...constructionPhotos]);
    toast({
      title: "写真がアップロードされました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddProperty = () => {
    // TODO: Save property data (photos, address, description) to database
    setPhotos([]);
    setAddress("");
    setDescription("");
    toast({
      title: "物件が保存されました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        建設写真管理サービス
      </Heading>

      <Stack spacing={4} mb={8}>
        <Text fontSize="xl" fontWeight="bold">
          建設写真のアップロード
        </Text>
        <Input type="file" multiple onChange={handlePhotoUpload} />

        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {photos.map((photo, index) => (
            <Image key={index} src={URL.createObjectURL(photo)} alt={`Construction Photo ${index + 1}`} />
          ))}
        </Grid>
      </Stack>

      <Stack spacing={4} mb={8}>
        <Text fontSize="xl" fontWeight="bold">
          物件情報の入力
        </Text>
        <Input placeholder="住所" value={address} onChange={(e) => setAddress(e.target.value)} />
        <Input placeholder="物件の説明" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Stack>

      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddProperty}>
        物件を追加
      </Button>
    </Box>
  );
};

export default Index;
