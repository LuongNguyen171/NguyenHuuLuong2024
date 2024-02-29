'use strict'
// const addNumber = (a: number, b: number): number => {
//     return a + b
// }
Object.defineProperty(exports, '__esModule', { value: true })
var express_1 = require('express')
var cors_1 = require('cors')
// import productRouter from './app/routers/product.router';
// import authRouter from './app/routers/auth.router';
// import billRouter from './app/routers/bill.router';
var app = (0, express_1.default)()
app.use(express_1.default.static('public'))
// app.engine('.hbs', exphbs.engine({ extname: 'hbs' }));
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'app/views'));
// console.log(path.join(__dirname, 'app/views'))
// console.log(__dirname)
// app.get('/', (req, res) => {
//     res.render('forgotPasswordView')
// })
app.use((0, cors_1.default)())
app.listen(3001, function () {
  console.log('Node server running @ http://localhost:3001')
})
app.use(express_1.default.json())
// app.use('/product', productRouter);
// app.use('/auth', authRouter);
// app.use('/bill', billRouter);
