export type NavItem = 'beranda' | 'pemanasan' | 'baca' | 'aktivitas' | 'kuis';

export type MascotExpression = 'senang' | 'semangat' | 'berpikir' | 'membantu' | 'bangga';

export interface StoryPage {
  pageNumber: number;
  title: string;
  illustrationType: 'coral_home' | 'trash_threat' | 'turtle_idea' | 'cleaning_beach' | 'clean_future';
  sentence1: string;
  sentence2: string;
  mascotDialogue: string;
  factTag: string;
}

export interface WasteItem {
  id: string;
  name: string;
  category: 'organik' | 'anorganik' | 'b3';
  icon: string;
  hint: string;
}

export interface ThreeRScenario {
  id: string;
  title: string;
  actionType: 'reduce' | 'reuse' | 'recycle';
  actionName: string;
  description: string;
  example: string;
  correctChoice: string;
  wrongChoice: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}
