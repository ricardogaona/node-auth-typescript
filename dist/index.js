"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./database");
const app = express_1.default();
const PORT = Number(process.env.PORT) || 3000;
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Bienvenidos al servidor'
    });
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
