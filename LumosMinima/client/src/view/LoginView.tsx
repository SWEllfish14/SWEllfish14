import { observer } from "mobx-react-lite";
import { ILoginViewModel } from "../ViewModel/LoginViewModel";

     interface Props {
         viewModel:ILoginViewModel;
    }
     const LoginView= ({viewModel}: Props) => (
     <form onSubmit={viewModel.submit}>
{/*           <label htmlFor="nomeUtente">Nome utente</label>
          <input id="nomeUtente" type='text' 
          name="nomeUtente"
          className="input"
          placeholder="Nome utente"></input>

          <label htmlFor="password">Password</label>
          <input id="password" type='password' name="password"
          className="input"
          placeholder="Nome password"></input>

          <input type="submit" />   */}




     <div className="columns is-justify-content-center is-align-items-center" style={styles.login}>
          
          <div className="column is-4 box" style={styles.padd}>
               <h2 className="title is-4 has-text-centered" >Login</h2>
               <div className="columns is-flex is-flex-direction-column">
               <div className="column">
                    <label htmlFor="nomeUtente">Nome utente</label>
                    <input id="nomeUtente" type='text' 
                    name="nomeUtente"
                    className="input"
                    placeholder="Nome utente"></input>
               </div>
               <div className="column">
               <label htmlFor="password">Password</label>
                    <input id="password" type='password' name="password"
                    className="input"
                    placeholder="Nome password"></input>
               </div>
               <div className="column">
                    <button className="button is-primary is-fullwidth" type="submit">Login</button>
               </div>

               </div>
          </div>
     </div>



        

     </form>
     )

     const styles = {
          login: {
               marginTop: '10%',
          },
          padd : {
               padding:20
          }
        };     

     export default observer(LoginView)