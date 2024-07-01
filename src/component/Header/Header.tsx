import { NewTransactionModal } from "../NewTransactionModal";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./style";
import * as Dialog from "@radix-ui/react-dialog";
export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <h1>DtMoney</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal/>

        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
