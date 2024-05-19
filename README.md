# MiBudget
by Casey Layne Hyne
![License: MIT](https://img.shields.io/badge/License-MIT-yellowgreen.svg)

## Screenshots

![MiBudget Login](https://github.com/Hyne-OS1/MiBudget-Casey/assets/146906218/f7358b60-ff06-42fd-a19d-9ca21fee4f26)
![mibudget main](https://github.com/Hyne-OS1/MiBudget-Casey/assets/146906218/3763adb8-e07d-4261-a35a-870c2f022ed4)
![MiBudget Main white](https://github.com/Hyne-OS1/MiBudget-Casey/assets/146906218/b11ac101-edb8-48e3-8ce9-4490e2be7ac0)
![Midbuget expenses](https://github.com/Hyne-OS1/MiBudget-Casey/assets/146906218/04a28c79-6e7e-42d2-85ed-ed9e4406a725)


## Description

* MiBudget is your own personal all in one budget tracker Web Application developed in React in combination with MongoDB, Express and Prisma.
* Users have the ability to set expense budgets, log and remove expenses, categorise expenses and have all data presented in a local transaction history display along with graphical  pie chart data.

## Usage

Web Application Usage: 
* Ensure "/login" route is the starting route and login with provided details.
* From there you will be presented with you MiBudget homepage.
* Add your desired budget limit from the tab on the side panel.
* Add an expense via the side tab panel and sort transactions by Category should you choose, all categorised expenses will be presented in the "View Spemding in Categories" tab.
* To remove an expense from budget simply navigate to home page and select the item you wish to delete this will remove the item and re introduce your expense back itno your total budget.
* To reset budget and expenses simply navigate back to budget tab and implement your new desired budget.
* Both a light mode and dark mode have been implemented for users, simply navigate to the top right of your screen and click the icon to toggle.

Local Machine Usage:
* Upon gitclone of MiBudget onto your local machine there is a few steps to ensure it runs properly
* Open file sources.
* In both "App" folder and "Server" folder => npm i --save.
* In "Server" folder => npx prisma generate => npm run dev.
* In "App" folder => npm run dev.
* MiBudget should now operate on your local host.
* Refer to "Web Application Usage" for instructions.


## Known Bugs

* When a user removes an expense the pie chart will print the word "expense" across the users screen.
* If budget is exceeded then expense is removed "budget will" render multiple times across users screen
* Adding categories based off expenditures can sometimes fail to update to their designated "category" and render to a black "category" card.
* Server may crash at times due to too many expense addition requests in which case server will need to be terminated and ran again.

## Future Developments

* Implementing create account functionality to MiBudget.
* Fixing UseState hooks for index.html react bugs in relation to pie chart rendering (expense and budget word spamming).
* Fixing category expenditure functionality.
* Fixing server crashing from expense additions.
* Implement a way to track user investments in addition to expenses
* Adding mobile compatibility
* More detailed reports on expenses and how bad spending habits can be minimised
* Adding 2 factor authentication for user safety
* Adding more widgets to customize user dashboard
* Add logout function button

## Packages / Libraries

Front end:
* apollo/client
* emotion/react (CSS)
* mantine/core
* graphql
* react
* react-dom
* react-router-dom

Back end:
* bcryptjs
* cors
* dotenv
* express
* jsonwebtoken
* morgan
* nodemon

## Prisma Resource Setup

* https://www.prisma.io/docs/orm/prisma-schema/overview

## License

MIT License

Copyright (c) 2024 Hyne-OS1

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


