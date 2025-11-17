/* 'use client';

import { Field, Input, Stack, Button } from "@chakra-ui/react";
import {useForm, SubmitHandler} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";



interface FormValues{
    garcomRating:string;

}

const formSchema = z.object({

    garcomRating: z.string().min(1, {message: 'Insira mais detalhes, por gentileza'}),
});

interface GarcomDetailsFormProps {
    onSubmit?: (data: FormValues) => void;
}
export function GarcomDetails(props: GarcomDetailsFormProps){

    const {register, handleSubmit, formState:{errors} } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => {props.onSubmit?.(data); console.log(data)};

    return(

        <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap='4'>
                <Field.Root invalid={!!errors.garcomRating}>

                    <Field.Label>Dê uma nota ao seu Garçom</Field.Label>
                    <Input {...register('garcomRating')} />
                    <Field.ErrorText>{errors.garcomRating?.message} </Field.ErrorText>
                </Field.Root>

            </Stack>
            <Button>Retornar</Button>
            <Button type='submit' flex='1'>Concluir</Button>
        </form>
    )
}

 */