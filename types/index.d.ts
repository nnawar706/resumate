interface ResumeProps extends InstructionProps {
    id: string;
    companyName: string;
    feedback: FeedbackProps;
    imagePath: string;
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

interface CategoryProps extends ScoreProps {
    title: string;
}

interface SuggestionProps {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps extends ScoreProps {
    suggestions: SuggestionProps[];
}

interface ScoreProps {
    score: number;
}

interface FileUploaderProps {
    file: File | null;
    onFileSelect?: (file: File | null) => void;
}

interface InstructionProps {
    jobTitle: string;
    jobDescription?: string;
}

interface NavbarProps {
    showUpload: boolean;
    showSignOut?: boolean;
}

interface SummaryProps extends InstructionProps {
    companyName: string;
    feedback: FeedbackProps;
}