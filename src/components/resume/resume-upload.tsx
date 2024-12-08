'use client';
import React, { useRef, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { orderClient } from '@/lib/order/client';
import { OrderObjectType } from '@/types/order';

const allowedTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'text/html',
    'application/rtf',
    'text/plain'
];

interface ResumeUploadsProps {
    resumeUploaded: (uploaded: boolean) => void;
    order: OrderObjectType | null;
}

const ResumeUploads: React.FC<ResumeUploadsProps> = ({ resumeUploaded, order }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeName, setResumeName] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const orderId = localStorage.getItem('orderId');

    const closeModal = () => {
        setShowModal(false);
    };

    const updateResumeDetails = async (file: File) => {
        console.log("orderId", orderId)
        setShowModal(false);
        setResumeFile(file);
        if (allowedTypes.includes(file.type)) {
            setResumeName(file.name);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', file.name);
            formData.append('description', "User resume file");
            if (orderId) {
                await orderClient.updateResumeFile(orderId, formData);
                resumeUploaded(true); // Notify that the resume was successfully uploaded
            }
        } else {
            alert('Invalid file type. Please upload a DOC, DOCX, PDF File.');
        }
    };

    const handleFileUpload = async (file: File) => {
        setResumeFile(file);
        if (order?.resume.name) {
            setShowModal(true);
        } else {
            if (allowedTypes.includes(file.type)) {
                setResumeName(file.name);
                const formData = new FormData();
                formData.append('file', file);
                formData.append('name', file.name);
                formData.append('description', "User resume file");
                if (orderId) {
                    await orderClient.updateResumeFile(orderId, formData);
                    resumeUploaded(true); // Notify that the resume was successfully uploaded
                }
            } else {
                alert('Invalid file type. Please upload a DOC, DOCX, PDF, HTML, RTF, or TXT file.');
            }
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    return (
        <Box>
            <Card
                sx={{
                    height: '200px',
                    boxShadow: 3,
                    textAlign: 'center',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                        boxShadow: 6,
                        transform: 'scale(1.02)',
                    },
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} onClick={handleButtonClick}>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                        <Box sx={{ marginBottom: 2 }}>
                            <img src={"/assets/file.png"} alt={"Upload Icon"} style={{ width: '64px', height: '64px' }} />
                        </Box>
                        {resumeName !== null ? (
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                                <CheckCircleIcon sx={{ verticalAlign: 'middle', color: 'green', mr: 1 }} />
                                {resumeName}
                            </Typography>
                        ) : (
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                                Drag and drop a file here
                            </Typography>
                        )}
                        <Button
                            onClick={handleButtonClick}
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: 20,
                                padding: '1px 50px',
                                fontSize: '1rem',
                                textTransform: 'none'
                            }}
                        >
                            Browse
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".doc,.docx,.pdf,.html,.rtf,.txt"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog open={showModal} onClose={closeModal}>
                <DialogTitle>Update Resume Details</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        You already have an uploaded resume. Would you like to update it with a new file?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', padding: '0 20px 20px 20px' }}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={closeModal}
                        sx={{ width: '45%' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => resumeFile && updateResumeDetails(resumeFile)}
                        sx={{ width: '45%' }}
                    >
                        Update Resume
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ResumeUploads;
