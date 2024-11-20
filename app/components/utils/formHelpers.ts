export const getEmptyItem = (section: string) => {
  switch (section) {
    case 'education':
      return {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        grade: ''
      };
    case 'experience':
      return {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: []
      };
    case 'projects':
      return {
        name: '',
        description: '',
        technologies: [],
        link: '',
        startDate: '',
        endDate: ''
      };
    case 'skills':
      return {
        name: '',
        level: 'Beginner',
        yearsOfExperience: 0
      };
    default:
      return {};
  }
};
