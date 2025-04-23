"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function QuestionPage() {
    const [pickedAnswer, setPickedAnswer] = useState(null)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [totalQuestionNumber, setTotalQuestionNumber] = useState(10)
    const [isanswerSelected, setIsAnswerSelected] = useState(false)

    const answers = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"];
    const question = "Fabel"

    const handleClick = (value) => {
        setPickedAnswer(prev => (prev === value ? null : value));
        setIsAnswerSelected(true);
    };

    const handleNext = (value) => {
        if (isanswerSelected) {

        }
    };

    return (
        <div className="page-container bg-gradient-to-br from-yellow-100 via-yellow-50 to-white">
            <main className="flex-1 flex flex-col items-center h-screen justify-center">
                <Card className="w-[550px] h-[450px] shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Ordförståelse
                        </CardTitle>
                        <CardDescription className="text-center">
                            Pröva din förmåga att förstå ord och begrepp
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Progress Bar */}
                        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                            <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${((questionNumber + 1) / totalQuestionNumber) * 100}%` }}
                            />
                        </div>
                        <div className="space-y-5 mt-7">
                            {/*Måste kunna ändras mellan varje fråga. Inte vara fast text! */}
                            <label className="font-bold">{question}</label>
                        </div>
                        <div className="space-y-3 space-x-3 flex-col mt-5">
                            {answers.map((answer, index) => (
                                <label key={index} className="flex items-center space-x-3 cursor-pointer mt-3">
                                    <input
                                        type="radio"
                                        checked={pickedAnswer === answer}
                                        onChange={() => handleClick(answer)}
                                        className="appearance-none w-5 h-5 rounded-full border-2 border-yellow-400
                                        checked:bg-yellow-400 transition-colors"
                                    />
                                    <span>{answer}</span>
                                </label>
                            ))}
                        </div>
                        {/*<div className="space-y-3 space-x-3 flex mt-3">
                            <div>
                                <Input
                                    type="radio"
                                    id="radio-button1"
                                    className="appearance-none w-4 h-5 rounded-full border border-gray-300 checked:bg-yellow-400 focus:outline-none"
                                    checked={pickedAnswer === "Answer Title"}
                                    onChange={() => handleClick("Answer Title")}
                                />
                            </div>
                            <div>
                                <label htmlFor="radio-button1">Answer Title</label>
                            </div>
                        </div>*/}
                        <div>
                            <Button
                                disabled={!pickedAnswer}
                                className={`px-45 py-1.5 mt-13 rounded-md font-bold transition 
                                ${pickedAnswer
                                        ? "bg-yellow-300 text-black hover:bg-amber-400"
                                        : "bg-yellow-300 text-black"}
                                `}
                            >
                                Next Question
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div >
    );
}