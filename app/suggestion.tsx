import {Button, Field, Stack, Textarea, NativeSelect, Steps, HStack, IconButton, NumberInput} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMinus, LuPlus } from "react-icons/lu";
import { Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

import { useSearchParams } from "next/navigation";

interface FormValues{

    sugestionRating: string;
    atendimentoAvaliation: string;
    improvementSugestion?: string;    

};

const formSchema = z.object({

    sugestionRating: z.string().min(1, {message: 'Por favor, digite uma sugestão'}), 
    atendimentoAvaliation: z.string().min(1, {message: 'Por favor, selecione uma opção'}),
    improvementSugestion: z.string().optional(),
});

interface SugestionFormProps {
    onSubmit?: (data: FormValues & {garcom: string}) => void;
}

export function Sugestion(props: SugestionFormProps){

    const searchParams = useSearchParams();
    
    const [garcomName, setGarcomName] = useState("Carregando...");
    
    
    const isLoading = garcomName === "Carregando...";
    
    
    useEffect(() => {
        
        const garcomId = searchParams.get("s");
        const finalGarcomName = garcomId || "Não Informado";
        
        
        setGarcomName(finalGarcomName);
   
    }, []); 

     const {register, handleSubmit, control, formState:{errors}} = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    });

    const garconInvalido = garcomName === "Não Informado";

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if(garconInvalido){

            alert('Garçom não encontrado. Scaneie o Qr-Code do seu Garçom.');
            return;
        }
        const fullPayLoad = {...data, garcom: garcomName};
        props.onSubmit?.(fullPayLoad);
        console.log("Form submitted with data:", fullPayLoad);
    }; 


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap='4'>

                <Controller 
                    name='sugestionRating'
                    control={control}
                    defaultValue='5'
                    render={({field}) => (

                    <NumberInput.Root mt='20px' defaultValue='5' unstyled spinOnPress={false} width='400px' min={0} max={10} value={field.value} 
                    onValueChange={(v) => field.onChange(String(v.value))} >

                        <NumberInput.Label mt='30px'gap='8' >Dê uma nota de 0 a 10 ao Garçom <Text as='span' 
                        fontWeight='extrabold' >{garcomName}</Text> 
                        </NumberInput.Label>

                        <HStack gap='4'  {...register('sugestionRating')}>
                            <NumberInput.DecrementTrigger asChild >
                                <IconButton variant='outline' size='sm'>
                                    <LuMinus />
                                </IconButton>
                            </NumberInput.DecrementTrigger>
                            <NumberInput.ValueText  />
                                
                            <NumberInput.IncrementTrigger asChild>

                                <IconButton variant='outline' size='sm'>
                                    <LuPlus />
                                </IconButton>

                            </NumberInput.IncrementTrigger>

                        </HStack>
                    </NumberInput.Root>
                    )}
                />
                
                <Field.Root invalid={!!errors.atendimentoAvaliation} mt='10px' mb='10px'>
                    <Field.Label>Como você avalia nossos Pratos ? </Field.Label>
                        <NativeSelect.Root size='sm' width='240px'>
                            <NativeSelect.Field placeholder= 'Selecione a opção' {...register('atendimentoAvaliation')}>
                                <option value='satisfeito'>Satisfeito</option>
                                <option value='TotalmenteSatisfeito'>Totalmente Satisfeito</option>
                                <option value='Insatisfeito'>Insatisfeito</option>
                                <option value='TotalmenteInsatisfeito'>Totalmente Insatisfeito</option>
                                </NativeSelect.Field>
                            <NativeSelect.Indicator/>
                        </NativeSelect.Root>
                   
                    
                    <Field.ErrorText>{errors.atendimentoAvaliation?.message} </Field.ErrorText>
                </Field.Root>
                
                <Field.Root invalid={!!errors.improvementSugestion}>
                    <Field.Label>Dê sua sugestão de melhoria</Field.Label>
                    <Textarea placeholder="Opcional"{...register('improvementSugestion')} />
                    <Field.ErrorText>{errors.improvementSugestion?.message} </Field.ErrorText>
                </Field.Root>

                <HStack gap='4'>
                    <Steps.PrevTrigger asChild>

                        <Button variant='outline'>Retornar</Button>
                                        
                    </Steps.PrevTrigger>
                  
                    <Button type='submit'  disabled={isLoading} >{isLoading ? 'Aguarde...' : 'Concluir Avaliação'}</Button>
                </HStack>
            </Stack>
        </form>
    )
}