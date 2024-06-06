# Fullstack Orders Application
Fullstack ordering application built on React and .NET

## Backend
- Code first approach
- ASP.NET Core Web API (Hosted on Azure)
- Dependency Injection with Repository Layer
- Scoped Service Layer
- Cancellation Tokens
- External SQL Data Store on Supabase
- Middleware authentication with Supabase (using JWT tokens given to users when the log into the app)

Postman performance test results (ramp up profile, 100 concurrent users, 3 minutes)
![postmanStats](https://github.com/Evanz142/orders-application/assets/47926489/84b0b5c1-ffe8-4f56-9471-d41a99281c19)


## Frontend
- Signup/Login system with authentication and sessions (using Supabase)
- In-memory view of orders with server side filtering options
- Optional order draft feature making use of global context state mangement
- Statistics Page to view a display of the data
- Hosted on Vercel implementing continuous deployment
- Dark mode (the most important feature)

![codingChallengeSigninpage](https://github.com/Evanz142/orders-application/assets/47926489/8bab6f68-aba6-4835-bc91-21fbb630036d)
![codingChallengeOrderpage](https://github.com/Evanz142/orders-application/assets/47926489/9699603d-f69e-48dd-a605-13518d2414af)
![codingChallengeStatspage](https://github.com/Evanz142/orders-application/assets/47926489/e497c400-0b31-4149-9f6c-5b818fcdebec)
