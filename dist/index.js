"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const habitaciones_1 = __importDefault(require("./routes/habitaciones"));
const app = (0, express_1.default)();
const port = 4000;
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api', index_1.default);
app.use('/api/habitaciones', habitaciones_1.default);
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
