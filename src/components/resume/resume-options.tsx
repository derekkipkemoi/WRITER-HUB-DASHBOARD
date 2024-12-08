'use client';
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CardActionArea, Divider, Stack, LinearProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';


const ResumeOptions = () => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const router = useRouter();
    const [pending, setPending] = useState(false);

    const handleCardClick = (cardIndex: number) => {
        setSelectedCard(cardIndex);
    };

    const handleContinueClick = async () => {
        setPending(true);
        if (selectedCard === 0) {
            router.push(paths.resume.upload);
            // const createOrder: CreateOrder = {
            //     package: JSON.stringify(orderPackage),
            //     note: "User uploaded a resume document for use",
            //     type: orderPackage.title,
            //     status: "Pending"
            // };
            // const { message } = await orderClient.createOrder(createOrder);
            // if (message === "Order created successfully") {
            //     router.push(paths.resume.upload);
            // }

        } else {
            router.push(paths.resume.enter);
            // const createOrder: CreateOrder = {
            //     package: JSON.stringify(orderPackage),
            //     note: "User entered data manually",
            //     type: orderPackage.title,
            //     status: "Pending"
            // };

            // const { message } = await orderClient.createOrder(createOrder);
            // if (message === "Order created successfully") {

            // } // No need to await
        }
    };

    return (
        <Stack sx={{ position: 'relative' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0, mb: 1 }}>
                Let's grab some details about you
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: 'text.secondary' }}
            >
                Select how you would like to provide your resume details
            </Typography>
            <Divider sx={{ width: '100%', height: '5px', borderColor: 'primary.main' }} />
            {pending && (
                <LinearProgress
                    sx={{
                        width: '100%',
                    }}
                />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, flexWrap: { xs: 'wrap', md: 'nowrap' }, my: 3 }}>
                {[0, 1].map((index) => (
                    <Card
                        key={index}
                        sx={{
                            height: '200px',
                            boxShadow: 3,
                            maxWidth: '400px',
                            textAlign: 'center',
                            transition: 'box-shadow 0.3s, transform 0.3s',
                            border: '2px solid',
                            borderColor: 'primary.main',
                            '&:hover': {
                                boxShadow: 6,
                                transform: 'scale(1.02)',
                            },
                            backgroundColor: selectedCard === index ? 'primary.main' : 'background.paper',
                            color: selectedCard === index ? 'white' : 'text.primary',
                        }}
                    >
                        <CardActionArea onClick={() => handleCardClick(index)} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                                <Box sx={{ marginBottom: 2 }}>
                                    <img src={index === 0 ? "/assets/file.png" : "/assets/edit.png"} alt={index === 0 ? "Upload Icon" : "Scratch Icon"} style={{ width: '64px', height: '64px' }} />
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 'bold', mb: 1, color: index === selectedCard ? 'white' : 'primary.main' }}
                                >
                                    {index === 0 ? 'File Upload' : 'Enter Details'}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: index === selectedCard ? 'white' : 'text.secondary' }}
                                >
                                    {index === 0
                                        ? "We'll capture your details from the uploaded resume/CV document"
                                        : "We'll guide you through the whole process of entering your details."}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', padding: 2 }}>
                <Button
                    onClick={handleContinueClick}
                    disabled={selectedCard === null}
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: 'warning.main',
                        color: 'black',
                        borderRadius: '25px',
                        '&:hover': {
                            backgroundColor: 'warning.dark',
                        },
                    }}
                >
                    Next
                </Button>
            </Box>
        </Stack>
    );
};

export default ResumeOptions;
