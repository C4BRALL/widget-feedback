import { useState } from "react";
import bugImgUrl from '../../assets/Bug.svg';
import ideaImgUrl from '../../assets/Idea.svg';
import thoughtImgUrl from '../../assets/Thought.svg';
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImgUrl,
      alt: 'Imagem de um inseto',
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImgUrl,
      alt: 'imgame de uma lampada',
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImgUrl,
      alt: 'imagem de um balão de pensamento',
    }
  },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  function handleRestartFeedback() {
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      
      {!feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChanged={ setFeedbackType } />
      ) : (
        <FeedbackContentStep 
          feedbackType={feedbackType}
          onFeedbackRestart={handleRestartFeedback}
        />
      )}
      <footer className="text-xs text-neutral-400">
        feito por <a className="underline underline-offset-2" href="https://github.com/C4BRALL">github.com/C4BRALL</a>
      </footer>
    </div>
  );
}
