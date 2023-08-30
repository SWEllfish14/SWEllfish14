import { observer } from "mobx-react-lite";
import { ILoginViewModel } from "../ViewModel/LoginViewModel";

     interface Props {
         viewModel:ILoginViewModel;
    }
     const LoginView= ({viewModel}: Props) => (
    <form onSubmit={viewModel.submit}>
                <label htmlFor="nomeUtente">Nome utente</label>
                <input id="nomeUtente" type='text' 
                name="nomeUtente"
                className="input"
                placeholder="Nome utente"></input>
                <label htmlFor="password">Password</label>
                <input id="password" type='password' name="password"
                className="input"
                placeholder="Nome password"></input>
                <input type="submit" />
                
    </form>
     )

     export default observer(LoginView)