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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const user_entity_1 = require("../user/entities/user.entity");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../user/user.decorator");
const current_user_guard_1 = require("../user/current-user.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const nest_access_control_1 = require("nest-access-control");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    create(createPostDto, req, user) {
        return this.postService.create(createPostDto, req.user);
    }
    findAll(query, user) {
        return this.postService.findAll(query);
    }
    findOne(id) {
        return this.postService.findOne(+id);
    }
    findBySlug(slug) {
        return this.postService.findBySlug(slug);
    }
    uploadPhoto(file) {
        if (!file) {
            throw new common_1.BadRequestException('File is not an Image');
        }
        else {
            const response = {
                filePath: `http://localhost:3000/post/pictures/${file.filename}`,
            };
            return response;
        }
    }
    async getPicture(filename, res) {
        res.sendFile(filename, { root: './uploads' });
    }
    update(id, updatePostDto) {
        return this.postService.update(+id, updatePostDto);
    }
    remove(id) {
        return this.postService.remove(+id);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        possession: 'any',
        action: 'create',
        resource: 'post',
    }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(current_user_guard_1.CurrentUserGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Post)('upload-photo'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = filename.split(' ').join('_') +
                    '_' +
                    Date.now() +
                    '.' +
                    fileExtension;
                cb(null, newFileName);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/.(jpg|jpeg|png|gif)$/)) {
                return callback(null, false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)('pictures/:filename'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPicture", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        possession: 'any',
        action: 'update',
        resource: 'post',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), nest_access_control_1.ACGuard),
    (0, nest_access_control_1.UseRoles)({
        possession: 'any',
        action: 'delete',
        resource: 'post',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "remove", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map