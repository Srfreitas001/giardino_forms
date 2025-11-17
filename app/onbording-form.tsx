'use client';

import { Box, Heading, Steps } from "@chakra-ui/react";
import { PersonalInfo } from "./personal-info";
import { Sugestion } from "./suggestion";
import { useSearchParams} from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [

    {title: 'Info Pessoais', id: 'personal-info'},
    {title:'Avaliação', id: 'suggestion'},
    

];


export function OnbordingForm(){

    const [formData, setFormData] = useState({});


    const searchParams = useSearchParams();
    const stepId = searchParams.get('step');

    let step = steps.findIndex((step) => step.id === stepId);
    if (step === -1) step = 0;
    if (stepId === 'done') step = steps.length;

    const router = useRouter();

    const goToNextStep = () => {
        const nextStep = steps[step + 1];
        router.push(`?step=${nextStep?.id ?? 'done'}`);

    }
    
    

    const goToStep = (step: number) => {
        const nextStep = steps[step];
        if (nextStep) {
            router.push(`?step=${nextStep.id}`);
        }
    }
    

    return(
        <Box padding={5} maxW='600px' mx='auto'>
                    <Heading mb='4' textAlign='center'>Giardino</Heading>
            <Steps.Root step={step} onStepChange={(e) => goToStep(e.step) } count={steps.length}>

                    <Steps.List>
                        {steps.map((step, index) => (
                        <Steps.Item key={index} index={index} title={step.title}>
                            <Steps.Indicator />
                            <Steps.Title>{step.title}</Steps.Title>
                            <Steps.Separator />
                        </Steps.Item>
                        ))}
                    </Steps.List>

                    
                        <Steps.Content index={0}>
                            <PersonalInfo
                                onSubmit={(data) => {
                                    setFormData((prev) => ({ ...prev, ...data }));
                                    goToNextStep();
                                }}
                                />

                        </Steps.Content>
                        <Steps.Content index={1}>
                            <Sugestion
                                onSubmit={async (data) => {
                                    const finalData = { ...formData, ...data };

                                    // SALVA tudo aqui
                                    await fetch("/api/giardino", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(finalData),
                                    });

                                    goToNextStep();
                                }}
                                />

                        </Steps.Content>
                        

                                
                        <Steps.CompletedContent mt='40px' textAlign='center'>O Giardino agradece sua Participação !</Steps.CompletedContent>
                        
                        {/*<Steps.Content index={2}>
                            < GarcomDetails onSubmit={(data) => {setStep(step + 1); console.log(data)}}/>

                        </Steps.Content>*/}

            </Steps.Root>
        </Box>
  )
    
}