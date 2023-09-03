import { observer } from "mobx-react-lite";
import { ILoginViewModel } from "../ViewModel/LoginViewModel";

     interface Props {
         viewModel:ILoginViewModel;
    }
     const LoginView= ({viewModel}: Props) => (
    <form id="login-form" onSubmit={viewModel.submit}>
                <label className="login-label" htmlFor="nomeUtente">Nome utente:</label>
                <input id="nomeUtente" type='text' 
                name="nomeUtente"
                className="input"
                placeholder="Nome utente"></input>
                <label className="login-label" htmlFor="password">Password:</label>
                <input id="password" type='password' name="password"
                className="input"
                placeholder="Nome password"></input>
                <input id="login-submit" type="submit" />
                
    </form>
     )

     export default observer(LoginView)