export type ApplicationStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  location: string;
  education: string;
  employment: string;
  track: string;
  skill: string;
  motivation: string;
  linkedin: string;
  cv: string;
  status: ApplicationStatus;
  createdAt: string;
}

// In-memory data store for applications
export let mockApplications: Application[] = [
  {
    id: 'app_1',
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+234 801 234 5678',
    gender: 'female',
    dob: '1998-05-12',
    location: 'Lagos, LA',
    education: 'undergrad',
    employment: 'employed',
    track: 'Software Development',
    skill: 'Intermediate',
    motivation: 'I want to improve my software engineering skills and build tools for my community.',
    linkedin: 'linkedin.com/in/janedoe',
    cv: 'jane_doe_cv.pdf',
    status: 'reviewing',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'app_2',
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+234 802 345 6789',
    gender: 'male',
    dob: '1995-11-23',
    location: 'Abuja, FCT',
    education: 'postgrad',
    employment: 'unemployed',
    track: 'Data Analytics & AI',
    skill: 'Advanced',
    motivation: 'I have a passion for AI and I want to dive deep into data analytics to find meaningful patterns.',
    linkedin: '',
    cv: 'john_smith_resume.docx',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: 'app_3',
    fullName: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '+234 803 456 7890',
    gender: 'female',
    dob: '2001-08-05',
    location: 'Port Harcourt, RI',
    education: 'secondary',
    employment: 'student',
    track: 'UI/UX Design',
    skill: 'Beginner',
    motivation: 'I love designing and creating user-friendly interfaces.',
    linkedin: 'linkedin.com/in/alicejdesign',
    cv: 'alice_ux.pdf',
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  }
];

export function getApplications(): Application[] {
  return [...mockApplications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getApplication(id: string): Application | undefined {
  return mockApplications.find(app => app.id === id);
}

export function addApplication(app: Omit<Application, 'id' | 'status' | 'createdAt'>): Application {
  const newApp: Application = {
    ...app,
    id: `app_${Math.random().toString(36).substring(2, 9)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  mockApplications.push(newApp);
  return newApp;
}

export function updateApplicationStatus(id: string, status: ApplicationStatus): Application | null {
  const index = mockApplications.findIndex(app => app.id === id);
  if (index === -1) return null;

  mockApplications[index] = { ...mockApplications[index], status };
  return mockApplications[index];
}
