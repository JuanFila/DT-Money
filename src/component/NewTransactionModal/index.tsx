import * as Dialog from "@radix-ui/react-dialog";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Close,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./style";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { useContext } from "react";
import { TransactionsContext } from "../../context/TransactionsContextx";

const newTransactionFormSchema = z.object({
  description: z.string().min(5).max(100),
  price: z.number().positive(),
  category: z.string().min(3).max(50),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInput = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const {createTransaction} = useContext(TransactionsContext)
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: { type: "income" },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInput) {
    const {description, price, category, type} = data

    await createTransaction({
      description,
      price,
      category,
      type,
    })

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <Close>
          <X size={24} />
        </Close>
        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({field}) => {
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saida
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          ></Controller>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
