interface ResumeProps {
    id: string;
    companyName: string;
    jobTitle: string;
    feedback: FeedbackProps;
    imageUrl: string;
}

interface FeedbackProps {
    overallScore: number;
    ATS: {
        score: number;
        tips: FeedbackTip1[];
    };
    toneAndStyle: {
        score: number;
        tips: FeedbackTip2[];
    };
    content: {
        score: number;
        tips: FeedbackTip2[];
    };
    structure: {
        score: number;
        tips: FeedbackTip2[];
    };
    skills: {
        score: number;
        tips: FeedbackTip2[];
    };
}

interface FeedbackTip1 {
    type: "good" | "improve";
    tip: string;
}

interface FeedbackTip2 {
    type: "good" | "improve";
    tip: string;
    explanation: string;
}

interface ScoreProps {
    score: number;
}

interface FileUploaderProps {
    file: File | null;
    onFileSelect?: (file: File | null) => void;
}