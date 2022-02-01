"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_list_1 = require("../Controllers/contact-list");
const router = express_1.default.Router();
exports.default = router;
const index_1 = require("../Util/index");
router.get('/', index_1.AuthGuard, contact_list_1.DisplayContactListPage);
router.get('/edit/:id', index_1.AuthGuard, contact_list_1.DisplayEditPage);
router.get('/add', index_1.AuthGuard, contact_list_1.DisplayAddPage);
router.post('/add', index_1.AuthGuard, contact_list_1.ProcessAddPage);
router.get('/delete/:id', index_1.AuthGuard, contact_list_1.ProcessDeletePage);
router.post('/edit/:id', index_1.AuthGuard, contact_list_1.ProcessEditPage);
//# sourceMappingURL=contact-list.js.map