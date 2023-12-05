import { Container, Links } from './styles';
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'



export function Details(){
  return(
  <Container>
    <Header/>
    <ButtonText title="Excluir nota"/>

    <Section title="Links uteis">
      <Links>
        <li><a href="#">https://www.rocketseat.com.br/</a></li>
        <li><a href="#">https://www.rocketseat.com.br/</a></li>
      </Links>
    </Section>

    <Section title="Marcadores">
        <Tag title="node"/>
        <Tag title="express"/>
    </Section>

    <Button title="Voltar"/>
  </Container>
  )
}