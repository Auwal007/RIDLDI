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
  notes?: string;
  scorecard?: {
    motivation: number;
    readiness: number;
    education: number;
    fit: number;
  };
  timeline?: {
    status: string;
    timestamp: string;
  }[];
  startDate?: string;
  mentorName?: string;
}

export interface SystemSettings {
  applicationDeadline: string;
  activeTracks: string[];
  intakeLimit: number;
}

export let systemSettings: SystemSettings = {
  applicationDeadline: '2026-09-30',
  activeTracks: [
    'Software Development',
    'Data Analytics & AI',
    'Cybersecurity',
    'UI/UX Design',
    'Cloud Computing',
    'Digital Marketing',
    'Product Management',
    'Blockchain & Web3',
    'Digital Content & Media',
    'No-Code & Automation',
  ],
  intakeLimit: 150
};

export function getSystemSettings(): SystemSettings {
  return { ...systemSettings };
}

export function updateSystemSettings(updates: Partial<SystemSettings>): SystemSettings {
  systemSettings = { ...systemSettings, ...updates };
  return systemSettings;
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
    notes: 'Strong analytical skills, but needs to focus more on project experience.',
    scorecard: {
      motivation: 4,
      readiness: 3,
      education: 4,
      fit: 4
    },
    timeline: [
      { status: 'pending', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
      { status: 'reviewing', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString() }
    ]
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
    notes: '',
    scorecard: {
      motivation: 5,
      readiness: 5,
      education: 5,
      fit: 4
    },
    timeline: [
      { status: 'pending', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() }
    ]
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
    notes: 'Outstanding portfolio mockup, great communication during pre-screening.',
    scorecard: {
      motivation: 5,
      readiness: 4,
      education: 3,
      fit: 5
    },
    timeline: [
      { status: 'pending', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
      { status: 'reviewing', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
      { status: 'approved', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() }
    ],
    startDate: '2026-07-01',
    mentorName: 'Dr. Sarah Alao'
  }
];

export function getApplications(): Application[] {
  return [...mockApplications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getApplication(id: string): Application | undefined {
  return mockApplications.find(app => app.id === id);
}

export function addApplication(app: Omit<Application, 'id' | 'status' | 'createdAt' | 'notes' | 'scorecard' | 'timeline'>): Application {
  const createdAt = new Date().toISOString();
  const newApp: Application = {
    ...app,
    id: `app_${Math.random().toString(36).substring(2, 9)}`,
    status: 'pending',
    createdAt,
    notes: '',
    scorecard: {
      motivation: 0,
      readiness: 0,
      education: 0,
      fit: 0
    },
    timeline: [
      { status: 'pending', timestamp: createdAt }
    ]
  };
  mockApplications.push(newApp);
  return newApp;
}

export function updateApplication(id: string, updates: Partial<Application>): Application | null {
  const index = mockApplications.findIndex(app => app.id === id);
  if (index === -1) return null;

  const currentApp = mockApplications[index];
  
  // Create copy and apply general updates
  const updatedApp = { 
    ...currentApp, 
    ...updates,
    scorecard: updates.scorecard ? { ...currentApp.scorecard, ...updates.scorecard } : currentApp.scorecard
  };

  // If status is updated and differs from the current one, record a new timeline milestone
  if (updates.status && updates.status !== currentApp.status) {
    const timeline = currentApp.timeline ? [...currentApp.timeline] : [];
    timeline.push({
      status: updates.status,
      timestamp: new Date().toISOString()
    });
    updatedApp.timeline = timeline;
  }

  mockApplications[index] = updatedApp;
  return updatedApp;
}

export function updateApplicationStatus(id: string, status: ApplicationStatus): Application | null {
  return updateApplication(id, { status });
}

export const ADMIN_CREDENTIALS = {
  email: 'admin@ridldi.org',
  password: 'admin123'
};

