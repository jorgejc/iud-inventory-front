import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { EstadoView } from './components/estados/EstadoView';
import { InventarioView } from './components/inventarios/InventarioView';
import { MarcaView } from './components/marcas/MarcaView';
import { TipoView } from './components/tipos/TipoView';
import { UsuarioView } from './components/usuarios/UsuarioView';
import { InventarioUpdate } from './components/inventarios/InventarioUpdate';

const App = () => {
  return <Router>
    <Header/>
    <Switch>
        <Route exact path='/' component={ InventarioView } />
        <Route exact path='/usuarios' component={ UsuarioView } />
        <Route exact path='/marcas' component={ MarcaView } />
        <Route exact path='/estados' component={ EstadoView } />
        <Route exact path='/tipos' component={ TipoView } />
        <Route exact path='/inventarios/edit/:inventarioId' component={ InventarioUpdate } />
        <Redirect to='/' />
    </Switch>
  </Router>
}

export {
    App 
}
