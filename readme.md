# Hunter Module

This is a personal project that I have made public for interested parties to analyze. The project applies my studies in:

- Node/TypeScript
- Scraping with Puppeteer: Something I was very eager to explore (haha)
- RESTful API
- DTOs
- Interfaces
- Object-Oriented Programming
- Clean Architecture
- Domain-Driven Design
- SOLID Principles
- Service Pattern
- Repository Pattern
- MongoDB (Atlas): Chose MongoDB with Atlas to gain a deeper understanding of the tool.
- Builder Pattern
- Factory Pattern
- Mapper Pattern
- TDD with Vitest: Testing is a new area for me. Previously, I focused more on logic and concepts, but recently I've decided to study and apply it more.

Future plans include:

- Domain Events
- WatchList
- Docker
- User control with:
  - Route authentication
  - Rules

I'm aware that I could use a framework like NestJS, but I chose to implement things more manually for now, though I plan to use it in the future.

Currently, this project also includes WEB and DESKTOP APP projects which are still just ideas. My primary focus is on understanding the backend. However, I plan to create a web app using NextJS and a Windows app using Electron.

## Project Story

A client wants commissions to be automated through a system. This system should include all invoiced orders and their items, indicating the name(s) of the individuals related to each sale, so they receive their respective commissions. Roles related to receiving commissions include:

- Sales
- Production:
- Windows:
  - Ironworkers
  - Assemblers
  - Installers
  - Service
- Tempered Glass:
  - Installation
  - Service

Multiple people can be associated with an item. A commission, the number of participants, and the workers involved must be indicated. For example, for a sliding door with 2 panels, quantity 2, and a net value of 3000, the calculation would be:

3000 * 0.015 = 45
450 / 2 = 22.5
Each worker would receive R$ 22.50 for the item.

Manual entries should also be considered, such as allowances or other types of entries, so fields for extra entries to specify value, quantity, commission, and amounts would be useful.

Problem

The target company uses a system called Wvetro, which lacks external communication routes.

Solution

Data capture will be done manually using Puppeteer.
Before apply business rules.

## To do
- [X] Scraping services on the target site for all invoiced items.
- [X] Upon capturing an entire order, save it with the flag captured in MongoDB to avoid recapturing. If the capture is incomplete, save it with the flag captured: false in MongoDB to ensure it is recaptured. By default, captured should be false.
- [X] Normalize these data according to the application's business rules.
- [X] After normalization, create budgets, items, customers, addresses, employees.
- [X] Persist the captured data in MongoDB.
- [X] Include a Builder in the BudgetHuntService class.
- [X] Add a logging system.
- [X] Add error returns in BudgetHunt methods.
- [X] Add returns in BudgetHunt Service class functions.
- [X] Save to the database.
- [X] Create a commission module:
  - [X] Service types
  - [X] Report
  - [X] Route with monthly commission report data.
