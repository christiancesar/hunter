# Hunter Module

Projeto pessoal tirei do privado para que as pessoas interessadas possam ansalisar. É um projeto que faço a aplicação dos meus estudos de:

- Node/TypeScript
- Scraping with puppeteer -> Era uma das coisas que eu mais queria futricar (kkkkkk)
- API RESTFull
- DTOs
- Interfaces
- Orientação a Objetos
- Clean Architecture;
- Domain Driven Design
- Solid
- Services Pattern
- Repositories Pattern
- MongoDB (Atlas) -> Escolhi o mongo com Atlas, pois gostaria de compreender mais sobre a ferramenta.
- Build Pattern
- Factory Pattern
- Mapper Pattern
- TDD com Vitest -> Teste é algo novo para mim, antes era algo que não focava tanto, pois para mim precisava focar mais na logica e conceitos. Mas que recentemente resolvi estudar e aplicar mais.

Quero aplicar ainda:

- Domain Events
- WatchList
- Docker
- Controle de Usuario como:
  - Autenticação de rota
  - Regras

Estou ciente que poderia estar fazendo uso de um framework como o NestJs. Mas optei por não usar, gostaria de fazer mais manual, mas tenho intenção de fazer uso no futuro.

 Dentro desde projeto ainda elenca os projetos `WEB `e `DESKTP APP` que ainda não estão iniciados, o que há são ideias, e não é algo que estou focando muito por hora, estou me dedicando mais em compreender o backend. Mas tenho a ideia de fazer um app Web usando NextJS e para Windows usando Electron.

## Historia

Cliente deseja que as comissões sejam automatizadas atravez de um sistema. Onde tenha todos os pedidos faturados e seus itens para que assim item por intem seja informado a frente o nome(s) de quem eventualmente este relação aquela venda, receba suas devidas comissões. Cargos relacionados ao recebimento de comissão:

- Vendas
- Produção

  - Esquadria
    - Serralheiros
    - Montadores
    - Instaladores
    - Serviço
  - Temperado
    - Instalação
    - Serviço
- Uma ou mais pessoas podem estar relacionada a um item, deve haver uma comissão informada, quantidade de participantes e os colaboradores que executaram.

  - Exemplo: Porta de correr 2 folhas, quantidade 2, 3000,00 (valor liquido).
  - Então vamos se dizer que será dividido por 2 colaboradores, deve pegar a porcentagem de valor x e encontrar a comissão.
    - 3000*0,015=45
    - 450/2 = 22,5
  - Final cada colaborador receberá do item R$ 22,50
- Deve ser levado em consideração que pode haver lançamentos manuais, como ajuda de custo, ou uma forma diferente de lançamento, então seria interessante que podesse ter campos de lançamento extra, para informar valor, quantidade, comissão e valores.

### Problematica

A empresa alvo, faz uso de um sistema chamado Wvetro, este sistema não há rota de comunicação externa.

### Solução

Dito isso a maneira de fazer a captura dos dados será de forma manual, fazendo o uso do `puppeteer`.

## To do

- [X] Services de scraping no site alvo de todos os itens faturados e seus itens
- [X] Ao capturar um pedido por completo, salvar com a flag `captured` no mongoDB. Assim, não será capturado novamente. Caso a captura não seja completa, salvar com a flag `captured: false` no mongoDB. Assim, será capturado novamente. Por padrão o valor captured deve ser false.
- [X] Normalização desde dados para a regra de negócio da aplicação
- [X] Após normalização criar budget, items, customers, addresses, employees
- [X] Fazer a persistencia dos dados capturados no mongoDB.

* [X] Incluir Builder na classe de BudgetHuntService
* [X] Incluir sistema de log
* [X] Incluir retorno de erro dos metodos de BudgetHunt
* [X] Incluir retorno nas funções da classe BudgetHunt Service
* [X] Salvar no banco de dados
* [X] Criar módulo de comissão

  * [X] Tipos de serviço
  * [X] Relatório
  * [X] Rota com os dados do relatorio mensal de comissão
* [ ] Módulo de Hunt deve ser executado uma Cron para pegar automaticamente os dados a cada determinado tempo. Podendo ser de 1h em 1h.

  * [ ] Ignorando os dados já capturados.
  * [ ] Deve persistir no banco de dados as tentativas com status de criado, executando, erro e concluido.

- [ ] Faça a captura de todos os orçentos, caso ja registrado fazer a atualização.
- [ ] Faça a captura apenas de uma lista de pedido, caso ja registrado fazer a atualização. Ex: [1] ou [2,3,4]
- [ ] Quantidade x por dia fazer a captura e atualização dos orçamentos faturados
- [ ] Implementar Domain Events para quando capturar os dados, fazer atualização no banco do Hunter. E isso avisar o frontend

## Relatório

- [ ] Dentro de "Commission", contém a ideia do relatório. Porém acredito que seja algo que deva ser gerado pelo frontend. Mas que é algo que deve ser persistido como os dados que geraram aquele relatório e o relatório.
