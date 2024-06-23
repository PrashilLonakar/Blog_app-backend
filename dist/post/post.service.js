"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const typeorm_2 = require("typeorm");
let PostService = class PostService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createPostDto) {
        const post = new post_entity_1.Post();
        post.userId = 1;
        Object.assign(post, createPostDto);
        this.repo.create(post);
        return await this.repo.save(post);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findOne(id) {
        const post = await this.repo.findOneBy({ id });
        if (!post) {
            throw new common_1.BadRequestException('Post not found');
        }
        return post;
    }
    async update(id, updatePostDto) {
        return await this.repo.update({ id }, updatePostDto);
    }
    async remove(id) {
        return await this.repo.delete({ id });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map