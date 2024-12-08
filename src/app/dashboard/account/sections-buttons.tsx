'use client';
import * as React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import resumeSections from './resume-sections';
import { ResumeProfileDetailsForm } from '@/components/resume/profile/resume-profile-details-form';
import { WorkHistoryHolder } from '@/app/resume/enter/work-history-holder';
import { EducationHolder } from '@/app/resume/enter/education-holder';
import ResumeSkillsDetailsForm from '@/components/resume/skills/resume-skills-detail-form';
import { ProfessionalSummary } from '@/components/resume/professional-summary/professional-summary';
import { AddCircleRounded, CloseRounded } from '@mui/icons-material';



export const SectionsButtons: React.FC = () => {
  const [index, setIndex] = React.useState<number>(-1);

  const changeIndex = (indexItem: number) => {
    setIndex(indexItem);
  };

  const renderForm = () => {
    switch (index) {
      case 0:
        return <ResumeProfileDetailsForm subTitle={resumeSections[index].subTitle} description={resumeSections[index].description} />;
      case 1:
        return <WorkHistoryHolder subTitle={resumeSections[index].subTitle} description={resumeSections[index].description} />;
      case 2:
        return <EducationHolder subTitle={resumeSections[index].subTitle} description={resumeSections[index].description} />;
      case 3:
        return <ResumeSkillsDetailsForm subTitle={resumeSections[index].subTitle} description={resumeSections[index].description} />;
      case 4:
        return <ProfessionalSummary subTitle={resumeSections[index].subTitle} description={resumeSections[index].description} />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    setIndex(-1);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
        {resumeSections.map((skill, indexItem) => (
          <Button
            key={indexItem}
            variant={index === indexItem ? 'contained' : 'outlined'}
            color='primary'
            onClick={() => changeIndex(indexItem)}
            startIcon={<AddCircleRounded />}
            sx={{
              borderRadius: '25px',
              margin: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {skill.title}
          </Button>
        ))}
        {/* Close Button (contained style) to the right of the last button, only shown if index is valid */}
        {index !== -1 && (
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{
              marginLeft: '8px',
              alignSelf: 'center',
              borderRadius: '25px',
            }}
            startIcon={<CloseRounded />}
          >
            Close
          </Button>
        )}
      </Box>
      {renderForm()}
    </div>
  );
};
