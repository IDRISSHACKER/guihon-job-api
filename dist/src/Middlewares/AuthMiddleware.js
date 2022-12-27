"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const Const_1 = require("../utils/Const");
const jwt = require("jsonwebtoken");
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        try {
            const token = req.header('authorization').split(' ')[1];
            const verification = jwt.verify(token, Const_1.PRIVATE_KEY);
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'Authentication required to access of these ressouces',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        next();
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map