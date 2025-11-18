'use client';

import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect } from "react";
import { db } from "./firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const formSchema = z.object({
    firstName: z.string().min(1, { message: 'O primeiro nome é obrigatório' }),
    dataNascimento: z.string({ message: 'A data é obrigatória' }),
    phoneNumber: z.string().min(10, { message: 'O telefone é obrigatório' }),
    cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
    rua: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PersonalInfoFormProps {
    onSubmit?: (data: FormValues) => void;
}

export function PersonalInfo(props: PersonalInfoFormProps) {

    const { register, handleSubmit, watch, setValue, formState: { errors }, control } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const cep = watch('cep');

    useEffect(() => {
        async function loadAdress() {
            const clean = cep?.replace(/\D/g, "");

            if (clean?.length === 8) {
                const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
                const data = await res.json();

                if (data) {
                    setValue('rua', data.logradouro);
                    setValue('bairro', data.bairro);
                    setValue('cidade', data.localidade);
                    setValue('estado', data.uf);
                }
            }
        }

        loadAdress();
    }, [cep, setValue]);

        const onSubmit: SubmitHandler<FormValues> = async (data) => {

        // Se chegou aqui, NÃO existem erros.
        // O react-hook-form bloqueia automaticamente antes disso.

        try {
            await addDoc(collection(db, "personalInfo"), data);
            console.log("Enviado");

            // Só chama o próximo passo após salvar no Firestore
            props.onSubmit?.(data);

        } catch (err) {
            console.error("Erro ao salvar:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap='4'>
                <Field.Root invalid={!!errors.firstName}>
                    <Field.Label>Nome Completo</Field.Label>
                    <Input placeholder="ex: Ana Júlia da Silva" {...register('firstName')} />
                    <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.dataNascimento}>
                    <Field.Label>Data de Nascimento</Field.Label>
                    <Input {...register('dataNascimento')} type="date" />
                    <Field.ErrorText>{errors.dataNascimento?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.phoneNumber}>
                    <Field.Label>Telefone</Field.Label>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <PhoneInput
                                country="br"
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="+55 (99) 99999-9999"
                            />
                        )}
                    />
                    <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>CEP</Field.Label>
                    <Input
                        placeholder="CEP"
                        {...register("cep")}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            let formatted = value;

                            if (value.length > 5) {
                                formatted = value.slice(0, 5) + "-" + value.slice(5, 8);
                            }

                            setValue("cep", formatted, { shouldValidate: true });
                        }}
                    />
                    <Field.ErrorText>{errors.cep?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Rua</Field.Label>
                    <Input {...register('rua')} />
                </Field.Root>

                <Field.Root>
                    <Field.Label>Bairro</Field.Label>
                    <Input {...register('bairro')} />
                </Field.Root>

                <Field.Root>
                    <Field.Label>Cidade</Field.Label>
                    <Input {...register('cidade')} />
                </Field.Root>

                <Field.Root>
                    <Field.Label>Estado</Field.Label>
                    <Input {...register('estado')} />
                </Field.Root>

                <Button type='submit'>Próximo</Button>
            </Stack>
        </form>
    );
}