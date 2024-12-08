import React from 'react';
import { Box, Typography, Grid, Container, CardContent, Card, Avatar, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import CreateIcon from '@mui/icons-material/Create';

// Import icons from assets folder


// Define a type for static image data
type StaticImageData = {
    src: string;
    height: number;
    width: number;
    placeholder?: string;
};

// Adjust the import to the type
type IconType = string | StaticImageData;

interface Feature {
    title: string;
    description: string;
    iconSrc: IconType;
    iconAlt: string;
}

const features: Feature[] = [
    {
        title: "User-Friendly Order Process",
        description: "A clear and intuitive order form guiding users through submission.",
        iconSrc: "/assets/process.png",
        iconAlt: "User-Friendly Order Process Icon"
    },
    {
        title: "Expert CV Writing Services",
        description: "Professional writers available to craft personalized CVs that highlight your unique skills and experiences.",
        iconSrc: "/assets/writer.png",
        iconAlt: "Expert CV Writing Services Icon"
    },
    {
        title: "Custom Resume Templates",
        description: "Choose from a variety of templates tailored for specific job roles and industry standards.",
        iconSrc: "/assets/templates.png",
        iconAlt: "Custom Resume Templates Icon"
    }
];

const FeatureSection = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                align="center"
                sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 2,
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                }}
            >
                Our Features
            </Typography>
            <Typography
                variant="body1"
                component="p"
                gutterBottom
                align="center"
                sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                    padding: '0 16px',
                    paddingBottom: 2,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                }}
            >
                Explore our tailored CV writing services designed to enhance your career opportunities and success.
            </Typography>
            <Container>
                <Grid container spacing={4} justifyContent="center">
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card
                                elevation={3}
                                sx={{
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
                                    },
                                    border: `2px solid primary.main`,
                                    borderRadius: 2,
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', padding: '30px' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 'bold', mb: 1 }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Divider sx={{ margin: '10px 0', backgroundColor: 'primary.main', height: '2px' }} />
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            mb: 3,
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            

                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: '80px',
                                                height: '80px',
                                                padding: "15px", // Fill the box's width
                                                // Fill the box's height
                                                objectFit: 'contain', // Ensure the icon is contained within the box
                                            }}
                                            src={(feature.iconSrc as StaticImageData).src || feature.iconSrc as string}
                                            alt={feature.iconAlt}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeatureSection;
