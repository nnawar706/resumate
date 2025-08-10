import React from 'react'
import {Accordion, AccordionContent, AccordionHeader, AccordionItem} from "~/components/Accordion";
import ScoreBadge from "~/components/ScoreBadge";
import {ICONCHECK, ICONWARNING} from "../../constants";
import {cn} from "~/lib/utils";

const CategoryHeader = ({ title, score }: CategoryProps) => (
    <div className="flex flex-row gap-4 items-center py-2">
        <p className="text-lg font-semibold text-dark-200">{title}</p>
        <ScoreBadge score={score}/>
    </div>
)

const CategoryContent = ({tips}: { tips: FeedbackTip2[] }) => (
    <div className={"flex flex-col gap-4 items-center w-full"}>
        <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
            {tips.map((tip, i) => (
                <div key={i} className={"flex flex-row gap-2 items-center"}>
                    <img src={tip.type === "good" ? ICONCHECK : ICONWARNING} alt={"icon"} className={"size-5"}/>
                    <p className={"text-md text-gray-500"}>{tip.tip}</p>
                </div>
            ))}
        </div>
        <div className={"flex flex-col gap-4 w-full"}>
            {tips.map((tip, i) => (
                <div key={i + tip.tip}
                className={cn("flex flex-col gap-2 rounded-2xl p-4 border",
                    tip.type === "good" ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-yellow-50 border-yellow-200 text-yellow-700"
                )}>
                    <div className={"flex flex-row gap-2 items-center"}>
                        <img src={tip.type === "good" ? ICONCHECK : ICONWARNING} alt={"icon"} className={"size-5"}/>
                        <p className={"text-md text-gray-500"}>{tip.explanation}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const Details = ({feedback}: { feedback: FeedbackProps }) => (
    <section className={"flex flex-col gap-4 w-full"}>
        <Accordion>
            <AccordionItem id="tone-style">
                <AccordionHeader itemId="tone-style">
                    <CategoryHeader
                        title="Tone & Style"
                        score={feedback.toneAndStyle.score}
                    />
                </AccordionHeader>
                <AccordionContent itemId="tone-style">
                    <CategoryContent tips={feedback.toneAndStyle.tips} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="content">
                <AccordionHeader itemId="content">
                    <CategoryHeader
                        title="Content"
                        score={feedback.content.score}
                    />
                </AccordionHeader>
                <AccordionContent itemId="content">
                    <CategoryContent tips={feedback.content.tips} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="structure">
                <AccordionHeader itemId="structure">
                    <CategoryHeader
                        title="Structure"
                        score={feedback.structure.score}
                    />
                </AccordionHeader>
                <AccordionContent itemId="structure">
                    <CategoryContent tips={feedback.structure.tips} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="skills">
                <AccordionHeader itemId="skills">
                    <CategoryHeader
                        title="Skills"
                        score={feedback.skills.score}
                    />
                </AccordionHeader>
                <AccordionContent itemId="skills">
                    <CategoryContent tips={feedback.skills.tips} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </section>
)
export default Details
