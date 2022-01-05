import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input'
import Button from '../../components/Button'
import {useAuth} from '../../hooks/auth';

import {
    Container,
    Logo,
    Form,
    FormTitle
} from './styles';

const Sigin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn } = useAuth();


    return(
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira"></img>
                <h2> Minha Carteira</h2>
            </Logo>

            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>
                   Entrar
                </FormTitle>
                <Input 
                    type="e-mail" 
                    placeholder = "e-mail"
                    onChange = {(e) => setEmail(e.target.value)}
                    required/>
                <Input 
                    type="password" 
                    placeholder = "password"
                    onChange = {(e) => setPassword(e.target.value)}
                    required/>
                <Button type="submit">Entrar</Button>
            </Form>
        </Container>
    );
}

export default Sigin;