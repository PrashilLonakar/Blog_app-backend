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
    async create(createPostDto, user) {
        const post = new post_entity_1.Post();
        post.userId = 1;
        Object.assign(post, createPostDto);
        this.repo.create(post);
        return await this.repo.save(post);
    }
    async findAll(query) {
        const myQuery = this.repo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.category', 'category')
            .leftJoinAndSelect('post.user', 'user');
        if (!(Object.keys(query).length === 0) && query.constructor === Object) {
            const queryKeys = Object.keys(query);
            if (queryKeys.includes('title')) {
                myQuery.where('post.title LIKE :title', {
                    title: `%${query['title']}%`,
                });
            }
            if (queryKeys.includes('sort')) {
                myQuery.orderBy('post.title', query['sort'].toUpperCase());
            }
            if (queryKeys.includes('category')) {
                myQuery.andWhere('category.title = :cat', { cat: query['category'] });
                console.log('3', myQuery);
            }
            return await myQuery.getMany();
        }
        else {
            return await myQuery.getMany();
        }
    }
    async findOne(id) {
        const post = await this.repo.findOneBy({ id });
        if (!post) {
            throw new common_1.BadRequestException('Post not found');
        }
        return post;
    }
    async findBySlug(slug) {
        try {
            const post = await this.repo.findOneByOrFail({ slug });
            return post;
        }
        catch (err) {
            throw new common_1.BadRequestException(`Post with slug ${slug} not found`);
        }
    }
    async update(id, updatePostDto) {
        const post = await this.repo.findOneBy({ id });
        if (!post) {
            throw new common_1.BadRequestException(`Post not found`);
        }
        post.modifiedOn = new Date(Date.now());
        post.category = updatePostDto.category;
        Object.assign(post, updatePostDto);
        return await this.repo.save(post);
    }
    async remove(id) {
        const post = await this.repo.findOneBy({ id });
        if (!post) {
            throw new common_1.BadRequestException(`Post not found`);
        }
        await this.repo.remove(post);
        return { success: true, post };
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map