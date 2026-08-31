"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { QuizItem } from "@/lib/data/stages";

export function StageQuiz({ items }: { items: QuizItem[] }) {
  const [picks, setPicks] = useState<(number | null)[]>(
    () => items.map(() => null),
  );
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="quiz-block">
      <ol className="quiz-list">
        {items.map((item, index) => {
          const pick = picks[index];
          const show = revealed && pick !== null;
          return (
            <li key={item.prompt}>
              <p className="quiz-prompt">{item.prompt}</p>
              <div className="quiz-choices">
                {item.choices.map((choice, choiceIndex) => {
                  const selected = pick === choiceIndex;
                  const correct = choiceIndex === item.answer;
                  return (
                    <button
                      key={choice}
                      type="button"
                      className={[
                        "quiz-choice",
                        selected ? "is-selected" : "",
                        show && correct ? "is-correct" : "",
                        show && selected && !correct ? "is-wrong" : "",
                      ].join(" ")}
                      onClick={() => {
                        setRevealed(false);
                        setPicks((current) =>
                          current.map((value, i) =>
                            i === index ? choiceIndex : value,
                          ),
                        );
                      }}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              {show ? <p className="quiz-explain">{item.explain}</p> : null}
            </li>
          );
        })}
      </ol>
      <Button
        type="button"
        variant="outline"
        onClick={() => setRevealed(true)}
        disabled={picks.some((pick) => pick === null)}
      >
        核对这些想法
      </Button>
    </div>
  );
}
